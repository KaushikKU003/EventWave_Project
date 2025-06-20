import React from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const EventCard = ({
  event,
  gradient,
  isFavorite,
  onToggleFavorite,
  onClick,
  icon,
  pillLabel,
  pillColor,
}) => {
  return (
    <div className="relative bg-[#fef7ff] rounded-xl shadow hover:shadow-xl transition duration-300 border border-gray-200 text-center flex flex-col items-center">
      {/* Gradient Top Border */}
      <div className={`h-2 w-full rounded-t-xl bg-gradient-to-r ${gradient}`} />

      {/* Favorite Icon */}
      <button
        onClick={() => onToggleFavorite(event.id)}
        className="absolute top-4 right-3 z-10"
      >
        {isFavorite ? (
          <FaBookmark className="text-[#d8328e] text-lg" />
        ) : (
          <FaRegBookmark className="text-[#d8328e] text-lg" />
        )}
      </button>

      {/* Category Icon */}
      <div className="mt-6 z-0">{icon}</div>

      {/* Event Info */}
      <h3 className="text-xl font-semibold text-[#5c076f] mt-4 z-0">
        {event.name}
      </h3>
      <p className="text-gray-600 px-4 mt-2 z-0">{event.description}</p>
      <p className="text-sm text-gray-500 mt-1 z-0">Date: {event.date}</p>

      {/* Status Pill */}
      <div className="mt-4 mb-5">
        <span
          className={`text-xs text-white ${pillColor} px-3 py-1 rounded-full font-medium shadow`}
        >
          {pillLabel}
        </span>
      </div>

      {/* Click Overlay */}
      <div
        onClick={() => onClick(event.id)}
        className="absolute inset-0 z-0 cursor-pointer"
      />
    </div>
  );
};

export default EventCard;
