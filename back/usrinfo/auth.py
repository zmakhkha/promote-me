from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import SignUpSerializer
from .models import AppUser

class AuthViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]
    queryset = AppUser.objects.all()

    @action(detail=False, methods=['post'])
    def signUp(self, request):
        print('--------')
        print(request.data)
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            return Response({
                'status': 'Account created successfully',
                'access': access_token,
                'refresh': refresh_token
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
