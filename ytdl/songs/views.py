from django.shortcuts import render

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import SongSerializer
from .api import SongViewSet

from .ytdlWrapper import dl_url as ytdl

@api_view(['POST'])
def dl_url(request):
    try:
        dbdata = ytdl(request.data['url'], './test/')
        print(dbdata)
        serializer = SongSerializer(data=dbdata)
        if serializer.is_valid():
            print(serializer.save())
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            #return Response({request.data['url']: 'DONE'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        #return Response({request.data['url']: 'ERROR'})
    except:
        print("ERROR IN URL")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        #return Response({request.data['url']: 'ERROR'})
#    dbdata = dl_url('https://www.youtube.com/watch?v=VYOjWnS4cMY', '/home/sakamoto/test/')
#        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #return Response({"test": 'abc'})
    #return Response({"msg": 'INVALID URL'})
