from rest_framework.serializers import ModelSerializer
from ..models import League, Player, Team, Match

class LeagueSerializer(ModelSerializer):
    class Meta:
        model = League
        fields = '__all__'  # Or list specific fields like ['id', 'name', 'code']

class PlayerSerializer(ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'  # Adjust the fields as per your model

class TeamSerializer(ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'  # Adjust the fields as per your model

class MatchSerializer(ModelSerializer):
    class Meta:
        model = Match
        fields = '__all__'  # Adjust the fields as per your model
