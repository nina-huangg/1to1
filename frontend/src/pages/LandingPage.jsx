import React from "react";
import calendarImage from "../assets/landing_img.png";
import { Link } from "react-router-dom";
import LoginHeader from "../components/LoginHeader";

function LandingPage() {
  return (
    <>
      <LoginHeader />

      <main className="px-4 mt-20 mb-20 lg:flex lg:justify-center lg:items-center">
        <div className="lg:pr-8 lg:w-1/2">
          <h1 className="mb-4 text-xl font-bold sm:text-xl md:text-3xl lg:text-3xl xl:text-3xl text-primary">
            Calendar Booking
          </h1>
          <p className="text-sm leading-relaxed text-justify text-gray-800 sm:text-sm md:text-lg lg:text-lg xl:text-lg">
            Welcome to our convenient calendar booking system! Easily schedule
            appointments, manage your time, and streamline your daily routine.
            Our intuitive platform allows you to view real-time availability and
            book appointments with just a few clicks. Enjoy customizable
            reminders, synchronization with existing calendars, and seamless
            integration with productivity tools. Join thousands of satisfied
            users and take control of your schedule today.
          </p>
        </div>
        <div className="lg:pl-8 lg:w-1/2">
          <img
            src={calendarImage}
            alt="Calendar Image"
            className="w-full h-full"
          />
        </div>
      </main>
    </>
  );
}

export default LandingPage;
