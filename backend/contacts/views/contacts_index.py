from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from ..models import Contact
from ..serializers.contact_serializer import ContactSerializer

class ContactsIndexView(ListAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated]
