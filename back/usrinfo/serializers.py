from django.contrib.auth.password_validation import validate_password
from rest_framework import  serializers
from .models import AppUser
from .validators import *
from django.conf import settings

user = settings.AUTH_USER_MODEL

class UserSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = AppUser
		fields = ['url', 'username', 'email']

class SignUpSerializer(serializers.ModelSerializer):
	email = serializers.EmailField( required=True, validators=[unique_email_validator])
	password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
	password2 = serializers.CharField(write_only=True, required=True)
	username = serializers.CharField(required=True, validators=[unique_username_validator, username_validator])
	class Meta:
		model = AppUser
		fields = ['username', 'email', 'password', 'password2']
	def validate(self, data):
		if data['password'] != data['password2']:
			raise serializers.ValidationError({"password2": "Password fields didn't match."})
		return data
	def create(self, validated_data):
		validated_data.pop('password2')
		user = User.objects.create(
			username=validated_data['username'],
			email=validated_data['email']
		)
		user.set_password(validated_data['password'])
		user.save()
		return user