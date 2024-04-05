from accounts.models import Account
from django.contrib.auth.models import User
from calendars.models import (
    Availability,
    Calendar,
    Invitation,
    Meeting,
    SuggestedMeeting,
)
from contacts.models import Contact
from datetime import datetime


# super user
User.objects.create_superuser("admin", "admin@email.com", "SuperHardPass1234!")

# accounts app
User.objects.create_user(
    "user1",
    "user1@email.com",
    "12345",
    first_name="John",
    last_name="Doe",
)
User.objects.create_user(
    "user2",
    "user2@email.com",
    "12345",
    first_name="Jane",
    last_name="Dee",
)
User.objects.create_user(
    "user3",
    "user3@email.com",
    "12345",
    first_name="User",
    last_name="Three",
)
User.objects.create_user(
    "user4",
    "user4@email.com",
    "12345",
    first_name="User",
    last_name="Four",
)
User.objects.create_user(
    "user5",
    "user5@email.com",
    "12345",
    first_name="User",
    last_name="Five",
)
User.objects.create_user(
    "user6",
    "user6@email.com",
    "12345",
    first_name="User",
    last_name="Six",
)
User.objects.create_user(
    "user7",
    "user7@email.com",
    "12345",
    first_name="User",
    last_name="Seven",
)
User.objects.create_user(
    "user8",
    "user8@email.com",
    "12345",
    first_name="User",
    last_name="Eight",
)
Account.objects.create(
    user=User.objects.get(username="user1"),
    bio="test bio 1",
    language="French",
    country="France",
    timezone="UTC+1",
)
Account.objects.create(user=User.objects.get(
    username="user2"), bio="test bio 2")
Account.objects.create(user=User.objects.get(
    username="user3"), bio="test bio 3")
Account.objects.create(user=User.objects.get(
    username="user4"), bio="test bio 4")
Account.objects.create(user=User.objects.get(
    username="user5"), bio="test bio 5")
Account.objects.create(
    user=User.objects.get(username="user6"),
    bio="test bio 6",
    language="Spanish",
    country="Spain",
    timezone="UTC+2",
)
Account.objects.create(user=User.objects.get(
    username="user7"), bio="test bio 7")
Account.objects.create(user=User.objects.get(
    username="user8"), bio="test bio 8")

# contacts app

Contact.objects.create(
    user=User.objects.get(username="user1"),
    first_name="Contact",
    last_name="One",
    email="contact1@email.com",
)
Contact.objects.create(
    user=User.objects.get(username="user1"),
    first_name="Contact",
    last_name="Two",
    email="contact2@email.com",
)
Contact.objects.create(
    user=User.objects.get(username="user1"),
    first_name="Contact",
    last_name="Three",
    email="contact3@email.com",
)
Contact.objects.create(
    user=User.objects.get(username="user2"),
    first_name="Contact",
    last_name="Four",
    email="contact4@email.com",
)
Contact.objects.create(
    user=User.objects.get(username="user2"),
    first_name="Contact",
    last_name="Five",
    email="contact5@email.com",
)
Contact.objects.create(
    user=User.objects.get(username="user2"),
    first_name="Contact",
    last_name="Six",
    email="contact6@email.com",
)
Contact.objects.create(
    user=User.objects.get(username="user2"),
    first_name="Contact",
    last_name="Seven",
    email="contact7@email.com",
)
Contact.objects.create(
    user=User.objects.get(username="user4"),
    first_name="Contact",
    last_name="Eight",
    email="contact8@email.com",
)
Contact.objects.create(
    user=User.objects.get(username="user4"),
    first_name="Contact",
    last_name="Nine",
    email="contact9@email.com",
)
Contact.objects.create(
    user=User.objects.get(username="user7"),
    first_name="Contact",
    last_name="Ten",
    email="contact10@email.com",
)

# calendars app

Calendar.objects.create(
    name="Calendar 1",
    owner=Account.objects.get(user=User.objects.get(username="user1")),
    description="Calendar 1 description",
)
Calendar.objects.create(
    name="Calendar 2",
    owner=Account.objects.get(user=User.objects.get(username="user2")),
    description="Calendar 2 description",
)
Calendar.objects.create(
    name="Calendar 3",
    owner=Account.objects.get(user=User.objects.get(username="user2")),
    description="Calendar 3 description",
)
Calendar.objects.create(
    name="Calendar 4",
    owner=Account.objects.get(user=User.objects.get(username="user4")),
    description="Calendar 4 description",
)
Calendar.objects.create(
    name="Calendar 5",
    owner=Account.objects.get(user=User.objects.get(username="user6")),
    description="Calendar 5 description",
)
Calendar.objects.create(
    name="Calendar 6",
    owner=Account.objects.get(user=User.objects.get(username="user7")),
    description="Calendar 6 description",
)

Meeting.objects.create(
    name="Meeting 1",
    description="Meeting 1 description",
    calendar=Calendar.objects.get(name="Calendar 1"),
    start_time=datetime(2024, 1, 1, 12, 0, 0, 0),
    end_time=datetime(2024, 1, 1, 14, 0, 0, 0),
    confirmed=False,
)


Meeting.objects.create(
    name="Meeting 2",
    description="Meeting 2 description",
    calendar=Calendar.objects.get(name="Calendar 2"),
    start_time=datetime(2024, 4, 7, 9, 0, 0, 0),
    end_time=datetime(2024, 4, 7, 12, 0, 0, 0),
    confirmed=False,
)
Meeting.objects.create(
    name="Meeting 3",
    description="Meeting 3 description",
    calendar=Calendar.objects.get(name="Calendar 3"),
    start_time=datetime(2024, 4, 8, 9, 0, 0, 0),
    end_time=datetime(2024, 4, 8, 12, 0, 0, 0),
    confirmed=True,
)
Meeting.objects.create(
    name="Meeting 4",
    description="Meeting 4 description",
    calendar=Calendar.objects.get(name="Calendar 4"),
    start_time=datetime(2024, 4, 8, 18, 0, 0, 0),
    end_time=datetime(2024, 4, 8, 20, 0, 0, 0),
    confirmed=False,
)
Meeting.objects.create(
    name="Meeting 5",
    description="Meeting 5 description",
    calendar=Calendar.objects.get(name="Calendar 6"),
    start_time=datetime(2024, 4, 5, 9, 0, 0, 0),
    end_time=datetime(2024, 4, 5, 14, 0, 0, 0),
    confirmed=False,
)
