from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework import status
from django.db.models import Q
from django.db.models import F
from .serializers import *
from .models import *

class ViewSet(viewsets.ModelViewSet):
	queryset = AppUser.objects.all()
	serializer_class = UserInfoSerializer
	permission_classes = [IsAuthenticated]
 
	@action(detail=False, methods=['GET', 'PUT'])
	def setting(self, request):
		player = self.request.user
		if request.method == 'GET':
			serializer = SettingsSerializer(player)
			return Response(serializer.data)
		if request.method == 'PUT':
			serialized_player = self.get_serializer(player, data=request.data)
			serialized_player.is_valid(raise_exception=True)
			self.perform_update(serialized_player)
			return Response(serialized_player.data)