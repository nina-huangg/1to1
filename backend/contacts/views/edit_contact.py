from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from ..models import Contact
from ..serializers.contact_serializer import ContactSerializer
from rest_framework.parsers import MultiPartParser, JSONParser

class EditContactView(RetrieveUpdateAPIView):
    lookup_field = 'id'
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, JSONParser)

    def get_queryset(self):
        return Contact.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True  
        return super().update(request, *args, **kwargs)
