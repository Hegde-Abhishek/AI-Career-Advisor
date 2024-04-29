// components/AnimatedCards.js

import React from 'react';
import { Link } from 'react-router-dom';
import './AnimatedCards.css';

const AnimatedCards = () => {
  return (
    <div className="animated-cards">
      <Link to="/job-listing" className="card">
        Job Listing
      </Link>
      <Link to="/event-listing" className="card">
        Event Listing
      </Link>
      <Link to="/visa-advice" className="card">
        Visa Advice
      </Link>
      {/* <Link to="/user-profile" className="card">
        User Profile
      </Link> */}
      <Link to="/personalizedTips" className="card">
        Personalized Advice
      </Link>
    </div>
  );
};

export default AnimatedCards;
