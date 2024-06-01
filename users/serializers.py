from rest_framework import serializers
from .models import myUser

class myUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = myUser
		fields = ['username', 'email', 'age', 'location', 'snap_username', 'kik_username', 'facebook_username', 'insta_username', 'tweeter_username', 'interests']

