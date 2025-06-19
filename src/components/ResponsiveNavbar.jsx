import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";
import Logo from "../Images/Logo_PNG.png";
import { FaUserCircle } from "react-icons/fa";

const ResponsiveNavbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const handleNav = () => setShowNav(!showNav);

  useEffect(() => {
    // Replace with real login check
    const user = "Jeffy";
    if (user) {
      setIsLoggedIn(true);
      setUserName(user);
    }
  }, []);

  return (
    <div className="w-full h-[90px] fixed top-0 z-50 bg-gradient-to-r from-[#e9cbf0] to-[#712681] shadow-md font-RobotoSlab">
      <div className="max-w-[1240px] mx-auto px-4 flex justify-between items-center h-[90px]">
        {/* Logo */}
        <Link to="/">
          <img
            src={Logo}
            alt="EventWave Logo"
            className="h-10 float-animation"
          />
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-8 text-white font-medium">
          <li>
            <Link to="/" className="hover:text-[#fcddec] transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-[#fcddec] transition">
              About
            </Link>
          </li>
          <li>
            <Link to="/events" className="hover:text-[#fcddec] transition">
              Events
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link to="/dashboard" className="hover:text-[#fcddec] transition">
                Dashboard
              </Link>
            </li>
          )}

          <div className="hidden md:flex items-center gap-4">
            {!isLoggedIn ? (
              <Link to="/login">
                <button className="px-6 py-2 bg-white text-[#712681] border border-[#712681] rounded-full hover:bg-[#f1e6f7] transition">
                  Login
                </button>
              </Link>
            ) : (
              <div className="flex items-center gap-2 text-white">
                <FaUserCircle size={24} />
                <span className="font-medium">{userName}</span>
              </div>
            )}
          </div>
        </ul>

        {/* Mobile toggle icon */}
        <div className="md:hidden text-white" onClick={handleNav}>
          {showNav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </div>
      </div>

      {/* Mobile menu */}
      {showNav && (
        <div className="md:hidden bg-gradient-to-b from-[#e9cbf0] to-[#712681] text-white font-medium flex flex-col items-center justify-center py-10 space-y-6 shadow-lg">
          <ul className="flex flex-col items-center space-y-4">
            <li>
              <Link
                to="/"
                onClick={handleNav}
                className="hover:text-[#fcddec] transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={handleNav}
                className="hover:text-[#fcddec] transition"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/events"
                onClick={handleNav}
                className="hover:text-[#fcddec] transition"
              >
                Events
              </Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link
                  to="/dashboard"
                  onClick={handleNav}
                  className="hover:text-[#fcddec] transition"
                >
                  Dashboard
                </Link>
              </li>
            )}
            {!isLoggedIn ? (
              <li>
                <Link to="/login" onClick={handleNav}>
                  <button className="px-6 py-2 bg-white text-[#712681] border border-[#712681] rounded-full hover:bg-[#f1e6f7] transition">
                    Login
                  </button>
                </Link>
              </li>
            ) : (
              <li className="flex items-center gap-2">
                <FaUserCircle size={22} />
                <span className="font-medium">{userName}</span>
              </li>
            )}
          </ul>
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default ResponsiveNavbar;
