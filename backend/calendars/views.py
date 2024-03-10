from django.shortcuts import render
from django.urls import reverse_lazy
from django.shortcuts import get_object_or_404, redirect, render
from django.http import HttpResponse
from django.views.generic import DetailView, ListView
from django.http import Http404, HttpResponseForbidden
from django.views.generic import UpdateView
from .models import Calendar, BookedMeeting


class BookedMeetingListView(ListView):
    model = BookedMeeting

    def get_queryset(self):
        return BookedMeeting.objects.all()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context
        

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