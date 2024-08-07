from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import AppUser
from .serializers import PersonalInfoSerializer, SociallInfoSerializer
from rest_framework.views import APIView

from .models import AppUser, Tag, TagsPerUser
from .serializers import AppUserSerializer, TagSerializer, TransformedUserSerializer, PersonalInfoSerializer, NavBarSerializer,ProfileSerializer

class TagViewSet(viewsets.ModelViewSet):
	queryset = Tag.objects.all()
	serializer_class = TagSerializer
	permission_classes = [IsAuthenticated]


class AppUserViewSet(viewsets.ModelViewSet):
	queryset = AppUser.objects.all()
	serializer_class = TransformedUserSerializer
	permission_classes = [IsAuthenticated]

	@action(detail=False, methods=['GET'])
	def me(self, request):
		user = self.request.user
		if request.method == 'GET':
			serializer = AppUserSerializer(user)
			return Response(serializer.data)
	
	@action(detail=False, methods=['GET'])
	def navInfo(self, request):
		user = self.request.user
		if request.method == 'GET':
			serializer = NavBarSerializer(user)
			return Response(serializer.data)
	@action(detail=False, methods=['GET'])
	def profileInfo(self, request):
		username = request.query_params.get('username')
		if username:
			try:
				user = AppUser.objects.get(username=username)
				serializer = ProfileSerializer(user)
				return Response(serializer.data)
			except AppUser.DoesNotExist:
				return Response({"detail": "User not found"}, status=404)
		else:
			user = self.request.user
			serializer = ProfileSerializer(user)
			return Response(serializer.data)

	
	@action(detail=False, methods=['GET', 'PUT'])
	def pInfoSettings(self, request):
		user = self.request.user
		if request.method == 'GET':
			serializer = PersonalInfoSerializer(user)
			return Response(serializer.data)
	
		if request.method == 'PUT':
			serializer = PersonalInfoSerializer(user, data=request.data, partial=True)
			serializer.is_valid(raise_exception=True)
			self.perform_update(serializer)
			return Response(serializer.data)

class LogoutView(APIView):
	permission_classes = [AllowAny]

	def post(self, request):
		try:
			response = Response({"detail": "Logged out successfully"}, status=status.HTTP_204_NO_CONTENT)
			response.delete_cookie('accessToken')
			response.delete_cookie('refreshToken')
			return response
		except Exception as e:
			return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CheckAuthView(APIView):
	permission_classes = [IsAuthenticated]

	def get(self, request):
		return Response({"detail": "Authenticated"}, status=200)

@api_view(['GET'])
def check_auth(request):
	if request.user and request.user.is_authenticated:
		return Response({'status': 'Authenticated'})
	else:
		return Response({'status': 'Unauthenticated'}, status=401)
	





class UserSettingsViewSet(viewsets.ModelViewSet):
	queryset = AppUser.objects.all()
	serializer_class = PersonalInfoSerializer
	permission_classes = [IsAuthenticated]
	@action(detail=False, methods=['GET', 'PUT'])
	def personalInfo(self, request):
		user = self.request.user
		if request.method == 'GET':
			serializer = PersonalInfoSerializer(user)
			return Response(serializer.data)
	
		if request.method == 'PUT':
			serializer = PersonalInfoSerializer(user, data=request.data, partial=True)
			serializer.is_valid(raise_exception=True)
			self.perform_update(serializer)
			return Response(serializer.data)
	@action(detail=False, methods=['GET', 'PUT'])
	def sociallInfo(self, request):
		user = self.request.user
		if request.method == 'GET':
			serializer = SociallInfoSerializer(user)
			return Response(serializer.data)
	
		if request.method == 'PUT':
			serializer = SociallInfoSerializer(user, data=request.data, partial=True)
			serializer.is_valid(raise_exception=True)
			self.perform_update(serializer)
			return Response(serializer.data)
