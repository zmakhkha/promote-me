from django.urls import path, include
from usrinfo.views import AppUserViewSet, TagViewSet, UserSettingsViewSet
from rest_framework import routers
from .auth import AuthViewSet
from .views import LogoutView, CheckAuthView, ProfileViewAPI, check_auth


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
    path('profile-view/', ProfileViewAPI.as_view(), name='profile-view'),
    # path('api/check-auth/', check_auth, name='check-auth'),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]