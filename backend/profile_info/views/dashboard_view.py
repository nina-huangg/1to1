from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from ..serializers.dashboard_serializer import DashboardSerializer
from rest_framework.permissions import IsAuthenticated
from ..models import Dashboard

class DashboardView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = DashboardSerializer


    def get_queryset(self):
        user = self.request.user
        return Dashboard.objects.filter(owner=user)
    
    def get_object(self):
        queryset = self.get_queryset()
        obj = queryset.first() 
        if obj is None:
            return Response({"message": "Dashboard not found"})
        return obj

    