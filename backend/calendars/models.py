from django.db import models
from django.contrib.auth.models import User


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
    invitation = models.ForeignKey("Invitation", on_delete=models.CASCADE)


class Calendar(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=200, blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)


class Meeting(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=200, blank=True)
    calendar = models.ForeignKey(Calendar, on_delete=models.CASCADE)
    duration = models.DurationField()
    last_modified = models.DateTimeField(auto_now=True)
    start_date = models.DateField()
    end_date = models.DateField()


class BlockedTime(models.Model):
    start_time = models.TimeField()
    end_time = models.TimeField()
    meeting = models.ForeignKey(Meeting, on_delete=models.CASCADE)


class Invitation(models.Model):
    meeting = models.ForeignKey(Meeting, on_delete=models.CASCADE)
    invitee = models.ForeignKey(User, on_delete=models.CASCADE)
    confirmed = models.BooleanField()
