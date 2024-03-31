import React, { useState, useEffect } from 'react';
import api from '../api';

const AddContactsModal = ({ isOpen, toggleModal, calendarId, addContactsToCalendar }) => {
    const [contacts, setContacts] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);

    // Fetch contacts when the modal is opened
    useEffect(() => {
        if (isOpen) {
            api.get('contacts/contacts_index/')
                .then(res => {
                    if (res.status === 200) {
                        setContacts(res.data);
                    } else {
                        console.error('Failed to fetch contacts: Status Code', res.status);
                    }
                })
                .catch(err => {
                    alert(`Error: ${err}`);
                });
        }
    }, [isOpen]);

    const handleContactSelectionChange = (contactId) => {
        setSelectedContacts(current => {
            if (current.includes(contactId)) {
                return current.filter(id => id !== contactId);
            } else {
                return [...current, contactId];
            }
        });
    };

    const handleSubmit = () => {
        addContactsToCalendar(calendarId, selectedContacts);
        toggleModal(); // Close the modal after submission
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={toggleModal}>
            <div className="relative top-20 mx-auto p-5 border w-1/2 h-3/4 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Add Contacts</h3>
                <div className="overflow-y-auto h-5/6 mt-4">
                    {contacts.map(contact => (
                        <div key={contact.id} className="flex items-center">
                            <input
                                type="checkbox"
                                id={`contact-${contact.id}`}
                                checked={selectedContacts.includes(contact.id)}
                                onChange={() => handleContactSelectionChange(contact.id)}
                            />
                            <label htmlFor={`contact-${contact.id}`} className="ml-2">{contact.first_name} {contact.last_name}</label>
                        </div>
                    ))}
                </div>
                <button onClick={handleSubmit} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add Selected Contacts
                </button>
            </div>
        </div>
    );
};

export default AddContactsModal;
