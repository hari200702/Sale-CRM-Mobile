import React from 'react';

const BreakTimeList = ({ breaks }) => {
  return (
    <div className="break-card">
      <div className="break-header-row">
        <span className="break-heading">Break</span>
        <span className="break-ended">Ended</span>
        <span className="break-date-header"></span>
      </div>
      
      <div className="status-indicator-wrapper">
        <div className="status-indicator red-indicator"></div>
      </div>
      
      <div className="break-list">
        {breaks.map((breakItem, index) => (
          <div key={index} className="break-item">
            <div className="break-column">
              <span className="break-label">Break</span>
              <span className="break-value">{breakItem.startTime}</span>
            </div>
            <div className="break-column">
              <span className="break-label">Ended</span>
              <span className="break-value">{breakItem.endTime}</span>
            </div>
            <div className="break-column">
              <span className="break-label">Date</span>
              <span className="break-value">{breakItem.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BreakTimeList;