from django.urls import path, include
from usrinfo.views import AppUserViewSet, TagViewSet, UserSettingsViewSet
from rest_framework import routers
from .auth import AuthViewSet
from .views import FollowUserView, LogoutView, CheckAuthView, ProfileViewAPI, TagsPerUserList, UnfollowUserView, check_auth, UserFollowingList


router = routers.DefaultRouter()
router.register(r'users', AppUserViewSet, basename='users')
router.register(r'settings', UserSettingsViewSet, basename='settings')
router.register(r'tags', TagViewSet, basename='tags')
router.register(r'genres', TagViewSet, basename='genres')
router.register(r'auth', AuthViewSet, basename='auth')

urlpatterns = [
    path('', include(router.urls)),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/check-auth/', CheckAuthView.as_view(), name='check-auth'),
    path('api/profile-view/', ProfileViewAPI.as_view(), name='profile-view'),
    path('api/follow/', FollowUserView.as_view(), name='follow-view'),
    path('api/unfollow/', UnfollowUserView.as_view(), name='unfollow-view'),
    path('api/following/', UserFollowingList.as_view(), name='following'),
    path('api/user-tags/', TagsPerUserList.as_view(), name='user-tags'),
]