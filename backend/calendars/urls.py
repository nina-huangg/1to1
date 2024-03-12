
from django.urls import path
from .views import BookedMeetingListView, BookedMeetingEditView, CreateCalendarView

app_name = 'calendars'

urlpatterns = [
    path('create/', CreateCalendarView.as_view(), name='create_calendar'),
    path('booked/meetings/all/', BookedMeetingListView.as_view(), name='list_booked_meetings'),
    path('booked/meeting/<int:meeting_id>/edit/', BookedMeetingEditView.as_view(), name='edit_booked_meeting')
]
