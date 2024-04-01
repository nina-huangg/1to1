/** @format */

import api from '../api';
import React, { useState, useEffect } from 'react';
import CalendarCard from '../components/CalendarCard';
import { useNavigate } from 'react-router-dom';


function Home() {
    const [calendars, setCalendars] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [showPopup, setShowPopup] = useState(false);
     const navigate = useNavigate();


    useEffect(() => {
        getCalendars();
    }, []);

    const getCalendars = () => {
        api.get('calendars/details/')
            .then((res) => {
                if (res.status === 200) {
                    setCalendars(res.data);
                    console.log(res.data);
                } else if (res.status === 404) {
                    console.log('No calendars found');
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

    const handleAddCalendar = () => {
        setShowPopup(true);
    };



    return (
        <div className="flex flex-col items-start justify-center min-h-screen p-6 relative">
            <div className="w-full md:w-3/4 flex items-center">
                <h2 className="text-3xl font-bold mb-8">Calendars</h2>
                <button onClick={handleAddCalendar} className="bg-primary-blue hover:bg-turquoise text-white font-semibold rounded py-1 px-1 ml-6 mb-8">+ Add Calendar</button>
            </div>
            <div className="w-full md:w-3/4">
                <div className="flex flex-wrap">
                    {calendars.map((calendar) => (
                        <CalendarCard calendar={calendar}/>
                    ))}
                </div>
            </div>
            {showPopup && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-8 rounded shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Create a Calendar</h2>
                        <form onSubmit={createCalendar}>
                            <label htmlFor="name">Name:</label>
                            <br />
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                className="border rounded p-2 mb-4 w-full"
                            />
                            <label htmlFor="description">Description:</label>
                            <br />
                            <textarea
                                id="description"
                                name="description"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                className="border rounded p-2 mb-4 w-full"
                            />
                            <div className="flex justify-center">
                                <button type="submit" className="bg-primary-blue hover:bg-turquoise text-white font-semibold py-2 px-4 rounded">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;