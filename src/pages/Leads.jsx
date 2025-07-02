import React from 'react'
import CheckInOutTimer from '../components/CheckInOutTimer';
import BreakTimeList from '../components/BreakTimeList';
import RecentActivity from '../components/RecentActivity';
import LeadsList from '../components/LeadsList';
import LeadSearch from '../components/LeadSearch';
import { LeadsProvider } from '../context/LeadsContext';

const Leads = () => {

  return (
    <LeadsProvider>
        <section className="timings-section">
            <LeadSearch />
            <LeadsList />
        </section>
    </LeadsProvider>
  );
}

export default Leads