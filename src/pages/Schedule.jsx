import React from 'react'
import ScheduleList from '../components/ScheduleList';
import ScheduleSearch from '../components/ScheduleSearch';
import "../App.css"
import { ScheduleProvider } from '../context/ScheduleContext';


const Schedule = () => {



  return (
    <ScheduleProvider>
        <section className="timings-section">
            <ScheduleSearch />
            <ScheduleList />
        </section>
      </ScheduleProvider>
  );
}

export default Schedule