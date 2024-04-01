/** @format */

import React, { useState } from 'react';

// Cell component for time slots
const TimeSlotCell = ({ time, day, onClick, isSelected, preference }) => {
    const handleClick = () => {
        onClick(time, day);
    };

    let backgroundColor;
    switch (preference) {
        case 'high':
            backgroundColor = '#6EB3AF';
            break;
        case 'medium':
            backgroundColor = '#7ab3ef';
            break;
        case 'low':
            backgroundColor = '#FBB5A5';
            break;
        default:
            backgroundColor = 'white';
    }

    return (
        <div
            className={`grid grid-cols-1 bg-white border cursor-pointer`}
            style={{ backgroundColor: isSelected ? backgroundColor : 'white' }}
            onClick={handleClick}
        >
            <div className="w-full h-full flex items-center justify-center">
                {time}
            </div>
        </div>
    );
};


const Calendar = ({ selectedTimeSlots, setSelectedTimeSlots, slotPreference }) => {
    const [currentWeekStart, setCurrentWeekStart] = useState(new Date());

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
                    className="p-1 py-1 text-sm flex-grow text-center text-white bg-gray-500"
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

        // Find the date of the current week's Sunday
        const startOfWeek = new Date(currentWeekStart);
        startOfWeek.setDate(startOfWeek.getDate() - 1); // Set to Sunday
        // 30-minute blocks for each hour
        for (let hour = 8; hour <= 17; hour++) {
            for (let min = 0; min < 60; min += 30) {
                const time = `${hour < 10 ? `0${hour}` : hour}:${
                    min < 10 ? '0' : ''
                }${min}`;
                const timeSlotCells = daysOfWeek.map((day, dayIndex) => {
                    // Calculate the actual date for each day of the week
                    const dateOfSlot = new Date(startOfWeek);
                    dateOfSlot.setDate(startOfWeek.getDate() + dayIndex);

                    // Format the date to "YYYY-MM-DD"
                    const slotDate = dateOfSlot.toISOString().split('T')[0];

                    const isSelectedAndPreference = isSelectedTimeSlot(time, slotDate);
                    return (
                        <TimeSlotCell
                            key={`${day}-${time}`}
                            time={time}
                            day={slotDate}
                            onClick={() => handleTimeSlotClick(time, slotDate, slotPreference)} // Assuming `slotPreference` is available
                            isSelected={isSelectedAndPreference.isSelected}
                            preference={isSelectedAndPreference.preference}
                        />
                    );
                });
                timeSlots.push(
                    <div
                        key={`${hour}-${min}`}
                        className={`grid grid-cols-7 border p-1`}
                    >
                        {timeSlotCells}
                    </div>
                );
            }
        }

        return timeSlots;
    };

    const handleTimeSlotClick = (time, specificDate, preference) => {
        const slotIndex = selectedTimeSlots.findIndex(
            (slot) => slot.time === time && slot.day === specificDate
        );
    
        if (slotIndex === -1) {
            setSelectedTimeSlots([...selectedTimeSlots, { time, day: specificDate, preference }]);
        } else {
            // If clicked again, remove the slot.
            setSelectedTimeSlots(selectedTimeSlots.filter((_, index) => index !== slotIndex));
        }
    };
    

    const isSelectedTimeSlot = (time, specificDate) => {
        const found = selectedTimeSlots.find(
            (slot) => slot.time === time && slot.day === specificDate
        );
        if (found) {
            return { isSelected: true, preference: found.preference };
        }
        return { isSelected: false };
    };

    return (
        <div className="overflow-auto ml-8 mr-8">
            {/* Navigation arrows and title */}
            <div className="flex justify-between items-center mb-4">
                <button className="arrow-button" onClick={() => changeWeek(-1)}>
                    {'<'}
                </button>
                <h2>{`Week of ${currentWeekStart.toLocaleDateString(
                    'en-US',
                    { month: 'long', day: 'numeric', year: 'numeric' }
                )}`}</h2>
                <button
                    className="arrow-button justify-between"
                    onClick={() => changeWeek(1)}
                >
                    {'>'}
                </button>
            </div>

            {/* Week dates */}
            <div className="flex">{renderWeekDates()}</div>

            <div className="grid grid-cols-1 gap-0">{generateTimeSlots()}</div>
        </div>
    );
};

export default Calendar;
