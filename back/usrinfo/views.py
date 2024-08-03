from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import AppUser, Tag, TagsPerUser
from .serializers import AppUserSerializer, TagSerializer, TagsPerUserSerializer

class TagViewSet(viewsets.ModelViewSet):
	queryset = Tag.objects.all()
	serializer_class = TagSerializer
	permission_classes = [IsAuthenticated]


class AppUserViewSet(viewsets.ModelViewSet):
	queryset = AppUser.objects.all()
	serializer_class = AppUserSerializer
	permission_classes = [IsAuthenticated]

	@action(detail=False, methods=['GET', 'PUT'])
	def setting(self, request):
		user = self.request.user
		if request.method == 'GET':
			serializer = AppUserSerializer(user)
			return Response(serializer.data)
	
		if request.method == 'PUT':
			serializer = AppUserSerializer(user, data=request.data, partial=True)
			serializer.is_valid(raise_exception=True)
			self.perform_update(serializer)
			return Response(serializer.data)

# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            response = Response({"detail": "Logged out successfully"}, status=status.HTTP_204_NO_CONTENT)
            response.delete_cookie('accessToken')
            response.delete_cookie('refreshToken')
            return response
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
