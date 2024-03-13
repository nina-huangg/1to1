from django.urls import path

from .views import (
    AddContactView,
    CalendarDetailsView,
    CalendarsView,
    CreateCalendarView,
    ChooseAvailabilityView,
    ContactDetailView
)

app_name = "calendars"

urlpatterns = [
    path("", CalendarsView.as_view(), name="calendars"),
    path("create/", CreateCalendarView.as_view(), name="create_calendar"),
    path("calendar/<int:id>/", CalendarDetailsView.as_view(), name="calendar_details"),   
    path(
        "<int:id>/availability/select/", ChooseAvailabilityView.as_view(), name="choose_availability"
    ),
    path("<int:id>/contacts/add/", AddContactView.as_view(), name="add_contact"),
    path("<int:id>/contacts/", ContactDetailView.as_view(), name="view_contact_list"),
]


    # path(
    #     "<int:id>/meetings/create/", CreateMeetingView.as_view(), name="choose_availability"
    # ),