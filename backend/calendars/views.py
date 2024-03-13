from rest_framework.views import APIView
from django.http import JsonResponse
from .models import Calendar
from django.http import JsonResponse
from django.views import View
from .models import Calendar
from .models import Calendar, CalendarSerializer, AvailabilitySerializer
from rest_framework.permissions import IsAuthenticated

class CalendarsView(View):
    """
    View for retrieving details of all calendars.
    """
    
    def get(self, request):
        """
        Handles GET requests to retrieve details of all calendars.
        """
        calendars = Calendar.objects.all().values('name', 'description')

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
        name = request.data.get('name')
        description = request.data.get('description')
        user = request.user
        
        try:
            if not name:
                return JsonResponse({'error': 'Name is required'}, status=400)
            calendar = Calendar.objects.create(name=name, description=description, owner=user)
            return JsonResponse({'id': calendar.id, 'name': calendar.name, 'description': calendar.description}, status=200)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

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
            return JsonResponse({'error': 'Calendar not found'}, status=404)
        
        

class CreateMeetingView(APIView):
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
            return JsonResponse({'error': 'calendar_id is required'}, status=400)

        if 'availability_set' not in request_data:
            return JsonResponse({'error': 'availability_set is required'}, status=400)

        availability_data = request_data['availability_set']

        try:
            calendar = Calendar.objects.get(id=id)
        except Calendar.DoesNotExist:
            return JsonResponse({'error': 'Calendar not found'}, status=404)

        user = request.user

        availability_data_with_owner = []
        for availability in availability_data:
            # Ensure availability's owner is set to the authenticated user's ID
            availability['owner'] = user.id
            availability_data_with_owner.append(availability)

  
        availability_serializer = AvailabilitySerializer(data=availability_data_with_owner, many=True)

        availability_serializer["calendar_id"] = id
        
        if availability_serializer.is_valid():
            # Save the availability slots associated with the calendar
            availability_serializer.save(calendar=calendar)
            return JsonResponse(availability_serializer.data, status=200, safe=False)
        else:
            return JsonResponse(availability_serializer.errors, status=400)
