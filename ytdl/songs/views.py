import sys
from django.shortcuts import render

from ytdlbackend.settings import BASE_DIR, MPD, MPD_HOST, MPD_PORT

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import SongSerializer
from .api import SongViewSet

from .ytdlWrapper import dl_url as ytdl
from .mpdBridge import queue_song

@api_view(['POST'])
def dl_url(request):
    try:
        dbdata = ytdl(request.data['url'], BASE_DIR + '/test/')
        print(dbdata)
        serializer = SongSerializer(data=dbdata)
        if serializer.is_valid():
            print(serializer.save())
            #if(sys.argv[-1] is 'mopidy'):
            filepath = 'file://' + BASE_DIR + '/test/' + dbdata['filename']
            if (MPD == 'True'):
                print('attempting to queue ' + filepath)
                queue_song(filepath, MPD_HOST, MPD_PORT)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except:
        print("ERROR IN URL")
        return Response("ERROR", status=status.HTTP_400_BAD_REQUEST)
        #return Response({request.data['url']: 'ERROR'})
#    dbdata = dl_url('https://www.youtube.com/watch?v=VYOjWnS4cMY', '/home/sakamoto/test/')
#        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #return Response({"test": 'abc'})
    #return Response({"msg": 'INVALID URL'})

@api_view(['POST'])
def mpd_queue(request):
    try:
        if (MPD == 'True'):
            filepath = 'file://' + BASE_DIR + '/test/' + request['filename']
            print('attempting to dl ' + filepath)
            queue_song(filepath, MPD_HOST, MPD_PORT)
            return Response("QUEUED", status=status.HTTP_201_CREATED)
        else:
            return Response("NOT QUEUED (MPD SET TO False)", status=status.HTTP_201_CREATED)
    except:
        return Response("BAD REQUEST: " + request, status=status.HTTP_400_BAD_REQUEST)
