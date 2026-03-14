// src/components/Navbar.js

import React from 'react';
import {Link } from "react-router-dom"

const Unavbar = () => {
  const get = localStorage.getItem('user');
  const userName = get && get !== 'undefined' ? JSON.parse(get).name : 'Guest';
  return (
    <nav className="bg-blue-500 text-white px-8 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <Link to='/uhome' className="text-white text-xl font-bold no-underline">Darshan-Ease</Link>
        <div className="flex items-center space-x-6">
          <Link to="/uhome" className="text-white no-underline hover:text-blue-200 transition">Home</Link>
          <Link to="/utemples" className="text-white no-underline hover:text-blue-200 transition">Temples</Link>
          <Link to="/mybookings" className="text-white no-underline hover:text-blue-200 transition">My Bookings</Link>
          <Link to="/" className="text-white no-underline hover:text-blue-200 transition">Logout</Link>
          <span className="text-white">({userName})</span>
        </div>
      </div>
    </nav>
  );
};

export default Unavbar;
