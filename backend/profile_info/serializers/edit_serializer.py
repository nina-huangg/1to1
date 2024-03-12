from rest_framework import serializers
from django.contrib.auth.models import User

class ProfileEditSerializer(serializers.ModelSerializer):
    password = serializers.CharField(required=False, write_only=True)
    password2 = serializers.CharField(required=False, write_only=True)
    class Meta:
        model = User
        fields = ('password', 'password2','email', 'first_name', 'last_name')

    def validate(self, attrs):
        err = {}
        if attrs.get('password') and attrs.get('password2'):
            if attrs['password'] != attrs['password2']:
                err['password'] = ["Password fields didn't match."]
            if len(attrs['password']) < 8 or len(attrs['password2']) < 8:
                if err.get('password'):
                    err['password'].append("Password must be more than 8 characters.")
                else:
                    err['password'] = ["Password must be more than 8 characters."]
        else:
            if attrs.get('password'): attrs['password'] = None
            if attrs.get('password2'): attrs['password2'] = None
        if err:
            raise serializers.ValidationError(err)

        return attrs

    def update(self, instance, validated_data):
        validated_data.pop('password2', None)
        if validated_data.get('password') and validated_data['password']!= None:
            instance.set_password(validated_data['password'])

        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.save()
        

        return instance
