import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Images/Logo_PNG.png";
import { MdOutlineMail } from "react-icons/md";
import { IoLockClosed } from "react-icons/io5";
import { RiEyeCloseLine } from "react-icons/ri";
import { AiFillEye } from "react-icons/ai";
import { FaInfoCircle } from "react-icons/fa";
import { BiText } from "react-icons/bi";


const Register = () => {
  const [fullName, setFullName] = useState(""); // New full name field
  const [userType, setUserType] = useState("User");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  const navigate = useNavigate();

  const validateEmail = () => {
    if(!email){
      setEmailError("Email is required");
    }
    else if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if(!password){
      setPasswordError("Password is required");
    }
    else if (!passwordRegex.test(password)) {
      setPasswordError("Invalid password format");
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = () => {
    if (confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  useEffect(() => {
    validateConfirmPassword();
  }, [confirmPassword]);

  const handleRegister = (e) => {
    e.preventDefault();
    validateEmail();
    validatePassword();
    validateConfirmPassword();

    if (emailError || passwordError || confirmPasswordError) return;

    const regCreds = { fullName, userType, email, password };
    console.log("Registration Credentials:", regCreds);

    // Clear form after registration
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    navigate("/login");
  };

  const isFormValid =
    fullName &&
    email &&
    password &&
    confirmPassword &&
    !emailError &&
    !passwordError &&
    !confirmPasswordError;

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center login-bg px-2 py-6 font-RobotoSlab">
      <div className="flex flex-col sm:flex-row-reverse rounded-3xl shadow-2xl overflow-hidden w-[90%] max-w-5xl bg-gradient-to-r from-[#004d8f] to-[#5cb4ff] h-fit sm:h-auto px-3 py-2">
        {/* Logo Section */}
        <div className="w-full sm:w-1/2 text-[#003767] p-8 flex flex-col justify-center items-center">
          <img
            src={Logo}
            alt="EventWave Logo"
            className="h-24 mb-4 float-animation"
          />
          <h2 className="text-2xl font-semibold">Join</h2>
          <p className="text-3xl font-light mt-2 text-center">EventWave</p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleRegister}
          className="w-full sm:w-1/2 bg-white p-6 sm:p-10 relative sm:m-3 curved-container-register rounded-tl-3xl rounded-bl-3xl flex flex-col justify-center"
        >
          <h2 className="text-2xl font-semibold text-gray-700 mb-8 text-center mt-12 sm:mt-6">
            Register
          </h2>

          {/* Full Name */}
          <div className="mb-3 w-[85%] mx-auto">
            <div className="flex items-center bg-gray-100 rounded-xl outline-2 outline-indigo-400/50 px-4 py-2">
              <span className="text-2xl"><BiText/></span>
              <input
                type="text"
                placeholder="Full Name*"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-transparent w-full outline-none ml-2"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-3 w-[85%] mx-auto">
            <div className="flex items-center bg-gray-100 rounded-xl outline-2 outline-indigo-400/50 px-4 py-2">
              <span className="text-2xl">
                <MdOutlineMail />
              </span>
              <input
                type="email"
                placeholder="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
                className="bg-transparent w-full outline-none ml-2"
              />
            </div>
            {emailError && (
              <p className="text-sm text-red-600 mt-1">{emailError}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-3 w-[85%] mx-auto">
            <div className="flex items-center bg-gray-100 rounded-xl outline-2 outline-indigo-400/50 px-4 py-2 relative">
              <span className="text-2xl">
                <IoLockClosed />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
                className="bg-transparent w-full outline-none ml-2 pr-16"
              />
              <div className="absolute right-4 flex items-center gap-2">
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 cursor-pointer text-lg"
                >
                  {showPassword ? <RiEyeCloseLine /> : <AiFillEye />}
                </span>
                <div className="relative group">
                  <span className="text-blue-500 cursor-pointer text-base">
                    <FaInfoCircle />
                  </span>
                  <div className="absolute top-[110%] right-0 bg-white border border-blue-300 shadow-md p-3 rounded-lg w-64 z-10 text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200">
                    <p className="font-semibold text-blue-800 mb-1">
                      Password must:
                    </p>
                    <ul className="list-disc ml-5 space-y-1 text-gray-700">
                      <li>Be 8-15 characters long</li>
                      <li>Include uppercase & lowercase</li>
                      <li>Contain a number</li>
                      <li>Include a special character (@.#$!%*?&)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {passwordError && (
              <p className="text-sm text-red-600 mt-1">{passwordError}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-6 w-[85%] mx-auto">
            <div
              className={`flex items-center bg-gray-100 rounded-xl px-4 py-2 relative outline-2 ${
                confirmPassword
                  ? confirmPassword === password
                    ? "outline-green-500"
                    : "outline-red-500"
                  : "outline-indigo-400/50"
              }`}
            >
              <span className="text-2xl">
                <IoLockClosed />
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password*"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={validateConfirmPassword}
                className="bg-transparent w-full outline-none ml-2 pr-8"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 text-gray-500 cursor-pointer text-lg"
              >
                {showConfirmPassword ? <RiEyeCloseLine /> : <AiFillEye />}
              </span>
            </div>
            {confirmPasswordError && (
              <p className="text-sm text-red-600 mt-1">
                {confirmPasswordError}
              </p>
            )}
          </div>

          {/* Role Selector */}
          <div className="mb-4 w-[85%] mx-auto">
            <label className="block text-sm text-gray-700 mb-1">
              Select Role
            </label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full bg-gray-100 px-4 py-2 rounded-xl outline-2 outline-indigo-400/50"
            >
              <option value="User">User</option>
              <option value="Organizer">Organizer</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-[85%] mx-auto block ${
              isFormValid
                ? "bg-[#5cb4ff] hover:bg-[#34a1ff]"
                : "bg-gray-400 cursor-not-allowed"
            } text-[#003767] py-2 rounded-full font-semibold transition`}
          >
            REGISTER
          </button>

          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-[#0079e1]">Login</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
