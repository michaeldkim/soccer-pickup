from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import generics
from .serializers import LeagueUserSerializer, LeagueSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import League

User = get_user_model()

class LeagueListCreate(generics.ListCreateAPIView):
    serializer_class = LeagueSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return League.objects.filter(author=user) # You can get notes only written by you and no one else
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class LeagueDelete(generics.DestroyAPIView):
    serializer_class = LeagueSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return League.objects.filter(author=user) # You can get notes only written by you and no one else

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = LeagueUserSerializer
    permission_classes = [AllowAny]