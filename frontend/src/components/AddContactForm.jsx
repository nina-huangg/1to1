import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import Header from './Header';
import '../styles/Contacts_stye.css';

function NewContactPage() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    image: '', // Update to hold file object
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append('first_name', formData.first_name);
      formDataWithImage.append('last_name', formData.last_name);
      formDataWithImage.append('email', formData.email);
      formDataWithImage.append('phone_number', formData.phone_number);
      formDataWithImage.append('image', formData.image); // Append image file

      await api.post('/contacts/add_contact/', formDataWithImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Redirect to the main contacts page
      window.location.href = '/contacts';
    } catch (error) {
      console.error('Error adding contact:', error);
      setError('Failed to add contact. Please try again.');
    }
  };

  return (
    <div className="bg-background-color">
      <Header/>


      <section className="main-section">
        <h1 className="my-contacts-title">Edit Contact</h1>

        <Link to="/contacts/" className="back-button">Go Back</Link>

        <div className="contact-container">
          <div className="large-pink-rectangle">
            <input type="file" id="imageUpload" name="image" accept="image/*" onChange={handleChange} />
            <img id="contactImage" className="profile-image" />

            <form className='edit_form' onSubmit={handleSubmit} id="contactForm">
              <label htmlFor="firstName">First Name:</label>
              <input type="text" id="firstName" name="first_name" onChange={handleChange} required />

              <label htmlFor="lastName">Last Name:</label>
              <input type="text" id="lastName" name="last_name" onChange={handleChange} required />

              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" onChange={handleChange} required />

              <label htmlFor="phoneNumber">Phone Number:</label>
              <input type="tel" id="phoneNumber" name="phone_number" onChange={handleChange} />

              {error && <p className="error">{error}</p>}
              
              <button type="submit" className="submit-button">Save Information</button>
              {/* Delete contact button can be added here */}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NewContactPage;
