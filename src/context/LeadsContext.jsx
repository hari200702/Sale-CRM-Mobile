import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const LeadsContext = createContext();
const BASE_URL = import.meta.env.VITE_BASE_URL;

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const LeadsProvider = ({ children }) => {
  const [leadsData, setLeadsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem('employee_token');
      const res = await axios.get(`${BASE_URL}employee/leads`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const formatted = res.data.data.map(lead => ({
        ...lead,
        assignedDate: formatDate(lead.assignedDate),
      }));
      setLeadsData(formatted);
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <LeadsContext.Provider value={{ leadsData, setLeadsData, fetchLeads, loading }}>
      {children}
    </LeadsContext.Provider>
  );
};

export const useLeadsContext = () => useContext(LeadsContext);
