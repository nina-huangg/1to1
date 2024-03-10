
from django.urls import path
from .views import BookedMeetingListView, BookedMeetingEditView

urlpatterns = [
    path('calendars/booked/meetings/all/', BookedMeetingListView.as_view(), name='list_booked_meetings'),
    path('calendars/booked/meeting/<int:meeting_id>/edit/', BookedMeetingEditView.as_view(), name='edit_booked_meeting')
]