from django.http import JsonResponse
from django.views import View
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from contacts.serializers.contact_serializer import ContactSerializer
from .models import Calendar, Availability
from .serializers import AvailabilitySerializer, CalendarSerializer, BoundedTimeSerializer
from intervals import DateTimeInterval
import datetime
from django.contrib.auth.models import User
import time
from django.db.models import Q


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
            contact_data["owner"] = user.id

            serializer = ContactSerializer(data=contact_data)
            if serializer.is_valid():
                serializer.save()
                deserialized_contacts.append(serializer.instance)
            else:
                return JsonResponse(serializer.errors, status=400)

        calendar.contacts.add(*deserialized_contacts)

        # Serialize the added contacts
        added_contacts_serializer = ContactSerializer(deserialized_contacts, many=True)

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


class SuggestScheduleView(APIView):
    """
    View for suggesting schedules.
    """

    def get(self, request, id):
        if id is None:
            return JsonResponse({"error": "calendar_id is required"}, status=400)

        owner_availabilities, invitee_availabilities = self.split_availability_set(id)
        bounded_times_data = request.query_params.get('bounded_times')  # Assuming bounded_times is passed as query parameter

        # Assuming bounded_times is a single object, adjust as needed
        bounded_times_serializer = BoundedTimeSerializer(data=bounded_times_data)
        if not bounded_times_serializer.is_valid():
            return JsonResponse(bounded_times_serializer.errors, status=400)
        
        bounded_times = bounded_times_serializer.save()

        sorted_intersection_intervals = self.overlapping_invitee_availability(owner_availabilities, invitee_availabilities, bounded_times)

        return JsonResponse(sorted_intersection_intervals, status=200)
            

    @classmethod
    def split_availability_set(cls, calendar_id):
        # Query owner and invitee availabilities separately
        owner_availabilities = Availability.objects.filter(calendar_id=calendar_id, owner__isnull=False)
        invitee_availabilities = Availability.objects.filter(calendar_id=calendar_id, owner__isnull=True)

        return owner_availabilities, invitee_availabilities
    
    @classmethod
    def overlapping_invitee_availability(cls, owner_availabilities, invitee_availabilities, bounded_times):
        intersection_intervals = {}  # Dictionary to store the intersection intervals for each owner's availability time slot

        for owner_availability in owner_availabilities:
            invitee_overlapping_per_own_availability_time_slot = cls.find_invitee_overlapping_intervals(owner_availability, invitee_availabilities, bounded_times)
            overlapping_intervals = cls.find_overlapping_intervals(invitee_overlapping_per_own_availability_time_slot)
            num_overlapping_invitees = cls.count_overlapping_invitees(overlapping_intervals, invitee_availabilities)

            if num_overlapping_invitees > 0 and overlapping_intervals >= bounded_times.duration:
                for interval in overlapping_intervals:
                    intersection_intervals[owner_availability.id] = {
                        'start_time': interval.start,
                        'end_time': interval.end,
                        'date': interval.start.date(),
                        'num_invitees': num_overlapping_invitees,
                        'preference': owner_availability.preference
                    }

        # Sort the dictionary by preference and then by number of invitees
        sorted_intersection_intervals = sorted(intersection_intervals.items(), key=lambda x: (x[1]['preference'], x[1]['num_invitees']), reverse=True)

        return dict(sorted_intersection_intervals)


    @classmethod
    def find_invitee_overlapping_intervals(cls, owner_availability, invitee_availabilities, bounded_times):
        invitee_overlapping_intervals = []  # List to store overlapping intervals for this owner

        owner_start_datetime = datetime.combine(owner_availability.date, owner_availability.start_time)
        owner_end_datetime = datetime.combine(owner_availability.date, owner_availability.end_time)
        owner_availability_interval = DateTimeInterval(owner_start_datetime, owner_end_datetime)

        for invitee_availability in invitee_availabilities:
            invitee_start_datetime = datetime.combine(invitee_availability.date, invitee_availability.start_time)
            invitee_end_datetime = datetime.combine(invitee_availability.date, invitee_availability.end_time)
            invitee_availability_interval = DateTimeInterval(invitee_start_datetime, invitee_end_datetime)

            intersection_interval = owner_availability_interval & invitee_availability_interval

            if intersection_interval:
                bounded_query = Q(start_time__gte=invitee_availability.start_time,
                                  end_time__lte=invitee_availability.end_time,
                                  start_date__gte=invitee_availability.date,
                                  end_date__lte=invitee_availability.date)
                if bounded_times.filter(bounded_query).exists():
                    # Check if intersection interval duration meets meeting duration
                    meeting_duration = bounded_times.duration
                    intersection_duration = intersection_interval.end - intersection_interval.start
                    if intersection_duration >= meeting_duration:
                        invitee_overlapping_intervals.append(intersection_interval)

        return invitee_overlapping_intervals

    @classmethod
    def find_overlapping_intervals(cls, invitee_overlapping_intervals):
        return DateTimeInterval.intersect_all(invitee_overlapping_intervals)

    @classmethod
    def count_overlapping_invitees(cls, overlapping_intervals, invitee_availabilities):
        num_overlapping_invitees = 0
        
        for interval in overlapping_intervals:
            for invitee_availability in invitee_availabilities:
                invitee_start_datetime = datetime.combine(invitee_availability.date, invitee_availability.start_time)
                invitee_end_datetime = datetime.combine(invitee_availability.date, invitee_availability.end_time)
                invitee_availability_interval = DateTimeInterval(invitee_start_datetime, invitee_end_datetime)

                if interval in invitee_availability_interval:
                    num_overlapping_invitees += 1

        return num_overlapping_invitees