from rest_framework import serializers
from .models import Calendar, Availability


class AvailabilitySerializer(serializers.ModelSerializer):

    preference = serializers.ChoiceField(
        choices=Availability.PREFERENCE_CHOICES, default=Availability.HIGH_PREFERENCE
    )

    class Meta:
        model = Availability
        fields = ("id", "date", "start_time", "end_time", "preference", "owner")


class CalendarSerializer(serializers.ModelSerializer):
    availability_set = AvailabilitySerializer(many=True, read_only=True)

    class Meta:
        model = Calendar
        fields = ("id", "name", "description", "availability_set")
        depth = 1
