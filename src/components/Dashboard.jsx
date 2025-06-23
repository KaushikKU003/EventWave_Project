import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaMicrophone, FaGuitar, FaFutbol, FaLaptopCode } from "react-icons/fa";
import EventCard from "./EventCard";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { role: userType, isLoggedIn } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [favorites, setFavorites] = useState({});
  const navigate = useNavigate();

  // Redirect if user is not logged in (after auth is initialized)
  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // Load dummy events based on role
  useEffect(() => {
    if (!userType) return;

    const fetchEvents = async () => {
      try {
        const dummyEvents =
          userType === "User"
            ? [
                {
                  id: 1,
                  name: "Tech Conference",
                  date: "2025-07-01",
                  category: "tech",
                  description: "Explore the future of tech",
                },
                {
                  id: 2,
                  name: "Music Festival",
                  date: "2025-07-10",
                  category: "music",
                  description: "Live performances and more",
                },
              ]
            : [
                {
                  id: 101,
                  name: "Startup Pitch",
                  date: "2025-07-05",
                  category: "business",
                  description: "Pitch your idea to investors",
                },
                {
                  id: 102,
                  name: "Football Mania",
                  date: "2025-07-15",
                  category: "sports",
                  description: "Local teams clash!",
                },
              ];
        setEvents(dummyEvents);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, [userType]);

  const handleEventClick = (id) => {
    navigate(`/event/${id}`);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getGradient = (index) => {
    const gradients = [
      "from-[#9030a5] to-[#d8328e]",
      "from-[#ff5871] to-[#ff8d58]",
      "from-[#ffc453] to-[#f9f871]",
    ];
    return gradients[index % gradients.length];
  };

  const categoryIcons = {
    tech: <FaLaptopCode size={50} className="text-[#712681]" />,
    music: <FaGuitar size={50} className="text-[#712681]" />,
    sports: <FaFutbol size={50} className="text-[#712681]" />,
    business: <FaMicrophone size={50} className="text-[#712681]" />,
  };

  const pillColor = userType === "User" ? "bg-[#712681]" : "bg-[#ffb62a]";
  const headingText =
    userType === "User" ? "Your Registered Events" : "Your Upcoming Events";

  return (
    <div className="min-h-screen bg-white px-6 py-12 font-RobotoSlab">
      <h2 className="text-4xl font-bold text-center text-[#712681] mb-12 drop-shadow">
        {headingText}
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {events.map((event, index) => (
          <EventCard
            key={event.id}
            event={event}
            index={index}
            gradient={getGradient(index)}
            isFavorite={favorites[event.id]}
            onToggleFavorite={toggleFavorite}
            onClick={handleEventClick}
            icon={categoryIcons[event.category]}
            pillLabel={userType === "User" ? "Registered" : "Organized"}
            pillColor={pillColor}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
