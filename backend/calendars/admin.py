from django.contrib import admin
from .models import Calendar, Availability, BoundedTime, SuggestedSchedule

# Register your models here.
admin.site.register(Calendar)
admin.site.register(Availability)
admin.site.register(BoundedTime)
admin.site.register(SuggestedSchedule)
