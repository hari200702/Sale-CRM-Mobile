import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUsers,
  faCalendarAlt,
  faUserCog
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: faHome, label: 'Home' },
    { path: '/leads', icon: faUsers, label: 'Leads' },
    { path: '/schedule', icon: faCalendarAlt, label: 'Schedule' },
    { path: '/profile', icon: faUserCog, label: 'Profile' }
  ];

  return (
    <nav className="mobile-bottom-nav">
      {navItems.map(item => (
        <Link
          to={item.path}
          key={item.path}
          className={`nav-item ${location.pathname === item.path ? 'nav-active' : ''}`}
        >
          <FontAwesomeIcon icon={item.icon} className="nav-icon" />
          <span className="nav-label">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
