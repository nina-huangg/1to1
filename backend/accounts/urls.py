from django.urls import path
from .views.register_view import RegisterView

app_name = 'accounts'

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    # path('login/', LoginView.as_view(), name='login'),
    # path('logout/', LogoutView.as_view(), name='logout'),
    # path('profile/view/', ProfileView.as_view(), name='profile_view'),
    # path('profile/edit/', ProfileEditView.as_view(), name='edit_view'),
]