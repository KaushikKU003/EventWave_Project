import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import Logo from "../Images/Logo_PNG.png"; // Adjust path if needed

const ResponsiveNavbar = () => {
  const [showNav, setShowNav] = useState(false);

  const handleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <div className="w-full h-[90px] fixed top-0 z-50 bg-gradient-to-r from-[#e9cbf0] to-[#712681] shadow-md font-RobotoSlab">
      {/* Top navbar */}
      <div className="max-w-[1240px] mx-auto px-4 flex justify-between items-center h-full">
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
            <Link to="/contact" className="hover:text-[#fcddec] transition">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:text-[#fcddec] transition">
              Dashboard
            </Link>
          </li>
        </ul>

        {/* Mobile icon */}
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
                to="/contact"
                onClick={handleNav}
                className="hover:text-[#fcddec] transition"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                onClick={handleNav}
                className="hover:text-[#fcddec] transition"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResponsiveNavbar;
