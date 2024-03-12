from django.shortcuts import render
from django.urls import reverse_lazy
from django.shortcuts import get_object_or_404, redirect, render
from django.http import HttpResponse
from rest_framework.views import APIView
from django.views.generic import DetailView, ListView
from django.http import JsonResponse
from django.core.serializers import serialize
from django.http import Http404, HttpResponseForbidden
from django.views.generic import UpdateView
from rest_framework import status
from django.core import serializers
from django.core.exceptions import ObjectDoesNotExist

from .models import Calendar, BookedMeeting
from django.http import JsonResponse
from django.views import View
from .models import Calendar
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import Calendar, CalendarSerializer, AvailabilitySerializer

class CreateCalendarView(APIView):
    """
    View for creating a new calendar.
    """
    def post(self, request):
        """
        Handles POST requests to create a new calendar.
        """
        name = request.data.get('name')
        description = request.data.get('description')

        try:
            if not name:
                return JsonResponse({'error': 'Name is required'}, status=400)
            calendar = Calendar.objects.create(name=name, description=description)
            return JsonResponse({'id': calendar.id, 'name': calendar.name, 'description': calendar.description}, status=200)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

class CalendarDetailsView(View):
    """
    View for retrieving details of a calendar.
    """

    def get(self, request, name):
        """
        Handles GET requests to retrieve details of a specific calendar.
        """
        try:
            # Retrieve the specific calendar by name
            calendar = Calendar.objects.get(name=name)

            # Serialize the calendar
            calendar_serializer = CalendarSerializer(calendar)

            # Return serialized data as JSON response
            return JsonResponse(calendar_serializer.data, status=200, safe=False)
        except Calendar.DoesNotExist:
            return JsonResponse({'error': 'Calendar not found'}, status=404)
        
        

class CreateMeetingView(APIView):
    def post(self, request):
        # Extract data from the request body
        request_data = request.data

        # Ensure calendar_id and availability_set are provided
        if 'calendar_id' not in request_data:
            return JsonResponse({'error': 'calendar_id is required'}, status=400)

        if 'availability_set' not in request_data:
            return JsonResponse({'error': 'availability_set is required'}, status=400)

        calendar_id = request_data['calendar_id']
        availability_data = request_data['availability_set']

        # Ensure calendar_id is not empty
        if not calendar_id:
            return JsonResponse({'error': 'calendar_id cannot be empty'}, status=400)

        try:
            # Attempt to fetch the calendar
            calendar = Calendar.objects.get(id=calendar_id)
        except Calendar.DoesNotExist:
            return JsonResponse({'error': 'Calendar not found'}, status=404)

        # Initialize the AvailabilitySerializer with the availability_set data
        availability_serializer = AvailabilitySerializer(data=availability_data, many=True)

        # Check if deserialization was successful
        if availability_serializer.is_valid():
            # Save the availability slots associated with the calendar
            availability_serializer.save(calendar=calendar)
            return JsonResponse(availability_serializer.data, status=201, safe=False)
        else:
            # Return validation errors if any
            return JsonResponse(availability_serializer.errors, status=400)


    def get(self, request):
        # Retrieve all calendars
        calendars = Calendar.objects.all()

        # Serialize the calendars
        calendar_serializer = CalendarSerializer(calendars, many=True)

        # Return serialized data as JSON response
        return JsonResponse(calendar_serializer.data, status=200, safe=False)
    
    
# ------------------------------------------------------------------------------------------------
# class BookedMeetingListView(ListView):
#     model = BookedMeeting

#     def get_queryset(self):
#         return BookedMeeting.objects.all()

#     def get(self):
#         queryset = self.get_queryset()
#         data = serialize('json', queryset)
#         return JsonResponse(data, safe=False)
        

# class BookedMeetingEditView(UpdateView):
#     model = BookedMeeting

#     def dispatch(self, request, *args, **kwargs):
#         if not request.user.is_authenticated:
#             return HttpResponse('Unauthorized', status=401)

#         self.event = get_object_or_404(BookedMeeting, pk=kwargs['booked_meeting_id'])

#         if self.event.calendar.owner != request.user:
#             return HttpResponseForbidden()

#         return super().dispatch(request, *args, **kwargs)

#     def get_object(self, queryset=None):
#         return self.event

#     def get_success_url(self):
#         return reverse_lazy('list_booked_meetings')