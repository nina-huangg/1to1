from rest_framework import serializers
from contacts.serializers.contact_serializer import ContactSerializer
from .models import Availability, Calendar, BoundedTime, Invitation, SuggestedMeeting
from .models import SuggestedSchedule
from contacts.models import Contact

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

class InvitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invitation
        fields = ('invitee', 'calendar')
        
class SuggestedMeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SuggestedMeeting
        fields = ('owner_availability_id', 'invitee_availability_id', 'invitee', 'start_time', 'end_time', 'date', 'owner_preference')
        
class AddContactSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=True, write_only=True)
    class Meta:
        model = Contact
        fields = ('user','id')
    
    def validate(self, attrs):
        err = {}
        id_value = attrs.get('id')
        user_value = attrs.get('user')

        if not id_value:
            err['id'] = ["Provide contact."]

        if not Contact.objects.filter(id=id_value, user=user_value).exists():
            err['id'] = ["This contact does not exist."]
            
        if err:
            raise serializers.ValidationError(err)

        return attrs