from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from ..models import Contact
from ..serializers.contact_serializer import ContactSerializer

class EditContactView(RetrieveUpdateAPIView):
    lookup_field = 'id'
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)
