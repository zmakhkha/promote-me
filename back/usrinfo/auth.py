from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import SignUpSerializer
from .models import AppUser

from core.utils import getLogging
from django.contrib.auth import authenticate, login, logout

from django.core.cache import cache


logger = getLogging()

class AuthViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]
    queryset = AppUser.objects.all()

    @action(detail=False, methods=['post'])
    def signIn(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password:
            return Response({'error': 'email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        cache_key = f"login_attempts_{email}"
        attempts = cache.get(cache_key, 0)
        
        if attempts >= 5:
            return Response({'error': 'Too many login attempts. Please try again later.'}, status=status.HTTP_429_TOO_MANY_REQUESTS)
        
        user = authenticate(request, email=email, password=password)
        
        if user is not None:
            cache.delete(cache_key)
            refresh = RefreshToken.for_user(user)
            login(request, user)
            logger.info(f"[AuthViewSet::signIn] User {email} logged in successfully")
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        else:
            cache.set(cache_key, attempts + 1, timeout=300)  
            logger.critical(f"[AuthViewSet::signIn] Invalid login attempt for email {email}")
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=False, methods=['post'])
    def signUp(self, request):
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            referrer_username = request.data.get('reffer')
            user = serializer.save()



            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)
            if referrer_username:
                try:
                    referrer_user = AppUser.objects.get(username=referrer_username)
                    user.apply_referral(referrer_user)
                except:
                    return Response({
                        'status': 'Account created successfully | Referrer username does not exist.',
                        'access': access_token,
                        'refresh': refresh_token
                                     },
                     status=status.HTTP_201_CREATED)

            return Response({
                'status': 'Account created successfully',
                'access': access_token,
                'refresh': refresh_token
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
