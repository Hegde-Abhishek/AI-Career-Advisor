// components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">Career Advisor</Link>
        <ul className="nav-links">
          <li><Link to="/job-listing">Jobs</Link></li>
          <li><Link to="/event-listing">Events</Link></li>
          <li><Link to="/visa-rules">Visa Rules</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          {/* Add more navigation links as needed */}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
