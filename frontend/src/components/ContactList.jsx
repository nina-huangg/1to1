import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import LoadingIndicator from './LoadingIndicator';
import "../styles/Contacts_stye.css";
import Header from '../components/Header.jsx';

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
      <Header/>
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
