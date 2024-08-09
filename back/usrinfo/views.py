from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import AppUser, Platform
from .serializers import PlatformSerializer, PersonalInfoSerializer, SocialInfoSerializer
from rest_framework.views import APIView

from .models import AppUser, Tag, TagsPerUser
from .serializers import AppUserSerializer, TagSerializer, TransformedUserSerializer, PersonalInfoSerializer, NavBarSerializer,ProfileSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.utils import timezone
from datetime import timedelta
from .models import AppUser, ProfileView


class TagViewSet(viewsets.ModelViewSet):
	queryset = Tag.objects.all()
	serializer_class = TagSerializer
	permission_classes = [IsAuthenticated]


class PlatformViewSet(viewsets.ModelViewSet):
	queryset = Platform.objects.all()
	serializer_class = PlatformSerializer
	permission_classes = [IsAuthenticated]

class UserPagination(PageNumberPagination):
    page_size = 8  # Number of users per page
    page_size_query_param = 'page_size'
    max_page_size = 100


class AppUserViewSet(viewsets.ModelViewSet):
	queryset = AppUser.objects.all()
	serializer_class = TransformedUserSerializer
	permission_classes = [IsAuthenticated]
	pagination_class = UserPagination

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
        if serializer.is_valid(raise_exception=True):
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
			serializer = SocialInfoSerializer(user)
			return Response(serializer.data)
	
		if request.method == 'PUT':
			print(request.data)
			serializer = SocialInfoSerializer(user, data=request.data, partial=True)
			serializer.is_valid(raise_exception=True)
			self.perform_update(serializer)
			return Response(serializer.data)


class ProfileViewAPI(APIView):
    def post(self, request):
        viewer = request.user
        username = request.data.get('username')
        
        if not username:
            return Response({"detail": "Username is required."}, status=status.HTTP_400_BAD_REQUEST)
        viewed_user = get_object_or_404(AppUser, username=username)
        if viewer == viewed_user:
            return Response({"detail": "You are viewing your own profile."}, status=status.HTTP_200_OK)
        now = timezone.now()
        last_view = ProfileView.objects.filter(viewer=viewer, viewed=viewed_user).order_by('-timestamp').first()
        if last_view and now - last_view.timestamp < timedelta(hours=1):
            return Response({"detail": "Profile view already recorded within the last hour."}, status=status.HTTP_400_BAD_REQUEST)
        ProfileView.objects.create(viewer=viewer, viewed=viewed_user, timestamp=now)
        return Response({"detail": "Profile view recorded successfully."}, status=status.HTTP_201_CREATED)