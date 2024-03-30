import React, { useState } from 'react';

// Cell component for time slots
const TimeSlotCell = ({ time, day, onClick, isSelected, isDisabled }) => {
  const handleClick = () => {
    if (!isDisabled) {
      onClick(time, day);
    }
  };

  return (
    <div
      className={`grid grid-cols-1 bg-white border p-1 cursor-pointer ${isSelected ? 'bg-blue-200' : ''} ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`}
      onClick={handleClick}
    >
      {time}
    </div>
  );
};

const Calendar = ({ selectedDates }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

  const changeWeek = (increment) => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + increment * 7);
    setCurrentWeekStart(newDate);
  };

  const renderWeekDates = () => {
    const dates = [];
    const startDate = new Date(currentWeekStart);
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      dates.push(
        <div
          key={i}
          className="p-1 text-sm flex-grow text-center bg-gray-400"
        >
          {date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })}
        </div>
      );
    }
    return dates;
  };

  const generateTimeSlots = () => {
    const timeSlots = [];
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    // 30-minute blocks for each hour
    for (let hour = 8; hour <= 17; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const time = `${hour < 10 ? `0${hour}` : hour}:${min < 10 ? '0' : ''}${min}`;
        const timeSlotCells = daysOfWeek.map((day, index) => {
          const isSelected = isSelectedTimeSlot(time, day);

          const currentDate = new Date(currentWeekStart);
          currentDate.setDate(currentDate.getDate() + index); // Adjust current date to match each day of the week

          // Check if the time slot should be disabled based on selected dates
          const isDisabled = !selectedDates.some((date) => {
            const selectedDate = new Date(
              date.year,
              date.month - 1,
              date.day
            );
            return (
              selectedDate.toDateString() === currentDate.toDateString()
            ); // Compare only dates without time
          });

          return (
            <TimeSlotCell
              key={`${day}-${time}`}
              time={time}
              day={day}
              onClick={handleTimeSlotClick}
              isSelected={isSelected}
              isDisabled={isDisabled} // Pass isDisabled prop to TimeSlotCell
            />
          );
        });
        timeSlots.push(
          <div
            key={`${time}`}
            className={`grid grid-cols-7 border p-1`}
          >
            {timeSlotCells}
          </div>
        );
      }
    }

    return timeSlots;
  };

  const handleTimeSlotClick = (time, day) => {
    const slotIndex = selectedTimeSlots.findIndex(
      (slot) => slot.time === time && slot.day === day
    );

    if (slotIndex === -1) {
      // Slot not selected, add it
      setSelectedTimeSlots([...selectedTimeSlots, { time, day }]);
    } else {
      // Slot already selected, remove it
      setSelectedTimeSlots(
        selectedTimeSlots.filter((slot) => !(slot.time === time && slot.day === day))
      );
    }
  };

  const isSelectedTimeSlot = (time, day) => {
    return selectedTimeSlots.some(
      (slot) => slot.time === time && slot.day === day
    );
  };

  return (
    <div className="overflow-auto ml-8 mr-8">
      {/* Navigation arrows and title */}
      <div className="flex justify-between items-center mb-4">
        <button className="arrow-button" onClick={() => changeWeek(-1)}>{'<'}</button>
        <h2>{`Week of ${currentWeekStart.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}</h2>
        <button className="arrow-button" onClick={() => changeWeek(1)}>{'>'}</button>
      </div>

      {/* Week dates */}
      <div className="flex">
        {renderWeekDates()}
      </div>

      <div className="grid grid-cols-1 gap-0">
        {generateTimeSlots()}
      </div>
    </div>
  );
};

export default Calendar;
