
from ..serializers.register_serializer import RegisterSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny


class RegisterView(generics.CreateAPIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)