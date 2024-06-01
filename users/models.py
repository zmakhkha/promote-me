from django.db import models
from django.contrib.auth.models import AbstractUser

class myUser(AbstractUser):
    email = models.EmailField(unique=True)
    age = models.IntegerField()
    location = models.CharField(max_length=255)
    snap_username = models.CharField(max_length=255, blank=True, null=True)
    kik_username = models.CharField(max_length=255, blank=True, null=True)
    facebook_username = models.CharField(max_length=255, blank=True, null=True)
    insta_username = models.CharField(max_length=255, blank=True, null=True)
    tweeter_username = models.CharField(max_length=255, blank=True, null=True)
    interests = models.TextField() 

    def __str__(self):
        return self.username