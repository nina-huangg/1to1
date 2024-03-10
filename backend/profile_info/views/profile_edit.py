from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from ..serializers.edit_serializer import ProfileEditSerializer

class ProfileEditView(UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ProfileEditSerializer

    def get_object(self):
        user = self.request.user
        return user