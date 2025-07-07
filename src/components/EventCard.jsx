import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaLaptopCode,
  FaGuitar,
  FaFutbol,
  FaMicrophone,
  FaHeartbeat,
  FaBook,
  FaPalette,
} from "react-icons/fa";

const categoryIcons = {
  tech: <FaLaptopCode className="text-purple-700" />,
  music: <FaGuitar className="text-purple-700" />,
  sports: <FaFutbol className="text-purple-700" />,
  business: <FaMicrophone className="text-purple-700" />,
  health: <FaHeartbeat className="text-purple-700" />,
  education: <FaBook className="text-purple-700" />,
  art: <FaPalette className="text-purple-700" />,
};

const EventCard = ({
  event,
  onFavoriteToggle = () => {},
  buttonColor = "",
}) => {
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);

  const handleShowMore = () => {
    navigate(`/events/${parseInt(event.id)}`);
  };

  return (
    <div className="relative max-w-sm rounded-xl overflow-hidden shadow-md bg-white transition hover:shadow-xl">
      <img
        className="w-full h-48 object-cover"
        src={event.imageUrl}
        alt={event.title}
      />

      {/* Favorite Icon */}
      {role !== "ORGANIZER" && (
        <div className="absolute top-2 right-2">
          <button onClick={onFavoriteToggle} title="Favorite">
            {event.favorite ? (
              <FaHeart className="text-red-500 text-xl" />
            ) : (
              <FaRegHeart className="text-red-500 text-xl" />
            )}
          </button>
        </div>
      )}

      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-xl">{event.title}</h3>
          {categoryIcons[event.categoryName?.toLowerCase()?.trim()] || null}
        </div>
        <p className="text-gray-700 text-base mb-2  text-justify">
          {event.description}
        </p>
        <p className="text-sm text-gray-600">📌 {event.location}</p>
        <p className="text-sm text-gray-600">📆 {event.date}</p>
        <p className="text-sm text-gray-600">
          🪑 {event.availableSeats} seats available
        </p>
        <button
          onClick={handleShowMore}
          className={`mt-4 w-full ${buttonColor} text-white rounded py-2 px-4 transition`}
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default EventCard;
