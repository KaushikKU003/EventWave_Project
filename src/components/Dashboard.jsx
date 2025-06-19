import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaRegBookmark,
  FaBookmark,
  FaMicrophone,
  FaGuitar,
  FaFutbol,
  FaLaptopCode,
} from "react-icons/fa";

const Dashboard = () => {
  const [userType, setUserType] = useState("User");
  const [events, setEvents] = useState([]);
  const [favorites, setFavorites] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedType = "User"; // Replace with actual logic
    setUserType(storedType);

    const fetchEvents = async () => {
      try {
        // Simulated event data
        if (storedType === "User") {
          setEvents([
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
          ]);
        } else {
          setEvents([
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
          ]);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (id) => {
    navigate(`/event/${id}`);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const headingText =
    userType === "User" ? "Your Registered Events" : "Your Upcoming Events";

  const getGradient = (index) => {
    const gradients = [
      "from-[#9030a5] to-[#d8328e]",
      "from-[#ff5871] to-[#ff8d58]",
      "from-[#ffc453] to-[#f9f871]",
    ];
    return gradients[index % gradients.length];
  };

  const getPillColor = () =>
    userType === "User" ? "bg-[#712681]" : "bg-[#ffb62a]";

  const categoryIcons = {
    tech: <FaLaptopCode size={50} className="text-[#712681]" />,
    music: <FaGuitar size={50} className="text-[#712681]" />,
    sports: <FaFutbol size={50} className="text-[#712681]" />,
    business: <FaMicrophone size={50} className="text-[#712681]" />,
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12 font-RobotoSlab">
      <h2 className="text-4xl font-bold text-center text-[#712681] mb-12 drop-shadow">
        {headingText}
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {events.map((event, index) => (
          <div
            key={event.id}
            className="relative bg-[#fef7ff] rounded-xl shadow hover:shadow-xl transition duration-300 border border-gray-200 text-center flex flex-col items-center"
          >
            {/* Gradient Top Border */}
            <div
              className={`h-2 w-full rounded-t-xl bg-gradient-to-r ${getGradient(
                index
              )}`}
            ></div>

            {/* Favorite Icon - Top Right */}
            <button
              onClick={() => toggleFavorite(event.id)}
              className="absolute top-4 right-3 z-10"
            >
              {favorites[event.id] ? (
                <FaBookmark className="text-[#d8328e] text-lg" />
              ) : (
                <FaRegBookmark className="text-[#d8328e] text-lg" />
              )}
            </button>

            {/* Icon */}
            <div className="mt-6 z-0">{categoryIcons[event.category]}</div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-[#5c076f] mt-4 z-0">
              {event.name}
            </h3>

            {/* Description */}
            <p className="text-gray-600 px-4 mt-2 z-0">{event.description}</p>

            {/* Date */}
            <p className="text-sm text-gray-500 mt-1 z-0">Date: {event.date}</p>

            {/* Registered/Organized Pill (Bottom) */}
            <div className="mt-4 mb-5">
              <span
                className={`text-xs text-white ${getPillColor()} px-3 py-1 rounded-full font-medium shadow`}
              >
                {userType === "User" ? "Registered" : "Organized"}
              </span>
            </div>

            {/* Clickable Overlay */}
            <div
              onClick={() => handleEventClick(event.id)}
              className="absolute inset-0 z-0"
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
