// calendar.js

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
        <div class="meeting-entry grid grid-cols-8 gap-2 mb-4 ml-10 flex flex-wrap">
            <div class="meeting-details col-span-6">
                <div class="date col-start-2 col-span-1 ">
                    <p class="font-bold">${date}</p>
                </div>
                <div class="meeting-box grid flex text-sm shadow-xl rounded-md w-4/4" style="background-color: ${randomColor};">
                    <div class="info-right-col ml-4 m-2 pr-14">
                        <p class="meeting-name">${meetingName}</p>
                        <p class="meeting-time">Time: ${meetingTime}</p>
                        <p class="meeting-link">${meetingLink}</p>
                    </div>
                    <div class="info-left-col pl-14">
                        <img src="setting.png" class="w-7 h-7 ml-14" alt="Settings Icon">
                        <p class="attendees mt-3 ml-5 pt-2">${attendees}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.querySelector('.left-column').insertAdjacentHTML('beforeend', newMeetingEntry);
}
