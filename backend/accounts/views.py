from django.contrib.auth import authenticate
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Account
from .serializers import AccountSerializer, RegisterSerializer

from rest_framework_simplejwt.tokens import BlacklistedToken, OutstandingToken


class RegisterView(APIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer
    """
    Register a new user account with model 'Account'

    POST: Register a new user account. The body of the request should be a JSON
    object with the data to populate a django user account.

    example of request body:
    {
        "username": "user1",
        "password": "coolpassword",
        "password2": "coolpassword",
        "email": "user@mail.com",
        "first_name": "Jon",
        "last_name": "Snow",
    }
    """

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.validated_data, status=200)
        else:
            return Response(serializer.errors, status=400)


class LoginView(APIView):
    """
    Login a user account.

    POST: Login into a new user account. The body of the request should be a JSON with
    username and password. If the credentials are correct, the response will be status 200
    with the access and refresh tokens. Otherwise the response will be status 400.


    example of request body:
    {
        "username": "user1",
        "password": "coolpassword",
    }
    """

    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user:
            refresh = RefreshToken.for_user(user)
            tokens = {"access": str(refresh.access_token),
                      "refresh": str(refresh)}
            return Response(tokens, status=200)
        else:
            return Response({"error": "Invalid credentials"}, status=400)


class LogoutView(APIView):
    """
    Logout the current loged in user account. User must be authenticated to logout.
    (For simplicity it also logouts the user from all devices)

    POST: The body of the request should be empty. The user is found with the token
    in the POST request header. All access and refresh tokens associated with the user
    are then invalidated.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        tokens = OutstandingToken.objects.filter(user_id=request.user.id)
        for token in tokens:
            BlacklistedToken.objects.get_or_create(token=token)

        return Response(status=400)


class AccountView(APIView):
    """
    View to see user account details. Formarlly known as ProfileView.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = AccountSerializer(user)

        return Response(serializer.data)


class AccountEditView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AccountSerializer

    def get_object(self):
        user = self.request.user
        return Account.objects.filter(user=user)
