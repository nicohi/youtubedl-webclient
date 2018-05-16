from rest_framework import viewsets, permissions

from .models import Song
from .serializers import SongSerializer


class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = SongSerializer
