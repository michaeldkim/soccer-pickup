from django.contrib.auth.models import User
from rest_framework import serializers
from .models import League, LeagueUser

class LeagueUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeagueUser
        fields = ["id", "username", "password", "first_name", "Last_name", "gender"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        return LeagueUser

class LeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = ["id", "title", "content", "max_teams"]
        extra_kwargs = {"author": {"read_only": True}}
