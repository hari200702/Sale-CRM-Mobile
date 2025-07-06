import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { useAuth } from '../context/AuthContex';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('employee_token');
  const { logout }= useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE_URL}employee/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const { firstName, lastName, email } = res.data.data;
        setFormData(prev => ({
          ...prev,
          firstName,
          lastName,
          email
        }));
      } catch (err) {
        if(err.response?.status===401){
          alert(err.response?.data?.message)
          logout()
        }
        console.error('Failed to fetch profile:', err);
        setMessage('Failed to load profile');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await axios.put(`${BASE_URL}employee/profile`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage(res.data.message);

      const { firstName, lastName, email } = res.data.data;
      setFormData(prev => ({
        ...prev,
        firstName,
        lastName,
        email,
        password: '',
        confirmPassword: ''
      }));
    } catch (err) {
      console.error('Update failed:', err);
      const msg = err.response?.data?.message || 'Update failed';
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="settingsForm" onSubmit={handleSubmit}>
      {message && (
        <p style={{ color: message.includes('success') ? 'green' : 'red', marginBottom: '10px' }}>
          {message}
        </p>
      )}

      <div className="formGroup">
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>

      <div className="formGroup">
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>

      <div className="formGroup">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="formGroup">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <div className="formGroup">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <div className="saveBtnWrapper">
        <button
          type="submit"
          className="saveBtn"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
