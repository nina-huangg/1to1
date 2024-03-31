
from ..serializers.register_serializer import RegisterSerializer
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny


class RegisterView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def get_serializer_class(self):
        return RegisterSerializer