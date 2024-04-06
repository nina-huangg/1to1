from django.db import models

from accounts.models import Account
from contacts.models import Contact

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
    calendar = models.ForeignKey(
        Calendar, on_delete=models.CASCADE, related_name="meetings"
    )
    start_time = models.DateTimeField(null=True)
    end_time = models.DateTimeField(null=True)
    duration = models.DurationField(null=False)
    last_modified = models.DateTimeField(auto_now=True)
    confirmed = models.BooleanField(default=False)


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

    # TODO: add validation to check if the contact is a contact of the owner of the meeting


class Availability(models.Model):
    """
    Abstract class for availability intervals.
    """

    class Preferences(models.TextChoices):
        HIGH = "high"
        MEDIUM = "mid"
        LOW = "low"

    preference = models.CharField(
        max_length=5, choices=Preferences, default=Preferences.MEDIUM
    )
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    class Meta:
        abstract = True


class InvitationAvailability(Availability):
    """
    Represents a single availability interval for a invited user.
    """

    invitation = models.ForeignKey(
        Invitation, on_delete=models.CASCADE, null=True)


class OwnerAvailability(Availability):
    """
    Represents a single availability interval of a owner of a meeting.
    """

    meeting = models.ForeignKey(Meeting, on_delete=models.CASCADE, null=True)
