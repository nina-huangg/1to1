/** @format */

import react from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import LandingPage from './pages/LandingPage';
import CalendarDetail from './pages/CalendarDetail';
import Profile from './pages/Profile';
import ProtectedRoute from "./components/ProtectedRoute";
import AccountSettings from './pages/AccountSettings';
import Invite from './pages/Invite';
import './App.css'

function Logout() {
    localStorage.clear();
    return <Navigate to="/login" />;
}

function RegisterAndLogout() {
    localStorage.clear();
    return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
            path="/calendars/calendar/:id"
            element={
                <ProtectedRoute>
                    <CalendarDetail />
                </ProtectedRoute>
            }
        />
        <Route path="/" element={<LandingPage />} />
        <Route path='/calendars/:id/invite/:inviteId/' element={<Invite/>}></Route>
        <Route path="/account" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />}></Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App;

