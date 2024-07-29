from rest_framework import viewsets
from .models import AppUser
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = AppUser.objects.all()
    serializer_class = UserSerializer