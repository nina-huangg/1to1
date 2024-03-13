from django.urls import path

from .views import (
    AddContactView,
    CalendarDetailsView,
    CalendarsView,
    CreateCalendarView,
    CreateMeetingView,
)

app_name = "calendars"

urlpatterns = [
    path("", CalendarsView.as_view(), name="calendars"),
    path("create/", CreateCalendarView.as_view(), name="create_calendar"),
    path("calendar/<int:id>/", CalendarDetailsView.as_view(), name="calendar_details"),
    path(
        "<int:id>/meetings/create/", CreateMeetingView.as_view(), name="create_meeting"
    ),
    path("<int:id>/contacts/add/", AddContactView.as_view(), name="add_contact"),
]
