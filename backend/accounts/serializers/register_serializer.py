from rest_framework import serializers
from django.contrib.auth.models import User
from profile_info.models import Dashboard



class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(required=True, write_only=True)
    password2 = serializers.CharField(required=True, write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name')
        extra_kwargs = {
            'username': {'required': True},
        }

    def validate(self, attrs):
        err = {}

        if User.objects.filter(username=attrs['username']).exists():
            err['username'] = ["A user with this username already exists."]
        if attrs['password'] != attrs['password2']:
            err['password'] = ["Password fields didn't match."]
        if len(attrs['password']) < 8 or len(attrs['password2']) < 8:
            if err.get('password'):
                err['password'].append("Password must be more than 8 characters.")
            else:
                err['password'] = ["Password must be more than 8 characters."]
            
        if err:
            raise serializers.ValidationError(err)

        return attrs


    def create(self, validated_data):
        validated_data.pop('password2', None)
        user = User.objects.create_user(username=validated_data['username'], password=validated_data['password'])

        user.email = validated_data.get('email', '')
        user.first_name = validated_data.get('first_name', '')
        user.last_name  = validated_data.get('last_name', '')
        user.save()

        dashboard = Dashboard.objects.create(owner=user)
        dashboard.save()

        return user