from rest_framework import serializers
from django.contrib.auth.models import User

class ProfileEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name')
