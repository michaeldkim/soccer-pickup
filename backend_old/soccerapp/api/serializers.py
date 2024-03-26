from rest_framework import serializers
from .models import League, Player, Team, Match  # Import your models here

class LeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = '__all__'  # Or list specific fields like ['id', 'name', 'code']

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'  # Adjust the fields as per your model

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'  # Adjust the fields as per your model

class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = '__all__'  # Adjust the fields as per your model
