import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { useAuth } from '../context/AuthContex';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const EmployeeLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isValid = () => {
    const { email, password } = form;
    return (
      email.trim() !== '' &&
      password.trim() !== '' &&
      !/\s/.test(email + password)
    );
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('')

    if (!isValid()) {
        return;
    }
    try{
      
        const res = await axios.post(`${BASE_URL}auth/employee/login`, form);
        console.log(res)
        const { token, employee } = res.data.data;
        localStorage.setItem('employee_token', token);
        login({ ...employee, token });
        navigate('/');
    }
    catch(err){
        console.error('Login error:', err);
        const msg = err.response?.data?.message || 'Login failed';
        setError(msg);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2 className="crm">CRM</h2>
        <h2 className="login-title">Employee Login</h2>

        {error && <p style={{ color: 'red', marginBottom: 10 }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
          />

          <div className="saveBtnWrapper">
            <button
              type="submit"
              className={`saveBtn ${!isValid() ? 'disabled' : ''}`}
              disabled={!isValid()}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeLogin;
