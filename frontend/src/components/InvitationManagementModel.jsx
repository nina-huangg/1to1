// InvitationManagementModal.jsx
import React, { useState } from 'react';
import AddContactsModal from './AddContactsModal';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api.js'
import ViewAvailabilityModal from './AvailabilitySubmittionModal';

const InvitationManagementModal = ({ isOpen, toggleModal }) => {
    const [isContactsModalOpen, setIsContactsModalOpen] = useState(false);
    const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);
    const toggleContactsModal = () => setIsContactsModalOpen(!isContactsModalOpen);
    const toggleAvailabilityModal = () => setIsAvailabilityModalOpen(!isAvailabilityModalOpen);
    const { id: calendarId } = useParams();


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={toggleModal}>
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Invitation Management</h3>
                    <div className="mt-2 px-7 py-3">
                        <button onClick={toggleContactsModal} className="text-blue-500 hover:text-blue-700 font-semibold block">Add Invitees</button>
                        <AddContactsModal isOpen={isContactsModalOpen} toggleModal={toggleContactsModal} calendarId={calendarId}/>
                        <button onClick={toggleAvailabilityModal}className="text-blue-500 hover:text-blue-700 font-semibold block">View Availability Submission</button>
                        <ViewAvailabilityModal isOpen={isAvailabilityModalOpen} toggleModal={toggleAvailabilityModal} calendarId={calendarId}/>
                    </div>
                    <div className="items-center px-4 py-3">
                        <button onClick={toggleModal} className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvitationManagementModal;
