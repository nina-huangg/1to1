import React from 'react';
import calendarImage from "../assets/landing_img.png";
import {Link} from 'react-router-dom';
import LoginHeader from '../components/LoginHeader'

function LandingPage() {
    return(
      <>
      {/* <header className="h-30px xl:h-60px lg:h-60px md:h-40px sm:h-40px">
        <div className="flex flex-row items-center justify-between">
          <Link className="xl:w-40 lg:w-40 md:w-32 sm:w-32 w-28 xl:h-12 lg:h-12 md:h-10 sm:h-10 h-8 
            xl:px-8 lg:px-8 md:px-6 sm:px-6 px-4 xl:py-2.5 lg:py-2.5 md:py-1.5 sm:py-1.5 py-1.5 xl:mx-10 lg:mx-10 md:mx-7 sm:mx-7
            mx-4 my-5 xl:text-xl lg:text-xl md:text-lg sm:text-lg text-sm rounded-full text-center align-middle shadow-lg
              shadow-gray-400 bg-logo-color text-white" to='/'>
            1 ON 1
          </Link>
          <div className="align-right">
            <Link className="xl:w-30 lg:w-30 md:w-24 sm:w-20 w-14 xl:h-9 lg:h-9 md:h-7 sm:h-7 h-5 
            xl:px-8 lg:px-8 md:px-6 sm:px-6 px-4 py-2 xl:mx-5 lg:mx-5 md:mx-3 sm:mx-3 mx-1 my-5 xl:text-l lg:text-l md:text-sm sm:text-sm text-xs rounded-full text-center align-middle shadow-lg shadow-gray-400 hover:bg-primary-blue-hover bg-primary-blue text-white" to='/login'>
              Log In
            </Link>
            <Link className="xl:w-30 lg:w-30 md:w-24 sm:w-20 w-14 xl:h-9 lg:h-9 md:h-7 sm:h-7 h-5 
            xl:px-8 lg:px-8 md:px-6 sm:px-6 px-4 py-2 xl:mx-10 lg:mx-10 md:mx-6 sm:mx-6 mx-2 my-5 xl:text-l lg:text-l md:text-sm sm:text-sm text-xs rounded-full text-center align-middle shadow-lg shadow-gray-400 border-solid border-0
            border-gray-500 bg-orange hover:bg-orange-hover text-white" to='/register'>
              Sign up
            </Link>
          </div>
        </div>
      </header> */}
      <LoginHeader/>

      <main className="mt-20 mb-20 px-4 lg:flex lg:justify-center lg:items-center">
        <div className="lg:w-1/2 lg:pr-8">
          <h1 className="xl:text-3xl lg:text-3xl md:text-3xl sm:text-xl text-xl font-bold mb-4 text-primary">
            Calendar Booking
          </h1>
          <p className="lg:text-lg xl:text-lg md:text-lg sm:text-sm text-sm text-justify text-gray-800 leading-relaxed">
            Welcome to our convenient calendar booking system! Easily schedule appointments, manage your time, and streamline your daily routine. Our intuitive platform allows you to view real-time availability and book appointments with just a few clicks. Enjoy customizable reminders, synchronization with existing calendars, and seamless integration with productivity tools. Join thousands of satisfied users and take control of your schedule today.
          </p>
        </div>
        <div className="lg:w-1/2 lg:pl-8">
          <img src={calendarImage} alt="Calendar Image" className="w-full h-full" />
        </div>
      </main>
        </>
    )

}

export default LandingPage;


