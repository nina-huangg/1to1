/** @format */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api'; // Assuming you have an API setup similar to the Home component
import Calendar from '../components/Calendar';

const CalendarDetail = () => {
    const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
    const [calendarDetails, setCalendarDetails] = useState({});
    const [fetchedTimeSlots, setFetchedTimeSlots] = useState([]);
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
                    preference: 'high', // Assuming 'high' for all for simplicity
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
        // Place your POST request logic here...
    };

    const fetchCalendarDetails = () => {
        api.get(`/calendars/calendar/${calendarId}/`)
            .then((res) => {
                if (res.status === 200) {
                    setCalendarDetails(res.data);
                    // Assuming the fetched data includes availability slots
                    setFetchedTimeSlots(res.data.availability || []);
                } else {
                    console.log('Error fetching calendar details:', res.status);
                }
            })
            .catch((err) => console.error('Error:', err));
    };

    return (
        <div className="flex flex-col md:flex-row w-full">
            {/* Left Column for Calendar Details */}
            <div className="w-full md:w-1/3 p-5">
                <h2 className="text-4xl font-bold mb-4">
                    {calendarDetails.name}
                </h2>
                <p>{calendarDetails.description}</p>

            </div>

            {/* Right Column for Calendar */}
            <div className="w-full md:w-2/3">
                <Calendar
                    selectedTimeSlots={selectedTimeSlots}
                    setSelectedTimeSlots={setSelectedTimeSlots}
                    fetchedTimeSlots={fetchedTimeSlots}
                />
                <button
                    onClick={handleSubmit}
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Submit Availability
                </button>
            </div>
        </div>
    );
};

export default CalendarDetail;
