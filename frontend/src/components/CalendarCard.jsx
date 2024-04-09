import { useNavigate } from 'react-router-dom';


const CalendarCard = ({ calendar }) => {
    const navigate = useNavigate();

    const getCalendar = () => {
        navigate(`/calendars/calendar/${calendar.id}`);
    };
    return (
        <div className="relative bg-white rounded-lg overflow-hidden shadow-md p-5 mr-6 mb-6 w-72">
            <div className="text-lg font-semibold text-gray-800 mb-1">{calendar.name}</div>
            {calendar.description && (
                <p className="text-gray-600 mb-7 overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {calendar.description}
                </p>
            )}
            <div className="absolute bottom-4 right-4">
                <button onClick={getCalendar} className="bg-primary-blue hover:bg-turquoise text-white font-semibold py-1 px-2 rounded text-sm">
                    View Details
                </button>
            </div>
        </div>
    );
}

export default CalendarCard;
