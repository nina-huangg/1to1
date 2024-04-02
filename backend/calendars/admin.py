from django.contrib import admin
from .models import (
    Calendar,
    Availability,
    SuggestedMeeting,
    Invitation,
    Meeting,
)

# Register your models here.
admin.site.register(Invitation)
admin.site.register(Calendar)
admin.site.register(Availability)
admin.site.register(Meeting)
admin.site.register(SuggestedMeeting)
