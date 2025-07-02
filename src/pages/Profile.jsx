import React from 'react';
import ProfileForm from '../components/ProfileForm';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContex';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('employee_token');
      await axios.post(`${BASE_URL}auth/employee/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
      alert('Something went wrong during logout.');
    }
  };

  return (
    <main className="mobile-main">
      <section className="profile-section">
        <h3 className="section-heading">Edit Profile</h3>
        <ProfileForm />
      </section>

      <div className="logout-normal-wrapper">
        <button className="logoutBtn" onClick={handleLogout}>Logout</button>
      </div>
    </main>
  );
};

export default Profile;
