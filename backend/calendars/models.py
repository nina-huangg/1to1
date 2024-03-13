from django.contrib.auth.models import User
from django.db import models

from contacts.models import Contact

# Create your models here.

class Availability(models.Model):
    HIGH_PREFERENCE = "high"
    MEDIUM_PREFERENCE = "medium"
    LOW_PREFERENCE = "low"
    PREFERENCE_CHOICES = [
        (HIGH_PREFERENCE, "High"),
        (MEDIUM_PREFERENCE, "Medium"),
        (LOW_PREFERENCE, "Low"),
    ]
    DEFAULT_PREFERENCE = HIGH_PREFERENCE
    preference = models.CharField(max_length=10, choices=PREFERENCE_CHOICES)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_availabilities', null=True)
    invitee = models.ForeignKey('Invitation', on_delete=models.CASCADE, related_name='invited_availabilities', null=True)
    calendar = models.ForeignKey("Calendar", on_delete=models.CASCADE)
    

class Invitation(models.Model):
    invitee = models.ForeignKey(Contact, on_delete=models.CASCADE)
    meeting = models.ForeignKey("Meeting", on_delete=models.CASCADE)
    confirmed = models.BooleanField()
    


class Calendar(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=200, blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    contacts = models.ManyToManyField(
        Contact, related_name="calendars", blank=True)


class Meeting(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=120)
    calendar = models.ForeignKey(Calendar, on_delete=models.CASCADE)
    contacts = models.ManyToManyField(
        Contact, related_name="meetings", blank=True)
    duration = models.DurationField()
    last_modified = models.DateTimeField(auto_now=True)
    confirmed = models.BooleanField(default=False)
    start_time = models.TimeField()
    end_time = models.TimeField()
    date = models.DateField()

class BoundedTime(models.Model):
    DEFAULT_START_TIME = "09:00:00"
    DEFAULT_END_TIME = "17:00:00"
    duration = models.DurationField()
    start_time = models.TimeField(default=DEFAULT_START_TIME)
    end_time = models.TimeField(default=DEFAULT_END_TIME)
    start_date = models.DateField()
    end_date = models.DateField()


class SuggestedMeeting(models.Model):
    owner_availability_id = models.IntegerField()
    invitee_availability_id = models.IntegerField()
    invitee = models.ForeignKey(User, on_delete=models.CASCADE)
    start_time = models.TimeField()
    end_time = models.TimeField()
    date = models.DateField()
    owner_preference = models.CharField(max_length=10)
        

class SuggestedSchedule(models.Model):
    bounded_time = models.ForeignKey(BoundedTime, on_delete=models.CASCADE)
    suggested_meeting = models.ForeignKey(SuggestedMeeting, on_delete=models.CASCADE)
