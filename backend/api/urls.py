from django.urls import path
from . import views


urlpatterns = [
    path("leagues/", views.LeagueListCreate.as_view(), name="league-list"),
    path("leagues/delete/<int:pk>/", views.LeagueDelete.as_view(), name="delete-league"),
    path("leagues/edit/<int:pk>/", views.LeagueEdit.as_view(), name="edit-league")
]