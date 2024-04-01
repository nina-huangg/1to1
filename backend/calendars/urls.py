from django.urls import path

from .views import (
    CalendarsView,
    CalendarCreateView,
    CalendarDetailsView,
    ContactAddView,
    MeetingContactsView,
    InviteStatusView,
    InviteRemindView,
    InviteResponseView,
    AvailabilitySelectView,
    SuggestMeetingView,
)

app_name = "calendars"

urlpatterns = [
    path("", CalendarsView.as_view(), name="calendar_list"),
    path("create/", CalendarCreateView.as_view(), name="calendar_create"),
    path("calendar/<int:id>/", CalendarDetailsView.as_view(), name="calendar_details"),
    path("<int:id>/contacts/add/", ContactAddView.as_view(), name="contact_add"),
    path("<int:id>/contacts/", MeetingContactsView.as_view(), name="contact_list"),
    path(
        "<int:id>/meetings/invite/status/",
        InviteStatusView.as_view(),
        name="invite_status",
    ),
    path(
        "<int:id>/meetings/invite/remind/",
        InviteRemindView.as_view(),
        name="invite_remind",
    ),
    path(
        "<int:id>/meetings/invite/<int:invite_id>/",
        InviteResponseView.as_view(),
        name="invitee_add",
    ),
    path(
        "<int:id>/availability/select/",
        AvailabilitySelectView.as_view(),
        name="availability_select",
    ),
    path(
        "<int:id>/meetings/suggest_meeting/",
        SuggestMeetingView.as_view(),
        name="suggest_meeting",
    ),
]
