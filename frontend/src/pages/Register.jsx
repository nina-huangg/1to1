import Form from "../components/Form"
import {Link} from 'react-router-dom';
import React from 'react';
import {useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "../components/LoadingIndicator";
import LoginHeader from '../components/LoginHeader';

function Register({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [password2Error, setPassword2Error] = useState("");
    const [emailError, setEmailError] = useState("");


    const name = method = "register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            setUsernameError('');
            setPasswordError('');
            setPassword2Error('');
            setEmailError('');

            let userData = { username, password };
            console.log('send api');
            if (method === "register") {
                userData = {
                    ...userData,
                    email,
                    first_name,
                    last_name,
                    password2,
                };
            }
            const res = await api.post("/accounts/register/", userData);
            navigate('/login/');

        } catch (error) {
            console.log(error.response.data);
            for (const field in error.response.data){
                if (field=='username'){
                    setUsernameError(error.response.data['username'])
                }
                else if (field=='password'){
                    setPasswordError(error.response.data['password'][0])
                }
                if (field=='password2'){
                    setPassword2Error(error.response.data['password2'])
                }
                if (field=='email'){
                    setEmailError(error.response.data['email'])
                }
            };

            //alert(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <LoginHeader/>
        <div className="flex flex-col justify-center items-center">
        <p className="xl:text-3xl lg:text-3xl md:text-3xl sm:text-3xl text-xl mt-20 font-bold text-center mb-6">Create an 1on1 account</p>
        <form onSubmit={handleSubmit} className="shadow-xl border-solid border-2 border-gray-200 rounded px-8 pt-6 pb-8 w-full max-w-sm">
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username *
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            {usernameError && (
            <p className="mt-2 block text-red-700 text-sm font-bold mb-2">{usernameError}</p>
            )}
            
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password *
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {passwordError && (
            <p className="mt-2 block text-red-700 text-sm font-bold mb-2">{passwordError}</p>
            )}
            </div>
            {method === "register" && (
                <>
                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password2">
                    Repeat password *
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        placeholder="Repeat Password"
                    />
                    {password2Error && (
                        <p className="mt-2 block text-red-700 text-sm font-bold mb-2">{password2Error}</p>
                    )}
                    </div>
                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    {emailError && (
                        <p className="mt-2 block text-red-700 text-sm font-bold mb-2">{emailError}</p>
                    )}
                    </div>
                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">
                    First name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                    />
                    </div>
                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">
                    Last name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="lastName"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                    />
                    </div>
                </>
            )}
            {loading && <LoadingIndicator />}
            <div className="text-center">
            <button type="submit" className="w-30 h-10 px-8 py-2 mx-10 my-1 text-l shadow-gray-400 rounded-full text-center shadow-lg bg-orange text-white hover:bg-orange-hover" href="../Profile/profile.html">
                Sign up
            </button>
            </div>
        </form>
        </div>
        </>
    );
}

export default Register;
