from django.contrib import admin
from .models import League, Player, Team, Match
# Register your models here.

admin.site.register(League)
admin.site.register(Player)
admin.site.register(Team)
admin.site.register(Match)