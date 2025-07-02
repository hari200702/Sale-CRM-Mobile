import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEmployee } from '../context/EmployeeContext';
import "../App.css"

const Header = () => {
  const location = useLocation();
  const { employeeInfo } = useEmployee();

  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return null;
      case '/leads':
        return 'Leads';
      case '/schedule':
        return 'Schedule';
      case '/profile':
        return 'Profile';
      default:
        return '';
    }
  };

  return (
    <header className="mobile-header">
      <h1 className="app-name">
        Canova<span style={{ color: 'yellow' }}>CRM</span>
      </h1>

      {location.pathname === '/' ? (
        <div className="header-greeting">
          <div className="greeting-text">{employeeInfo.greeting}</div>
          <div className="user-name">{employeeInfo.name}</div>
        </div>
      ) : (
        <h2 className="user-name">{getTitle()}</h2>
      )}
    </header>
  );
};

export default Header;
