from django.urls import path
from .views.profile_view import ProfileView
from .views.profile_edit import ProfileEditView

app_name = 'profile'

urlpatterns = [
    path('view/', ProfileView.as_view(), name='view'),
    path('edit/', ProfileEditView.as_view(), name='edit'),
]