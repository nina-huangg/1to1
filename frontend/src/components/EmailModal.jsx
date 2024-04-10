/** @format */

import React, { useState, useEffect } from 'react';
import api from '../api';

const EmailModal = ({ isOpen, toggleModal, calendarId }) => {
    const [contacts, setContacts] = useState([]);
    const [inviter, setInviter] = useState('');

    const [selectedContacts, setSelectedContacts] = useState([]);
    const [addedContacts, setAddedContacts] = useState([]); // Store the added contacts

    useEffect(() => {
        if (isOpen) {
            fetchEmailLinks();
        }
    }, [isOpen, calendarId]);

    const fetchEmailLinks = async () => {
        try{
            const res = await api.get(`calendars/${calendarId}/invitations/links`);
            setContacts(res.data.details);
            if (res.data.details.length!==0){
                setInviter(res.data.details[0].invited_by);
            }
            
        }catch(error){
            alert(`Error fetching: ${error}`);
        }
    };

    const getLink = () => {

    }

    const addContactsToCalendar = (calendarId, selectedContacts) => {
        const payload = { contacts: selectedContacts.map((id) => ({ id })) };
        api.post(`calendars/${calendarId}/contacts/add/`, payload)
            .then((res) => {
                if (res.status === 200) {
                    alert('Successfully added contacts to calendar');
                    fetchAddedContacts();
                    setSelectedContacts([]); // Optionally clear selection
                } else {
                    alert('Failed to add contacts to calendar');
                }
            })
            .catch((err) => alert(`Error: ${err}`));
    };

    const handleContactSelectionChange = (contactId) => {
        setSelectedContacts((current) => {
            if (current.includes(contactId)) {
                return current.filter((id) => id !== contactId);
            } else {
                return [...current, contactId];
            }
        });
    };

    const handleSubmit = () => {
        addContactsToCalendar(calendarId, selectedContacts);
        fetchAddedContacts();
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
                <div className="overflow-y-auto h-full w-1/2 pr-2">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-3">Template</h3>
                    <span></span>
                    <div className="bg-white shadow overflow-hidden rounded-md border border-gray-300 border-opacity-50 px-4 py-2 mb-2 text-left">
                        <text>
                        Hi! <br/><br/>I am inviting you to a meeting with me.<br/><br/>Please click on the following link to fill it out:
                    </text>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <text>{inviter}</text>
                    </div>
                    <div className="bg-white shadow overflow-hidden rounded-md border border-gray-300 border-opacity-50 px-4 py-2 mb-2 text-left">
                        <text>
                        Hi. <br/><br/>There is a conflict in the time you inputed.<br/><br/>Please fill out the calendar again by clicking on the following link:
                    </text>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <text>{inviter}</text>
                    </div>
                    <div className="bg-white shadow overflow-hidden rounded-md border border-gray-300 border-opacity-50 px-4 py-2 mb-2 text-left">
                        <text>
                        Hi. <br/><br/>Just a friendly reminder to please fill out the calendar by clicking on the following link:
                    </text>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <text>{inviter}</text>
                    </div>
                </div>
                <div className="border-l-2 border-gray-300"></div>
                <div className="overflow-y-auto h-full w-1/2 pl-2">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-1">Links:</h3>
                    <div>
                        {contacts.map((contact) => (
                            <div key={contact.id} className="bg-white shadow overflow-hidden rounded-md border border-gray-300 border-opacity-50 px-4 py-2 mb-2 text-left">
                                <div className="text-sm text-gray-500">{contact.name}</div>
                                <div className="font-medium text-gray-900">/calendars/{calendarId}/invite/{contact.invitation}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};    

export default EmailModal;
