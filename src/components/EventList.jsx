import React, { useEffect, useState } from "react";
import axios from "axios";
import EventList_card from "../utils/EventList_card"; // Adjust the path as necessary

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://backend-eventwave-production.up.railway.app/api/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventList_card key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
