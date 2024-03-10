from rest_framework import serializers


class DashboardSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
