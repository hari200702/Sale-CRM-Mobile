import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import '../App.css';

const Layout = () => {
  return (
    <div className="mobile-app">
      <Header />
      <main className="mobile-main">
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
};

export default Layout;