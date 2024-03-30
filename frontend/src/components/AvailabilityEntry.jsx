function getRandomColor() {
    // Array of predefined colors
    const colors = ['#52B7B1', '#EE6A4C', '#6EB3AF', '#F4F3ED', '#FBB5A5'];

    // Get a random index from the colors array
    const randomIndex = Math.floor(Math.random() * colors.length);

    // Return the random color
    return colors[randomIndex];
}

const AvailabilityEntry = ({ date, meetingName, meetingTime }) => {
    const randomColor = getRandomColor();

    return (
        <div className="grid grid-cols-3 md:grid-cols-8 gap-2 mb-6 flex flex-wrap">
            <div className="col-span-3 md:col-start-3 md:col-span-5 ml-10">
                <div className="font-bold text-lg">{date}</div>
                <div className="py-2 px-2 flex flex-row text-sm shadow-xl rounded-md md:w-full"
                     style={{ backgroundColor: randomColor, maxWidth: 'calc(100% - 2rem)' }}>
                    <div className="ml-2 m-2 pr-13 flex flex-col">
                        <p className="text-base">{meetingName}</p>
                        <p className="text-xs">Time: {meetingTime}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvailabilityEntry;