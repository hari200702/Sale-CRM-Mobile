import React, { useState } from 'react';
import ScheduleCard from './ScheduleCard';
import { useScheduleContext } from '../context/ScheduleContext';

const ScheduleList = () => {
  const { scheduleData, loading } = useScheduleContext();
  const [activeId, setActiveId] = useState(null);

  if (loading) return <div>Loading schedule...</div>;

  return (
    <div>
      {scheduleData.map((item) => (
        <ScheduleCard
          key={item.id}
          item={item}
          isActive={activeId === item.id}
          onClick={() => setActiveId(item.id)}
        />
      ))}
    </div>
  );
};

export default ScheduleList;
