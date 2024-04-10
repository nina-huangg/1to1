import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import '../styles/Contacts_stye.css';

function EditContactPage() {
  const { id } = useParams();
  const [contact, setContact] = useState({});
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    image: '', 
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await api.get(`/contacts/edit_contact/${id}/`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching contact:', error);
      }
    };
    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/contacts/delete_contact/${id}/`);
      
      window.location.href = '/contacts/';
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithImage = new FormData();
      
      if (formData.image instanceof File) {
        formDataWithImage.append('image', formData.image); 
      }
      
      if (formData.first_name) {
        formDataWithImage.append('first_name', formData.first_name); 
      }

      if (formData.last_name) {
        formDataWithImage.append('last_name', formData.last_name); 
      }

      if (formData.email) {
        formDataWithImage.append('email', formData.email); 
      }

      if (formData.phone_number){
        formDataWithImage.append('phone_number', formData.phone_number);
      }

      await api.put(`/contacts/edit_contact/${id}/`, formDataWithImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      
      window.location.href = '/contacts/';
    } catch (error) {
      console.error('Error updating contact:', error);
      setError('Failed to update contact. Please try again.');
    }
  };

  return (
    <div>
      <Link to="/contacts/" className="back-button">Go Back</Link>
      <div className="contact-container">
        <div className="large-pink-rectangle">
          <form className="edit_form"onSubmit={handleSubmit}>
            
            <label htmlFor="image">Profile Image:</label>



            <input type="file" id="image" name="image" accept="image/*" onChange={handleChange} />
            
            
            <label htmlFor="first_name">First Name:</label>
            <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} />
            
            
            <label htmlFor="last_name">Last Name:</label>
            <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            <label htmlFor="phone_number">Phone Number:</label>
            <input type="tel" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} />
            
            
            
            
            {error && <p>{error}</p>} {/* Display error message if exists */}
            <button type="submit" className="submit-button">Save</button>
            <button type="button" className='delete_button' onClick={handleDelete}>Delete Contact</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditContactPage;
