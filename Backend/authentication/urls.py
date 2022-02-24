from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from authentication import views as user_views

urlpatterns = [
    path("register/", user_views.RegisterUserView.as_view(), name="users_register"),
    path("login/", user_views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
