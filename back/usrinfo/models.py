from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from .validators import max_size_validator
from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile
from io import BytesIO
from django.conf import settings

class Platform(models.Model):
    name = models.CharField(max_length=65,unique=True, null=False)
    slug = models.CharField(max_length=65, unique=True,  null=False)
    image_background = models.ImageField(
        upload_to='images',
        validators=[max_size_validator],
        default='images/default.png'
    )
    
    def __str__(self):
        return self.name

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
    gender = models.CharField(max_length=1, choices=GENRE_CHOICES)
    country = models.CharField(max_length=100, blank=True, null=True)
    dateOfBirth = models.DateField(blank=True, null=True)
    aboutMe = models.TextField(blank=True, null=True)
    score = models.IntegerField(default=0)
    image = models.ImageField(
        upload_to='images',
        validators=[max_size_validator],
        default='images/default.png'
    )
    tags = models.ManyToManyField('Tag', through='TagsPerUser')

    # Foreign key relationships to UserPlatform model
    platforms = models.ManyToManyField(Platform, through='UserPlatform', related_name='users')

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
    
    def update_score(self, amount):
        # Ensure that the score doesn't go below 0
        self.score = max(0, self.score + amount)
        self.save(update_fields=['score'])
    
    def follow(self, user_to_follow):
        """
        Follow another user.
        """
        if not self.is_following(user_to_follow):
            Follower.objects.create(follower=self, followed=user_to_follow)
            self.update_score(5)  # Increase score of the user following someone
            # user_to_follow.update_score(10)

    def unfollow(self, user_to_unfollow):
        """
        Unfollow a user.
        """
        Follower.objects.filter(follower=self, followed=user_to_unfollow).delete()
        self.update_score(-10)  # Increase score of the user following someone
        # user_to_unfollow.update_score(-10)

    def is_following(self, user):
        """
        Check if the current user is following the given user.
        """
        return Follower.objects.filter(follower=self, followed=user).exists()

    def followers(self):
        """
        Get all followers of the current user.
        """
        return AppUser.objects.filter(followed_user__followed=self)

    def following(self):
        """
        Get all users that the current user is following.
        """
        return AppUser.objects.filter(follower_user__follower=self)

class Tag(models.Model):
    tag = models.CharField(max_length=30, unique=True, blank=True)
    def __str__(self):
        return self.tag

class TagsPerUser(models.Model):
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.user}::{self.tag}"

class ProfileView(models.Model):
    viewer = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='viewer_user', on_delete=models.CASCADE)
    viewed = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='viewed_user', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.viewer.username} viewed {self.viewed.username}\'s profile'

class Follower(models.Model):
    follower = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='follower_user', on_delete=models.CASCADE)
    followed = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='followed_user', on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'{self.follower.username} followed {self.followed.username} on {self.date}'
    


class UserPlatform(models.Model):
    user = models.ForeignKey(AppUser, related_name='user_platforms', on_delete=models.CASCADE)
    platform = models.ForeignKey(Platform, related_name='user_platforms', on_delete=models.CASCADE)
    username = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.user.username} on {self.platform.name} as {self.username}'

