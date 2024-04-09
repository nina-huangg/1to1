import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import LoadingIndicator from './LoadingIndicator';
import "../styles/Contacts_stye.css";

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await api.get('/contacts/contacts_index/');
        setContacts(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <body className="bg-background-color">
      <header className="h-30px xl:h-60px lg:h-60px md:h-40px sm:h-40px">
                <div className="flex flex-row items-center justify-between">
                    <a className="xl:w-40 lg:w-40 md:w-32 sm:w-32 w-28 xl:h-12 lg:h-12 md:h-10 sm:h-10 h-8 
                        xl:px-8 lg:px-8 md:px-6 sm:px-6 px-4 xl:py-2.5 lg:py-2.5 md:py-1.5 sm:py-1.5 py-1.5 xl:mx-10 lg:mx-10 md:mx-7 sm:mx-7
                        mx-4 my-5 xl:text-xl lg:text-xl md:text-lg sm:text-lg text-sm rounded-full text-center align-middle shadow-lg
                        shadow-gray-400 bg-logo-color text-white" href="">
                        1 ON 1
                    </a>
                    <div className="align-right">
                        <a className="xl:w-30 lg:w-30 md:w-24 sm:w-20 w-14 xl:h-9 lg:h-9 md:h-7 sm:h-7 h-5 
                            xl:px-8 lg:px-8 md:px-6 sm:px-4 px-2 py-2 
                            xl:mr-5 lg:mr-5 md:mr-4 sm:mr-3 mr-2 my-5 
                            xl:text-l lg:text-l md:text-sm sm:text-sm text-xs rounded-full text-center align-middle 
                            shadow-lg shadow-gray-400 hover:bg-primary-blue-hover bg-primary-blue text-white"
                            href="../MyMeetings/index.html">
                            My Meetings
                        </a>

                        <a className="xl:w-30 lg:w-30 md:w-24 sm:w-20 w-14 xl:h-9 lg:h-9 md:h-7 sm:h-7 h-5 
                            xl:px-8 lg:px-8 md:px-6 sm:px-4 px-2 py-2 
                            xl:mr-5 lg:mr-5 md:mr-4 sm:mr-3 mr-2 my-5 
                            xl:text-l lg:text-l md:text-sm sm:text-sm text-xs rounded-full text-center align-middle 
                            shadow-lg shadow-gray-400 hover:bg-primary-blue-hover bg-primary-blue text-white"
                            href="../MyContacts/Contacts_index.html">
                            My Contacts
                        </a>

                        <a className="xl:w-30 lg:w-30 md:w-24 sm:w-20 w-14 xl:h-9 lg:h-9 md:h-7 sm:h-7 h-5 
                            xl:px-8 lg:px-8 md:px-6 sm:px-4 px-2 py-2 
                            xl:mr-8 lg:mr-8 md:mr-6 sm:mr-4 mr-2 my-5 
                            xl:inline lg:inline md:inline sm:inline hidden
                            xl:text-l lg:text-l md:text-sm sm:text-sm text-xs rounded-full text-center align-middle 
                            shadow-lg shadow-gray-400 border-solid border-0 border-gray-500 bg-orange hover:bg-orange-hover text-white"
                            href="../Profile/profile.html">
                            Profile
                        </a>
                    </div>
                </div>
            </header>
      <section className="main-section">
        <h1 className="my-contacts-title">My Contacts</h1>
        <div className="grey-rectangle">
          <Link to="/add-contact">
            <div className="green-circle"></div>
          </Link>
        </div>
        <div className="contacts-container">
          <div className="pink-rectangles-container">
            {contacts.map(contact => (
              <Link to={`/edit-contact/${contact.id}`} key={contact.id} className="pink-rectangle contact-square">
                <div>
                  <img src={contact.image} className="profile-image" /> 
                  <strong>{contact.first_name} {contact.last_name}</strong>
                  <p className="contact-email">{contact.email}</p>
                  <p className="contact-phone_number">{contact.phone_number}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </body>
  );
}

export default ContactList;
