from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from ..models import Contact
from ..serializers.contact_serializer import ContactSerializer

class ContactsIndexView(ListAPIView):
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Contact.objects.filter(user=user)

    
