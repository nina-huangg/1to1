from django.db import models
from django.contrib.auth.models import User


class Account(models.Model):
    """
    An account of a registered user. Any satillite data that is not
    in the built in Django user model should be put here.
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.CharField(max_length=200, null=True, blank=True)
    language = models.CharField(max_length=25, default="English")
    country = models.CharField(max_length=50, default="Canada")
    timezone = models.CharField(max_length=25, default="Eastern")
