const Calendar = ({ calendar }) => {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md p-4">
            <div className="text-lg font-semibold text-gray-800 mb-2">{calendar.name}</div>
            <p className="text-gray-600">{calendar.description}</p>
            <div className="mt-4 flex justify-end">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                    View Details
                </button>
            </div>
        </div>
    );
}

export default Calendar;
