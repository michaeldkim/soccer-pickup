from django.contrib.auth.models import User
from rest_framework import serializers
from .models import League, LeagueUser, Team, Player

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['id', 'name']

class TeamSerializer(serializers.ModelSerializer):
    associated_league_id = serializers.PrimaryKeyRelatedField(queryset=League.objects.all(), source='associated_league', write_only=True)
    players = PlayerSerializer(many=True, required=False)

    class Meta:
        model = Team
        fields = ['id', 'name', 'wins', 'losses', 'ties', 'games_played', 'associated_league', 'players']

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
    participating_teams = TeamSerializer(many=True, required=False)

    class Meta:
        model = League
        fields = ['id', 'title', 'content', 'max_teams', 'location', 'game_day', 'game_time', 'league_start_date', 'participating_teams']
        extra_kwargs = {"author": {"read_only": True}}