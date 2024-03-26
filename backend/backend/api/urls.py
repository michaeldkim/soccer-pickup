from rest_framework.routers import DefaultRouter
from posts.api.urls import league_router
from django.urls import path, include

router = DefaultRouter()

router.registry.extend(league_router.registry)

urlpatterns = [
    path('', include(router.urls))
]