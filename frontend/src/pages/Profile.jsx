import Header from '../components/Header'
import React, {useState, useEffect, createContext, useContext} from 'react';
import api from "../api";


function LanguageDropdown(props){
    const {param} = props;
    const [isOpen, setIsOpen] = useState(false);
    const [item, setSelected] = useState(param);

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
                <div className="w-full z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                <div className="py-1" role="none">
                <button onClick={()=>handleClick('English')} className="text-gray-700 block px-4 py-2 w-full text-sm hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-0">English</button>
                <button onClick={()=>handleClick('French')}className="text-gray-700 block px-4 py-2 w-full text-sm hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-1">French</button>
                </div>
            </div>
                
        )}
        </>
    )
};

function CountryDropdown(props){
    const {param} = props;
    const [isOpen, setIsOpen] = useState(false);
    const [item, setSelected] = useState(param);

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
                <div className="w-full z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                <div className="py-1" role="none">
                <button onClick={()=>handleClick('Canada')} className="text-gray-700 block px-4 py-2 w-full text-sm hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-0">Canada</button>
                <button onClick={()=>handleClick('United States')}className="text-gray-700 block px-4 py-2 w-full text-sm hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-1">United States</button>
                <button onClick={()=>handleClick('Other')}className="text-gray-700 block px-4 py-2 w-full text-sm hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-1">Other</button>
                </div>
            </div>
                
        )}
        </>
    )
};

function TimezoneDropdown(props){
    const param = props.param;
    const [isOpen, setIsOpen] = useState(false);
    const [item, setSelected] = useState(param);


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
                <div className="w-full h-56 z-10 mt-2 overflow-y-scroll origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
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


function Profile() {
    const [message, setMessage] = useState('');
    const [language, setLanguage] = useState('');
    const [country, setCountry] = useState('');
    const [timezone, setTimezone] = useState('');
    const [isSaveClicked, setIsSaveClicked] = useState(false);
   
    const fetchData = async () =>{
        try{
            const response = await api.get('/profile/dashboard/view/');
            const {message, language, country, timezone} =response.data;
            setMessage(message);
            setLanguage(language);
            setCountry(country);
            setTimezone(timezone);
        }catch(error){
            alert(error);
        }
    };
    useEffect(() => {
        if (isSaveClicked) {
          fetchData(); 
        }
    }, [isSaveClicked]);
    
    return (
        <>
        <Header/>
        <main>
            <div className="w-screen">
                <div className="flex flex-col justify-center">
                    <p className="xl:text-3xl lg:text-3xl md:text-3xl sm:text-3xl text-xl
                    mt-20 font-bold text-center mb-6">My Profile</p>
                </div>
                
            <div className="text-left align-left ml-7 xl:ml-80 lg:ml-80 mb-10 md:ml-32 sm:ml-28 ">
                <p className="xl:text-lg lg:text-lg md:text-lg sm:text-sm text-sm font-bold">Account Details</p>
                <div className="xl:w-96 lg:w-96 md:w-64 sm:w-64 w-60">
                <div className="pt-5 xl:w-full lg:w-96 md:w-96 sm:w-80 align-left">
                    <div className="mb-6 text-left">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Name:
                    </label>
                    
                    <input className="shadow appearance-none border rounded-xl w-full py-2 px-3 placeholder-black leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="John Smith" />
                    </div>
                    <div className="mb-4 text-left">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                        Welcome Message:
                    </label>
                    <textarea className="shadow appearance-none border text-xs rounded-xl w-full py-2 px-3 text-gray-700 placeholder-black leading-tight focus:outline-none focus:shadow-outline" id="message" type="text" defaultValue={message} />
                    </div>

                    <div className="mb-6 text-left">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="language">
                        Language:
                    </label>
                    <LanguageDropdown param={language}/>
                    </div>
                    <div className="mb-6 text-left">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                        Country:
                    </label>
                    <CountryDropdown param={country}/>
                    </div>
                    <div className="mb-6 text-left">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="timezone">
                        Timezone:
                    </label>
                    <TimezoneDropdown param={timezone}/>
                    </div>
                    
                    <button className="w-28 h-10 mb-5 text-l shadow-gray-400 rounded-full text-center shadow-lg bg-orange text-white hover:bg-orange-hover">
                    Save
                    </button>
                </div>
                </div>
            </div>
            <div>
            </div>
            </div>
        </main>
        </>
    )}
export default Profile;

