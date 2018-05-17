import sys
from django.shortcuts import render

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import SongSerializer
from .api import SongViewSet

from .ytdlWrapper import dl_url as ytdl
from .mpdBridge import que_song

@api_view(['POST'])
def dl_url(request):
    try:
        dbdata = ytdl(request.data['url'], './test/')
        print(dbdata)
        serializer = SongSerializer(data=dbdata)
        if serializer.is_valid():
            print(serializer.save())
            if(sys.argv[-1] is 'mopidy'):
                que_song('localhost', 6600, 'file:///home/sakamoto/prog/projects/youtubedl-webclient/ytdl/test/' + dbdata['filename'])
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            #return Response({request.data['url']: 'DONE'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        #return Response({request.data['url']: 'ERROR'})
    except:
        print("ERROR IN URL")
        return Response("ERROR", status=status.HTTP_400_BAD_REQUEST)
        #return Response({request.data['url']: 'ERROR'})
#    dbdata = dl_url('https://www.youtube.com/watch?v=VYOjWnS4cMY', '/home/sakamoto/test/')
#        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #return Response({"test": 'abc'})
    #return Response({"msg": 'INVALID URL'})
