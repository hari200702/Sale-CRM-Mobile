
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ScheduleContext = createContext();
const BASE_URL = import.meta.env.VITE_BASE_URL;



export const ScheduleProvider = ({ children }) => {
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSchedule = async () => {
    try {
      const token = localStorage.getItem('employee_token');
      const res = await axios.get(`${BASE_URL}employee/schedule`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const formatted = res.data.data.map((item) => ({
        id: item._id,
        name: item.name,
        number: item.phone,
        date: item.date,
        action: item.time,
        type: formatCallType(item.callType),
      }));

      setScheduleData(formatted);
    } catch (err) {
      console.error('Error fetching schedule:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCallType = (type) => {
    if (!type) return '';
    return type
      .split('_')
      .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  return (
    <ScheduleContext.Provider value={{ scheduleData, setScheduleData, fetchSchedule, loading }}>
      {children}
    </ScheduleContext.Provider>
  );
};

export const useScheduleContext = () => useContext(ScheduleContext);
