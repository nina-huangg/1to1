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
