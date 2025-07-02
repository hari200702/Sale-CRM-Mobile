import React from 'react';

const RecentActivity = ({ activities }) => {
  return (
    <div className="activity-card">
      <h3 className="activity-heading">Recent Activity</h3>
      <div className="activity-items">
        {activities.map((activity, index) => (
          <div key={index} className="activity-row">
            <span className="activity-bullet">•</span>
            <div className="activity-details">
              <p className="activity-description">{activity.text}</p>
              <span className="activity-timestamp">- {activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;