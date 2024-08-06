from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from .validators import max_size_validator
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile
from io import BytesIO

class AppUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, email, password, **extra_fields)

class AppUser(AbstractBaseUser, PermissionsMixin):
    GENRE_FEMALE = 'F'
    GENRE_MALE = 'M'

    GENRE_CHOICES = [
        (GENRE_FEMALE, 'FEMALE'),
        (GENRE_MALE, 'MALE'),
    ]

    username = models.CharField(max_length=30, unique=True, blank=False)
    email = models.EmailField(unique=True, blank=False)
    firstName = models.CharField(max_length=30, blank=False)
    lastName = models.CharField(max_length=30, blank=False)
    snapUsername = models.CharField(max_length=255, blank=True, null=True)
    tiktokUsername = models.CharField(max_length=255, blank=True, null=True)
    instaUsername = models.CharField(max_length=255, blank=True, null=True)
    gender = models.CharField(max_length=1, choices=GENRE_CHOICES)
    country = models.CharField(max_length=100, blank=True, null=True)
    dateOfBirth = models.DateField(blank=True, null=True)
    image = models.ImageField(
        upload_to='images',
        validators=[max_size_validator],
        default='images/default.png'
    )

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'firstName', 'lastName']

    objects = AppUserManager()

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        if self.image:
            img = Image.open(self.image)
            width, height = img.size
            new_width = 600
            if width > new_width:
                new_height = int((new_width / width) * height)
                img = img.resize((new_width, new_height))

                buffer = BytesIO()
                img.save(buffer, format='JPEG')
                buffer.seek(0)

                self.image = InMemoryUploadedFile(
                    buffer, 'ImageField', self.image.name, 'image/jpeg', buffer.tell, None
                )
        super().save(*args, **kwargs)

class Tag(models.Model):
    tag = models.CharField(max_length=30, unique=True, blank=True)
    def __str__(self):
        return self.tag


class TagsPerUser(models.Model):
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
    def __str__(self):
        return F"{self.user}::{self.tag}"