from rest_framework import serializers
from .models import (
    Calendar,
    Availability,
    Meeting,
    Invitation,
    SuggestedMeeting,
)


class CalendarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calendar
        fields = "__all__"


class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = "__all__"


class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = "__all__"


class InvitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invitation
        fields = "__all__"


class SuggestedMeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SuggestedMeeting
        fields = "__all__"


class AddContactToMeetingSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=True, write_only=True)

    class Meta:
        model = Contact
        fields = ("user", "id")

    def validate(self, attrs):
        err = {}
        id_value = attrs.get("id")
        user_value = attrs.get("user")

        if not id_value:
            err["id"] = ["Provide contact."]

        if not Contact.objects.filter(id=id_value, user=user_value).exists():
            err["id"] = ["This contact does not exist."]

        if err:
            raise serializers.ValidationError(err)

        return attrs
