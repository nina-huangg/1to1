from django.urls import path

from .views import (
    CalendarListView,
    CalendarCreateView,
    CalendarDetailView,
    MeetingCreateView,
    MeetingListView,
    MeetingSuggestView,
    InviteRemindView,
    InviteResponseView,
    InviteListView,
    InviteAddView,
    InviteDetailView,
    MeetingDetailView,
    EmailTestView,
)

app_name = "calendars"

urlpatterns = [
    path("", CalendarListView.as_view(), name="calendar_list"),
    path("create/", CalendarCreateView.as_view(), name="calendar_create"),
    path("<int:calendar_id>/", CalendarDetailView.as_view(),
         name="calendar_details"),
    path("<int:calendar_id>/meetings/",
         MeetingListView.as_view(), name="meeting_list"),
    path(
        "<int:calendar_id>/meetings/create",
        MeetingCreateView.as_view(),
        name="meeting_create",
    ),
    path(
        "<int:calendar_id>/meetings/<int:meeting_id>/",
        MeetingDetailView.as_view(),
        name="meeting_detail",
    ),
    path(
        "<int:calendar_id>/meetings/<int:meeting_id>/meeting_suggest/",
        MeetingSuggestView.as_view(),
        name="meeting_suggest",
    ),
    path(
        "<int:calendar_id>/meetings/<int:meeting_id>/invites/",
        InviteListView.as_view(),
        name="contact_list",
    ),
    path(
        "<int:calendar_id>/meetings/<int:meeting_id>/invites/add/",
        InviteAddView.as_view(),
        name="contact_add",
    ),
    # TODO: UUID for invitees
    path(
        "<int:calendar_id>/meetings/<int:meeting_id>/invites/<int:invite_id>/",
        InviteDetailView.as_view(),
        name="invite_detail",
    ),
    path(
        "<int:calendar_id>/meetings/<int:meeting_id>/invites/remind/",
        InviteRemindView.as_view(),
        name="invite_remind",
    ),
    path(
        "<int:calendar_id>/meetings/<int:meeting_id>/invites/<int:invite_id>/response/",
        InviteResponseView.as_view(),
        name="invite_response",
    ),
]
