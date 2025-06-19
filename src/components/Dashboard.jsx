import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaListUl } from "react-icons/fa";
import Logo from "../Images/Logo_PNG.png";

const Dashboard = () => {
  const [userType, setUserType] = useState("User");
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Replace with actual userType fetching logic
    const storedType = localStorage.getItem("userType") || "User";
    setUserType(storedType);

    // Fetch relevant events based on role (mocked for now)
    if (storedType === "User") {
      setEvents([
        { id: 1, name: "Tech Conference", date: "2025-07-01" },
        { id: 2, name: "Startup Meetup", date: "2025-07-10" },
      ]);
    } else {
      setEvents([
        { id: 101, name: "Organizer Expo", date: "2025-07-05" },
        { id: 102, name: "Product Launch", date: "2025-07-15" },
      ]);
    }
  }, []);

  const handleEventClick = (id) => {
    navigate(`/event/${id}`);
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleEventListingClick = () => {
    navigate("/events");
  };

  const gradient =
    userType === "User"
      ? "from-[#e9cbf0] to-[#712681]"
      : "from-[#ffb62a] to-[#ffd990]";

  const headingText =
    userType === "User" ? "Registered Events" : "Your Upcoming Events";

  return (
    <div className="min-h-screen bg-cover bg-center login-bg px-4 py-6 font-RobotoSlab">
      <div
        className={`bg-gradient-to-r ${gradient} rounded-3xl shadow-2xl max-w-6xl mx-auto px-6 py-8`}
      >
        <div className="flex justify-between items-center mb-6">
          <img
            src={Logo}
            alt="EventWave Logo"
            className="h-12 float-animation"
          />
          <div className="flex gap-4 text-2xl text-white drop-shadow-md">
            <FaListUl
              className="cursor-pointer hover:text-gray-300 hover:drop-shadow-lg transition"
              title="Event Listing"
              onClick={handleEventListingClick}
            />
            <FaUserCircle
              className="cursor-pointer hover:text-gray-300 hover:drop-shadow-lg transition"
              title="Profile"
              onClick={handleProfileClick}
            />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-white mb-8 drop-shadow-md">
          {headingText}
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => handleEventClick(event.id)}
              className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl cursor-pointer transition duration-300"
            >
              <h3 className="text-xl font-semibold text-[#5c076f]">
                {event.name}
              </h3>
              <p className="text-gray-600 mt-1">Date: {event.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
