from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class AppUserManager(BaseUserManager):
	def create_user(self, username=None, email=None, password=None, **extra_fields):
		if not email:
			raise ValueError('The Email field must be set')
		email = self.normalize_email(email)
		user = self.model(username=username, email=email, **extra_fields)
		user.set_password(password)
		user.save(using=self._db)
		return user

	def create_superuser(self, username=None, email=None, password=None, **extra_fields):
		extra_fields.setdefault('is_staff', True)
		extra_fields.setdefault('is_superuser', True)

		if extra_fields.get('is_staff') is not True:
			raise ValueError('Superuser must have is_staff=True.')
		if extra_fields.get('is_superuser') is not True:
			raise ValueError('Superuser must have is_superuser=True.')

		return self.create_user(username, email, password, **extra_fields)

	


class AppUser(AbstractBaseUser):
	GENRE_FEMALE = 'F'
	MGENRE_MALE = 'M'

	GENRE_CHOICES = [
		(GENRE_FEMALE, 'FEMALE'),
		(MGENRE_MALE, 'MALE'),
	]
	username = models.CharField(max_length=30, unique=True, blank=False)
	email = models.EmailField(unique=True, blank=False)
	location = models.CharField(blank=True, null=True, max_length=255)
	snap_username = models.CharField(max_length=255, blank=True, null=True)
	kik_username = models.CharField(max_length=255, blank=True, null=True)
	insta_username = models.CharField(max_length=255, blank=True, null=True)
	genre =  models.CharField( max_length=1, choices=GENRE_CHOICES)
	interests = models.TextField(blank=True)

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['username', 'password1', 'password2']

	objects = AppUserManager()

	def __str__(self):
		return self.username
