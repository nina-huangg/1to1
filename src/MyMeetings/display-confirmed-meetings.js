// display-confirmed-meeting.js

function getRandomColor() {
    // Array of predefined colors
    const colors = ['#52B7B1', '#EE6A4C', '#6EB3AF', '#F4F3ED', '#FBB5A5'];

    // Get a random index from the colors array
    const randomIndex = Math.floor(Math.random() * colors.length);

    // Return the random color
    return colors[randomIndex];
}

function addMeetingEntry(date, meetingName, meetingTime, meetingLink, attendees) {
    const randomColor = getRandomColor();

    // Create a new meeting entry HTML structure
    const newMeetingEntry = `
        <div class="meeting-entry grid grid-cols-1 md:grid-cols-8 gap-2 mb-4 ml-10 flex flex-wrap">
        <div class="meeting-details col-span-1 md:col-span-6">
            <div class="date">
                <p class="font-bold">${date}</p>
            </div>
            <div class="meeting-box grid flex text-sm shadow-xl rounded-md md:w-4/4" style="background-color: ${randomColor};">
                <div class="info-right-col ml-2 m-2 pr-8" style="flex-direction: column;">
                    <p class="meeting-name text-base">${meetingName}</p>
                    <p class="meeting-time text-xs">Time: ${meetingTime}</p>
                    <p class="meeting-link text-xs">${meetingLink}</p>
                </div>
                <div class="info-left-col pl-12">
                    <img src="setting.png" class="flex w-7 h-7 ml-14" alt="Settings Icon">
                    <p class="attendees text-xs mt-3 ml-5 pt-2">${attendees}</p>
                </div>
            </div>
        </div>
    </div>
    `;

    document.querySelector('.left-column').insertAdjacentHTML('beforeend', newMeetingEntry);
}