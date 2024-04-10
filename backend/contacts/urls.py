from django.urls import path
from .views.add_contact import AddContactView
from .views.contacts_index import ContactsIndexView
from .views.edit_contact import EditContactView
from .views.delete_contact import DeleteContactView

app_name = 'contacts'

urlpatterns = [
    path('contacts_index/', ContactsIndexView.as_view(), name='contacts_index'),
    path('add_contact/', AddContactView.as_view(), name='add_contact'),
    path('edit_contact/<int:id>/', EditContactView.as_view(), name='edit_contact'),
    path('delete_contact/<int:id>/',
         DeleteContactView.as_view(), name='delete_contact'),
]
