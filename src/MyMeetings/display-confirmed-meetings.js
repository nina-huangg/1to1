function getRandomColor() {
  // Array of predefined colors
  const colors = ["#52B7B1", "#EE6A4C", "#6EB3AF", "#F4F3ED", "#FBB5A5"];

  // Get a random index from the colors array
  const randomIndex = Math.floor(Math.random() * colors.length);

  // Return the random color
  return colors[randomIndex];
}

function addMeetingEntry(
  date,
  meetingName,
  meetingTime,
  meetingLink,
  attendees,
) {
  const randomColor = getRandomColor();

  const newMeetingEntry = `
    <div class="meeting-entry grid grid-cols-3 md:grid-cols-8 gap-2 mb-6 flex flex-wrap">
        <div class="meeting-details ml-10 col-span-3 md:col-start-3 md:col-span-5">
            <div class="date">
                <p class="font-bold text-lg">${date}</p> <!-- Adjusted font size to make the date larger -->
            </div>
            <div class="meeting-box py-2 px-2 flex flex-row text-sm shadow-xl rounded-md md:w-full" style="background-color: ${randomColor}; max-width: calc(100% - 2rem);">
                <div class="info-right-col ml-2 m-2 pr-13" style="flex-direction: column;">
                    <p class="meeting-name text-base">${meetingName}</p>
                    <p class="meeting-time text-xs">Time: ${meetingTime}</p>
                    <p class="meeting-link text-xs">${meetingLink}</p>
                </div>
                <div class="info-left-col ml-auto">
                    <img src="setting.png" class="w-7 h-7 ml-12 mb-3" alt="Settings Icon">
                    <p class="attendees text-xs mt-3 ml-4 pt-2">${attendees}</p>
                </div>
            </div>
        </div>
    </div>
`;

  document
    .querySelector(".left-column")
    .insertAdjacentHTML("beforeend", newMeetingEntry);
}
