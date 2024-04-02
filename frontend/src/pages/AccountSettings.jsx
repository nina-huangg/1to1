import Header from '../components/Header'
import React, {useState, useEffect, createContext, useContext} from 'react';
import api from "../api";
import LoadingIndicator from "../components/LoadingIndicator";

function AccountSettings(){
    const pass = '********';
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [loading, setLoading] = useState(false);

    const [passwordError, setPasswordError] = useState('');
    const [password2Error, setPassword2Error] = useState('');
    const [emailError, setEmailError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const response = await api.get('/profile/view/');
                const {username, email, first_name, last_name} =response.data;
                if (email){setEmail(email)};
                setFirstName(first_name);
                setLastName(last_name);


            }catch(error){
                alert(error);
            }
        };

        fetchData();

    }, [success]);

    const handleSubmit = async (e) => {

        
        setLoading(true);
        e.preventDefault();
        try{
            setPasswordError('');
            setPassword2Error('');
            setEmailError('');
            let data = {}
            if (password===''){
                data = {first_name, last_name, email};
            }
            else{
                data = {first_name, last_name, email, password, password2};
            }
            
            const res = await api.put('/profile/edit/',data);
            setSuccess(true);
            setPassword('');
            setPassword2('');
            
        }catch (error){
            for (const field in error.response.data){
                if (field=='password'){
                    setPasswordError(error.response.data['password'][0])
                }
                if (field=='password2'){
                    setPassword2Error(error.response.data['password2'])
                }
                if (field=='email'){
                    setEmailError(error.response.data['email'])
                }
            };

        }finally {
            setLoading(false);
        }
    };



    return(
        <>
        <Header/>
        <main>
            <div className="w-screen">
                <div className="flex flex-col justify-center">
                    <p className="xl:text-3xl lg:text-3xl md:text-3xl sm:text-3xl text-xl
                    mt-20 font-bold text-center mb-6">My Account Settings</p>
                </div>
                
            <div className="text-left align-left ml-7 xl:ml-80 lg:ml-80 mb-10 md:ml-32 sm:ml-28 ">
                <p className="xl:text-lg lg:text-lg md:text-lg sm:text-sm text-sm font-bold">Advanced Settings</p>
                
                <div className="xl:w-96 lg:w-96 md:w-64 sm:w-64 w-60">
                <div className="pt-5 xl:w-full lg:w-96 md:w-96 sm:w-80 align-left">
                    <div className="mb-6 text-left">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                        First name:
                    </label>
                    <input value={first_name} onChange={(e)=>{setFirstName(e.target.value)}} className="shadow appearance-none border rounded-xl w-full py-2 px-3 placeholder-black leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text"/>
                    </div>

                    <div className="mb-6 text-left">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                        Last name:
                    </label>
                    <input value={last_name} onChange={(e)=>{setLastName(e.target.value)}} className="shadow appearance-none border rounded-xl w-full py-2 px-3 placeholder-black leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text"/>
                    </div>

                    <div className="mb-6 text-left">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email:
                    </label>
                    <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className="shadow appearance-none border rounded-xl w-full py-2 px-3 placeholder-black leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text"/>
                    {emailError && (
                    <p className="mt-2 block text-red-700 text-sm font-bold mb-2">{emailError}</p>
                    )}
                    </div>
                    

                    <div className="mb-6 text-left">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Password:
                    </label>
                    <input value={password} onChange={(e)=>{setPassword(e.target.value)}} className="shadow appearance-none border rounded-xl w-full py-2 px-3 placeholder-black leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text"/>
                    {passwordError && (
                    <p className="mt-2 block text-red-700 text-sm font-bold mb-2">{passwordError}</p>
                    )}
                    </div>

                    <div className="mb-6 text-left">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Repeat Password:
                    </label>
                    <input value={password2} onChange={(e)=>{setPassword2(e.target.value)}} className="shadow appearance-none border rounded-xl w-full py-2 px-3 placeholder-black leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text"/>
                    {password2Error && (
                    <p className="mt-2 block text-red-700 text-sm font-bold mb-2">{password2Error}</p>
                    )}
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
            
            <div>

            
            </div>
            </div>
            </div>
            
        </main>



        </>
    )
}

export default AccountSettings;