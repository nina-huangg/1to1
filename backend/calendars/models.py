from django.db import models
from django.core.exceptions import ValidationError

from contacts.models import Contact
from accounts.models import Account

# Create your models here.


class Calendar(models.Model):
    """
    Represents a calendar for a user. Each user can have multiple calendars.
    Each calendar represents exactly one meeting. (perhaps extend this to multiple meetings in the future)
    """

    name = models.CharField(max_length=50)
    description = models.CharField(max_length=200, blank=True)
    owner = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name="owner", default=None
    )


class Meeting(models.Model):
    """
    Represents a scheduled meeting on a certain user calendar.
    """

    name = models.CharField(max_length=50)
    description = models.CharField(max_length=120)
    calendar = models.OneToOneField(
        Calendar, on_delete=models.CASCADE, related_name="meetings"
    )
    contacts = models.ManyToManyField(
        Contact, related_name="meetings", blank=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    duration = models.DurationField(null=True)
    last_modified = models.DateTimeField(auto_now=True)
    confirmed = models.BooleanField(default=False)

    def clean(self):
        self.duration = self.end_time - self.start_time


class Availability(models.Model):
    """
    Represents a single availability interval for a user or a contact.
    """

    HIGH_PREFERENCE = "high"
    MEDIUM_PREFERENCE = "medium"
    LOW_PREFERENCE = "low"
    PREFERENCE_CHOICES = [
        (HIGH_PREFERENCE, "High"),
        (MEDIUM_PREFERENCE, "Medium"),
        (LOW_PREFERENCE, "Low"),
    ]
    DEFAULT_PREFERENCE = MEDIUM_PREFERENCE
    preference = models.CharField(max_length=10, choices=PREFERENCE_CHOICES)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    owner = models.ForeignKey(
        Account,
        on_delete=models.CASCADE,
        related_name="owner_availabilities",
        null=True,
    )
    invitee = models.ForeignKey(
        Contact,
        on_delete=models.CASCADE,
        related_name="invitee_availabilities",
        null=True,
    )
    meeting = models.ForeignKey(
        Meeting,
        on_delete=models.CASCADE,
        related_name="all_availabilities",
        default=None,
    )

    def clean(self):
        super().clean()
        if self.owner is None and self.invitee is None:
            raise ValidationError(
                "Availability must either belong to owner or invitee")


class Invitation(models.Model):
    """
    Represents an invitation from a user to contact to a certain meeting.
    """

    invitee = models.ForeignKey(
        Contact, on_delete=models.CASCADE, related_name="invitee"
    )
    meeting = models.ForeignKey(
        Meeting, on_delete=models.CASCADE, related_name="meeting", default=None
    )
    confirmed = models.BooleanField(default=False)
