import Header from '../components/Header.jsx';
import React, {useState, useEffect, createContext, useContext} from 'react';

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
    return (
        <>
        <Header/>
        <TimezoneDropdown/>
        <div>Home</div>
        </>
    )
}

export default Home;