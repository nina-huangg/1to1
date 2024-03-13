from rest_framework import serializers
from contacts.serializers.contact_serializer import ContactSerializer
from .models import Availability, Calendar, BoundedTime
from .models import SuggestedSchedule


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


class BoundedTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BoundedTime
        fields = ['id', 'duration', 'start_time', 'end_time', 'start_date', 'end_date']
        
class SuggestedScheduleSerializer(serializers.ModelSerializer):
    availability_set = AvailabilitySerializer(many=True, read_only=True)

    class Meta:
        model = SuggestedSchedule
        fields = ['bounded_time', 'availability_set']
