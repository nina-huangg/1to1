from django.urls import path

from .views import (
    AddContactView,
    CalendarDetailsView,
    CalendarsListView,
    CreateCalendarView,
    InviteeResponseView,
    ChooseAvailabilityView,
    ContactDetailView,
    InvitesStatusView,
    InviteeRemindView,
    SuggestMeetingView,
    DeleteCalendarView
)

app_name = "calendars"

urlpatterns = [
    path("details/", CalendarsListView.as_view(), name="calendars"),
    path("create/", CreateCalendarView.as_view(), name="create_calendar"),
    path("delete/<int:pk>/", DeleteCalendarView.as_view(), name="delete_calendar"),
    path("calendar/<int:id>/", CalendarDetailsView.as_view(),
         name="calendar_details"),
    path("<int:id>/availability/select/",
         ChooseAvailabilityView.as_view(), name="choose_availability",),
    path("<int:id>/contacts/add/", AddContactView.as_view(), name="add_contact"),

#     path("calendar/<int:calendarId>/invite/<int:inviteId>/",
#          InviteeResponseView.as_view(), name="add_invitee",),

    path("<int:id>/contacts/", ContactDetailView.as_view(),
         name="view_contact_list"),
    path("<int:id>/meetings/invite/status/",
         InvitesStatusView.as_view(), name="view_invite_status",),
    path("<int:id>/meetings/invite/remind/",
         InviteeRemindView.as_view(), name="view_invite_remind",),
    path("<int:id>/meetings/suggest_schedules/",
         SuggestMeetingView.as_view(), name="suggest_meeting",),
     path("<int:id>/invite/<int:inviteId>/",
          InviteeResponseView.as_view(), name='invites')
]
