from django.urls import path
from .views.profile_view import ProfileView
from .views.profile_edit import ProfileEditView
from .views.dashboard_view import DashboardView
from .views.dashboard_edit import DashboardEditView

app_name = 'profile'

urlpatterns = [
    path('view/', ProfileView.as_view(), name='view'),
    path('edit/', ProfileEditView.as_view(), name='edit'),
    path('dashboard/view/', DashboardView.as_view(), name='dashboard_view'),
    path('dashboard/edit/', DashboardEditView.as_view(), name='dashboard_edit'),
]