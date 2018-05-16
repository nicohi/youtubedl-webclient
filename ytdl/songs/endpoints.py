from django.conf.urls import include, url
from rest_framework import routers

from .api import SongViewSet

router = routers.DefaultRouter()
router.register('songs', SongViewSet)

urlpatterns = [
    url("^", include(router.urls)),
]
