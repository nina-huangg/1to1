
from ..serializers.login_serializers import LoginSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView




class LoginView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    # def post(self, request):
    #     serializer = LoginSerializer(data=request.data)
        
    #     if serializer.is_valid():
    #         username = serializer.validated_data['username']
    #         password = serializer.validated_data['password']
    #         user = authenticate(username=username, password=password)
            
    #         if user:
    #             data = serializer.data
    #             token = RefreshToken.for_user(user)
    #             data['tokens'] = {"refresh": str(token), 
    #                               "access": str(token.access_token)}
    #             return Response(data)
    #         else:
    #             return Response({'error': 'Invalid username or password'})
    #     return Response(serializer.errors)