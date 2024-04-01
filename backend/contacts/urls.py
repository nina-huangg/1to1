from django.urls import path

from .views import AddContactView, ContactsIndexView, DeleteContactView, EditContactView

app_name = "contacts"

urlpatterns = [
    path("contacts_index/", ContactsIndexView.as_view(), name="contacts_index"),
    path("add_contact/", AddContactView.as_view(), name="add_contact"),
    path("edit_contact/<int:id>/", EditContactView.as_view(), name="edit_contact"),
    path("delete_contact/<int:id>/", DeleteContactView.as_view(), name="delete_contact"),
]
