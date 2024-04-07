from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.generics import ListAPIView
from rest_framework.generics import DestroyAPIView
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Contact
from .serializers import ContactSerializer


class EditContactView(RetrieveUpdateAPIView):
    lookup_field = "id"
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Contact.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

    def update(self, request, *args, **kwargs):
        kwargs["partial"] = True
        return super().update(request, *args, **kwargs)


class DeleteContactView(DestroyAPIView):
    lookup_field = "id"
    queryset = Contact.objects.all()
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"message": "Contact deleted successfully"},
            status=status.HTTP_204_NO_CONTENT,
        )


class ContactsIndexView(ListAPIView):
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Contact.objects.filter(user=user)


class AddContactView(CreateAPIView):
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
