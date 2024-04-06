from rest_framework import serializers

from .models import (
    Calendar,
    Invitation,
    InvitationAvailability,
    Meeting,
    OwnerAvailability,
)


class CalendarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calendar
        fields = "__all__"


class OwnerAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = OwnerAvailability
        fields = "__all__"


class InvitationAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = InvitationAvailability
        fields = "__all__"


class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = "__all__"


class InvitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invitation
        fields = "__all__"
