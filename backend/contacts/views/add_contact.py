from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ..serializers.contact_serializer import ContactSerializer
from ..models import Contact

class AddContactView(CreateAPIView):
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

