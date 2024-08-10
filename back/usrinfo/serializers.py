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
    platform = serializers.CharField(source='platform.name')  # Use the correct attribute here

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

    class Meta:
        model = AppUser
        fields = ['id', 'username', 'email', 'firstName', 'lastName', 'gender', 'country', 'dateOfBirth', 'image', 'tags']
    
    def update(self, instance, validated_data):
        # Handle tags
        tags = validated_data.pop('tags', [])
        if tags:
            TagsPerUser.objects.filter(user=instance).delete()
            for tag_name in tags:
                tag, created = Tag.objects.get_or_create(tag=tag_name)
                TagsPerUser.objects.create(user=instance, tag=tag)

        # Handle image and other fields
        image = validated_data.pop('image', None)
        instance.image = image if image else instance.image
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


from rest_framework import serializers
from .models import AppUser, Tag, TagsPerUser
from django.db import transaction

from django.db import transaction
from django.db import transaction

class PersonalInfoSerializer(serializers.ModelSerializer):
    interests = serializers.CharField(write_only=True, required=False)
    interests_display = serializers.SerializerMethodField()

    class Meta:
        model = AppUser
        fields = ['firstName', 'lastName', 'image', 'country', 'interests', 'aboutMe', 'interests_display']

    def get_interests_display(self, obj):
        tags = TagsPerUser.objects.filter(user=obj).values_list('tag__tag', flat=True)
        return ' '.join(tags)

    @transaction.atomic
    def update(self, instance, validated_data):
        instance.firstName = validated_data.get('firstName', instance.firstName)
        instance.lastName = validated_data.get('lastName', instance.lastName)
        instance.country = validated_data.get('country', instance.country)
        instance.aboutMe = validated_data.get('aboutMe', instance.aboutMe)

        if 'image' in validated_data:
            instance.image = validated_data['image']

        if 'interests' in validated_data:
            interests = validated_data['interests'].split()
              # Clear existing tags that are not in the updated interests
            TagsPerUser.objects.filter(user=instance).exclude(tag__tag__in=interests).delete()

            # Create or get tags and associate them with the user
            for tag_name in interests:
                tag, _ = Tag.objects.get_or_create(tag=tag_name)
                TagsPerUser.objects.get_or_create(user=instance, tag=tag)

        instance.save()
        return instance







from rest_framework import serializers
from .models import AppUser, UserPlatform, Platform
class SocialInfoSerializer(serializers.Serializer):
    snapchat = serializers.CharField(max_length=255, required=False, allow_blank=True)
    tiktok = serializers.CharField(max_length=255, required=False, allow_blank=True)
    instagram = serializers.CharField(max_length=255, required=False, allow_blank=True)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        platforms = ['Snapchat', 'Tiktok', 'Instagram']
        for platform_name in platforms:
            try:
                platform = Platform.objects.get(name=platform_name)
                user_platform = UserPlatform.objects.get(user=instance, platform=platform)
                representation[platform_name.lower()] = user_platform.username
            except (Platform.DoesNotExist, UserPlatform.DoesNotExist):
                # print("makinach ------|")
                representation[platform_name.lower()] = ''
        return representation

    def update(self, instance, validated_data):
        platform_usernames = {
            'Snapchat': validated_data.get('snapchat'),
            'Tiktok': validated_data.get('tiktok'),
            'Instagram': validated_data.get('instagram'),
        }

        for platform_name, new_username in platform_usernames.items():
            if new_username:
                platform, created = Platform.objects.get_or_create(name=platform_name)
                user_platform, created = UserPlatform.objects.get_or_create(
                    user=instance, platform=platform,
                    defaults={'username': new_username}
                )
                if not created:
                    user_platform.username = new_username
                    user_platform.save()

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
    instagram = serializers.SerializerMethodField()
    snapchat = serializers.SerializerMethodField()
    tiktok = serializers.SerializerMethodField()

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

    def get_platform_username(self, obj, platform_name):
        try:
            platform = Platform.objects.get(slug=platform_name)
            user_platform = UserPlatform.objects.get(user=obj, platform=platform)
            # print("++++++++++", user_platform.username)
            return user_platform.username
        except Platform.DoesNotExist as e:
            print(f"Platform.DoesNotExist: {e}")
            return None
        except UserPlatform.DoesNotExist as e:
            print(f"UserPlatform.DoesNotExist: {e}")
            return None

    def get_instagram(self, obj):
        print("Calling get_instagram")
        return self.get_platform_username(obj, 'instagram')

    def get_snapchat(self, obj):
        print("Calling get_snapchat")
        return self.get_platform_username(obj, 'snapchat')

    def get_tiktok(self, obj):
        print("Calling get_tiktok")
        return self.get_platform_username(obj, 'tiktok')
