import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EventCard from "./EventCard";
import { AuthContext } from "../context/AuthContext";
import { ThreeDot } from "react-loading-indicators";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const {
    role: userType,
    isLoggedIn,
    loading,
    token,
  } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "https://backend-eventwave-production.up.railway.app/api/events/my-events",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEvents(response.data);
    } catch (err) {
      console.error("Error fetching events:", err);
      if (err.response && err.response.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    if (loading || !userType || !token) return;
    fetchEvents();
  }, [userType, loading, token]);

  const handleFavoriteToggle = async (eventId, isFavorite) => {
    if (!token) {
      toast.warn("Please login to favorite events.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    try {
      if (isFavorite) {
        await axios.delete(
          `https://backend-eventwave-production.up.railway.app/api/favorites/remove/${eventId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `https://backend-eventwave-production.up.railway.app/api/favorites/add/${eventId}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      // ✅ Refetch events from backend to sync correct favorite state
      await fetchEvents();
    } catch (error) {
      console.error("Error toggling favorite:", error);
      alert("Failed to update favorite. Please try again.");
    }
  };

  const buttonColor =
    userType === "USER"
      ? "bg-[#9030a5] hover:bg-[#751d8a]"
      : "bg-[#ffaf16] hover:bg-[#e69d10]";

  if (loading) {
    return (
      <div className="text-center py-12 text-xl">Loading Dashboard...</div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-6 py-12 font-RobotoSlab">
      <div className="flex justify-between items-center max-w-6xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#712681] drop-shadow">
          {userType === "USER"
            ? "Your Registered Events"
            : "Your Upcoming Events"}
        </h2>

        {userType !== "USER" && (
          <button
            onClick={() => navigate("/eventcreation")}
            className="bg-[#712681] text-white px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 text-base sm:text-lg rounded-xl hover:bg-[#5e1c6a] transition"
          >
            Create New Event
          </button>
        )}
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onFavoriteToggle={() =>
              handleFavoriteToggle(event.id, event.favorite)
            }
            buttonColor={buttonColor}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
