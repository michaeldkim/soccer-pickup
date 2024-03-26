from django.urls import path
from .views import LeagueView
from rest_framework.routers import DefaultRouter

urlpatterns = [
    path('leagues', LeagueView.as_view())
]