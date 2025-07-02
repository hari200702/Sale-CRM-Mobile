import React from 'react';
import "../App.css";
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ScheduleCard = ({ item, isActive, onClick }) => {
  return (
    <div
      className={`schedule-card ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="schedule-header">
        <div className="schedule-type">{item.type}</div>
        <div className="schedule-date">{item.date}</div>
      </div>

      <div className="schedule-number">{item.number}</div>

      <div className="schedule-detail">
        <FontAwesomeIcon icon={faLocationDot} className="icon" color="red" />
        <span className="text">{item.action}</span>
        </div>

      <div className="schedule-detail">
        <span className="text">{item.name}</span>
      </div>
    </div>
  );
};

export default ScheduleCard;
