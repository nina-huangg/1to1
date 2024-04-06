from django.contrib import admin

from .models import (
    Calendar,
    Invitation,
    InvitationAvailability,
    Meeting,
    OwnerAvailability,
)

# Register your models here.
admin.site.register(Invitation)
admin.site.register(Calendar)
admin.site.register(OwnerAvailability)
admin.site.register(InvitationAvailability)
admin.site.register(Meeting)
