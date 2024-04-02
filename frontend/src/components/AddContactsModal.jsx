/** @format */

import React, { useState, useEffect } from 'react';
import api from '../api';

const AddContactsModal = ({ isOpen, toggleModal, calendarId }) => {
    const [contacts, setContacts] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [addedContacts, setAddedContacts] = useState([]); // Store the added contacts

    useEffect(() => {
        if (isOpen) {
            // Fetch all available contacts
            api.get('contacts/contacts_index/')
                .then(res => {
                    if (res.status === 200) {
                        // Fetch added contacts to filter out already added ones
                        fetchAddedContacts().then(added => {
                            const addedContactIds = new Set(added.map(contact => contact.id));
                            const filteredContacts = res.data.filter(contact => !addedContactIds.has(contact.id));
                            setContacts(filteredContacts);
                        });
                    } else {
                        console.error('Failed to fetch contacts: Status Code', res.status);
                    }
                })
                .catch(err => {
                    alert(`Error: ${err}`);
                });
        }
    }, [isOpen, calendarId]);


    const fetchAddedContacts = () => {
        return api.get(`calendars/${calendarId}/contacts/`)
            .then(res => {
                if (res.status === 200) {
                    console.log('Fetched Contacts', res.data);
                    setAddedContacts(res.data);
                    return res.data;
                } else {
                    console.error('Failed to fetch added contacts: Status Code', res.status);
                    return []; // Return an empty array in case of an error
                }
            })
            .catch(err => {
                alert(`Error fetching added contacts: ${err}`);
                return [];
            });
    };

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
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-3">Added Contacts</h3>
                    <div>
                        {addedContacts.map((contact) => (
                            <div key={contact.id} className="bg-white shadow overflow-hidden rounded-md border border-gray-300 border-opacity-50 px-4 py-2 mb-2 text-left">
                                <div className="font-medium text-gray-900">{contact.first_name} {contact.last_name}</div>
                                <div className="text-sm text-gray-500">{contact.email}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="border-l-2 border-gray-300"></div>
                <div className="overflow-y-auto h-full w-1/2 pl-2">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-1">Select Contacts to Add:</h3>
                    {contacts.map((contact) => (
                        <div key={contact.id} className="flex items-center py-1">
                            <input
                                type="checkbox"
                                id={`contact-${contact.id}`}
                                checked={selectedContacts.includes(contact.id)}
                                onChange={() => handleContactSelectionChange(contact.id)}
                            />
                            <label htmlFor={`contact-${contact.id}`} className="ml-2">
                                {contact.first_name} {contact.last_name}
                            </label>
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleSubmit}
                    className="absolute bottom-5 right-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add Selected Contacts
                </button>
            </div>
        </div>
    );
};    

export default AddContactsModal;
