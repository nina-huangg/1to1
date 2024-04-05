from rest_framework import serializers

from .models import Contact


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        id = serializers.IntegerField(read_only=True)
        fields = ["id", "first_name", "last_name", "email", "phone_number"]

    def validate(self, attrs):
        # TODO: make sure different accounts can add contacts with the same information
        existing_contact = Contact.objects.filter(
            first_name=attrs.get("first_name"),
            last_name=attrs.get("last_name"),
            email=attrs.get("email"),
        ).exists()

        if existing_contact:
            raise serializers.ValidationError(
                "A contact with the same information already exists"
            )

        return attrs
