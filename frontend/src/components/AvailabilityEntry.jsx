function getRandomColor() {
    // Array of predefined colors
    const colors = ['#52B7B1', '#EE6A4C', '#6EB3AF', '#F4F3ED', '#FBB5A5'];

    // Get a random index from the colors array
    const randomIndex = Math.floor(Math.random() * colors.length);

    // Return the random color
    return colors[randomIndex];
}

import React from 'react';

const AvailabilityEntry = ({ entry }) => {
    const { start_time, end_time } = entry;

    return (
        <div className="flex items-center mb-2 mr-2">
            <div className="py-2 px-4 text-sm shadow-xl rounded-md" style={{ backgroundColor: getRandomColor() }}>
                <p className="text-xs">{start_time.slice(0, -3)} - {end_time.slice(0, -3)}</p>
            </div>
        </div>
    );
};

export default AvailabilityEntry;
