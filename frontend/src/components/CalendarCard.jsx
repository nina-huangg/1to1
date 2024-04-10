import { useNavigate } from 'react-router-dom';


const CalendarCard = ({ calendar, onDelete }) => {
    const navigate = useNavigate();

    const getCalendarView = () => {
        navigate(`/calendars/calendar/${calendar.id}`);
    };
    return (
        <div className="relative bg-white rounded-lg overflow-hidden shadow-md p-5 mr-6 mb-6 w-72">
            <div className="text-lg font-semibold text-gray-800 mb-1">{calendar.name}</div>
            <div className="text-gray-600 mb-7 overflow-hidden overflow-ellipsis whitespace-nowrap"></div>
            {calendar.description && (
                <p className="text-gray-600 mb-7 overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {calendar.description}
                </p>
            )}
    
            <div className="absolute bottom-4 right-4">
                <button onClick={getCalendarView} className="bg-logo-color hover:bg-turquoise text-white font-semibold py-1 px-2 rounded text-sm">
                    View Details
                </button>
                <button  onClick={() => onDelete(calendar.id)} className="bg-orange hover:bg-turquoise text-white font-semibold py-1 px-2 ml-3 rounded text-sm">
                    Delete Calendar
                </button>
            </div>
        </div>
    );
}

export default CalendarCard;
