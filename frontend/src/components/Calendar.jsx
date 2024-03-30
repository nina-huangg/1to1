/** @format */

import React, { useState } from 'react';

// Cell component for time slots
const TimeSlotCell = ({ time, day, onClick, isSelected }) => {
    const handleClick = () => {
        onClick(time, day);
    };

    return (
        <div
            className={`grid grid-cols-1 bg-white border cursor-pointer`}
            style={{ backgroundColor: isSelected ? 'lightblue' : 'white' }}
            onClick={handleClick}
        >
            <div className="w-full h-full flex items-center justify-center">
                {time}
            </div>
        </div>
    );
};

const Calendar = ({ selectedTimeSlots, setSelectedTimeSlots, fetchedTimeSlots }) => {
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
                    className="p-1 py-1 text-sm flex-grow text-center bg-primary-blue"
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
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Adjust to the start of the week (Sunday)

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
                    // const isSelected = isSelectedTimeSlot(time, slotDate);
                    // // Determine if slot is disabled based on fetchedTimeSlots
                    // const isDisabled = fetchedTimeSlots.some(slot => slot.date === slotDate && slot.time === time);
    
                    // return (
                    //     <TimeSlotCell
                    //         key={`${day}-${time}`}
                    //         time={time}
                    //         day={slotDate}
                    //         isSelected={isSelected}
                    //         isDisabled={isDisabled}
                    //     />
                    // );

                    return (
                        <TimeSlotCell
                            key={`${day}-${time}`}
                            time={time}
                            day={slotDate} // Use the actual date instead of day name
                            onClick={handleTimeSlotClick}
                            isSelected={isSelectedTimeSlot(time, slotDate)} // Adjust isSelected check
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

    const handleTimeSlotClick = (time, specificDate) => {
        const slotIndex = selectedTimeSlots.findIndex(
            (slot) => slot.time === time && slot.day === specificDate
        );

        if (slotIndex === -1) {
            setSelectedTimeSlots([
                ...selectedTimeSlots,
                { time, day: specificDate },
            ]);
        } else {
            setSelectedTimeSlots(
                selectedTimeSlots.filter((_, index) => index !== slotIndex)
            );
        }
    };

    const isSelectedTimeSlot = (time, specificDate) => {
        return selectedTimeSlots.some(
            (slot) => slot.time === time && slot.day === specificDate
        );
    };

    return (
        <div className="overflow-auto ml-8 mr-8">
            {/* Navigation arrows and title */}
            <div className="flex justify-between items-center mb-4">
                <button className="arrow-button" onClick={() => changeWeek(-1)}>
                    {'<'}
                </button>
                <h2 bg-gray-400>{`Week of ${currentWeekStart.toLocaleDateString(
                    'en-US',
                    { month: 'long', day: 'numeric', year: 'numeric' }
                )}`}</h2>
                <button className="arrow-button justify-between" onClick={() => changeWeek(1)}>
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
