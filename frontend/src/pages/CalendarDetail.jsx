import React, { useState } from 'react';
import MeetingDateSelector from '../components/MeetingDateSelector'; // Assuming you have a MeetingDateSelector component
import Calendar from '../components/Calendar'; // Assuming you have a Calendar component

const CalendarDetail = () => {
    const [selectedDates, setSelectedDates] = useState([]);
  
    const handleSelectedDatesChange = (dates) => {
      setSelectedDates(dates);
    };
  
    return (
      <div className="flex">
        <div className="pr-4 left-10 top-20 w-72">
          <MeetingDateSelector selectedDates={selectedDates} setSelectedDates={handleSelectedDatesChange} />
        </div>
        <div className="w-1/2 pl-4">
          <Calendar selectedDates={selectedDates} />
        </div>
      </div>
    );
  };
  
  export default CalendarDetail;