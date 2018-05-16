from django.shortcuts import render

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def dl_url(request):
    #return Response({"test": 'abc'})
    print(request)
    return Response({"test": 'abc'})
