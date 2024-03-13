from rest_framework import serializers
from .models import Calendar, Availability, Invitation, Meeting, BlockedTime


class AvailabilitySerializer(serializers.ModelSerializer):

    preference = serializers.ChoiceField(
        choices=Availability.PREFERENCE_CHOICES,
        default=Availability.MEDIUM_PREFERENCE,
    )

    class Meta:
        model = Availability
        fields = ("id", "date", "start_time", "end_time", "preference", "invitation")


class CalendarSerializer(serializers.ModelSerializer):
    availability_set = AvailabilitySerializer(many=True, read_only=True)

    class Meta:
        model = Calendar
        fields = ("id", "name", "description", "availability_set")
        depth = 1


class InvitationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Invitation
        fields = (
            "id",
            "invitee",
            "confirmed",
        )


class MeetingSerializer(serializers.ModelSerializer):
    invitation_set = InvitationSerializer(many=True, read_only=True)

    class Meta:
        model = Meeting
        fields = (
            "id",
            "name",
            "description",
            "duration",
            "last_modified",
            "start_date",
            "end_date",
            "invitation_set",
        )


class BlockedTimeSerializer(serializers.ModelSerializer):

    class Meta:
        model = BlockedTime
        fields = ("id", "start_time", "end_time", "meeting")
