from django.conf.urls import include, url
from rest_framework import routers

from .api import SongViewSet
from .views import dl_url


router = routers.DefaultRouter()
router.register('songs', SongViewSet)

urlpatterns = [
    url("^", include(router.urls)),
    url("^dlsong", dl_url),
]
