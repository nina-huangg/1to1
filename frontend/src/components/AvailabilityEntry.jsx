import React from 'react';

// Assuming getColor function is defined elsewhere
const getColor = (preference) => {
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
};

const AvailabilityEntry = ({ entry, onDelete, calendarId }) => {
    const { id, start_time, end_time, preference } = entry;

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        onDelete(calendarId, id);
    };

    return (
        <div className="group relative flex items-center mb-2 mr-2">
            <div className="py-2 px-4 text-sm shadow-xl rounded-md" style={{ backgroundColor: getColor(preference) }}>
                <p className="text-xs">{start_time.slice(0, -3)} - {end_time.slice(0, -3)}</p>
            </div>
            {/* Delete button using Tailwind CSS for styling */}
            <button
                onClick={handleDeleteClick}
                className="absolute top-0 right-0 mt-1 mr-1 text-white font-bold rounded-full p-1 hidden group-hover:flex items-center justify-center w-4 h-4"
                style={{fontSize: '12px'}}
            >
                &times;
            </button>
        </div>
    );
};

export default AvailabilityEntry;

