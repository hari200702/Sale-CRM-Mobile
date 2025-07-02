
import './App.css';
import Home from './pages/Home';
import Leads from './pages/Leads';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Schedule from './pages/Schedule';
import Profile from './pages/Profile';
import {useAuth} from './context/AuthContex'
import EmployeeLogin from './pages/EmployeeLogin';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';
import { useEffect } from 'react';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/login" 
        element={
        <GuestRoute>
        <EmployeeLogin />
        </GuestRoute>
        } 
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="leads" element={<Leads />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;