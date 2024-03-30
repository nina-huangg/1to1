/** @format */

import React from 'react';

const MeetingDateSelector = ({ year, month }) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const renderHeaderRow = () => (
        <div className="grid grid-cols-7 text-center font-bold text-white bg-primary-blue">
            {weekdays.map((day) => (
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
                    const isHighlighted = i === 3; // Example condition for highlighting
                    days.push(
                        <div
                            key={dayCount}
                            className={`justify-center items-center py-3 px-2 border border-gray-300 shadow-md ${
                                isHighlighted ? 'bg-blue-300' : ''
                            }`}
                        >
                            {dayCount}
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
            {renderHeaderRow()}
            {renderWeekRow()}
        </div>
    );
};

export default MeetingDateSelector;
