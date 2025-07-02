import React from 'react';
import SearchWithFilter from './SearchWithFilter';
import { useLeadsContext } from '../context/LeadsContext';
import axios from 'axios';

const LeadSearch = () => {
  const { setLeadsData,fetchLeads } = useLeadsContext();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleFilterChange = async (option) => {
    try {
      const token = localStorage.getItem('employee_token');
      const filterValue = option.toLowerCase();
      const res = await axios.get(`${BASE_URL}employee/leads/filter?leadStatus=${filterValue}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const formatted = res.data.data.map((lead) => ({
        ...lead,
        assignedDate: new Date(lead.assignedDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      }));
      setLeadsData(formatted);
    } catch (err) {
      console.error('Error filtering leads:', err);
    }
  };

  const handleSearchChange = async (query) => {
    try {
      if (!query.trim()){
        fetchLeads()
        return;
      }
      const token = localStorage.getItem('employee_token');
      const res = await axios.get(`${BASE_URL}employee/leads/search?q=${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const formatted = res.data.data.map((lead) => ({
        ...lead,
        assignedDate: new Date(lead.assignedDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      }));
      setLeadsData(formatted);
    } catch (err) {
      console.error('Error searching leads:', err);
    }
  };

  return (
    <SearchWithFilter
      filterOptions={['Open', 'Closed']}
      onFilterSave={handleFilterChange}
      onSearchChange={handleSearchChange}
    />
  );
};

export default LeadSearch;
