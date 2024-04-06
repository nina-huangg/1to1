
/** @format */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import Calendar from '../components/Calendar';
import AvailabilityEntry from '../components/AvailabilityEntry';
import InvitationManagementModal from '../components/InvitationManagementModel';
import AvailabilityPreferenceDropdown from '../components/AvailabilityPreferenceDropdown';
import Header from '../components/Header.jsx';
import {Link, useNavigate} from 'react-router-dom';

function Invite(){

    const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
    const [calendarDetails, setCalendarDetails] = useState({});
    const [slotPreference, setSlotPreference] = useState('');
    const [availabilityData, setAvailabilityData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => setIsModalOpen(!isModalOpen);
    const navigate = useNavigate();
    
    const {id:id, inviteId:inviteId } = useParams();
    const [inviter, setInviter] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(()=>{
        // const fetchData = async () =>{
        //     try{
        //         const response = await api.get(`/calendars/${id}/invite/${inviteId}/`);
        //         console.log(response.data)
        //         setInviter(response.data.inviter);
        //         setAvailabilityData(response.data.availability_set);

        //         const calendarResponse = await api.get(`/calendars/calendar/${id}/`);
        //         setCalendarDetails(calendarResponse.data);
        //         console.log(calendarResponse.data)
                
        //     }catch(error){
        //         navigate('*');
        //     }
        // };
        fetchData();
    }, [id]);

    const fetchData = async () =>{
        try{
            const response = await api.get(`/calendars/${id}/invite/${inviteId}/`);
            setInviter(response.data.inviter);
            setAvailabilityData(response.data.availability_set);

            const calendarResponse = await api.get(`/calendars/calendar/${id}/`);
            setCalendarDetails(calendarResponse.data);
            
        }catch(error){
            navigate('*');
        }
    };
    
    //This function sorts the time slots first by date, then by start time.
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
    const preparePayloadForBackend = (selectedTimeSlots) => {
        // Sort the slots
        const sortedSlots = [...selectedTimeSlots].sort(sortTimeSlots);
        const availabilitySet = [];

        sortedSlots.forEach((slot, index) => {
            // Convert slot start time to a Date object
            const slotStartTime = new Date(`${slot.day} ${slot.time}`);
            const slotEndTime = new Date(slotStartTime.getTime());

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
                    preference: slot.preference,
                });
            } else {
                const lastGroup = availabilitySet[availabilitySet.length - 1];
                lastGroup.end_time =
                    slotEndTime.toTimeString().substring(0, 5) + ':00';
            }
        });
        console.log(availabilitySet);
        return { availability_set: availabilitySet };
    };

    const groupedAvailability = groupAvailabilityByDate(availabilityData);

    const handleSubmit = async () => {
        const payload = preparePayloadForBackend(selectedTimeSlots);
        console.log('Prepared Payload:', JSON.stringify(payload, null, 2)); // For debugging
        try{
            const res = await api.post(`/calendars/${id}/invite/${inviteId}/`, payload)
            fetchData();
            alert('Time slots successfully submitted!');
            
            setSuccess(true);
        }catch(error){
                console.log(error);
                alert('Error:', error);
        }
    };

    return(
        <>
        <header className="h-30px xl:h-60px lg:h-60px md:h-40px sm:h-40px">
        <div className="flex flex-row items-center justify-between">
            <div className="xl:w-40 lg:w-40 md:w-32 sm:w-32 w-28 xl:h-12 lg:h-12 md:h-10 sm:h-10 h-8 
            xl:px-8 lg:px-8 md:px-6 sm:px-6 px-4 xl:py-2.5 lg:py-2.5 md:py-1.5 sm:py-1.5 py-1.5 xl:mx-10 lg:mx-10 md:mx-7 sm:mx-7
            mx-4 my-5 xl:text-xl lg:text-xl md:text-lg sm:text-lg text-sm rounded-full text-center align-middle shadow-lg
              shadow-gray-400 bg-logo-color text-white" to='/home'>
            1 ON 1
            </div>
        </div>
        </header>
        <div className="flex flex-col md:flex-row w-full">
            <div className="w-full md:w-1/3 p-5">
                <h2 className="text-4xl font-bold mb-4">
                    {inviter}'s Calendar
                </h2>
                <p>{calendarDetails.description}</p>
                 
                <hr className="my-4 border-t-2 border-gray-300" />

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
                        className="bg-primary-blue hover:bg-turquoise text-white font-semibold py-2 px-4 rounded transition duration-150 ease-in-out"
                    >
                        Submit Availability
                    </button>
                </div>

                <Calendar
                    selectedTimeSlots={selectedTimeSlots}
                    setSelectedTimeSlots={setSelectedTimeSlots}
                    slotPreference={slotPreference}
                />
            </div>
        </div>
        </>
    );
};

    export default Invite;