from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet
from .auth_views import SignInAPIView, SignUpAPIView

router = DefaultRouter()
router.register('users', UserViewSet, basename = 'users')
urlpatterns = [
    path('', include(router.urls)),
    	path('sign-in/', SignInAPIView.as_view(), name='sign_in'),
    path('sign-up/', SignUpAPIView.as_view(), name='sign_up'),
    ]