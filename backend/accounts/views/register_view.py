from django.contrib.auth.models import User
from ..serializers.register_serializer import RegisterSerializer
from rest_framework import generics
from rest_framework.response import Response


class RegisterView(generics.CreateAPIView):
    # queryset = User.objects.all()
    # serializer_class = RegisterSerializer

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            print(serializer.errors)
            return Response(serializer.errors)