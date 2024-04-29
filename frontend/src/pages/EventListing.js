import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EventListing.css';
import EventCard from './EventCard';

const EventListing = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/personalized-events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="event-listing-container">
      <h1 className="event-listing-header">Event Listings</h1>
      <div className="event-cards-container">
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  );
}

export default EventListing;

