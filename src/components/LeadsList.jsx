import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faCaretDown,
  faClock,
  faExclamationCircle,
  faPencilRuler
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useLeadsContext } from '../context/LeadsContext';


const BASE_URL = import.meta.env.VITE_BASE_URL;

const typeColors = {
  hot: '#F97316',
  warm: '#FACC15',
  cold: '#06B6D4'
};


const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const LeadCard = ({ lead, onUpdate  }) => {
  const typeRef = useRef(null);
  const dateRef = useRef(null);
  const statusRef = useRef(null);

  const [showTypePicker, setShowTypePicker] = useState(false);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [showStatusPicker, setShowStatusPicker] = useState(false);

  const [type, setType] = useState(lead.temperature);
  const [status, setStatus] = useState(lead.leadStatus);
  const [assignedDate, setAssignedDate] = useState(lead.assignedDate);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [appointmentSaved, setAppointmentSaved] = useState(false);



  const sendUpdate = async (updateData) => {
    try {
      const token = localStorage.getItem('employee_token');
      await axios.put(`${BASE_URL}employee/leads/${lead._id}/temperature`, updateData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onUpdate(); 
    } catch (err) {
      console.error('Update failed:', err);
    }
  };
  const handleAppointmentSave = async () => {
    if (!date || !time) return alert("Please select both date and time");

    try {

      const dateTime = new Date(`${date}T${time}`);

      const hours = dateTime.getHours();
      const hour12 = hours % 12 || 12;
      const ampm = hours >= 12 ? 'pm' : 'am';
      const timeSlot = `${hour12}${ampm}`;

      const payload = {
        date: dateTime.toISOString(),
        timeSlot
      };

      const token = localStorage.getItem('employee_token');

      await axios.post(
        `http://localhost:4000/api/employee/leads/${lead._id}/appointment`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('Appointment saved!');
      setShowDateTimePicker(false);
      setAppointmentSaved(true); 
      onUpdate();

    }
    catch (err) {
  if (err.response && err.response.data) {
    alert(err.response.data.message || 'Something went wrong');
  } else {
    alert('Unexpected error occurred');
  }
}
  };


  const handleStatusSave = async () => {
    if(status==="open"){
      alert("Please Select Close and Enter")
      return
    }

  try {
    const token = localStorage.getItem('employee_token');
    await axios.put(
      `http://localhost:4000/api/employee/leads/${lead._id}/close`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert('Lead closed successfully');
    setShowStatusPicker(false);
    onUpdate(); 

  } catch (err) {
    const msg = err?.response?.data?.message || 'Error closing lead';
    alert(msg);
  }
};


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        typeRef.current && !typeRef.current.contains(event.target) &&
        dateRef.current && !dateRef.current.contains(event.target) &&
        statusRef.current && !statusRef.current.contains(event.target)
      ) {
        setShowTypePicker(false);
        setShowDateTimePicker(false);
        setShowStatusPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="lead-card">
      <div className="lead-header">
        <div className="lead-info">
          <div className="lead-name">{lead.name}</div>
          <div className="lead-email">@{lead.email}</div>
        </div>
        <div className="lead-status-circle" style={{ borderColor: typeColors[type] }}>
          <span>{lead.leadStatus}</span>
        </div>
      </div>

      <div className="lead-bottom-row">
        <div className="lead-date">
          <FontAwesomeIcon icon={faCalendarAlt} /> {assignedDate}
        </div>

        <div className="lead-actions">
          <div className="lead-popup-wrapper" ref={typeRef}>
            <button onClick={() => setShowTypePicker(!showTypePicker)}>
              <FontAwesomeIcon icon={faPencilRuler} color="#F97316" size="sl"/>
            </button>
            {showTypePicker && (
              <div className="lead-popup">
                <div className="popup-label">Type</div>
                {['hot', 'warm', 'cold'].map(t => (
                  <div
                    key={t}
                    className="popup-option"
                    style={{ backgroundColor: typeColors[t] }}
                    onClick={() => { setType(t); setShowTypePicker(false);  sendUpdate({ temperature: t });}}
                  >
                    {t}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lead-popup-wrapper" ref={dateRef}>
            <button
              id="schedule-btn"
              onClick={() => setShowDateTimePicker(!showDateTimePicker)}
              disabled={lead.leadStatus === 'closed' || lead.appointmentDate}
              style={{
                opacity: lead.leadStatus === 'closed' || lead.appointmentDate ? 0.5 : 1,
                cursor: lead.leadStatus === 'closed' || lead.appointmentDate ? 'not-allowed' : 'pointer',
                background: 'transparent',
                border: 'none'
              }}
            >
              <FontAwesomeIcon
                icon={faClock}
                color={lead.leadStatus === 'closed' || lead.appointmentDate ? '#ccc' : '#F97316'}
                size="sl"
              />
            </button>

            {showDateTimePicker && (
              <div className="lead-popup">
                <input
                  type="date"
                  className="lead-popup-input"
                  onChange={(e) => setDate(e.target.value)}
                />
                <input
                  type="time"
                  className="lead-popup-input"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
                <button className="popup-save" onClick={handleAppointmentSave}>Save</button>
              </div>
            )}
          </div>

          <div className="lead-popup-wrapper" ref={statusRef}>
            <button
              onClick={() => setShowStatusPicker(!showStatusPicker)}
              disabled={lead.leadStatus === 'closed'}
              style={{
                opacity: lead.leadStatus === 'closed' ? 0.5 : 1,
                cursor: lead.leadStatus === 'closed' ? 'not-allowed' : 'pointer',
                background: 'transparent',
                border: 'none'
              }}
            >
              <FontAwesomeIcon
                icon={faCaretDown}
                color={lead.leadStatus === 'closed' ? '#ccc' : '#F97316'}
                size="lg"
              />
            </button>

            {showStatusPicker && (
              <div className="lead-popup">
                <div className="popup-label">Lead Status</div>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="open">open</option>
                  <option value="closed">close</option>
                </select>
                <button className="popup-save" onClick={handleStatusSave}>Save</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


const LeadsList = () => {
  const { leadsData, fetchLeads, loading } = useLeadsContext();

  if (loading) return <p>Loading leads...</p>;

  return (
    <div className="mobile-main">
      {leadsData.map((lead) => (
        <LeadCard key={lead._id} lead={lead} onUpdate={fetchLeads} />
      ))}
    </div>
  );
};

export default LeadsList;