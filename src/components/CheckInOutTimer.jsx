import React from 'react';

const CheckInOutTimer = ({ checkInTime, checkOutTime, isCheckedIn }) => {
  return (
    <div className="timer-card">
      <div className="timer-row">
        <div className="timer-group">
          <span className="timer-label">Checked-In</span>
          <span className="timer-value">{checkInTime}</span>
        </div>
        <div className="timer-group">
          <span className="timer-label">Check-Out</span>
          <span className="timer-value">{checkOutTime}</span>
        </div>
      </div>
      <div className="status-indicator-wrapper">
        <div className="status-indicator green-indicator"></div>
      </div>
    </div>
  );
};

export default CheckInOutTimer;