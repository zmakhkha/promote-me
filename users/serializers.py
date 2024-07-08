from rest_framework import serializers
from .models import myUser
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator

class myUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = myUser
		fields = ['username', 'email', 'location', 'snap_username', 'kik_username', 'facebook_username', 'insta_username', 'tweeter_username', 'interests']
		email = serializers.EmailField(
			required=True,
			validators=[UniqueValidator(queryset=myUser.objects.all())]
		)
		password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
		password2 = serializers.CharField(write_only=True, required=True)
