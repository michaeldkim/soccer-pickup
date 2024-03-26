from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializers import LeagueSerializer
from ..models import League

# Create your views here.
class LeagueView(ModelViewSet):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer