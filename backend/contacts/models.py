from django.db import models
from django.contrib.auth.models import User

class Contact(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    image = models.ImageField(blank=True, null=True, upload_to='contact_images/')

    def save(self, *args, **kwargs):
        # Check if a contact with the same payload exists for this user
        existing_contacts = Contact.objects.filter(
            user=self.user,
            first_name=self.first_name,
            last_name=self.last_name,
            email=self.email
        )
        if self.pk:  # If updating an existing contact
            existing_contacts = existing_contacts.exclude(pk=self.pk)
        if existing_contacts.exists():
            # If the contact already exists for this user, don't save
            return
        super().save(*args, **kwargs)

    
