
from django.urls import path
from .views import CreateCalendarView, CalendarDetailsView, CreateMeetingView, CalendarsView

app_name = 'calendars'

urlpatterns = [
    path('', CalendarsView.as_view(), name='calendars'),
    path('create/', CreateCalendarView.as_view(), name='create_calendar'),
    path('calendar/<int:id>/', CalendarDetailsView.as_view(), name='calendar_details'),
    path('meetings/create/', CreateMeetingView.as_view(), name='create_meeting'),
]
