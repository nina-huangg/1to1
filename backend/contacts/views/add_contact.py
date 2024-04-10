from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from ..serializers.contact_serializer import ContactSerializer
from ..models import Contact

class AddContactView(CreateAPIView):
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, JSONParser)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

