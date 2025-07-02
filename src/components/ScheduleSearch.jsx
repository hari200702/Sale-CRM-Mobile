import React from 'react';
import SearchWithFilter from './SearchWithFilter';
import { useScheduleContext } from '../context/ScheduleContext';
import axios from 'axios';

const ScheduleSearch = () => {
  const { setScheduleData, fetchSchedule } = useScheduleContext();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleFilterChange = async (option) => {
    try {
      const token = localStorage.getItem('employee_token');
      const filter = option.toLowerCase(); 
      const res = await axios.get(`${BASE_URL}employee/schedule/filter?type=${filter}`, {
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
      console.error('Error filtering schedule:', err);
    }
  };

  const handleSearchChange = async (query) => {
    try {
      if (!query.trim()) {
        fetchSchedule();
        return;
      }

      const token = localStorage.getItem('employee_token');
      const res = await axios.get(`${BASE_URL}employee/schedule/search?q=${query}`, {
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
      console.error('Error searching schedule:', err);
    }
  };

  const formatCallType = (type) => {
    if (!type) return '';
    return type
      .split('_')
      .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <SearchWithFilter
      filterOptions={['Today', 'All']}
      onFilterSave={handleFilterChange}
      onSearchChange={handleSearchChange}
    />
  );
};

export default ScheduleSearch;
