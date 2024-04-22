from django.urls import path
from . import views


urlpatterns = [
    path("leagues/", views.LeagueListCreate.as_view(), name="league-list"),
    path("leagues/<int:pk>/delete/", views.LeagueDelete.as_view(), name="delete-league"),
    path("leagues/<int:pk>/edit/", views.LeagueEdit.as_view(), name="edit-league"),
    
    path("teams/", views.TeamListCreate.as_view(), name="team-list"),
    path('teams/<int:pk>/edit/', views.TeamUpdate.as_view(), name='team-edit'),
    path('teams/<int:pk>/delete/', views.TeamDelete.as_view(), name='team-delete'),
    
    path('players/', views.PlayerListCreate.as_view(), name="player-list"),
    path('players/<int:pk>/edit/', views.PlayerUpdate.as_view(), name='player-edit'),
    path('players/<int:pk>/delete/', views.PlayerDelete.as_view(), name='player-delete'),
]