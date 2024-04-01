from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.validators import ValidationError

from .models import Account


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(required=True, write_only=True)
    password2 = serializers.CharField(required=True, write_only=True)

    class Meta:
        model = User
        fields = [
            "username",
            "password",
            "password2",
            "email",
            "first_name",
            "last_name",
        ]
        extra_kwargs = {
            "username": {"required": True},
        }

    def validate(self, attrs):
        if User.objects.filter(username=attrs["username"]).exists():
            raise ValidationError("Username has already been used")
        if User.objects.filter(email=attrs["email"]).exists():
            raise ValidationError("Email has already been used")
        if len(attrs["password"]) < 8:
            raise ValidationError("Password must be more than 8 characters")
        if attrs["password"] != attrs["password2"]:
            raise ValidationError("Password fields do not match")
        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email", ""),
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", ""),
        )
        user.set_password(validated_data["password"])
        user.save()

        account = Account(user=user)
        account.save()

        return user


class AccountSerializer(serializers.ModelSerializer):
    """
    Serializer a user's account'
    """

    username = serializers.CharField(source="user.username")
    email = serializers.CharField(source="user.email")
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")

    class Meta:
        model = Account
        fields = [
            "username",
            "email",
            "first_name",
            "last_name",
            "bio",
            "language",
            "country",
            "timezone",
        ]


class AccountEditSerializer(serializers.ModelSerializer):
    """
    Account edit serializer to update user's account information.
    """

    password = serializers.CharField(required=False, write_only=True)
    password2 = serializers.CharField(required=False, write_only=True)

    class Meta:
        model = User
        fields = ("password", "password2", "email", "first_name", "last_name")

    def validate(self, attrs):
        if User.objects.filter(email=attrs["email"]).exists():
            raise ValidationError("Email has already been used")

        if attrs["pasword"] and attrs["password2"]:
            if len(attrs["password"]) < 8:
                raise ValidationError("Password must be more than 8 characters")
            if attrs["password"] != attrs["password2"]:
                raise ValidationError("Password fields do not match")
        return attrs

    def update(self, instance, validated_data):
        if validated_data.get("password"):
            instance.set_password(validated_data.get("password"))

        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.email = validated_data.get("email", instance.email)
        instance.save()

        return instance
