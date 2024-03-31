/** @format */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import Calendar from '../components/Calendar';
import AvailabilityEntry from '../components/AvailabilityEntry';
import InvitationManagementModal from '../components/InvitationManagementModel';
import AvailabilityPreferenceDropdown from '../components/AvailabilityPreferenceDropdown';

const CalendarDetail = () => {
    const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
    const [calendarDetails, setCalendarDetails] = useState({});
    const [slotPreference, setSlotPreference] = useState('');
    const [availabilityData, setAvailabilityData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => setIsModalOpen(!isModalOpen);
    const { id: calendarId } = useParams();
    // const navigate = useNavigate();

    useEffect(() => {
        fetchCalendarDetails();
    }, [calendarId]);

    // This function sorts the time slots first by date, then by start time.
    const sortTimeSlots = (a, b) => {
        const dateComparison = a.day.localeCompare(b.day);
        if (dateComparison !== 0) return dateComparison;
        return a.time.localeCompare(b.time);
    };

    const groupAvailabilityByDate = (availabilityData) => {
        const grouped = {};
        availabilityData.forEach((entry) => {
            if (!grouped[entry.date]) {
                grouped[entry.date] = [];
            }
            grouped[entry.date].push(entry);
        });
        return grouped;
    };

    // Function to prepare the payload
    const preparePayloadForBackend = (selectedTimeSlots) => {
        // Sort the slots
        const sortedSlots = [...selectedTimeSlots].sort(sortTimeSlots);
        const availabilitySet = [];

        sortedSlots.forEach((slot, index) => {
            // Convert slot start time to a Date object
            const slotStartTime = new Date(`${slot.day} ${slot.time}`);
            const slotEndTime = new Date(slotStartTime.getTime() + 30 * 60000); // Add 30 mins

            // For the first slot or when there's a day change or non-continuous time slot, start a new group
            if (
                index === 0 ||
                sortedSlots[index - 1].day !== slot.day ||
                new Date(
                    `${sortedSlots[index - 1].day} ${
                        sortedSlots[index - 1].time
                    }`
                ).getTime() +
                    30 * 60000 !==
                    slotStartTime.getTime()
            ) {
                availabilitySet.push({
                    date: slot.day,
                    start_time: slot.time + ':00',
                    end_time:
                        slotEndTime.toTimeString().substring(0, 5) + ':00',
                    preference: slot.preference, // Assuming 'high' for all for simplicity
                });
            } else {
                // If continuous, update the end time of the last group
                const lastGroup = availabilitySet[availabilitySet.length - 1];
                lastGroup.end_time =
                    slotEndTime.toTimeString().substring(0, 5) + ':00';
            }
        });

        return { availability_set: availabilitySet };
    };

    const groupedAvailability = groupAvailabilityByDate(availabilityData);
    
    const handleSubmit = async () => {
        const payload = preparePayloadForBackend(selectedTimeSlots);
        console.log('Prepared Payload:', JSON.stringify(payload, null, 2)); // For debugging
        api.post(`/calendars/${calendarId}/availability/select/`, payload)
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    // Check for success status codes
                    alert('Time slots successfully submitted!');
                    // Optionally, navigate or refresh details
                    fetchCalendarDetails();
                } else {
                    alert('Failed to submit time slots.');
                }
            })
            .catch((err) => alert('Error:', err));
    };

    const fetchCalendarDetails = () => {
        api.get(`/calendars/calendar/${calendarId}/`)
            .then((res) => {
                if (res.status === 200) {
                    setCalendarDetails(res.data);
                    setAvailabilityData(res.data.availability_set);
                    console.log('Fetched Calendar Details:', res.data); // Print the fetched data
                } else {
                    console.log('Error fetching calendar details:', res.status);
                }
            })
            .catch((err) => alert('Error:', err));
    };

    return (
        <div className="flex flex-col md:flex-row w-full">
            <div className="w-full md:w-1/3 p-5">
                <h2 className="text-4xl font-bold mb-4">
                    {calendarDetails.name}
                </h2>
                <p>{calendarDetails.description}</p>
                <button onClick={toggleModal} className="p-2">
                    <span>👤</span> {/* Placeholder for your icon */}
                </button>
                <hr className="my-4 border-t-2 border-gray-300" />


                {/* Using the InvitationManagementModal component */}
                <InvitationManagementModal isOpen={isModalOpen} toggleModal={toggleModal} />


                <div className="font-bold text-xl mb-2">
                    Submitted Time Slots
                </div>
                <div className="max-h-[500px] overflow-y-auto">
                    {Object.entries(groupedAvailability).map(
                        ([date, entries], index) => (
                            <div key={index} className="mb-6">
                                <div className="font-bold text-m mb-2">
                                    {date}
                                </div>
                                <div className="flex flex-wrap">
                                    {entries.map((entry, entryIndex) => (
                                        <AvailabilityEntry
                                            key={entryIndex}
                                            entry={entry}
                                        />
                                    ))}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Right Column for Calendar */}
            <div className="w-full md:w-2/3">
                <div className="flex items-center justify-center mb-4 space-x-4">
                    <div>
                        <AvailabilityPreferenceDropdown
                            onSelect={(preference) =>
                                setSlotPreference(preference)
                            }
                            value={slotPreference}
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-150 ease-in-out"
                    >
                        Submit Availability
                    </button>
                </div>

                <Calendar
                    selectedTimeSlots={selectedTimeSlots}
                    setSelectedTimeSlots={setSelectedTimeSlots}
                    slotPreference={slotPreference} // Pass slotPreference to Calendar
                />
            </div>
        </div>
    );
};

export default CalendarDetail;
