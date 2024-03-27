from django.urls import path
from . import views


urlpatterns = [
    path("leagues/", views.LeagueListCreate.as_view(), name="league-list"),
    path("leagues/delete/<int:pk>/", views.LeagueDelete.as_view(), name="delete-league")
]