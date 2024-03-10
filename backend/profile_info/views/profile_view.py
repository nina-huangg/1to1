from rest_framework.views import APIView
from rest_framework.response import Response
from ..serializers.profile_serializer import ProfileSerializer
from rest_framework.permissions import IsAuthenticated

class ProfileView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        serializer = ProfileSerializer(user)

        return Response(serializer.data)
