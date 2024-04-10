/** @format */

import api from '../api';
import CalendarCard from '../components/CalendarCard';
import MeetingCard from '../components/MeetingCard';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header.jsx';
import React, {useState, useEffect } from 'react';



function BookedMeetings() {
    const [calendars, setCalendars] = useState([]);
    const [meetings, setMeetings] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [showPopup, setShowPopup] = useState(false);
     const navigate = useNavigate();


    useEffect(() => {
        getMeetings();
    }, []);

    const getMeetings = async () => {
        try{
            const response = await api.get('calendars/meetings/')
 
                setMeetings(response.data.meeting_times);
                console.log(meetings);
            
        }catch (error){
            alert(error);
        }

    };
    const getCalendars = () => {
        api.get('calendars/details/')
            .then((res) => {
                if (res.status === 200) {
                    setCalendars(res.data);
                    console.log(res.data);
                } else if (res.status === 404) {
                    console.log('No calendars found');
                } else if (res.status === 401) {
                    navigate('/login');
                } else {
                    console.log('Error:', res.status);
                }
            })
            .catch((err) => alert(err));
    };

    const createCalendar = (e) => {
        e.preventDefault();
        setShowPopup(false);
        api.post('/calendars/create/', { name, description })
            .then((res) => {
                if (res.status === 200) {
                    alert('Calendar created!');
                    getCalendars();
                    setName('');
                    setDescription('');
                    const calendar_id = res.data.id;
                    navigate(`/calendars/calendar/${calendar_id}`);
                } else {
                    alert('Failed to create calendar.');
                }
            })
            .catch((err) => alert(err));
    };

    const handleDeleteCalendar = (calendarId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete the calendar?");
        if (isConfirmed) {
            api.delete(`/calendars/delete/${calendarId}/`)
                .then((res) => {
                    if (res.status === 204) {
                        alert("Calendar deleted!");
                        // Filter out the deleted calendar and update the state
                        setCalendars(currentCalendars => currentCalendars.filter(calendar => calendar.id !== calendarId));
                    } else {
                        alert("Failed to delete calendar.");
                    }
                })
                .catch((error) => alert(error));
            return;
        }
    };

    const handleAddCalendar = () => {
        setShowPopup(true);
    };



    return (
        <>
        <Header/>
        <div className="flex flex-col items-start min-h-screen p-6 relative">
            <div className="w-full md:w-3/4 flex items-center">
                <h2 className="text-3xl font-bold mb-8">Upcoming Meetings</h2>
                </div>
            <div className="w-full md:w-3/4">
                <div className="flex flex-wrap">
                    {meetings.map((meet) => (
                        <MeetingCard meet={meet}/>
                    ))}
                </div>
            </div>
        </div>
        </>
        
    );
}

export default BookedMeetings;