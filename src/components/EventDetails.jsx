import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import GoogleMapBox from "../utils/GoogleMapBox";

import { FaCalendarDay } from "react-icons/fa";
import { IoIosClock } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { PiChairFill } from "react-icons/pi";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaUserGroup } from "react-icons/fa6";

import { FaRegHeart, FaHeart } from "react-icons/fa";
import { ThreeDot } from "react-loading-indicators";

const EventDetails = () => {
  const { id } = useParams();
  const { token, role, customerUserName } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(
          `https://backend-eventwave-production.up.railway.app/api/events/${id}`,
          { headers }
        );
        setEvent(response.data);

        if (response.data.registered === true) {
          setRegistered(true);
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [id, token]);

  const handleRegisterClick = () => {
    if (!token) {
      toast.warning("Please login to register for this event", { autoClose: 2000 });
      return;
    }
    toast.success("You have successfully registered for this event!");
    setRegistered(true);
  };

  const handleFavoriteClick = ()=>{
    //add api here
    if (!token) {
      toast.warning("Please login to favorite this event", { autoClose: 2000 });
      return;
    }
    toast.success("You have successfully favorited this event!");
  }

  const handleParicipantListClick =()=>{
    //add api here
    toast.info("Clicked on Registration and Participant List");
  }

  if (!event)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-lg font-medium">
          <ThreeDot size={30} color="#712681" />
        </div>
      </div>
    );

  return (
  <div className="max-w-4xl mx-4 md:mx-auto my-10 p-4 sm:p-6 bg-[#e9cbf0] shadow-md rounded-lg font-RobotoSlab">
    <h2 className="text-2xl sm:text-3xl font-bold text-[#5e1c6a] mb-6 text-center">
      Event Details
    </h2>

    {/* Event Image */}
    <img
      src={event.imageUrl}
      alt={event.title}
      className="w-full h-72 sm:h-80 rounded-lg mb-6 object-cover"
    />

    {/* Title + Register Button */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
      <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 break-words">
        {event.title}
      </h1>

      <div className="flex flex-col items-start sm:items-end gap-2">
        <p className="text-sm text-red-600 font-medium">
          {event.availableSeats} seats available out of {event.capacity}
        </p>

        {/* Register button for USER and unauthenticated */}
        {(!token || role === "USER") && (
          <button
            onClick={handleRegisterClick}
            disabled={registered}
            className={`w-full sm:w-auto px-4 py-2 text-white text-lg font-semibold rounded-full shadow transition duration-300 hover:scale-95 ${
              registered
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#5e1c6a] hover:bg-[#704677]"
            }`}
          >
            {registered ? "Registered" : "Register"}
          </button>
        )}

        {/* View Participants for the event organizer */}
        {token &&
          role === "ORGANIZER" &&
          customerUserName === event.organizer?.username && (
            <button
              onClick={handleParicipantListClick}
              className="w-full sm:w-auto px-4 py-2 text-indigo-950 text-sm font-semibold rounded-full shadow transition duration-300 bg-[#ec9b00] hover:bg-[#ffaf16] hover:scale-95 cursor-pointer"
            >
              View Registered Participants
            </button>
          )}
      </div>
    </div>

    {/* Description and Favorite */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
      <p className="text-lg sm:text-2xl text-gray-800 break-words">
        {event.description}
      </p>

      {(!token || role === "USER") && (
        <button className="text-red-500 text-4xl focus:outline-none cursor-pointer" onClick={handleFavoriteClick}>
          {event.favorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      )}
    </div>

    <hr className="my-8 border border-blueGray-300" />

    {/* Details + Map */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
      {/* Event Details */}
      <div className="space-y-4 text-gray-700 text-base sm:text-lg">
        <p className="flex items-center gap-2">
          <span className="font-semibold flex items-center gap-1">
            <FaCalendarDay size={20} /> Date:
          </span>
          {event.date}
        </p>

        <p className="flex items-center gap-2">
          <span className="font-semibold flex items-center gap-1">
            <IoIosClock size={20} /> Time:
          </span>
          {event.startTime}
        </p>

        <p className="flex items-start gap-2">
          <span className="font-semibold flex items-center gap-1">
            <FaMapLocationDot size={20} /> Location:
          </span>
          {event.location}
        </p>

        <p className="flex items-center gap-2">
          <span className="font-semibold flex items-center gap-1">
            <BiSolidCategoryAlt size={20} /> Category:
          </span>
          {event.categoryName}
        </p>

        <p className="flex items-center gap-2">
          <span className="font-semibold flex items-center gap-1">
            <PiChairFill size={20} /> Capacity:
          </span>
          {event.capacity}
        </p>

        <p className="flex items-center gap-2">
          <span className="font-semibold flex items-center gap-1">
            <RiMoneyRupeeCircleFill size={20} /> Price:
          </span>
          ₹{event.price}
        </p>

        <p className="flex items-center gap-2">
          <span className="font-semibold flex items-center gap-1">
            <FaUserGroup size={20} /> Organizer:
          </span>
          {event.organizer?.fullName}
        </p>
      </div>

      {/* Map */}
      {event.latitude && event.longitude && (
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-3">
            Event Location
          </h2>
          <GoogleMapBox lat={event.latitude} lng={event.longitude} />
        </div>
      )}
    </div>
  </div>
);
};

export default EventDetails;
