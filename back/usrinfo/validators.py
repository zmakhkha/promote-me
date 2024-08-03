from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
from rest_framework.validators import UniqueValidator

# User = get_user_model()

# unique_email_validator = UniqueValidator(queryset=User.objects.all(), message="This email is already in use.")
# unique_username_validator = UniqueValidator(queryset=User.objects.all(), message="This username is already in use.")

username_validator = RegexValidator(r'^[a-zA-Z0-9._]*$', 'The allowed characters are [a-z, A-Z, 0-9 and _]')
char_validator = RegexValidator(r'^[a-zA-Z]*$', 'Only alphabetical characters are allowed.')
email_validator = RegexValidator(
    r'^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-z]{2,}$',
    'Enter a valid email address.'
)

def max_size_validator(file):
    max_size_mb = 2
    if file.size > max_size_mb * 10**6:
        raise ValidationError(f"File can not be larger than {max_size_mb}MB!")
