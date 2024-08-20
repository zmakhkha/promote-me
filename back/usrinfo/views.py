from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import AppUser, Follower, Platform
from .serializers import FollowingSerializer, PlatformSerializer, PersonalInfoSerializer, SocialInfoSerializer
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
    serializer_class = TransformedUserSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = UserPagination

    def get_queryset(self):
        # Exclude superusers and the authenticated user
        queryset = AppUser.objects.exclude(
            is_superuser=True
        ).exclude(
            id=self.request.user.id
        )

        # Get the platform filter from the request
        platform_filter = self.request.query_params.get('platform', None)

        if platform_filter:
            queryset = queryset.filter(user_platforms__platform__slug=platform_filter)

        # Get the sort order from the request
        sort_order = self.request.query_params.get('ordering', '')

        # Apply sorting based on the sort order
        if sort_order == '-added':
            queryset = queryset.order_by('-date_joined')  # Assuming you have a `date_joined` field for "Date Added"
        elif sort_order == '-age':
            queryset = queryset.order_by('dateOfBirth')  # Order by age, if you have a specific field
        elif sort_order == '-score':
            queryset = queryset.order_by('-score')
        else:
            # Default sorting or "Relevance" (if you need a default ordering)
            queryset = queryset.order_by('id')  # Change this to your preferred default ordering

        return queryset

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

    
# @action(detail=False, methods=['GET', 'PUT'])
# def pInfoSettings(self, request):
#     user = self.request.user
#     if request.method == 'GET':
#         serializer = PersonalInfoSerializer(user)
#         return Response(serializer.data)
    
#     if request.method == 'PUT':
#         print("------+++---------")
#         print(request.data)
#         print("------+++---------")
#         serializer = PersonalInfoSerializer(user, data=request.data, partial=True)
#         if serializer.is_valid(raise_exception=True):
#             self.perform_update(serializer)
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
            print("------++-------")
            print(request.data)
            print("------++-------")
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
            return Response({"detail": "Profile view already recorded within the last hour."}, status=status.HTTP_200_OK)
        ProfileView.objects.create(viewer=viewer, viewed=viewed_user, timestamp=now)
        viewed_user.update_score(10)
        return Response({"detail": "Profile view recorded successfully."}, status=status.HTTP_201_CREATED)



class FollowUserView(APIView):

    def post(self, request, *args, **kwargs):
        user_to_follow_username = request.data.get('username')
        user_to_follow = AppUser.objects.get(username=user_to_follow_username)
        request.user.follow(user_to_follow)
        return Response({"detail": f"You are now following {user_to_follow.username}."}, status=status.HTTP_200_OK)

class UnfollowUserView(APIView):

    def post(self, request, *args, **kwargs):
        user_to_unfollow_username = request.data.get('username')
        user_to_unfollow = AppUser.objects.get(username=user_to_unfollow_username)
        request.user.unfollow(user_to_unfollow)
        return Response({"detail": f"You have unfollowed {user_to_unfollow.username}."}, status=status.HTTP_200_OK)

class UserFollowingList(APIView):
    def get(self, request):
        user = request.user
        following = Follower.objects.filter(follower=user)
        serializer = FollowingSerializer(following, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    


class TagsPerUserList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        tags = TagsPerUser.objects.filter(user=user).values_list('tag__tag', flat=True)
        tags_str = ' '.join(tags)
        return Response({"tags": tags_str})
