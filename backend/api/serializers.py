from django.contrib.auth.models import User
from rest_framework import serializers
from .models import League, LeagueUser, Team, Player

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['id', 'name']

class TeamSerializer(serializers.ModelSerializer):
    players = PlayerSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'wins', 'losses', 'ties', 'games_played', 'players']

class LeagueUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeagueUser
        fields = ["id", "email", "password", "first_name", "last_name", "gender"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = LeagueUser.objects.create_user(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            gender=validated_data['gender'],
            password=validated_data['password']
        )
        return user

class LeagueSerializer(serializers.ModelSerializer):
    teams = TeamSerializer(many=True, read_only=True)

    class Meta:
        model = League
        fields = ['id', 'title', 'content', 'max_teams', 'location', 'game_day', 'game_time', 'league_start_date', 'teams']
        extra_kwargs = {"author": {"read_only": True}}