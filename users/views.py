from django.shortcuts import render

from rest_framework import viewsets

from .models import myUser
from .serializers import myUserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = myUser.objects.all()
    serializer_class = myUserSerializer
    # permission_classes = [permissions.IsAuthenticated]