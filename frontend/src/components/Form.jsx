import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password2, setPassword2] = useState("");
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            setError('');
            setUsernameError('');
            setPasswordError('');
            let userData = { username, password };

            if (method === "register") {
                userData = {
                    ...userData,
                    email,
                    firstName,
                    lastName,
                    password2,
                };
            }
            const res = await api.post(route, userData);

            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/home");
            } else {
                navigate("/login");
            }
        } catch (error) {
            console.log(error.response.data)
            for (const field in error.response.data){
                if (field=='detail'){
                    setError(error.response.data['detail'])
                }
                else if (field=='username'){
                    setUsernameError(error.response.data['username'][0])
                }
                else if (field=='password'){
                    setPasswordError(error.response.data['password'][0])
                }
            }
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center">
        <p className="xl:text-3xl lg:text-3xl md:text-3xl sm:text-3xl text-xl mt-20 font-bold text-center mb-6">Login to your 1on1 account</p>
        
        <form onSubmit={handleSubmit} className="shadow-xl border-solid border-2 border-gray-200 rounded px-8 pt-6 pb-8 w-full max-w-sm">
            {error && (
            <p className="mt-2 block text-red-700 text-sm font-bold mb-2">{error}</p>
            )}
            <div className="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
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
            <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
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
                    <input
                        className="form-input"
                        type="password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        placeholder="Repeat Password"
                    />
                    <input
                        className="form-input"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <input
                        className="form-input"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                    />
                    <input
                        className="form-input"
                        type="lastName"
                        value={firstName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                    />
                </>
            )}
            {loading && <LoadingIndicator />}
            <div class="text-center">
            <button type="submit" className="w-30 h-10 px-8 py-2 mx-10 my-1 text-l shadow-gray-400 rounded-full text-center shadow-lg bg-orange text-white hover:bg-orange-hover" href="../Profile/profile.html">
                Log in
            </button>
            </div>
        </form>
        </div>
    );
}

export default Form;
