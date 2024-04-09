// InvitationManagementModal.jsx
import React, { useState, useEffect } from 'react';
import AddContactsModal from './AddContactsModal';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api.js'
import ViewAvailabilityModal from './AvailabilitySubmittionModal';

const SuggestedScheduleModal = ({ isOpen, toggleModal }) => {
    const [contacts, setContacts] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [addedContacts, setAddedContacts] = useState([]); // Store the added contacts
    const [suggestedSchedule, setSuggestedSchedules] = useState([]);
    const { id: calendarId } = useParams();


    useEffect(() => {
        // if (isOpen) {
        //     fetchSchedule();
        // }
        fetchSchedule();
    }, [isOpen, calendarId]);

    const fetchSchedule = () => {
        return api.get(`calendars/${calendarId}/meetings/suggest_schedules/`)
            .then(res => {
                if (res.status === 200) {
                    setSuggestedSchedules(res.data.meeting_times);
                    console.log(res.data.meeting_times);
                    return res.data;
                } else {
                    console.error('Failed to fetch suggested schedules: Status Code', res.status);
                    return []; // Return an empty array in case of an error
                }
            })
            .catch(err => {
                alert(`Error fetching suggested schedules: ${err}`);
                return [];
            });
    };

    const handleSubmit = (num) => {
        const payload ={'meeting_times': suggestedSchedule[num-1]}
        api.post(`calendars/${calendarId}/book_meetings`, payload)
        .then((res) => {
            if (res.status === 200) {
                alert('Meetings booked');
            }
        }).catch((err) => alert(`Error: ${err}`));
        
    };

    const promptConflict = () => {
        // const payload ={'meeting_times': suggestedSchedule[num-1]}
        // api.post(`calendars/${calendarId}/book_meetings`, payload)
        // .then((res) => {
        //     if (res.status === 200) {
        //         alert('Meetings booked');
        //     }
        // }).catch((err) => alert(`Error: ${err}`));
        var users = '\n'
        for (var i=0; i<suggestedSchedule[0].length; i++){
            if (suggestedSchedule[0][i].default){
                users += (suggestedSchedule[0][i].invitee)
                users += '\n'
            }
        }
        if (users!== '\n'){
            alert(`Prompted: ${users}`)
        }else{
            alert('No conflicts detected!')
        }
        
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
            onClick={toggleModal}
        >
            <div
                className="relative top-20 mx-auto p-5 border w-3/4 h-3/4 shadow-lg rounded-md bg-white flex"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="overflow-y-auto h-full w-1/3 pr-2">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-3">Suggested Schedule 1</h3>
                    <div>
                        {suggestedSchedule[0].map((time) => (
                            <div key={time.id} className="bg-white shadow overflow-hidden rounded-md border border-gray-300 border-opacity-50 px-4 py-2 mb-2 text-left">
                                <div className="font-medium text-gray-900">{time.date}</div>
                                <div className="text-sm text-gray-500">{time.start_time}-{time.end_time}</div>
                                <div className="text-sm text-gray-500">Meet with: {time.invitee}</div>
                                {time.default && <div className="text-sm text-gray-500">No interval found - default used</div>}
                            </div>
                        ))}
                    </div>
                    <button
                    onClick={()=>handleSubmit(3)}
                    className="absolute bottom-16 right-25 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                    Select Schedule 1
                    </button>
                    <button
                    onClick={()=>promptConflict()}
                    className="absolute bottom-5 right-25 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                    Prompt conflicted users to resubmit
                    </button>
                </div>
                <div className="border-l-2 border-gray-300"></div>
                <div className="overflow-y-auto h-full w-1/3 pl-2 pr-2">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-3">Suggested Schedule 2</h3>
                    <div>
                        {suggestedSchedule[1].map((time) => (
                            <div key={time.id} className="bg-white shadow overflow-hidden rounded-md border border-gray-300 border-opacity-50 px-4 py-2 mb-2 text-left">
                                <div className="font-medium text-gray-900">{time.date}</div>
                                <div className="text-sm text-gray-500">{time.start_time}-{time.end_time}</div>
                                <div className="text-sm text-gray-500">Meet with: {time.invitee}</div>
                                {time.default && <div className="text-sm text-gray-500">No interval found - default used</div>}
                            </div>
                        ))}
                    </div>
                    <button
                    onClick={()=>handleSubmit(2)}
                    className="absolute bottom-5 right-25 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                    Select Schedule 2
                    </button>
                </div>
                <div className="border-l-2 border-gray-300"></div>
                <div className="overflow-y-auto h-full w-1/3 pl-2">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-3">Suggested Schedule 3</h3>
                    <div>
                        {suggestedSchedule[2].map((time) => (
                            <div key={time.id} className="bg-white shadow overflow-hidden rounded-md border border-gray-300 border-opacity-50 px-4 py-2 mb-2 text-left">
                                <div className="font-medium text-gray-900">{time.date}</div>
                                <div className="text-sm text-gray-500">{time.start_time}-{time.end_time}</div>
                                <div className="text-sm text-gray-500">Meet with: {time.invitee}</div>
                                {time.default && <div className="text-sm text-gray-500">No interval found - default used</div>}
                            </div>
                        ))}
                    </div>
                    
                    <button
                    onClick={()=>handleSubmit(3)}
                    className="absolute bottom-5 right-25 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                    Select Schedule 3
                    </button>
                </div>
                
            </div>
        </div>
    );
};    


export default SuggestedScheduleModal;
