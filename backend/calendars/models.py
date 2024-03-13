from django.db import models
from rest_framework import serializers
from django.contrib.auth.models import User
from contacts.serializers.contact_serializer import ContactSerializer
from contacts.models import Contact

# Create your models here.
class Availability(models.Model):
    HIGH_PREFERENCE = 'high'
    MEDIUM_PREFERENCE = 'medium'
    LOW_PREFERENCE = 'low'
    PREFERENCE_CHOICES = [
        (HIGH_PREFERENCE, 'High'),
        (MEDIUM_PREFERENCE, 'Medium'),
        (LOW_PREFERENCE, 'Low'),
    ]
    DEFAULT_PREFERENCE = HIGH_PREFERENCE
    preference = models.CharField(max_length=10, choices=PREFERENCE_CHOICES)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    calendar = models.ForeignKey('Calendar', on_delete=models.CASCADE)


# class Invitation(models.Model):
#     number = models.IntegerField()     

class Calendar(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=200, blank=True)
    # owner = models.ForeignKey(User, on_delete=models.CASCADE)
    contacts = models.ManyToManyField(Contact, related_name='calendars', blank=True)
    # invitation = models.ForeignKey(Invitation, on_delete=models.CASCADE, related_name='invitations')


class Contact(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    
       
class AvailabilitySerializer(serializers.ModelSerializer):
    
    preference = serializers.ChoiceField(choices=Availability.PREFERENCE_CHOICES, default=Availability.HIGH_PREFERENCE)

    class Meta:
        model = Availability
        fields = ('id', 'date', 'start_time', 'end_time', 'preference', 'owner')

class CalendarSerializer(serializers.ModelSerializer):
    availability_set = AvailabilitySerializer(many=True, read_only=True)
    contact_list = ContactSerializer(many=True, read_only=True)

    class Meta:
        model = Calendar
        fields = ('id', 'name', 'description', 'availability_set', 'contact_list')
        depth = 1