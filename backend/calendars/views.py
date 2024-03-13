from django.http import JsonResponse
from django.views import View
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from contacts.serializers.contact_serializer import ContactSerializer
from .models import Calendar, Availability, SuggestedSchedule, Invitation, BoundedTime
from .serializers import (
    AvailabilitySerializer,
    CalendarSerializer,
    BoundedTimeSerializer,
    SuggestedMeetingSerializer,
)
from intervals import DateTimeInterval
import datetime
from django.contrib.auth.models import User
import time
from django.db.models import Q
from datetime import timedelta
from django.utils import timezone
from contacts.models import Contact



class CalendarsView(View):
    """
    View for retrieving details of all calendars.
    """

    def get(self, request):
        """
        Handles GET requests to retrieve details of all calendars.
        """
        calendars = Calendar.objects.all().values("name", "description")

        if not calendars:
            return JsonResponse({}, status=200)

        return JsonResponse(list(calendars), status=200, safe=False)


class CreateCalendarView(APIView):
    """
    View for creating a new calendar.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        Handles POST requests to create a new calendar.
        """
        name = request.data.get("name")
        description = request.data.get("description")
        user = request.user

        try:
            if not name:
                return JsonResponse({"error": "Name is required"}, status=400)
            calendar = Calendar.objects.create(
                name=name, description=description, owner=user
            )
            return JsonResponse(
                {
                    "id": calendar.id,
                    "name": calendar.name,
                    "description": calendar.description,
                },
                status=200,
            )

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)


class CalendarDetailsView(View):
    """
    View for retrieving details of a calendar.
    """

    def get(self, request, id):
        """
        Handles GET requests to retrieve details of a specific calendar.
        """
        try:
            calendar = Calendar.objects.get(id=id)

            calendar_serializer = CalendarSerializer(calendar)
            return JsonResponse(calendar_serializer.data, status=200, safe=False)
        except Calendar.DoesNotExist:
            return JsonResponse({"error": "Calendar not found"}, status=404)


class ChooseAvailabilityView(APIView):
    """
    View for creating a meeting.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request, id=None):
        """
        Handles POST requests to create a meeting.
        """
        request_data = request.data

        if id is None:
            return JsonResponse({"error": "calendar_id is required"}, status=400)

        if "availability_set" not in request_data:
            return JsonResponse({"error": "availability_set is required"}, status=400)

        availability_data = request_data["availability_set"]

        try:
            calendar = Calendar.objects.get(id=id)
        except Calendar.DoesNotExist:
            return JsonResponse({"error": "Calendar not found"}, status=404)

        user = request.user

        availability_data_with_owner = []
        for availability in availability_data:
            # Ensure availability's owner is set to the authenticated user's ID
            availability["owner"] = user.id
            availability_data_with_owner.append(availability)

        availability_serializer = AvailabilitySerializer(
            data=availability_data_with_owner, many=True
        )

        if availability_serializer.is_valid():
            # Save the availability slots associated with the calendar
            availability_serializer.save(calendar=calendar)
            return JsonResponse(availability_serializer.data, status=200, safe=False)
        else:
            return JsonResponse(availability_serializer.errors, status=400)


class AddContactView(APIView):
    """
    View for adding contacts to a calendar.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request, id=None):
        """
        Handles POST requests to add contacts to a calendar.
        """
        request_data = request.data

        if id is None:
            return JsonResponse({"error": "calendar_id is required"}, status=400)

        if "contacts" not in request_data:
            return JsonResponse({"error": "contacts is required"}, status=400)

        try:
            calendar = Calendar.objects.get(id=id)
        except Calendar.DoesNotExist:
            return JsonResponse({"error": "Calendar not found"}, status=404)

        contacts_data = request_data["contacts"]
        user = request.user

        deserialized_contacts = []

        for contact_data in contacts_data:

            data = contact_data
            data["user"] = user.id

            serializer = AddContactSerializer(data=data)
            if serializer.is_valid():
                instance_with_attributes = serializer.validated_data
 
                id_value = instance_with_attributes['id']
                user_value = instance_with_attributes['user']
                contact = Contact.objects.get(id=id_value, user=user_value)
                deserialized_contacts.append(contact)
            else:
                return JsonResponse(serializer.errors, status=400)

        calendar.contacts.add(*deserialized_contacts)

        # Serialize the added contacts
        added_contacts_serializer = ContactSerializer(
            deserialized_contacts, many=True)

        return JsonResponse(added_contacts_serializer.data, status=200, safe=False)


class ContactDetailView(APIView):
    """
    View for retrieving contact list of a calendar.
    """

    def get(self, request, id):
        """
        Handles GET requests to retrieve contact list of a specific calendar.
        """
        try:
            calendar = Calendar.objects.get(id=id)
            contact_list = calendar.contacts.all()
            contact_serializer = ContactSerializer(contact_list, many=True)
            return JsonResponse(contact_serializer.data, status=200, safe=False)
        except Calendar.DoesNotExist:
            return JsonResponse({"error": "Calendar not found"}, status=404)


class InviteeResponseView(APIView):
    """
    page where invitee with invite-id  gets to respond

    GET: gets the page and the times that the user is available, and shows the user ID that is inviting
    POST: responds with availability (in similar format to calendars/<id>/meetings/create/)

    """

    def get(self, request, id, invite_id):
        """
        Handles GET requests to retrieve invitee responses.
        """
        try:
            calendar = Calendar.objects.get(id=id)
            availabilities = Availability.objects.filter(calendar_id=id)
            availability_list = []
            for availability in availabilities:
                availability_list.append(
                    f"{availability.date}: {
                        availability.start_time}-{availability.end_time}"
                )

            invitee_response = {
                "inviter": calendar.owner.id,
                "availability_set": availability_list,
            }
            return JsonResponse(invitee_response, status=200, safe=False)
        except Calendar.DoesNotExist:
            return JsonResponse({"error": "Calendar not found"}, status=404)

    def post(self, request, id, invite_id):
        """
        Handles POST requests to respond to an invite.
        """
        user = request.user
        request_data = request.data
        if id is None:
            return JsonResponse({"error": "calendar_id is required"}, status=400)
        if "availability_set" not in request_data:
            return JsonResponse({"error": "availability_set is required"}, status=400)
        availability_data = request_data["availability_set"]
        try:
            calendar = Calendar.objects.get(id=id)
        except Calendar.DoesNotExist:
            return JsonResponse({"error": "Calendar not found"}, status=404)
        availability_data_with_owner = []
        for availability in availability_data:
            availability["owner"] = user.id
            availability_data_with_owner.append(availability)
        availability_serializer = AvailabilitySerializer(
            data=availability_data_with_owner, many=True
        )
        if availability_serializer.is_valid():
            availability_serializer.save(calendar=calendar)
            return JsonResponse(availability_serializer.data, status=200, safe=False)
        else:
            return JsonResponse(availability_serializer.errors, status=400)


class InvitesStatusView(APIView):
    """
    Describe: page where user gets to see who has responded and who hasn’t
    GET
    Methods: GET
    Field/Payload: meeting_name

    """

    def get(self, request, id):
        calendar = Calendar.objects.get(id=id)
        if calendar is None:
            return JsonResponse({"error": "calenar with id does not exist"}, status=400)
        calendar_invitations = Invitation.objects.filter(calendar=calendar)
        responsed = []
        not_responsed = []
        for invitation in calendar_invitations:
            if invitation.confirmed:
                responsed.append(
                    {
                        "first_name": invitation.invitee.first_name,
                        "last_name": invitation.invitee.last_name,
                    }
                )
            else:
                not_responsed.append(
                    {
                        "first_name": invitation.invitee.first_name,
                        "last_name": invitation.invitee.last_name,
                    }
                )
        return JsonResponse(
            {"responsed": responsed, "not_responsed": not_responsed}, status=200
        )


class InviteeRemindView(APIView):
    """
    Describe: remind users who have not responded
    Methods: POST
    """

    def post(self, request, id):
        calendar = Calendar.objects.get(id=id)
        if calendar is None:
            return JsonResponse({"error": "calenar with id does not exist"}, status=400)
        calendar_invitations = Invitation.objects.filter(calendar=calendar)
        users_reminded = []
        for invitation in calendar_invitations:
            if invitation.confirmed:
                pass
            else:
                # TODO: Send emails
                users_reminded.append(
                    {
                        "first_name": invitation.invitee.first_name,
                        "last_name": invitation.invitee.last_name,
                    }
                )
                pass
        return JsonResponse({"users_reminded": users_reminded}, status=200)


class SuggestMeetingView(APIView):
    """
    View for suggesting meeting.
    """

    def get(self, request, id):
        if id is None:
            return JsonResponse({"error": "calendar_id is required"}, status=400)
        ava = Availability.objects.filter(calendar_id=id)
        suggested_times = self.suggest_meeting_times(ava)
        suggested_times_json = []
        min_duration = timedelta(minutes=60)
        if len(suggested_times) < 1:
            now = timezone.now()
            default_time = now + timedelta(days=7)
            default_time = default_time.replace(
                hour=15, minute=0, second=0, microsecond=0)
            default_date = default_time.date()
            default_start_time = default_time.time()
            default_end_time = (default_time + min_duration).time()

            return JsonResponse({
                'meeting_times': [{
                    'date': default_date.strftime('%Y-%m-%d'),
                    'start_time': default_start_time.strftime('%H:%M:%S'),
                    'end_time': default_end_time.strftime('%H:%M:%S')
                }],
                "perfect_match": False
            }, status=200)

        for meeting_time in suggested_times:
            date, start_time, end_time = meeting_time
            suggested_times_json.append({
                'date': date.strftime('%Y-%m-%d'),
                'start_time': start_time.strftime('%H:%M:%S'),
                'end_time': end_time.strftime('%H:%M:%S')
            })

        return JsonResponse({'meeting_times': suggested_times_json, "perfect_match": True}, status=200)

    def post(self, request, id):
        if id is None:
            return JsonResponse({"error": "calendar_id is required"}, status=400)

        owner_availabilities, invitee_availabilities = self.split_availability_set(
            id)
        bounded_times_data = request.data.get("bounded_times")

        bounded_times_serializer = BoundedTimeSerializer(
            data=bounded_times_data)
        if not bounded_times_serializer.is_valid():
            return JsonResponse(bounded_times_serializer.errors, status=400)

        bounded_times = bounded_times_serializer.save()

        sorted_intersection_intervals = self.overlapping_invitee_availability(
            owner_availabilities, invitee_availabilities, bounded_times
        )

        suggested_meeting_data = []
        for (
            owner_availability_id,
            intervals_with_invitee,
        ) in sorted_intersection_intervals.items():
            for (
                invitee_availability_id,
                interval_data,
            ) in intervals_with_invitee.items():
                suggested_meeting_data.append(
                    {
                        "owner_availability_id": owner_availability_id,
                        "invitee_availability_id": invitee_availability_id,
                        "invitee": interval_data["invitee"],
                        "start_time": interval_data["start_time"],
                        "end_time": interval_data["end_time"],
                        "date": interval_data["date"],
                        "owner_preference": interval_data["owner_preference"],
                    }
                )

        suggested_meeting_serializer = SuggestedMeetingSerializer(
            data=suggested_meeting_data, many=True
        )
        if not suggested_meeting_serializer.is_valid():
            return JsonResponse(suggested_meeting_serializer.errors, status=400)

        return JsonResponse(suggested_meeting_serializer.data, status=200)

    @classmethod
    def suggest_meeting_times(cls, availabilities, num_slots=5, min_duration=timedelta(hours=1)):
        # Step 1: Collect all available time slots
        available_slots = {}
        for availability in availabilities:
            date = availability.date
            start_time = availability.start_time
            end_time = availability.end_time

            if date not in available_slots:
                available_slots[date] = []

            available_slots[date].append((start_time, end_time))

        # Step 2: Group by date and sort available slots by start time
        for date in available_slots:
            available_slots[date] = sorted(available_slots[date])

        # Step 3: Find gaps for meeting
        meeting_times = []
        for date, slots in available_slots.items():
            for i in range(len(slots) - 1):
                current_end = slots[i][1]
                next_start = slots[i + 1][0]
                gap_duration = next_start - current_end
                if gap_duration >= min_duration:
                    meeting_times.append((date, current_end, next_start))

        # Step 4: Sort meeting times by start time
        meeting_times = sorted(meeting_times, key=lambda x: x[1])

        # Step 5: Recommend meeting times
        suggested_times = meeting_times[:num_slots]

        return suggested_times

    @classmethod
    def split_availability_set(cls, calendar_id):
        # Query owner and invitee availabilities separately
        owner_availabilities = Availability.objects.filter(
            calendar_id=calendar_id, owner__isnull=False
        )
        invitee_availabilities = Availability.objects.filter(
            calendar_id=calendar_id, owner__isnull=True
        )

        return owner_availabilities, invitee_availabilities

    @classmethod
    def overlapping_invitee_availability(
        cls, owner_availabilities, invitee_availabilities, bounded_times
    ):
        # Dictionary to store the intersection intervals for each owner's availability time slot
        intersection_intervals = {}

        for owner_availability in owner_availabilities:
            invitee_overlapping_per_own_availability_time_slot = (
                cls.find_invitee_overlapping_intervals(
                    owner_availability, invitee_availabilities, bounded_times
                )
            )

            for (
                invitee_availability_id,
                intervals_with_invitee,
            ) in invitee_overlapping_per_own_availability_time_slot.items():
                for interval, invitee in intervals_with_invitee:
                    if owner_availability.id not in intersection_intervals:
                        intersection_intervals[owner_availability.id] = {}
                    intersection_intervals[owner_availability.id][
                        invitee_availability_id
                    ] = {
                        "invitee": invitee,
                        "start_time": interval.start,
                        "end_time": interval.end,
                        "date": interval.start.date(),
                        "owner_preference": owner_availability.preference,
                    }

        intersection_intervals[owner_availability.id] = dict(
            sorted(
                intersection_intervals[owner_availability.id].items(),
                key=lambda x: x[1]["owner_preference"],
            )
        )

        return intersection_intervals

    @classmethod
    def find_invitee_overlapping_intervals(
        cls, owner_availability, invitee_availabilities, bounded_times
    ):
        # Dictionary to store overlapping intervals for this owner
        invitee_overlapping_intervals = {}

        owner_start_datetime = datetime.combine(
            owner_availability.date, owner_availability.start_time
        )
        owner_end_datetime = datetime.combine(
            owner_availability.date, owner_availability.end_time
        )
        owner_availability_interval = DateTimeInterval(
            owner_start_datetime, owner_end_datetime
        )

        for invitee_availability in invitee_availabilities:
            invitee_start_datetime = datetime.combine(
                invitee_availability.date, invitee_availability.start_time
            )
            invitee_end_datetime = datetime.combine(
                invitee_availability.date, invitee_availability.end_time
            )
            invitee_availability_interval = DateTimeInterval(
                invitee_start_datetime, invitee_end_datetime
            )

            intersection_interval = (
                owner_availability_interval & invitee_availability_interval
            )

            if intersection_interval:
                bounded_query = Q(
                    start_time__gte=invitee_availability.start_time,
                    end_time__lte=invitee_availability.end_time,
                    start_date__gte=invitee_availability.date,
                    end_date__lte=invitee_availability.date,
                )
                if bounded_times.filter(bounded_query).exists():
                    # Check if intersection interval duration meets meeting duration
                    meeting_duration = bounded_times.duration
                    intersection_duration = (
                        intersection_interval.end - intersection_interval.start
                    )
                    if intersection_duration >= meeting_duration:
                        if invitee_availability.id not in invitee_overlapping_intervals:
                            invitee_overlapping_intervals[invitee_availability.id] = [
                            ]
                        invitee_overlapping_intervals[invitee_availability.id].append(
                            (intersection_interval, invitee_availability.invitee)
                        )

        return invitee_overlapping_intervals
