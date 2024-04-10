from rest_framework import serializers
from ..models import Contact

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        id = serializers.IntegerField(read_only=True)
        fields = ['id', 'first_name', 'last_name', 'email', 'phone_number', 'image']
        
    def validate(self, attrs):
        user = self.context['request'].user
        existing_contact = Contact.objects.filter(
            user=user,
            first_name=attrs.get('first_name'),
            last_name=attrs.get('last_name'),
            email=attrs.get('email')
        ).exclude(id=getattr(self.instance, 'id', None)).exists()

        if existing_contact:
            raise serializers.ValidationError("A contact with the same information already exists")

        return attrs
