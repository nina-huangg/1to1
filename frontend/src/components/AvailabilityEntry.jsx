function getColor(preference) {

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

    return backgroundColor;
}

import React from 'react';

const AvailabilityEntry = ({ entry }) => {
    const { start_time, end_time } = entry;

    return (
        <div className="flex items-center mb-2 mr-2">
            <div className="py-2 px-4 text-sm shadow-xl rounded-md" style={{ backgroundColor: getColor(entry.preference) }}>
                <p className="text-xs">{start_time.slice(0, -3)} - {end_time.slice(0, -3)}</p>
            </div>
        </div>
    );
};

export default AvailabilityEntry;
