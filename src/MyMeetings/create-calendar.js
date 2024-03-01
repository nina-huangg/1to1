function createCalendar(year, month) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const calendarContainer = document.querySelector(".calendar-container");

  calendarContainer.innerHTML = "";

  const headerRow = document.createElement("div");
  headerRow.classList.add(
    "grid",
    "grid-cols-7",
    "text-center",
    "font-bold",
    "text-white",
    "bg-primary-blue",
  );

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  weekdays.forEach((day) => {
    const dayCell = document.createElement("div");
    dayCell.classList.add("text-center", "py-3"); // Increased padding
    dayCell.textContent = day;
    headerRow.appendChild(dayCell);
  });

  calendarContainer.appendChild(headerRow);

  let dayCount = 1;
  for (let i = 0; i < 5; i++) {
    const weekRow = document.createElement("div");
    weekRow.classList.add("grid", "grid-cols-7", "text-center");

    for (let j = 0; j < 7; j++) {
      const dayCell = document.createElement("div");
      dayCell.classList.add(
        "justify-center",
        "items-center",
        "py-3",
        "px-2",
        "border",
        "border-gray-300",
        "shadow-md",
      ); // Adjusted padding
      dayCell.style.fontSize = "1.2rem"; // Increased font size

      if (i === 0 && j < firstDayOfMonth) {
        dayCell.textContent = "";
      } else if (dayCount > daysInMonth) {
        dayCell.textContent = "";
      } else {
        dayCell.textContent = dayCount;
        dayCount++;

        if (i === 3) {
          dayCell.classList.add("bg-blue-300");
        }
      }

      weekRow.appendChild(dayCell);
    }

    calendarContainer.appendChild(weekRow);
  }
}
