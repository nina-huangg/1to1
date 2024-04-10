import { useNavigate } from 'react-router-dom';


const MeetingCard = ({ meet }) => {
    const navigate = useNavigate();
    console.log(meet);

    return (
        <div className="relative bg-white rounded-lg overflow-hidden shadow-md p-5 mr-6 mb-6 w-72">
            <div className="text-lg text-center font-semibold text-gray-800 mb-1">{meet.calendar}</div>
            <div className="text-sm font-semibold text-gray-800 mb-1">Date: {meet.date}</div>
            <div className="text-sm font-semibold text-gray-800 mb-1">Meet with: {meet.invitee}</div>
            <div className="text-sm font-semibold text-gray-800 mb-1">Time: {meet.start_time}-{meet.end_time}</div>
            
            
    
            {/* <div className="absolute bottom-4 right-4">
                
                <button  onClick={() => handleDelete(meet.id)} className="bg-orange hover:bg-turquoise text-white font-semibold py-1 px-1 ml-3 rounded text-xs">
                    Delete Meeting
                </button>
            </div> */}
        </div>
    );
}

export default MeetingCard;
