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
from .models import Calendar, BookedMeeting

from django.http import JsonResponse
from django.views import View
from .models import Calendar

class CreateCalendarView(View):
    def post(self, request):
        # Extract data from the request
        name = request.POST.get('name')
        description = request.POST.get('description')

        # Validate the data (optional)
        if not name:
            return JsonResponse({'error': 'Name is required'}, status=400)

        # Create a new Calendar instance
        calendar = Calendar(name=name, description=description)
        calendar.save()

        # Return the serialized data
        return JsonResponse({'id': calendar.id, 'name': calendar.name, 'description': calendar.description}, status=201)

class BookedMeetingListView(ListView):
    model = BookedMeeting

    def get_queryset(self):
        return BookedMeeting.objects.all()

    def get(self):
        queryset = self.get_queryset()
        data = serialize('json', queryset)
        return JsonResponse(data, safe=False)
        

class BookedMeetingEditView(UpdateView):
    model = BookedMeeting

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return HttpResponse('Unauthorized', status=401)

        self.event = get_object_or_404(BookedMeeting, pk=kwargs['booked_meeting_id'])

        if self.event.calendar.owner != request.user:
            return HttpResponseForbidden()

        return super().dispatch(request, *args, **kwargs)

    def get_object(self, queryset=None):
        return self.event

    def get_success_url(self):
        return reverse_lazy('list_booked_meetings')