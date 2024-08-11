from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

urlpatterns = [
    path("", lambda request: JsonResponse({"message": "Hello There"})),
    path("admin/", admin.site.urls),
    path("api/auth/", include("authentication.urls")),
]
