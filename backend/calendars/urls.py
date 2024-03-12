
from django.urls import path
from .views import CreateCalendarView, CalendarDetailsView, CreateMeetingView

app_name = 'calendars'

urlpatterns = [
    path('create/', CreateCalendarView.as_view(), name='create_calendar'),
    path('calendar/<str:name>/', CalendarDetailsView.as_view(), name='calendar_details'),
    path('meetings/', CreateMeetingView.as_view(), name='create_meeting'),
    # path('booked/meetings/all/', BookedMeetingListView.as_view(), name='list_booked_meetings'),
    # path('booked/meeting/<int:meeting_id>/edit/', BookedMeetingEditView.as_view(), name='edit_booked_meeting')
]
