from collections import OrderedDict
from datetime import timedelta

from django.contrib.auth.models import User
from django.core.exceptions import PermissionDenied
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import Account
from contacts.models import Contact
from contacts.serializers import ContactSerializer

from .models import Availability, Calendar, Invitation, Meeting
from .serializers import (
    CalendarSerializer,
    InvitationAvailabilitySerializer,
    OwnerAvailabilitySerializer,
    MeetingSerializer,
)

# TODO: make update and delete views for most of the endpoints


class CalendarListView(APIView):
    """
    View for retrieving details of available calendars.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Handles GET requests to retrieve details of all calendars belonging to logged in user.
        """
        user = User.objects.get(username=request.user.username)
        account = Account.objects.get(user=user)
        calendars = Calendar.objects.all().filter(owner=account)
        if not calendars:
            return Response({}, status=status.HTTP_200_OK)

        serializer = CalendarSerializer(calendars, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CalendarCreateView(APIView):
    """
    View for creating a new calendar.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        Handles POST requests to create a new calendar.

        Example body:
        {
            "calendar_data": {
                "name": "Calendar name",
                "description": "Calendar description"
            },
            "availability_data": {
                "availability": [
                    {
                        "start_time": "2023-08-17T08:20:28.438Z",
                        "end_time": "2023-08-17T08:22:28.438Z",
                        "preference": "mid"
                    },
                    {
                        "start_time": "2023-08-18T08:20:28.438Z",
                        "end_time": "2023-08-18T08:22:28.438Z",
                    },
                ]
            }
        }
        """
        calendar_serializer = CalendarSerializer(
            data=request.data.calendar_data)
        availablity_serializer = OwnerAvailabilitySerializer(
            data=request.data.availability_data
        )
        if availablity_serializer.is_valid():
            availablity_serializer.save()
        else:
            return Response(
                availablity_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )

        if calendar_serializer.is_valid():
            owner = Account.objects.get(user=request.user)
            calendar_serializer.save(owner=owner)
        else:
            return Response(
                calendar_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            {
                "calendar": calendar_serializer.data,
                "availability": availablity_serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )


class CalendarDetailView(APIView):
    """
    View for retrieving details of a calendar.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, calendar_id):
        """
        Handles GET requests to retrieve details of a specific calendar.
        """
        calendar = get_object_or_404(Calendar, id=calendar_id)
        if not calendar.owner == Account.objects.get(user=request.user):
            raise PermissionDenied()
        calendar_serializer = CalendarSerializer(calendar)
        return Response(calendar_serializer.data, status=200)


class MeetingListVIew(APIView):
    """
    View for retrieving details of a meetings for a calendar.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, calendar_id):
        """
        Handles GET requests to retrieve details of all calendars belonging to logged in user.
        """
        calendar = Calendar.objects.get(id=calendar_id)
        if not calendar.owner == Account.objects.get(user=request.user):
            raise PermissionDenied()
        meetings = Meeting.objects.all().filter(calendar=calendar)
        if not meetings:
            return Response({}, status=status.HTTP_200_OK)

        serializer = MeetingSerializer(calendars, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class MeetingCreateView(APIView):
    """
    View for creating a new calendar.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request, calendar_id):
        """
        Handles POST requests to create a new meeting.
        """
        calendar = get_object_or_404(Calendar, id=calendar_id)
        if not calendar.owner == Account.objects.get(user=request.user):
            raise PermissionDenied()
        data = OrderedDict()
        data.update(request.data)
        data["calendar"] = calendar_id
        serializer = MeetingSerializer(data=data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MeetingDetailView(APIView):
    """
    View for retrieving details of a meeting.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, calendar_id, meeting_id):
        """
        Handles GET requests to retrieve details of a specific calendar.
        """
        meeting = get_object_or_404(Meeting, id=meeting_id)
        if not meeting.calendar.owner == Account.objects.get(user=request.user):
            raise PermissionDenied()
        meeting_serializer = MeetingSerializer(meeting)
        return Response(meeting_serializer.data, status=200)


class MeetingSuggestView(APIView):
    """
    View for suggesting meeting.
    """

    # TODO: Test this

    def get(self, request, calendar_id, meeting_id):
        availabilities = Availability.objects.filter(calendar_id=calendar_id)
        suggested_times = self.suggest_meeting_times(availabilities)
        suggested_times_json = []
        min_duration = timedelta(minutes=60)
        if len(suggested_times) < 1:
            now = timezone.now()
            default_time = now + timedelta(days=7)
            default_time = default_time.replace(
                hour=15, minute=0, second=0, microsecond=0
            )
            default_date = default_time.date()
            default_start_time = default_time.time()
            default_end_time = (default_time + min_duration).time()

            return Response(
                {
                    "meeting_times": [
                        {
                            "date": default_date.strftime("%Y-%m-%d"),
                            "start_time": default_start_time.strftime("%H:%M:%S"),
                            "end_time": default_end_time.strftime("%H:%M:%S"),
                        }
                    ],
                    "perfect_match": False,
                },
                status=200,
            )

        for meeting_time in suggested_times:
            date, start_time, end_time = meeting_time
            suggested_times_json.append(
                {
                    "date": date.strftime("%Y-%m-%d"),
                    "start_time": start_time.strftime("%H:%M:%S"),
                    "end_time": end_time.strftime("%H:%M:%S"),
                }
            )

        return Response(
            {"meeting_times": suggested_times_json, "perfect_match": True}, status=200
        )


class InviteListView(APIView):
    """
    View for retrieving contact list of a calendar.
    """

    def get(self, request, calendar_id, meeting_id):
        """
        Handles GET requests to retrieve contact list of a specific calendar.
        """
        calendar = get_object_or_404(Calendar, id=calendar_id)
        meeting = get_object_or_404(Meeting, calendar=calendar)
        contact_list = meeting.contacts.all()
        contact_serializer = ContactSerializer(contact_list, many=True)
        return Response(contact_serializer.data, status=status.HTTP_200_OK)


class InviteAddView(APIView):
    """
    View for adding contacts to a calendar.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request, calendar_id, meeting_id):
        """
        Handles POST requests to add contacts to a calendar.
        id in the function represents the meeting id.
        Body of the request should include a list of contact id's.
        Example: {"contacts": [{"id": 1}, {"id": 2}]}
        """
        request_data = request.data
        contacts = request_data.get("contacts")

        if not contacts:
            return Response(
                {"error": "contacts is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        calendar = get_object_or_404(Calendar, id=calendar_id)
        if not calendar.owner == Account.objects.get(user=request.user):
            raise PermissionDenied()
        meeting = get_object_or_404(Meeting, calendar=calendar)

        for contact in contacts:
            contact_id = contact.get("id")
            contact = get_object_or_404(Contact, id=contact_id)
            if not contact.user == request.user:
                raise PermissionDenied()
            meeting.contacts.add(contact)

        return Response(meeting.contacts.all(), status=status.HTTP_200_OK)


class InviteDetailView(APIView):
    """ """

    permission_classes = [IsAuthenticated]

    def get(self, request, calendar_id, meeting_id, invite_id):
        invitation = get_object_or_404(Invitation, id=invite_id)

        availabilities = InvitationAvailability.objects.filter(
            invitation=invitation)
        available_times = [
            {"start_time": availability.start_time,
                "end_time": availability.end_time}
            for availability in availabilities
        ]

        return Response(
            {"availability": available_times, "confirmed": invitation.confirmed},
            status=status.HTTP_200_OK,
        )


class InviteRemindView(APIView):
    """
    Return all users which have not responded to the invitation for
    a certain meeting
    Methods: POST
    """

    permission_classes = [IsAuthenticated]

    def post(self, request, calendar_id, meeting_id):
        user = request.user
        calendar = get_object_or_404(Calendar, id=calendar_id)
        meeting = get_object_or_404(Meeting, id=meeting_id)
        invitation_set = Invitation.objects.filter(meeting=meeting)

        if not calendar.owner == Account.objects.get(user=user):
            raise PermissionDenied()
        inviter_email = calendar.owner.user.email

        emails = [
            invitation.invitee.email
            for invitation in invitation_set
            if not invitation.confirmed
        ]

        users_reminded = [
            {
                "first_name": invitation.invitee.first_name,
                "last_name": invitation.invitee.last_name,
            }
            for invitation in invitation_set
            if not invitation.confirmed
        ]
        for email in emails:
            send_mail(
                "Reminder: Invitation to Calendar Event",
                "You have an outstanding invitation to an event on the calendar.",
                f"{inviter_email}",
                [email],
                fail_silently=False,
            )

        return Response({"users_reminded": users_reminded}, status=status.HTTP_200_OK)


class InviteResponseView(APIView):
    """
    page where invitee with invite_id gets to respond

    POST: responds with availability (in similar format to calendars/<id>/meetings/create/)
    """

    def post(self, request, calendar_id, meeting_id, invite_id):
        """
        Handles POST requests to respond to an invite.

        example body:

        {availability_set: [
        {preference: "high", start_time: "2021-10-10T10:00:00Z",
            end_time: "2021-10-10T11:00:00Z"},
        {preference: "mid", start_time: "2021-11-10T10:00:00Z",
            end_time: "2021-11-10T11:00:00Z"},
        ]}
        """
        if "availability_set" not in request_data:
            return Response(
                {"error": "availability_set is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        user = request.user
        calendar = get_object_or_404(Calendar, id=calendar_id)
        meeting = get_object_or_404(Meeting, id=meeting_id)
        invitation = get_object_or_404(Invitation, id=invite_id)

        request_data = request.data
        availability_serializer = InvitationAvailabilitySerializer(
            data=request_data.get("availability_set"), many=True
        )
        if availability_serializer.is_valid():
            availability_serializer.save(invitiation=invitation)
            invitation.update(confirmed=True)
            return Response(availability_serializer.data, status=status.HTTP_200_OK)
        return Response(
            availability_serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )
