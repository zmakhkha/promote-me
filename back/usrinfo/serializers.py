# serializers.py
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import AppUser
from .validators import *
from .models import Tag, TagsPerUser, AppUser as User

unique_email_validator = UniqueValidator(queryset=User.objects.all(), message="This email is already in use.")
unique_username_validator = UniqueValidator(queryset=User.objects.all(), message="This username is already in use.")


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
        fields = ['id', 'username', 'email', 'firstName', 'lastName', 'snapUsername', 'kikUsername', 'instaUsername', 'gender', 'interests', 'country', 'dateOfBirth', 'image', 'tags']
    
    def update(self, instance, validated_data):
        # Handle tags
        tags = validated_data.pop('tags', [])
        if tags:
            # Remove existing tags
            TagsPerUser.objects.filter(user=instance).delete()

            # Add new tags
            for tag_name in tags:
                tag, created = Tag.objects.get_or_create(tag=tag_name)
                TagsPerUser.objects.create(user=instance, tag=tag)

        # Handle image and other fields
        image = validated_data.pop('image', None)
        instance.image = image if image else instance.image
        instance.snapUsername = validated_data.get('snapUsername', instance.snapUsername)
        instance.kikUsername = validated_data.get('kikUsername', instance.kikUsername)
        instance.instaUsername = validated_data.get('instaUsername', instance.instaUsername)
        
        instance.save()
        return instance
    
    def get_tags(self, obj):
        tags = TagsPerUser.objects.filter(user=obj)
        return TagSerializer(tags, many=True).data
    
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['tag']

class TagsPerUserSerializer(serializers.ModelSerializer):
    tag = TagSerializer()

    class Meta:
        model = TagsPerUser
        fields = ['id', 'user', 'tag']
