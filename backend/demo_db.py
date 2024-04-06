from accounts.models import Account
from django.contrib.auth.models import User
from calendars.models import (
    OwnerAvailability,
    InvitationAvailability,
    Calendar,
    Invitation,
    Meeting,
)
from contacts.models import Contact
from datetime import datetime, timedelta


# super user
User.objects.create_superuser("admin", "admin@email.com", "SuperHardPass1234!")

# accounts app
user1 = User.objects.create_user(
    "user1",
    "user1@email.com",
    "12345",
    first_name="John",
    last_name="Doe",
)
user2 = User.objects.create_user(
    "user2",
    "user2@email.com",
    "12345",
    first_name="Jane",
    last_name="Dee",
)
user3 = User.objects.create_user(
    "user3",
    "user3@email.com",
    "12345",
    first_name="User",
    last_name="Three",
)
user4 = User.objects.create_user(
    "user4",
    "user4@email.com",
    "12345",
    first_name="User",
    last_name="Four",
)
user5 = User.objects.create_user(
    "user5",
    "user5@email.com",
    "12345",
    first_name="User",
    last_name="Five",
)
user6 = User.objects.create_user(
    "user6",
    "user6@email.com",
    "12345",
    first_name="User",
    last_name="Six",
)
user7 = User.objects.create_user(
    "user7",
    "user7@email.com",
    "12345",
    first_name="User",
    last_name="Seven",
)
user8 = User.objects.create_user(
    "user8",
    "user8@email.com",
    "12345",
    first_name="User",
    last_name="Eight",
)
account1 = Account.objects.create(
    user=user1,
    bio="test bio 1",
    language="French",
    country="France",
    timezone="UTC+1",
)
account2 = Account.objects.create(user=user2, bio="test bio 2")
account3 = Account.objects.create(user=user3, bio="test bio 3")
account4 = Account.objects.create(user=user4, bio="test bio 4")
account5 = Account.objects.create(user=user5, bio="test bio 5")
account6 = Account.objects.create(
    user=user6,
    bio="test bio 6",
    language="Spanish",
    country="Spain",
    timezone="UTC+2",
)
account7 = Account.objects.create(user=user7, bio="test bio 7")
account8 = Account.objects.create(user=user8, bio="test bio 8")

# contacts app

contact1 = Contact.objects.create(
    user=user1,
    first_name="Contact",
    last_name="One",
    email="contact1@email.com",
)
contact2 = Contact.objects.create(
    user=user1,
    first_name="Contact",
    last_name="Two",
    email="contact2@email.com",
)
contact3 = Contact.objects.create(
    user=user1,
    first_name="Contact",
    last_name="Three",
    email="contact3@email.com",
)
contact4 = Contact.objects.create(
    user=user2,
    first_name="Contact",
    last_name="Four",
    email="contact4@email.com",
)
contact5 = Contact.objects.create(
    user=user2,
    first_name="Contact",
    last_name="Five",
    email="contact5@email.com",
)
contact6 = Contact.objects.create(
    user=user4,
    first_name="Contact",
    last_name="Six",
    email="contact6@email.com",
)
contact7 = Contact.objects.create(
    user=user5,
    first_name="Contact",
    last_name="Seven",
    email="contact7@email.com",
)
contact8 = Contact.objects.create(
    user=user5,
    first_name="Contact",
    last_name="Eight",
    email="contact8@email.com",
)
contact9 = Contact.objects.create(
    user=user5,
    first_name="Contact",
    last_name="Nine",
    email="contact9@email.com",
)
contact10 = Contact.objects.create(
    user=user5,
    first_name="Contact",
    last_name="Ten",
    email="contact10@email.com",
)
contact11 = Contact.objects.create(
    user=user5,
    first_name="Contact",
    last_name="Eleven",
    email="contact11@email.com",
)
contact12 = Contact.objects.create(
    user=user6,
    first_name="Contact",
    last_name="Tweleve",
    email="contact12@email.com",
)
contact13 = Contact.objects.create(
    user=user6,
    first_name="Contact",
    last_name="Thirteen",
    email="contact13@email.com",
)
contact14 = Contact.objects.create(
    user=user6,
    first_name="Contact",
    last_name="Fourteen",
    email="contact14@email.com",
)
contact15 = Contact.objects.create(
    user=user6,
    first_name="Contact",
    last_name="Fifteen",
    email="contact15@email.com",
)
contact16 = Contact.objects.create(
    user=user6,
    first_name="Contact",
    last_name="Sixteen",
    email="contact16@email.com",
)

# calendars app

calendar1 = Calendar.objects.create(
    name="Calendar 1",
    owner=account1,
    description="Calendar 1 description",
)
calendar2 = Calendar.objects.create(
    name="Calendar 2",
    owner=account2,
    description="Calendar 2 description",
)
calendar3 = Calendar.objects.create(
    name="Calendar 3",
    owner=account2,
    description="Calendar 3 description",
)
calendar4 = Calendar.objects.create(
    name="Calendar 4",
    owner=account4,
    description="Calendar 4 description",
)
calendar5 = Calendar.objects.create(
    name="Calendar 5",
    owner=account6,
    description="Calendar 5 description",
)
calendar6 = Calendar.objects.create(
    name="Calendar 6",
    owner=account7,
    description="Calendar 6 description",
)
meeting1 = Meeting.objects.create(
    name="Meeting 1",
    description="Meeting 1 description",
    calendar=calendar1,
    duration=timedelta(hours=2),
    confirmed=False,
)
meeting2 = Meeting.objects.create(
    name="Meeting 2",
    description="Meeting 2 description",
    calendar=calendar2,
    duration=timedelta(hours=3),
    confirmed=False,
)
meeting3 = Meeting.objects.create(
    name="Meeting 3",
    description="Meeting 3 description",
    calendar=calendar3,
    duration=timedelta(hours=1),
    confirmed=True,
)
meeting4 = Meeting.objects.create(
    name="Meeting 4",
    description="Meeting 4 description",
    calendar=calendar4,
    duration=timedelta(minutes=30),
    confirmed=False,
)
meeting5 = Meeting.objects.create(
    name="Meeting 5",
    description="Meeting 5 description",
    calendar=calendar5,
    duration=timedelta(minutes=30),
    confirmed=False,
)
meeting6 = Meeting.objects.create(
    name="Meeting 6",
    description="Meeting 6 description",
    calendar=calendar6,
    duration=timedelta(hours=1),
    confirmed=False,
)

invitation1 = Invitation.objects.create(
    invitee=contact1,
    meeting=meeting1,
)

invitation2 = Invitation.objects.create(
    invitee=contact2,
    meeting=meeting1,
)

invitation3 = Invitation.objects.create(
    invitee=contact4,
    meeting=meeting2,
)

invitation4 = Invitation.objects.create(
    invitee=contact6,
    meeting=meeting4,
)

invitation5 = Invitation.objects.create(
    invitee=contact7,
    meeting=meeting5,
)

invitation6 = Invitation.objects.create(
    invitee=contact8,
    meeting=meeting5,
)
invitation7 = Invitation.objects.create(
    invitee=contact12,
    meeting=meeting6,
)
invitation8 = Invitation.objects.create(
    invitee=contact13,
    meeting=meeting6,
)
invitation9 = Invitation.objects.create(
    invitee=contact14,
    meeting=meeting6,
)

invitation_availablity1 = InvitationAvailability.objects.create(
    preference="high",
    start_time=datetime(2024, 1, 1, 9, 0, 0, 0),
    end_time=datetime(2024, 1, 1, 17, 0, 0, 0),
    invitation=invitation1,
)
invitation_availablity2 = InvitationAvailability.objects.create(
    preference="high",
    start_time=datetime(2024, 1, 1, 11, 0, 0, 0),
    end_time=datetime(2024, 1, 1, 17, 0, 0, 0),
    invitation=invitation2,
)
invitation_availability3 = InvitationAvailability.objects.create(
    preference="mid",
    start_time=datetime(2024, 1, 1, 9, 0, 0, 0),
    end_time=datetime(2024, 1, 1, 12, 0, 0, 0),
    invitation=invitation3,
)
invitation_availablity4 = InvitationAvailability.objects.create(
    preference="mid",
    start_time=datetime(2024, 1, 1, 9, 0, 0, 0),
    end_time=datetime(2024, 1, 1, 17, 0, 0, 0),
    invitation=invitation4,
)
invitation_availablity5 = InvitationAvailability.objects.create(
    preference="low",
    start_time=datetime(2024, 1, 1, 9, 0, 0, 0),
    end_time=datetime(2024, 1, 1, 17, 0, 0, 0),
    invitation=invitation6,
)
invitation_availablity6 = InvitationAvailability.objects.create(
    preference="low",
    start_time=datetime(2024, 1, 1, 9, 0, 0, 0),
    end_time=datetime(2024, 1, 1, 17, 0, 0, 0),
    invitation=invitation6,
)
invitation_availablity7 = InvitationAvailability.objects.create(
    preference="low",
    start_time=datetime(2024, 1, 1, 9, 0, 0, 0),
    end_time=datetime(2024, 1, 1, 17, 0, 0, 0),
    invitation=invitation6,
)
invitation_availablity8 = InvitationAvailability.objects.create(
    preference="low",
    start_time=datetime(2024, 1, 3, 9, 0, 0, 0),
    end_time=datetime(2024, 1, 3, 17, 0, 0, 0),
    invitation=invitation7,
)
invitation_availablity9 = InvitationAvailability.objects.create(
    preference="low",
    start_time=datetime(2024, 1, 2, 9, 0, 0, 0),
    end_time=datetime(2024, 1, 2, 17, 0, 0, 0),
    invitation=invitation8,
)
invitation_availablity10 = InvitationAvailability.objects.create(
    preference="high",
    start_time=datetime(2024, 1, 2, 9, 0, 0, 0),
    end_time=datetime(2024, 1, 2, 17, 0, 0, 0),
    invitation=invitation8,
)

owner_availablity1_1 = OwnerAvailability.objects.create(
    preference="high",
    start_time=datetime(2024, 1, 1, 9, 0, 0, 0),
    end_time=datetime(2024, 1, 1, 17, 0, 0, 0),
    meeting=meeting1,
)
owner_availablity1_2 = OwnerAvailability.objects.create(
    preference="high",
    start_time=datetime(2024, 1, 2, 9, 0, 0, 0),
    end_time=datetime(2024, 1, 2, 17, 0, 0, 0),
    meeting=meeting1,
)
owner_availablity2_1 = OwnerAvailability.objects.create(
    preference="high",
    start_time=datetime(2024, 1, 1, 9, 0, 0, 0),
    end_time=datetime(2024, 1, 1, 17, 0, 0, 0),
    meeting=meeting2,
)
owner_availablity3_1 = OwnerAvailability.objects.create(
    preference="mid",
    start_time=datetime(2024, 1, 1, 9, 0, 0, 0),
    end_time=datetime(2024, 1, 1, 17, 0, 0, 0),
    meeting=meeting3,
)
owner_availablity4_1 = OwnerAvailability.objects.create(
    preference="mid",
    start_time=datetime(2024, 1, 1, 9, 0, 0, 0),
    end_time=datetime(2024, 1, 1, 17, 0, 0, 0),
    meeting=meeting4,
)
owner_availablity5_1 = OwnerAvailability.objects.create(
    preference="low",
    start_time=datetime(2024, 1, 1, 9, 0, 0, 0),
    end_time=datetime(2024, 1, 1, 17, 0, 0, 0),
    meeting=meeting5,
)

# TODO: make availability times more believable
