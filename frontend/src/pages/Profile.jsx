import Header from '../components/Header'
import React, {useState, useEffect, createContext, useContext} from 'react';
import api from "../api";
import LoadingIndicator from "../components/LoadingIndicator";
import {Link, useNavigate} from 'react-router-dom';

function LanguageDropdown(props){
    const {param, language, setLanguage} = props;
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () =>{
        setIsOpen(!isOpen);
    };

        return(
        <>
        <button onClick={toggleDropdown} className="flex flex-row justify-between shadow appearance-none border rounded-xl w-full py-2 px-3 text-left aria-expanded='true' aria-haspopup='true' bg-white">
            {language}<svg className="h-5 w-5  text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
        </button>
        {isOpen && (
                <div className="w-full z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                <div className="py-1" role="none">
                <button onClick={()=>{setLanguage('English'); setIsOpen(false);}} className="text-gray-700 block px-4 py-2 w-full text-sm hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-0">English</button>
                <button onClick={()=>{setLanguage('French'); setIsOpen(false);}}className="text-gray-700 block px-4 py-2 w-full text-sm hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-1">French</button>
                </div>
            </div>
                
        )}
        </>
    )
};

function CountryDropdown(props){
    const {param, country, setCountry} = props;
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () =>{
        setIsOpen(!isOpen);
    };

        return(
        <>
        <button onClick={toggleDropdown} className="flex flex-row justify-between shadow appearance-none border rounded-xl w-full py-2 px-3 text-left aria-expanded='true' aria-haspopup='true' bg-white">
            {country}<svg className="h-5 w-5  text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
        </button>
        {isOpen && (
                <div className="w-full z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                <div className="py-1" role="none">
                <button onClick={()=>{setCountry('Canada'); setIsOpen(false);}} className="text-gray-700 block px-4 py-2 w-full text-sm hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-0">Canada</button>
                <button onClick={()=>{setCountry('United States'); setIsOpen(false);}}className="text-gray-700 block px-4 py-2 w-full text-sm hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-1">United States</button>
                <button onClick={()=>{setCountry('other'); setIsOpen(false);}}className="text-gray-700 block px-4 py-2 w-full text-sm hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-1">Other</button>
                </div>
            </div>
                
        )}
        </>
    )
};

function TimezoneDropdown(props){
    const {param, timezone, setTimezone} = props;
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () =>{
        setIsOpen(!isOpen);
    };

        return(
        <>
        <button onClick={toggleDropdown} className="flex flex-row justify-between shadow appearance-none border rounded-xl w-full py-2 px-3 text-left aria-expanded='true' aria-haspopup='true' bg-white">
            {timezone}<svg className="h-5 w-5  text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
        </button>
        {isOpen && (
                <div className="w-full h-56 z-10 mt-2 overflow-y-scroll origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div className="py-1" role="none">
                    <button onClick={(e)=>{setTimezone('Hawaii');setIsOpen(false);}} className="text-gray-700 block px-4 py-2 w-full text-sm hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-0">Hawaii Time</button>
                    <button onClick={()=>{setTimezone('Alaska');setIsOpen(false);}}className="text-gray-700 block px-4 py-2 w-full text-sm hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-1">Alaska Time</button>
                    <button onClick={()=>{setTimezone('Pacific');setIsOpen(false);}}className="text-gray-700 block px-4 py-2 w-full text-sm hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-1">Pacific Time</button>
                    <button onClick={()=>{setTimezone('Mountain');setIsOpen(false);}} className="text-gray-700 block px-4 py-2 w-full text-sm hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-0">Mountain Time</button>
                    <button onClick={()=>{setTimezone('Arizona');setIsOpen(false);}}className="text-gray-700 block px-4 py-2 w-full text-sm hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-1">Arizona Time</button>
                    <button onClick={()=>{setTimezone('Central');setIsOpen(false);}}className="text-gray-700 block px-4 py-2 w-full text-sm hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-1">Central Time</button>
                    <button onClick={()=>{setTimezone('Eastern');setIsOpen(false);}} className="text-gray-700 block px-4 py-2 w-full text-sm hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-0">Eastern Time</button>
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
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [success, setSuccess] = useState(false);
   
    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const response = await api.get('/profile/dashboard/view/');
                const {message, language, country, timezone} =response.data;
                if (message){ setMessage(message)};
                setLanguage(language);
                setCountry(country);
                setTimezone(timezone);

                const nameResponse = await api.get('/profile/view/');
                const {username, email, first_name, last_name} =nameResponse.data;
                setName(first_name + ' '+last_name);


            }catch(error){
                alert(error);
            }
        };

        fetchData();

    }, []);
    
    
    // useEffect(() => {
    //     if (isSaveClicked) {
    //       fetchData(); 
    //     }
    // }, [isSaveClicked]);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try{
            let data = { message, language, country, timezone};
            const res = await api.put('/profile/dashboard/edit/',data);
            setSuccess(true);
        }catch (error){
            alert(error);
        }finally {
            setLoading(false);
        }
    };

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
                <div class="flex flex-row justify-between items-center xl:w-96 lg:w-96 md:w-64 sm:w-64 w-60 ">
                <p className="xl:text-lg lg:text-lg md:text-lg sm:text-sm text-sm font-bold">Account Details</p>
                <Link className="xl:w-48 lg:w-40 md:w-32 sm:w-24 w-14 xl:h-9 lg:h-9 md:h-7 sm:h-7 h-5 
                    xl:px-4 lg:px-4 md:px-6 sm:px-4 px-2 py-2 
                    xl:mr-2 lg:mr-2 md:mr-2 sm:mr-2 mr-2 my-5 
                    xl:text-l lg:text-l md:text-sm sm:text-sm text-xs rounded-full text-center align-middle 
                    shadow-lg shadow-gray-400 bg-orange text-white hover:bg-orange-hover" to='/account'>
                Advanced
                </Link>
                </div>
                <div className="xl:w-96 lg:w-96 md:w-64 sm:w-64 w-60">
                <div className="pt-5 xl:w-full lg:w-96 md:w-96 sm:w-80 align-left">
                    <div className="mb-6 text-left">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Name:
                    </label>
                    
                    <input className="shadow appearance-none border rounded-xl w-full py-2 px-3 placeholder-black leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" value={name} readonly/>
                    </div>
                    <div className="mb-4 text-left">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                        Welcome Message:
                    </label>
                    <textarea value={message} onChange={(e) => setMessage(e.target.message)} className="shadow appearance-none border text-xs rounded-xl w-full py-2 px-3 text-gray-700 placeholder-black leading-tight focus:outline-none focus:shadow-outline" id="message" type="text" />
                    </div>

                    <div className="mb-6 text-left">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="language">
                        Language:
                    </label>
                    <LanguageDropdown param={language} language={language} setLanguage={setLanguage}/>
                    </div>
                    <div className="mb-6 text-left">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                        Country:
                    </label>
                    <CountryDropdown param={country} country={country} setCountry={setCountry}/>
                    </div>
                    <div className="mb-6 text-left">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="timezone">
                        Timezone:
                    </label>
                    <TimezoneDropdown param={timezone} timezone={timezone} setTimezone={setTimezone}/>
                    </div>
                    {loading && <LoadingIndicator />}
                    <div className="mb-6 text-left">
                    {success && (
                    <p className="mt-2 block text-red-700 text-sm font-bold mb-2">Settings successfully changed!</p>
                    )}
                    </div>
                    <button onClick={handleSubmit} className="w-28 h-10 mb-5 text-l shadow-gray-400 rounded-full text-center shadow-lg bg-orange text-white hover:bg-orange-hover">
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

