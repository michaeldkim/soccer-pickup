from django.contrib.auth.models import User
from rest_framework import serializers
from .models import League

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class LeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = ["id", "title", "content", "max_teams"]
        extra_kwargs = {"author": {"read_only": True}}
