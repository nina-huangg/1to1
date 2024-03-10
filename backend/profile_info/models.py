from django.db import models
from django.contrib.auth.models import User

class Dashboard(models.Model):
    message = models.CharField(max_length=300, null=True, blank=True)
    language = models.CharField(max_length=25, default='English')
    country = models.CharField(max_length=50, default='Canada')
    timezone = models.CharField(max_length=25, default='Eastern')
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
