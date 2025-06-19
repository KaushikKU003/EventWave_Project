// pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import ResponsiveNavbar from "../components/ResponsiveNavbar";

const Home = () => {
  return (
    <div className="h-screen bg-gray-100">
      <ResponsiveNavbar />

      <div className="pt-[90px] flex flex-col items-center justify-center text-center h-full">
        <h1 className="text-4xl font-bold mb-6">Welcome to EventWave</h1>
        <p className="text-lg mb-8">
          Your gateway to manage and attend community events
        </p>
        <Link to="/login">
          <button className="px-6 py-2 bg-white text-[#712681] border border-[#712681] rounded-full hover:bg-[#f1e6f7] transition">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
