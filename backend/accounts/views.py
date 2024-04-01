from django.contrib.auth import authenticate
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Account
from .serializers import AccountSerializer, RegisterSerializer


class RegisterView(APIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        else:
            return Response(serializer.errors, status=400)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user:
            refresh = RefreshToken.for_user(user)
            tokens = {"access": str(refresh), "refresh": str(refresh.access_token)}
            return Response(tokens, status=200)
        else:
            return Response({"error": "Invalid credentials"}, status=400)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({"message": "User logged out."}, status=200)
        except Exception as exception:
            return Response({"error": str(exception)}, status=400)


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
