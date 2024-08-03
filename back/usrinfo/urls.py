from django.urls import path, include
from usrinfo.views import AppUserViewSet, TagViewSet
from rest_framework import routers
from .auth import AuthViewSet
from .views import LogoutView


router = routers.DefaultRouter()
router.register(r'users', AppUserViewSet, basename='users')
router.register(r'tags', TagViewSet, basename='tags')
router.register(r'auth', AuthViewSet, basename='auth')

urlpatterns = [
    path('', include(router.urls)),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]