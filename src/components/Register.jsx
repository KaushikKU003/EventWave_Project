import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { IoLockClosed } from "react-icons/io5";
import { RiEyeCloseLine } from "react-icons/ri";
import { AiFillEye } from "react-icons/ai";
import { FaInfoCircle } from "react-icons/fa";
import { BiText } from "react-icons/bi";
import Logo from "../Images/Logo_PNG.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { MuiOtpInput } from "mui-one-time-password-input";
const Register = () => {
  const [fullName, setFullName] = useState("");
  const [userType, setUserType] = useState("USER");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [serverEmailError, setServerEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [code, setCode] = useState("");
  const savedCode = "1234";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handleCodeChange = (code) => {
    setCode(code);
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required");
    } else if (!passwordRegex.test(password)) {
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

  const handleRegister = async (e) => {
    e.preventDefault();
    validateEmail();
    validatePassword();
    validateConfirmPassword();

    if (emailError || passwordError || confirmPasswordError) return;

    const regCreds = {
      fullName: fullName,
      email,
      password,
      role: userType,
    };
    // console.log(regCreds);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/register`,
        regCreds,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message || "Registration successful!");
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setEmailError("");
      setPasswordError("");
      setConfirmPasswordError("");

      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data;
        
        if (status === 409) {
          setServerEmailError(message);
        } else {
          toast.error("Registration failed.");
        }
      } else {
        // alert("Something went wrong. Please try again.");
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const isFormValid =
    fullName &&
    email &&
    password &&
    confirmPassword &&
    isEmailVerified &&
    !passwordError &&
    !confirmPasswordError;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
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
                <span className="text-2xl">
                  <BiText />
                </span>
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
              <div
                className={`flex items-center bg-gray-100 rounded-xl px-4 py-2 outline-2 
                            ${isEmailVerified ? "outline-green-500" : "outline-indigo-400/50"}`}
              >
                <span className="text-2xl">
                  <MdOutlineMail />
                </span>
                <input
                  type="email"
                  placeholder="Email*"
                  value={email}
                  onChange={(e) => {
                    if (!isEmailVerified) {
                      setEmail(e.target.value);
                      setServerEmailError("");
                    }
                  }}
                  onBlur={validateEmail}
                  className={`bg-transparent w-full outline-none ml-2 ${
                    isEmailVerified ? "text-gray-500 cursor-not-allowed" : ""
                  }`}
                  disabled={isEmailVerified}
                />
              </div>

              {emailError && (
                <p className="text-sm text-red-600 mt-1">{emailError}</p>
              )}

              {/* Show Verify Email only if not verified */}
             {!emailError && email && !isEmailVerified && (
                <p
                  className="text-sm text-blue-600 mt-1 underline cursor-pointer"
                  onClick={() => setVerifyDialogOpen(true)}
                >
                  Verify Email
                </p>
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
                <option value="USER">User</option>
                <option value="ORGANIZER">Organizer</option>
              </select>
            </div>
            {/* Server-side Email Error Message */}
            {serverEmailError && (
              <p className="text-sm text-red-600 -mt-2 mb-4 text-center">
                {serverEmailError}
              </p>
            )}

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

      <Dialog
        open={verifyDialogOpen}
        onClose={() => setVerifyDialogOpen(false)}
        className="font-RobotoSlab"
      >
        <DialogTitle className="flex justify-between items-center">
          Verify Your Email
          <IconButton onClick={() => setVerifyDialogOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <div className="py-4">
            <p className="mb-4 text-gray-700 text-sm">
              Enter the 4-digit Code sent to your email.
            </p>

            <MuiOtpInput onChange={handleCodeChange} value={code} length={4} />

            {/* Buttons */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => {
                  if (code === savedCode) {
                    alert("Code Verified Successfully!");
                    setIsEmailVerified(true); // ✅ Email is now verified
                    setVerifyDialogOpen(false); // Close dialog or proceed
                  } else {
                    alert("Invalid Code. Please try again.");
                  }
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Verify
              </button>

              <button
                onClick={() => {
                  // Reset logic placeholder
                  alert("Reset clicked (add logic later)");
                }}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Resend Code
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Register;
