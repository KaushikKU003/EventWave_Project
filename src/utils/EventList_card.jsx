import React from 'react'
import { useNavigate } from 'react-router-dom';

const EventList_card = ({ event }) => {
  const navigate = useNavigate();

  const handleShowMore = () => {
    navigate(`/events/${parseInt(event.id)}`);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full h-48 object-cover" src={event.imageUrl} alt={event.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{event.title}</div>
        <p className="text-gray-700 text-base mb-2">{event.description}</p>
        <p className="text-sm text-gray-600">📍 {event.location}</p>
        <p className="text-sm text-gray-600">📅 {event.date}</p>
        <p className="text-sm text-gray-600">🎟 {event.availableSeats} seats available</p>
        <button
          onClick={handleShowMore}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default EventList_card