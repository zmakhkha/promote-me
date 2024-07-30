from django.apps import apps
from django.contrib.auth.validators import ASCIIUsernameValidator
from django.conf import settings
from django.core.validators import RegexValidator
from rest_framework.validators import UniqueValidator

from .models import AppUser


User = AppUser

unique_email_validator = UniqueValidator(queryset=User.objects.all(), message="This email is already in use.")
unique_username_validator = UniqueValidator(queryset=User.objects.all(), message="This username is already in use.")

username_validator = RegexValidator(r'^[a-zA-Z0-9._]*$', 'The allowed characters are [a-z, A-Z, 0-9 and _]')
char_validator = RegexValidator(r'^[a-zA-Z]*$', 'Only alphabetical characters are allowed.')
email_validator = RegexValidator(
    r'^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-z]{2,}$',
    'Enter a valid email address.'
)