import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../src/context/UserContext";
import { motion } from "framer-motion";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [section, setSection] = useState("");
  const [semester, setSemester] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const sendOtp = async () => {
  try {
    console.log("Sending OTP to email:", email); // Debug log
    await axios.post(`${import.meta.env.VITE_BASE_URL}/users/send-otp`, { email }); // Wrap email in an object
    setIsOtpSent(true);
    alert("OTP sent to your email");
  } catch (error) {
    console.error("Error sending OTP:", error.response ? error.response.data : error.message); // Log error details
    alert("Failed to send OTP. Please check your email and try again.");
  }
};

  const verifyOtp = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/verify-otp`, { email, otp });
      if (response.status === 200) {
        setIsOtpVerified(true);
        alert("OTP verified successfully");
      }
    } catch (error) {
      alert("Invalid or expired OTP");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isOtpVerified) {
      alert("Please verify OTP first");
      return;
    }

    const newUser = {
      fullname,
      email,
      password,
      section,
      semester,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );

    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    console.log(email)

    setFullname("");
    setEmail("");
    setPassword("");
    setSection("");
    setSemester("");
  };

  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center p-4">
      <Link 
              to="/" 
              className="fixed top-4 right-4 z-50 hover:scale-110 transition-transform"
            >
              <p className="text-2xl text-white bg-transparent">🏠︎</p>
            </Link>
      <form onSubmit={submitHandler} className="w-full max-w-md">
        <motion.div
          className="bg-[#84ACD8] rounded-xl px-6 py-8 sm:p-10"
          initial={{ rotateX: 0, rotateY: 0 }}
          whileHover={{
            rotateX: -5,
            rotateY: 5,
            transition: { type: "spring", stiffness: 300, damping: 20 },
          }}
        >
          <div className="flex flex-col items-center">
            <h2 className="font-bold text-2xl sm:text-3xl text-[#0a51ad] mb-2">
              Create Account
            </h2>
            <p className="text-white text-sm sm:text-base mb-6 text-center">
              Join UnivMate in just a few steps!
            </p>

            <div className="flex flex-col w-full">
              <input
                type="text"
                required
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="Full Name"
                className="mb-4 px-4 py-2 rounded-md bg-[#0a2a43] text-white placeholder-gray-300 border border-[#0a51ad] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="mb-4 px-4 py-2 rounded-md bg-[#0a2a43] text-white placeholder-gray-300 border border-[#0a51ad] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />

              {!isOtpSent ? (
                <button
                  type="button"
                  onClick={sendOtp}
                  className="mb-4 px-4 py-2 rounded-md bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-all"
                >
                  Send OTP
                </button>
              ) : (
                <>
                  <input
                    type="text"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="mb-4 px-4 py-2 rounded-md bg-[#0a2a43] text-white placeholder-gray-300 border border-[#0a51ad] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  />
                  <button
                    type="button"
                    onClick={verifyOtp}
                    className="mb-4 px-4 py-2 rounded-md bg-green-700 text-white font-semibold hover:bg-green-800 transition-all"
                  >
                    Verify OTP
                  </button>
                </>
              )}

              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="mb-4 px-4 py-2 rounded-md bg-[#0a2a43] text-white placeholder-gray-300 border border-[#0a51ad] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />

              <select
                required
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="mb-4 px-4 py-2 rounded-md bg-[#0a2a43] text-white border border-[#0a51ad] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              >
                <option value="" disabled hidden>
                  Select Semester
                </option>
                <option value="A">First Semester</option>
                <option value="B">Second Semester</option>
              </select>

              <select
                required
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="mb-6 px-4 py-2 rounded-md bg-[#0a2a43] text-white border border-[#0a51ad] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              >
                <option value="" disabled hidden>
                  Select Section
                </option>
                <option value="A">A Section</option>
                <option value="B">B Section</option>
              </select>

              <button
                type="submit"
                disabled={!isOtpVerified}
                className="w-full py-2 rounded-md text-white font-semibold bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 shadow-lg shadow-blue-900/40 transition-all duration-200"
              >
                Sign Up
              </button>
            </div>

            <p className="text-sm text-white mt-5 text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-800 underline hover:text-white transition-colors"
              >
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </form>
    </div>
  );
};

export default Signup;