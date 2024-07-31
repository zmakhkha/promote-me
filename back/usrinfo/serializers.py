# serializers.py
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import AppUser
from .validators import *

class SettingsSerializer(serializers.ModelSerializer):
    firstName = serializers.CharField( validators=[char_validator])
    lastName = serializers.CharField( validators=[char_validator])
    email = serializers.EmailField(read_only=True)
    username = serializers.CharField( validators=[unique_username_validator, username_validator])
    country = serializers.CharField()  # Add country field
    dateOfBirth = serializers.DateField()  # Add dateOfBirth field
    iamge = serializers.ImageField(validators=[max_size_validator])


    class Meta:
        model = AppUser
        fields = ['username', 'image', 'firstName', 'lastName', 'email', 'snapUsername','kikUsername','instaUsername', 'country', 'dateOfBirth']
    
    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password2": "Password fields didn't match."})
        return data
    
#     def create(self, validated_data):
#         validated_data.pop('password2')
#         user = AppUser.objects.create(
#             username=validated_data['username'],
#             email=validated_data['email'],
#             firstName=validated_data['firstName'],
#             lastName=validated_data['lastName'],
#             country=validated_data['country'],
#             snapUsername=validated_data['snapUsername'],
#             kikUsername=validated_data['kikUsername'],
#             instaUsername=validated_data['instaUsername'],
#             date_of_birth=validated_data['dateOfBirth']
#         )
#         user.set_password(validated_data['password'])
#         user.save()
#         return user
class SignUpSerializer(serializers.ModelSerializer):
    firstName = serializers.CharField(required=True, validators=[char_validator])
    lastName = serializers.CharField(required=True, validators=[char_validator])
    email = serializers.EmailField(required=True, validators=[unique_email_validator])
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    username = serializers.CharField(required=True, validators=[unique_username_validator, username_validator])
    # country = serializers.CharField(required=True)  # Add country field
    dateOfBirth = serializers.DateField(required=True)  # Add dateOfBirth field
    


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
            # country=validated_data['country'],
            # snapUsername=validated_data['snapUsername'],
            # kikUsername=validated_data['kikUsername'],
            # instaUsername=validated_data['instaUsername'],
            date_of_birth=validated_data['dateOfBirth']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserInfoSerializer(serializers.ModelSerializer):
      class Meta:
        model = AppUser
        fields = ['firstName', 'lastName', 'username', 'email',  'dateOfBirth']
