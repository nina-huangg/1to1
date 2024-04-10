from django.contrib.auth.models import User
from calendars.models import Calendar, Invitation, Meeting, Availability
from contacts.models import Contact
from datetime import date, time, timedelta
from django.core.files import File


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
# contacts app

contact1 = Contact.objects.create(
    user=user1,
    first_name="Contact",
    last_name="One",
    email="contact1@email.com",
    phone_number="647-123-4578",
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

contact1.image.save("contact1.jpg", File(open("tests/static/profilepic1.jpg", "r")))
contact2.image.save("contact2.jpg", File(open("tests/static/profilepic1.jpg", "r")))
contact3.image.save("contact3.jpg", File(open("tests/static/profilepic1.jpg", "r")))
contact4.image.save("contact4.jpg", File(open("tests/static/profilepic1.jpg", "r")))
contact5.image.save("contact5.jpg", File(open("tests/static/profilepic1.jpg", "r")))
contact6.image.save("contact6.jpg", File(open("tests/static/profilepic1.jpg", "r")))
contact7.image.save("contact7.jpg", File(open("tests/static/profilepic1.jpg", "r")))
contact8.image.save("contact8.jpg", File(open("tests/static/profilepic1.jpg", "r")))


# calendars app

calendar1 = Calendar.objects.create(
    name="Calendar 1",
    owner=user1,
    description="Calendar 1 description",
)
calendar2 = Calendar.objects.create(
    name="Calendar 2",
    owner=user2,
    description="Calendar 2 description",
)
calendar3 = Calendar.objects.create(
    name="Calendar 3",
    owner=user2,
    description="Calendar 3 description",
)
calendar4 = Calendar.objects.create(
    name="Calendar 4",
    owner=user4,
    description="Calendar 4 description",
)
calendar5 = Calendar.objects.create(
    name="Calendar 5",
    owner=user6,
    description="Calendar 5 description",
)
calendar6 = Calendar.objects.create(
    name="Calendar 6",
    owner=user7,
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
    inviteer=meeting1.calendar.owner,
    invitee=contact1,
    meeting=meeting1,
    calendar=meeting1.calendar,
)

invitation2 = Invitation.objects.create(
    inviteer=meeting1.calendar.owner,
    invitee=contact2,
    meeting=meeting1,
    calendar=meeting1.calendar,
)

invitation3 = Invitation.objects.create(
    inviteer=meeting2.calendar.owner,
    invitee=contact4,
    meeting=meeting2,
    calendar=meeting2.calendar,
)

invitation4 = Invitation.objects.create(
    inviteer=meeting4.calendar.owner,
    invitee=contact6,
    meeting=meeting4,
    calendar=meeting4.calendar,
)

invitation5 = Invitation.objects.create(
    inviteer=meeting5.calendar.owner,
    invitee=contact7,
    meeting=meeting5,
    calendar=meeting5.calendar,
)

invitation6 = Invitation.objects.create(
    inviteer=meeting5.calendar.owner,
    invitee=contact8,
    meeting=meeting5,
    calendar=meeting5.calendar,
)
invitation7 = Invitation.objects.create(
    inviteer=meeting6.calendar.owner,
    invitee=contact12,
    meeting=meeting6,
    calendar=meeting6.calendar,
)
invitation8 = Invitation.objects.create(
    inviteer=meeting6.calendar.owner,
    invitee=contact13,
    meeting=meeting6,
    calendar=meeting6.calendar,
)
invitation9 = Invitation.objects.create(
    inviteer=meeting6.calendar.owner,
    invitee=contact14,
    meeting=meeting6,
    calendar=meeting6.calendar,
)

invitation_availablity1 = Availability.objects.create(
    preference="high",
    date=date(2024, 1, 1),
    start_time=time(9, 0, 0, 0),
    end_time=time(17, 0, 0, 0),
    invitation=invitation1,
    calendar=invitation1.calendar,
)
invitation_availablity2 = Availability.objects.create(
    preference="high",
    date=date(2024, 1, 1),
    start_time=time(11, 0, 0, 0),
    end_time=time(17, 0, 0, 0),
    invitation=invitation2,
    calendar=invitation2.calendar,
)
invitation_availability3 = Availability.objects.create(
    preference="medium",
    date=date(2024, 1, 1),
    start_time=time(9, 0, 0, 0),
    end_time=time(2024, 1, 1, 12, 0, 0, 0),
    invitation=invitation3,
    calendar=invitation3.calendar,
)
invitation_availablity4 = Availability.objects.create(
    preference="medium",
    date=date(2024, 1, 1),
    start_time=time(9, 0, 0, 0),
    end_time=time(17, 0, 0, 0),
    invitation=invitation4,
    calendar=invitation4.calendar,
)
invitation_availablity5 = Availability.objects.create(
    preference="medium",
    date=date(2024, 1, 1),
    start_time=time(9, 0, 0, 0),
    end_time=time(17, 0, 0, 0),
    invitation=invitation6,
    calendar=invitation6.calendar,
)
invitation_availablity6 = Availability.objects.create(
    preference="low",
    date=date(2024, 1, 1),
    start_time=time(9, 0, 0, 0),
    end_time=time(17, 0, 0, 0),
    invitation=invitation6,
    calendar=invitation6.calendar,
)
invitation_availablity7 = Availability.objects.create(
    preference="low",
    date=date(2024, 1, 1),
    start_time=time(2024, 1, 1, 9, 0, 0, 0),
    end_time=time(2024, 1, 1, 17, 0, 0, 0),
    invitation=invitation6,
    calendar=invitation6.calendar,
)
invitation_availablity8 = Availability.objects.create(
    preference="low",
    date=date(2024, 1, 1),
    start_time=time(9, 0, 0, 0),
    end_time=time(17, 0, 0, 0),
    invitation=invitation7,
    calendar=invitation7.calendar,
)
invitation_availablity9 = Availability.objects.create(
    preference="low",
    date=date(2024, 1, 1),
    start_time=time(9, 0, 0, 0),
    end_time=time(17, 0, 0, 0),
    invitation=invitation8,
    calendar=invitation8.calendar,
)
invitation_availablity10 = Availability.objects.create(
    preference="high",
    date=date(2024, 1, 2),
    start_time=time(9, 0, 0, 0),
    end_time=time(17, 0, 0, 0),
    invitation=invitation8,
    calendar=invitation8.calendar,
)

owner_availablity1_1 = Avability.objects.create(
    preference="high",
    date=date(2024, 1, 1),
    start_time=time(9, 0, 0, 0),
    end_time=time(17, 0, 0, 0),
    meeting=meeting1,
)
owner_availablity1_2 = Availability.objects.create(
    preference="high",
    date=date(2024, 1, 2),
    start_time=time(9, 0, 0, 0),
    end_time=time(17, 0, 0, 0),
    owner=meeting1.calendar.owner,
    meeting=meeting1,
)
owner_availablity2_1 = Availability.objects.create(
    preference="high",
    date=date(2024, 1, 1),
    start_time=time(9, 0, 0, 0),
    end_time=time(17, 0, 0, 0),
    meeting=meeting2.calendar.owner,
)
owner_availablity3_1 = Availability.objects.create(
    preference="medium",
    date=date(2024, 1, 1),
    start_time=time(9, 0, 0, 0),
    end_time=time(17, 0, 0, 0),
    meeting=meeting3.calendar.owner,
)
owner_availablity4_1 = Availability.objects.create(
    preference="medium",
    date=date(2024, 1, 1),
    start_time=time(9, 0, 0, 0),
    end_time=time(17, 0, 0, 0),
    meeting=meeting4.calendar.owner,
)
owner_availablity5_1 = Availability.objects.create(
    preference="low",
    date=date(2024, 1, 1),
    start_time=time(9, 0, 0, 0),
    end_time=time(17, 0, 0, 0),
    meeting=meeting5.calendar.owner,
)
