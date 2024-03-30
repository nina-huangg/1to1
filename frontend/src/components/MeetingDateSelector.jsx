import React, { useState } from 'react';

const MeetingDateSelector = ({ selectedDates, setSelectedDates }) => {
    const minDate = new Date().getDate() - 1;
    
    const [currentDate, setCurrentDate] = useState(new Date());

    const changeMonth = (increment) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + increment);
        if (minDate && newDate < minDate) return;
        setCurrentDate(newDate);
    };

    const monthYearString = currentDate.toLocaleString('en-US', {
        month: 'long',
        year: 'numeric',
    });

    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();

    const handleDayClick = (day) => {
        const date = new Date(year, month - 1, day);
        const selectedDate = {
          day: day,
          month: month,
          year: year,
          date: date.toDateString(),
        };
        const updatedSelectedDates = [...selectedDates, selectedDate];
        setSelectedDates(updatedSelectedDates);
      };

    const renderHeaderRow = () => (
        <div className="grid grid-cols-7 text-center font-bold text-white bg-primary-blue">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center py-3">
                    {day}
                </div>
            ))}
        </div>
    );

    const renderWeekRow = () => {
        let dayCount = 1;
        const rows = [];
        for (let i = 0; i < 5; i++) {
            const days = [];
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDayOfMonth) {
                    days.push(
                        <div
                            key={`empty-${j}`}
                            className="justify-center items-center py-3 px-2 border border-gray-300 shadow-md"
                        ></div>
                    );
                } else if (dayCount > daysInMonth) {
                    days.push(
                        <div
                            key={`empty-${j}`}
                            className="justify-center items-center py-3 px-2 border border-gray-300 shadow-md"
                        ></div>
                    );
                } else {
                    const day = dayCount;
                    const isSelected = selectedDates.some(
                        (date) =>
                            date.day === day &&
                            date.month === month &&
                            date.year === year
                    );
                    days.push(
                        <div
                            key={day}
                            className={`justify-center items-center py-3 px-2 border border-gray-300 shadow-md ${
                                isSelected ? 'bg-green-500' : ''
                            }`}
                            onClick={() => handleDayClick(day)}
                        >
                            {day}
                        </div>
                    );
                    dayCount++;
                }
            }
            rows.push(
                <div key={`row-${i}`} className="grid grid-cols-7 text-center">
                    {days}
                </div>
            );
        }
        return rows;
    };


    return (
        <div className="meetings-date-container">
            <div className="flex justify-between mb-2">
                <div className="arrow-container">
                    <button className="arrow-button bg-primary-blue right-40 px-3 py-1 text-white rounded" onClick={() => changeMonth(-1)} disabled={minDate && new Date(year, month - 2) < minDate}>
                        {'<'}
                    </button>
                </div>
                <div>{monthYearString}</div>
                <div className="arrow-container">
                    <button className="arrow-button bg-primary-blue px-3 py-1 text-white rounded" onClick={() => changeMonth(1)}> {'>'} </button>
                </div>
            </div>
            {renderHeaderRow()}
            {renderWeekRow()}
        </div>
    );

};

export default MeetingDateSelector;
