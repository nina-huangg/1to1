from rest_framework import serializers
from contacts.serializers.contact_serializer import ContactSerializer
from .models import Availability, Calendar


class AvailabilitySerializer(serializers.ModelSerializer):

    preference = serializers.ChoiceField(
        choices=Availability.PREFERENCE_CHOICES, default=Availability.HIGH_PREFERENCE
    )

    class Meta:
        model = Availability
        fields = ("id", "date", "start_time", "end_time", "preference", "owner")


class CalendarSerializer(serializers.ModelSerializer):
    availability_set = AvailabilitySerializer(many=True, read_only=True)
    contact_list = ContactSerializer(many=True, read_only=True)

    class Meta:
        model = Calendar
        fields = ("id", "name", "description", "availability_set", "contact_list")
        depth = 1
