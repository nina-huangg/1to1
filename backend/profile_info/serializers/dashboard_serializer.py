from rest_framework import serializers
from ..models import Dashboard


class DashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dashboard
        fields = ('message', 'language', 'timezone', 'country')

