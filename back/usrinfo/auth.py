from django.contrib.auth import authenticate, login, logout
from django.core.cache import cache
from django.forms import ValidationError
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView

from .serializers import UserSerializer


from .serializers import SignUpSerializer
from .models import AppUser

User = AppUser

class AuthViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class=SignUpSerializer
	permission_classes = [AllowAny]

	@action(detail=False, methods=['GET', 'PUT'])
	def signUp(self, request):
		permission_classes = [AllowAny]

		def post(self, request):
			serializer = SignUpSerializer(data=request.data)
			if serializer.is_valid():
				User.save()
				return Response({'status': 'Account created successfully'}, status=status.HTTP_201_CREATED)
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)