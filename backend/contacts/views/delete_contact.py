from rest_framework.generics import DestroyAPIView
from rest_framework.permissions import IsAuthenticated
from ..models import Contact
from rest_framework import status
from rest_framework.response import Response

class DeleteContactView(DestroyAPIView):
    lookup_field = 'id'
    queryset = Contact.objects.all()
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "Contact deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

