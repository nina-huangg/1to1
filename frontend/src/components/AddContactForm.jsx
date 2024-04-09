import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
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
        <h1 className="my-contacts-title">Edit Contact</h1>

        <Link to="/contacts/" className="back-button">Go Back</Link>

        <div className="contact-container">
          <div className="large-pink-rectangle">
            <input type="file" id="imageUpload" name="image" accept="image/*" onChange={handleChange} />
            <img id="contactImage" className="profile-image" />

            <form onSubmit={handleSubmit} id="contactForm">
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
