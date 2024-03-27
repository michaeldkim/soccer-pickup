from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class League(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    max_teams = models.IntegerField(default=8)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="league")

    def __str__(self):
        return self.title