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
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    calendar = models.ForeignKey("Calendar", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.date} {self.start_time} - {self.end_time}"


class Calendar(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=200, blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    contacts = models.ManyToManyField(Contact, related_name="calendars", blank=True)


class BoundedTime(models.Model):
    DEFAULT_START_TIME = "09:00:00"
    DEFAULT_END_TIME = "17:00:00"

    start_time = models.TimeField(default=DEFAULT_START_TIME)
    end_time = models.TimeField(default=DEFAULT_END_TIME)
    calendar = models.ForeignKey(Calendar, on_delete=models.CASCADE)


class SuggestedSchedule(models.Model):
    bounded_time = models.ForeignKey(BoundedTime, on_delete=models.CASCADE)
    bounded_time = models.ForeignKey(BoundedTime, on_delete=models.CASCADE)
    bounded_time = models.ForeignKey(BoundedTime, on_delete=models.CASCADE)
