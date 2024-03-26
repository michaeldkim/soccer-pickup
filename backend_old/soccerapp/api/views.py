from django.shortcuts import render
from rest_framework import generics
from .serializers import LeagueSerializer
from .models import League

# Create your views here.
class LeagueView(generics.ListAPIView):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer