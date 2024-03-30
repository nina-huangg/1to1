import MeetingDateSelector from "../components/MeetingDateSelector";

const CalendarDetail = ({ calendar }) => {
    return (
        <div className="absolute left-10 bottom-10 w-72">
            <MeetingDateSelector year='2024' month='January' />
        </div>
    );
}

export default CalendarDetail;