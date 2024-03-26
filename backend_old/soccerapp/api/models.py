from django.db import models
import string
import random

def generate_unique_code():
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if League.objects.filter(code=code).count() == 0:
            break
    return code

# Create your models here.
class League(models.Model):
    code = models.CharField(max_length=8, default="", unique=True )
    name = models.CharField(max_length=100)
    max_teams = models.IntegerField(default=8)

class Player(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)

class Team(models.Model):
    name = models.CharField(max_length=100)
    manager = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='manages_team')
    standing = models.IntegerField()
    num_wins = models.IntegerField()
    num_draws = models.IntegerField()
    num_loses = models.IntegerField()
    league = models.ForeignKey(League, on_delete=models.CASCADE)

class Match(models.Model):
    date = models.DateTimeField()
    home_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='home_matches')
    away_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='away_matches')
    home_score = models.IntegerField()
    away_score = models.IntegerField()
