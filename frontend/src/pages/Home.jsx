/** @format */

import api from '../api';
import CalendarCard from '../components/CalendarCard';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header.jsx';
import React, {useState, useEffect } from 'react';

function TimezoneDropdown(){
    const [isOpen, setIsOpen] = useState(false);
    const [item, setSelected] = useState('Eastern Time');

    const toggleDropdown = () =>{
        setIsOpen(!isOpen);
    };

    const handleClick = (item) => {
        setIsOpen(false);
        setSelected(item);
    }

        return(
        <>
        <button onClick={toggleDropdown} className="flex flex-row justify-between shadow appearance-none border rounded-xl w-full py-2 px-3 text-left aria-expanded='true' aria-haspopup='true' bg-white">
            {item}<svg className="h-5 w-5  text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
        </button>
        {isOpen && (
                <div class="w-full h-56 z-10 mt-2 overflow-y-scroll origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <div className="py-1" role="none">
                    <button onClick={()=>handleClick('Hawaii Time')} className="text-gray-700 block px-4 py-2 w-full text-sm hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-0">Hawaii Time</button>
                    <button onClick={()=>handleClick('Alaska Time')}className="text-gray-700 block px-4 py-2 w-full text-sm hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-1">Alaska Time</button>
                    <button onClick={()=>handleClick('Pacific Time')}className="text-gray-700 block px-4 py-2 w-full text-sm hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-1">Pacific Time</button>
                    <button onClick={()=>handleClick('Mountain Time')} className="text-gray-700 block px-4 py-2 w-full text-sm hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-0">Mountain Time</button>
                    <button onClick={()=>handleClick('Arizona Time')}className="text-gray-700 block px-4 py-2 w-full text-sm hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-1">Arizona Time</button>
                    <button onClick={()=>handleClick('Central Time')}className="text-gray-700 block px-4 py-2 w-full text-sm hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-1">Central Time</button>
                    <button onClick={()=>handleClick('Eastern Time')} className="text-gray-700 block px-4 py-2 w-full text-sm hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-0">Eastern Time</button>
                    </div>
            </div>
        )}
        </>
    )
};

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
        <>
        <Header/>
        <TimezoneDropdown/>
        <div className="flex flex-col items-start min-h-screen p-6 relative">
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
        </>
        
    );
}

export default Home;