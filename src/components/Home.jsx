// pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to EventWave</h1>
      <p className="text-lg mb-8">Your gateway to manage and attend community events</p>
      <Link to="/login">
        <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition">
          Login
        </button>
      </Link>
    </div>
  );
};

export default Home;
