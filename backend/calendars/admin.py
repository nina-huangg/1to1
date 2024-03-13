from django.contrib import admin
from .models import Calendar, Availability, BoundedTime, SuggestedSchedule, Invitation, Meeting, SuggestedMeeting

# Register your models here.
admin.site.register(Invitation)
admin.site.register(Calendar)
admin.site.register(Availability)
admin.site.register(BoundedTime)
admin.site.register(Meeting)
admin.site.register(SuggestedSchedule)
admin.site.register(SuggestedMeeting)
