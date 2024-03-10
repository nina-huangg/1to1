from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from ..models import Dashboard
from ..serializers.dashboard_serializer import DashboardSerializer

class DashboardEditView(UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = DashboardSerializer

    def get_object(self):
        user = self.request.user
        return Dashboard.objects.get(owner=user)