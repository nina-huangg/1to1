from datetime import timedelta

from django.core.mail import send_mail
from django.http import JsonResponse
from django.utils import timezone
from django.views import View
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from contacts.models import Contact
from contacts.serializers import ContactSerializer

from .models import Availability, Calendar, Invitation
from .serializers import AvailabilitySerializer, CalendarSerializer


class CalendarsView(View):
    """
    View for retrieving details of available calendars.
    """
    premission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Handles GET requests to retrieve details of all calendars belonging to logged in user.
        """
        calendars = Calendar.objects.all().filter(owner=request.user)
        if not calendars:
            return Response({}, status=status.HTTP_200_OK)

        serializer = CalendarSerializer(calendars, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CreateCalendarView(APIView):
    """
    View for creating a new calendar.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        Handles POST requests to create a new calendar.
        """
        serializer = CalendarSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CalendarDetailsView(View):
    """
    View details of a single calendar specified by id.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        """
        Handles GET requests to retrieve details of a specific calendar.
        """

        try:
            calendar = Calendar.objects.get(id=id)
            serializer = CalendarSerializer(calendar)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Calendar.DoesNotExist:
            return Response({"error": "Calendar not found"}, status=status.HTTP_404_NOT_FOUND)


class ChooseAvailabilityView(APIView):
    """
    View for choosing availability for users who have been emailed.
    """

    def post(self, request, id):
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
            return Response({"error": "calendar_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        if "contacts" not in request_data:
            return Response({"error": "contacts is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            calendar = Calendar.objects.get(id=id)
        except Calendar.DoesNotExist:
            return Response({"error": "Calendar not found"}, status=status.HTTP_404_NOT_FOUND)

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
                try:
                    contact = Contact.objects.get(id=id_value, user=user_value)
                except Contact.DoesNotExist:
                    return Response({"error": "Contact not found"}, status=status.HTTP_404_NOT_FOUND)

                deserialized_contacts.append(contact)

                if not Invitation.objects.filter(invitee=contact, inviter=user_value, calendar=calendar).exists():
                    invitation = Invitation.objects.create(
                        invitee=contact, inviter=user_value, calendar=calendar)
                else:
                    return Response({'error': 'Contact already added to calendar'}, status=status.HTTP_400_BAD_REQUEST)

            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        calendar.contacts.add(*deserialized_contacts)

        # Serialize the added contacts
        added_contacts_serializer = ContactSerializer(
            deserialized_contacts, many=True)

        return Response(added_contacts_serializer.data, status=status.HTTP_200_OK)


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
            return Response(contact_serializer.data, status=status.HTTP_200_OK)
        except Calendar.DoesNotExist:
            return Response({"error": "Calendar not found"}, status=status.HTTP_404_NOT_FOUND)


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
            if not Invitation.objects.filter(id=invite_id).exists():
                return Response({"error": "invite does not exist"}, status=status.HTTP_400_BAD_REQUEST)

            availabilities = Availability.objects.filter(calendar_id=id)
            availability_list = []
            for availability in availabilities:
                availability_list.append(
                    f"{availability.date}: {
                        availability.start_time}-{availability.end_time}"
                )

            invitee_response = {
                "inviter": f'{calendar.owner.first_name} {calendar.owner.last_name}',
                "availability_set": availability_list,
            }
            return Response(invitee_response, status=status.HTTP_200_OK)
        except Calendar.DoesNotExist:
            return Response({"error": "Calendar not found"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, id, invite_id):
        """
        Handles POST requests to respond to an invite.
        """
        user = request.user
        request_data = request.data

        if not Invitation.objects.filter(id=invite_id).exists():
            return Response({"error": "invite does not exist"}, status=status.HTTP_400_BAD_REQUEST)

        if id is None:
            return Response({"error": "calendar_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        if "availability_set" not in request_data:
            return Response({"error": "availability_set is required"}, status=status.HTTP_400_BAD_REQUEST)

        availability_data = request_data["availability_set"]

        try:
            calendar = Calendar.objects.get(id=id)
            invitation = Invitation.objects.get(id=invite_id)
        except Calendar.DoesNotExist:
            return Response({"error": "Calendar not found"}, status=status.HTTP_404_NOT_FOUND)
        except Invitation.DoesNotExist:
            return Response({"error": "Invitation not found"}, status=status.HTTP_404_NOT_FOUND)

        availability_data_with_owner = []
        for availability in availability_data:
            availability["owner"] = invitation.inviter.id
            availability_data_with_owner.append(availability)

        availability_serializer = AvailabilitySerializer(
            data=availability_data_with_owner, many=True)
        if availability_serializer.is_valid():
            availability_serializer.save(calendar=calendar)

            Invitation.objects.filter(
                invitee=invitation.invitee, inviter=invitation.inviter, calendar=calendar).update(confirmed=True)

            return Response(availability_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(availability_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class InvitesStatusView(APIView):
    """
    Describe: page where user gets to see who has responded and who hasn’t
    GET
    Methods: GET
    Field/Payload: meeting_name

    """
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        try:
            calendar = Calendar.objects.get(id=id)
        except Calendar.DoesNotExist:
            return Response({"error": "Calendar with id does not exist"}, status=status.HTTP_400_BAD_REQUEST)

        calendar_invitations = Invitation.objects.filter(calendar=calendar)
        responsed = []
        not_responsed = []

        for invitation in calendar_invitations:
            invitee_data = {
                "first_name": invitation.invitee.first_name,
                "last_name": invitation.invitee.last_name,
            }
            if invitation.confirmed:
                responsed.append(invitee_data)
            else:
                not_responsed.append(invitee_data)

        response_data = {"responsed": responsed,
                         "not_responsed": not_responsed}
        return Response(response_data, status=status.HTTP_200_OK)


class InviteeRemindView(APIView):
    """
    Describe: remind users who have not responded
    Methods: POST
    """

    def post(self, request, id):
        try:
            calendar = Calendar.objects.get(id=id)
        except Calendar.DoesNotExist:
            return Response({"error": "Calendar with id does not exist"}, status=status.HTTP_400_BAD_REQUEST)

        calendar_invitations = Invitation.objects.filter(calendar=calendar)
        users_reminded = []

        for invitation in calendar_invitations:
            if not invitation.confirmed:
                # TODO: Send emails
                send_mail(
                    'Reminder: Invitation to Calendar Event',
                    'You have an outstanding invitation to an event on the calendar.',
                    'from@example.com',
                    # Assuming there's an 'email' field in the User model
                    [invitation.invitee.email],
                    fail_silently=False,
                )
                users_reminded.append({
                    "first_name": invitation.invitee.first_name,
                    "last_name": invitation.invitee.last_name,
                })

        return Response({"users_reminded": users_reminded}, status=status.HTTP_200_OK)


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
