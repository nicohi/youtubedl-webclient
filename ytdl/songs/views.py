from django.shortcuts import render

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import SongSerializer
#from .api import SongViewSet
from .ytdlWrapper import dl_url

@api_view(['POST'])
def dl_url(request):
    try:
        dbdata = dl_url(request.data['url'], './test/')
        serializer = SongSerializer(data=dbdata)
        if serializer.is_valid():
            serializer.save()
            return Response({request.data['url']: 'DONE'})
            #return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        #return Response({request.data['url']: 'ERROR'})
    except:
        print("ERROR IN URL")
        return Response({request.data['url']: 'ERROR'})
        #return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #return Response({"test": 'abc'})
    #return Response({"msg": 'INVALID URL'})
