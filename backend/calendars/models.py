from django.db import models
from rest_framework import serializers
from django.contrib.auth.models import User

# Create your models here.
class Availability(models.Model):
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    # owner = models.ForeignKey(User, on_delete=models.CASCADE)
    calendar = models.ForeignKey('Calendar', on_delete=models.CASCADE)

class Invitation(models.Model):
    number = models.IntegerField()      
    
class Calendar(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=200, blank=True)
    # owner = models.ForeignKey(User, on_delete=models.CASCADE)
    # invitation = models.ForeignKey(Invitation, on_delete=models.CASCADE, related_name='invitations')

class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = ('id', 'date', 'start_time', 'end_time')

class CalendarSerializer(serializers.ModelSerializer):
    availability_set = AvailabilitySerializer(many=True, read_only=True)

    class Meta:
        model = Calendar
        fields = ('id', 'name', 'description', 'availability_set')
        depth = 1


# class InvitationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Invitation
#         fields = ('id', 'number')



class BookedMeeting(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=200, blank=True)
    date = models.DateField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    last_modified = models.DateTimeField(auto_now_add=True)

