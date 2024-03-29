/** @format */

import api from '../api';
import React, { useState, useEffect } from 'react';
import Calendar from '../components/Calendar';

function Home() {
    const [calendars, setCalendars] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

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
        api.post('/calendars/create/', { name, description })
            .then((res) => {
                if (res.status === 200) {
                    alert('Calendar created!');
                    getCalendars();
                    setName('');
                    setDescription('');
                } else {
                    alert('Failed to create calendar.');
                }
            })
            .catch((err) => alert(err));
    };

    return  (
        <div>
            <h2>Calendars</h2>
            {calendars.map((calendar) => (
                <Calendar calendar={calendar} key={calendar.id}/>
            ))}
            <h2>Create a Calendar</h2>
            <form onSubmit={createCalendar}>
                <label htmlFor="name">name:</label>
                <br />
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <br />
                <label htmlFor="description">Description:</label>
                <br />
                <input
                    type="text"
                    id="description"
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
                <br />
                <button type="submit">Create Calendar</button>
            </form>
        </div>
    );
}

export default Home;
