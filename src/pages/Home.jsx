import React, { useEffect, useState } from 'react';
import CheckInOutTimer from '../components/CheckInOutTimer';
import BreakTimeList from '../components/BreakTimeList';
import RecentActivity from '../components/RecentActivity';
import axios from 'axios';
import { useEmployee } from '../context/EmployeeContext';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Home = () => {
  const [timings, setTimings] = useState({ checkedIn: '--:-- --', checkOut: '--:-- --' });
  const [breaks, setBreaks] = useState([]);
  const [activities, setActivities] = useState([]);

  const { setEmployeeInfo } = useEmployee();

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const token = localStorage.getItem('employee_token');
        const res = await axios.get(`${BASE_URL}employee/home`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = res.data.data;

         setEmployeeInfo({
          greeting: data.greeting,
          name: data.employee.name,
        });
       

      
        setTimings({
          checkedIn: data.timings?.checkedIn || '--:-- --',
          checkOut: data.timings?.checkOut || '--:-- --'
        });


        setBreaks(
          data.breakHistory.map((b) => ({
            startTime: b.break,
            endTime: b.ended,
            date: b.date
          }))
        );


        const activityList = [];
        if (data.activityFeed?.latestAssigned) {
          activityList.push({
            text: data.activityFeed.latestAssigned.message,
            time: data.activityFeed.latestAssigned.timeAgo
          });
        }
        if (data.activityFeed?.latestClosed) {
          activityList.push({
            text: data.activityFeed.latestClosed.message,
            time: data.activityFeed.latestClosed.timeAgo
          });
        }
        setActivities(activityList);
      } catch (err) {
         alert(err.response?.data?.message || 'Login failed')
        console.error('Error fetching home data:', err);
      }
    };


    fetchHomeData();

         return () => {
      setEmployeeInfo({ greeting: '', name: '' });
    };

    
  }, []);

  return (
    <main className="mobile-main">
      <section className="timings-section">
        <h3 className="section-heading">Timings</h3>

        <CheckInOutTimer
          checkInTime={timings.checkedIn}
          checkOutTime={timings.checkOut}
          isCheckedIn={timings.checkedIn !== '--:-- --' && timings.checkOut === '--:-- --'}
        />

        <BreakTimeList breaks={breaks} />
      </section>

      <RecentActivity activities={activities} />
    </main>
  );
};

export default Home;
