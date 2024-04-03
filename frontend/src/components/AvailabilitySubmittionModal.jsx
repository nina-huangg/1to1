/** @format */

import React, { useState, useEffect } from 'react';
import api from '../api';

const ViewAvailabilityModal = ({ isOpen, toggleModal, calendarId }) => {
    const [responded, setResponded] = useState([]);
    const [notResponded, setNotResponded] = useState([]);
    const [addedContacts, setAddedContacts] = useState([]); // Store the added contacts


    const sendReminder=async()=>{
        try{
            const response = await api.post(`/calendars/${calendarId}/invite/remind/`);
            console.log(response.data.users_reminded)
            if (response.data.users_reminded.length>0){
                var remind = ''
                for (let i=0; i<response.data.users_reminded.length; i++){
                    remind += (response.data.users_reminded[i])
                    remind += '\n'
                };
                alert('These users have been notified: \n'+remind);
            }else{
                alert('All users have responded.');
            }
            
        }catch(error){
            alert(error)
        }
    };


    useEffect(() => {
        const fetchData = async () =>{
            if (isOpen) {
                // Fetch all available contacts
                try{
                    const response = await api.get(`calendars/${calendarId}/invite/status/`);
                    console.log(response)
                    setResponded(response.data.responded);
                    setNotResponded(response.data.not_responded);
    
                }catch(error){
                    alert(error);
                }
            };

        };
        fetchData();
    }, [isOpen, calendarId]);

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
                <div className="overflow-y-auto h-full w-1/2 pr-2">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-3">Responded:</h3>
                    <div>
                        {responded.map((contact) => (
                            <div key={contact.id} className="bg-white shadow overflow-hidden rounded-md border border-gray-300 border-opacity-50 px-4 py-2 mb-2 text-left">
                                <div className="font-medium text-gray-900">{contact.first_name} {contact.last_name}</div>
                                <div className="text-sm text-gray-500">{contact.email}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="border-l-2 border-gray-300"></div>
                <div className="overflow-y-auto h-full w-1/2 pl-2">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-1">Not Yet Responded:</h3>
                    {notResponded.map((contact) => (
                            <div key={contact.id} className="bg-white shadow overflow-hidden rounded-md border border-gray-300 border-opacity-50 px-4 py-2 mb-2 text-left">
                                <div className="font-medium text-gray-900">{contact.first_name} {contact.last_name}</div>
                                <div className="text-sm text-gray-500">{contact.email}</div>
                            </div>
                        ))}
                </div>
                <button
                    onClick={sendReminder}
                    className="absolute bottom-5 right-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Remind users
                </button>
            </div>
        </div>
    );
};    

export default ViewAvailabilityModal;
