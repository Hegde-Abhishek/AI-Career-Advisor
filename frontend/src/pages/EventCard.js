import './EventListing.css';
import { BsEyeFill, BsCalendar, BsGeoAlt, BsCashStack } from 'react-icons/bs';

const EventCard = ({ event }) => {
    return (
      <div className="event-card">
        <h3 className="event-title">{event.title}</h3>
        <div className="event-info">
          <p><BsCalendar className="icon" /> {event.dateTime}</p>
          <p><BsGeoAlt className="icon" /> {event.location}</p>
          <p><BsCashStack className="icon" /> {event.fees}</p>
        </div>
        <a href={event.eventLink} className="event-link-button" target="_blank" rel="noopener noreferrer">
          <BsEyeFill /> View Event
        </a>
      </div>
    );
  };

export default EventCard;