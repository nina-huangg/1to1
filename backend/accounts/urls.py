from django.urls import path

from .views import (
    LoginView,
    LogoutView,
    AccountEditView,
    AccountView,
    RegisterView,
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)


app_name = "accounts"

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("profile/view/", AccountView.as_view(), name="profile_view"),
    path("profile/edit/", AccountEditView.as_view(), name="profile_edit"),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
]
