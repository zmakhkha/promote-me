# serializers.py
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import AppUser, UserPlatform
from .validators import *
from .models import Tag, Platform, Follower, ProfileView, Platform, TagsPerUser, AppUser as User
# import datetime
from datetime import datetime
unique_email_validator = UniqueValidator(queryset=User.objects.all(), message="This email is already in use.")
unique_username_validator = UniqueValidator(queryset=User.objects.all(), message="This username is already in use.")

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'tag']
class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = ['id', 'name', 'image_background']

class UserPlatformSerializer(serializers.ModelSerializer):
    platform = PlatformSerializer()
    
    class Meta:
        model = UserPlatform
        fields = ['platform', 'username']

class SignUpSerializer(serializers.ModelSerializer):
    firstName = serializers.CharField(required=True, validators=[char_validator])
    lastName = serializers.CharField(required=True, validators=[char_validator])
    email = serializers.EmailField(required=True, validators=[unique_email_validator])
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    username = serializers.CharField(required=True, validators=[unique_username_validator, username_validator])
    dateOfBirth = serializers.DateField(required=True)  

    class Meta:
        model = AppUser
        fields = ['firstName', 'lastName', 'username', 'email', 'password', 'password2', 'dateOfBirth']
    
    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password2": "Password fields didn't match."})
        return data
    
    def create(self, validated_data):
        validated_data.pop('password2')
        user = AppUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            firstName=validated_data['firstName'],
            lastName=validated_data['lastName'],
            dateOfBirth=validated_data['dateOfBirth']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class AppUserSerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()
    platforms = UserPlatformSerializer(many=True)

    class Meta:
        model = AppUser
        fields = ['id', 'username', 'email', 'firstName', 'lastName', 'snapUsername', 'tiktokUsername', 'instaUsername', 'gender', 'country', 'dateOfBirth', 'image', 'tags', 'platforms']
    
    def update(self, instance, validated_data):
        # Handle tags
        tags = validated_data.pop('tags', [])
        if tags:
            TagsPerUser.objects.filter(user=instance).delete()
            for tag_name in tags:
                tag, created = Tag.objects.get_or_create(tag=tag_name)
                TagsPerUser.objects.create(user=instance, tag=tag)

        # Handle platforms
        platforms_data = validated_data.pop('platforms', [])
        UserPlatform.objects.filter(user=instance).delete()
        for platform_data in platforms_data:
            platform = platform_data['platform']
            username = platform_data['username']
            platform_instance, created = Platform.objects.get_or_create(**platform)
            UserPlatform.objects.create(user=instance, platform=platform_instance, username=username)

        # Handle image and other fields
        image = validated_data.pop('image', None)
        instance.image = image if image else instance.image
        instance.snapUsername = validated_data.get('snapUsername', instance.snapUsername)
        instance.tiktokUsername = validated_data.get('tiktokUsername', instance.tiktokUsername)
        instance.instaUsername = validated_data.get('instaUsername', instance.instaUsername)
        
        instance.save()
        return instance

    def get_tags(self, obj):
        tags = TagsPerUser.objects.filter(user=obj)
        return TagSerializer(tags, many=True).data
    

class TagsPerUserSerializer(serializers.ModelSerializer):
    tag = TagSerializer()

    class Meta:
        model = TagsPerUser
        fields = ['id', 'user', 'tag']




class PlatformSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    slug = serializers.CharField()
    username = serializers.CharField()

class TransformedUserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    gender = serializers.CharField()
    location = serializers.CharField(source='country')
    background_image = serializers.ImageField(source='image')
    parent_platforms = serializers.SerializerMethodField()
    age = serializers.SerializerMethodField()
    rating_top = serializers.IntegerField(default=18)

    class Meta:
        model = AppUser
        fields = ['id', 'username', 'name', 'gender', 'location', 'background_image', 'parent_platforms', 'age', 'rating_top']

    def get_name(self, obj):
        return f"{obj.firstName} {obj.lastName}"

    def get_parent_platforms(self, obj):
        user_platforms = UserPlatform.objects.filter(user=obj)
        platforms = []
        for user_platform in user_platforms:
            platform = user_platform.platform
            platforms.append({
                'platform': {
                    'id': platform.id,  # Ensure you have an id or use a dummy value
                    'name': platform.name,
                    'slug': platform.slug,
                    'username': user_platform.username
                }
            })
        return platforms

    def get_age(self, obj):
        if obj.dateOfBirth:
            today = datetime.today()
            age = today.year - obj.dateOfBirth.year - ((today.month, today.day) < (obj.dateOfBirth.month, obj.dateOfBirth.day))
            return age
        return 0


class CustomPlatformSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    slug = serializers.CharField()
    username = serializers.CharField()

    class Meta:
        model = Platform
        fields = ['id', 'name', 'slug', 'username']
        
from rest_framework import serializers
from .models import AppUser, Tag, TagsPerUser



from rest_framework import serializers
from .models import AppUser, Tag, TagsPerUser


class PersonalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ['firstName', 'lastName', 'image', 'country', 'interests', 'aboutMe']

    interests = serializers.CharField(write_only=True)

    def update(self, instance, validated_data):
        instance.firstName = validated_data.get('firstName', instance.firstName)
        instance.lastName = validated_data.get('lastName', instance.lastName)
        instance.country = validated_data.get('country', instance.country)
        instance.aboutMe = validated_data.get('aboutMe', instance.aboutMe)

        if 'image' in validated_data:
            instance.image = validated_data['image']

        if 'interests' in validated_data:
            interests = validated_data['interests'].split()
            instance.tags.clear()
            for tag_name in interests:
                tag, created = Tag.objects.get_or_create(tag=tag_name)
                TagsPerUser.objects.create(user=instance, tag=tag)

        instance.save()
        return instance


class SocialInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ['snapchat', 'tiktok', 'instagram']

    def update(self, instance, validated_data):
        instance.snapchat = validated_data.get('snapchat', instance.snapchat)
        instance.tiktok = validated_data.get('tiktok', instance.tiktok)
        instance.instagram = validated_data.get('instagram', instance.instagram)

        instance.save()
        return instance

class NavBarSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ['image']

class ProfileSerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()
    image = serializers.ImageField(required=False)
    age = serializers.SerializerMethodField()
    follower_count = serializers.SerializerMethodField()
    view_count = serializers.SerializerMethodField()

    class Meta:
        model = AppUser
        fields = [
            'image', 'username', 'firstName', 'lastName', 'age', 'country', 'instagram', 'tiktok',
            'snapchat', 'score', 'follower_count', 'view_count', 'tags', 'aboutMe',
        ]

    def get_tags(self, obj):
        tags_per_user = TagsPerUser.objects.filter(user=obj)
        return TagSerializer([tpu.tag for tpu in tags_per_user], many=True).data

    def get_age(self, obj):
        if obj.dateOfBirth:
            today = datetime.today()
            age = today.year - obj.dateOfBirth.year - ((today.month, today.day) < (obj.dateOfBirth.month, obj.dateOfBirth.day))
            return age
        return None

    def get_follower_count(self, obj):
        return Follower.objects.filter(followed=obj).count()

    def get_view_count(self, obj):
        return ProfileView.objects.filter(viewed=obj).count()
    
