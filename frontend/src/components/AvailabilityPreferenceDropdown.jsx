const AvailabilityPreferenceDropdown = ({ onSelect, value }) => (
    <select
        value={value}
        onChange={(e) => onSelect(e.target.value)}
        className="bg-white border border-gray-300 text-gray-700 py-1 px-2 w-21 leading-tight text-sm rounded shadow focus:outline-none focus:shadow-outline"
    >
        <option value="" disabled>
            Select your availability preference
        </option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
    </select>
);

export default AvailabilityPreferenceDropdown;