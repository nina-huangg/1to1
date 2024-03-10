from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Calendar(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=200, blank=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

class MockInvitation(models.Model):
    number = models.IntegerField()      
    
class BookedMeeting(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=200, blank=True)
    date = models.DateField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    last_modified = models.DateTimeField(auto_now_add=True)
    invitation = models.ForeignKey(MockInvitation, on_delete=models.CASCADE, related_name='invitations')
