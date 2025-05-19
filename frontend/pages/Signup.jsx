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
  const [otp, setOtp] = useState("");
  const [showOtpCard, setShowOtpCard] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const handleInitialSubmit = async () => {
    if (!fullname || !email || !password || !section) {
      alert("Please fill in all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      setIsLoading(true);
      setEmailError("");
      const api = axios.create({
        baseURL: import.meta.env.VITE_BASE_URL,
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      const checkEmailResponse = await api.post('/users/check-email', {
        email: email.trim()
      });

      if (checkEmailResponse.data.exists) {
        setEmailError("This email is already registered. Please use a different email or login.");
        return;
      }

      const newUser = {
        fullname: fullname.trim(),
        email: email.trim(),
        password: password,
        section: section
      };
      setRegistrationData(newUser);

      const otpResponse = await api.post('/users/send-otp', { 
        email: email.trim()
      });

      if (otpResponse.status === 200) {
        setShowSuccessCard(true);
      }

    } catch (error) {
      console.error("Error:", error);
      const message = error.response?.data?.message || "Failed to process request. Please try again.";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerify = async () => {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    try {
      setIsVerifyingOtp(true);
      const api = axios.create({
        baseURL: import.meta.env.VITE_BASE_URL,
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      await api.post('/users/verify-otp', { 
        email: registrationData.email, 
        otp 
      });

      const response = await api.post('/users/register', registrationData);

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (error) {
      console.error("Error:", error);
      const message = error.response?.data?.message || "Verification failed. Please try again.";
      alert(message);
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center p-4">
      <Link to="/" className="fixed top-4 right-4 z-50 hover:scale-110 transition-transform">
        <p className="text-2xl text-white bg-transparent">🏠︎</p>
      </Link>

      {!showOtpCard && !showSuccessCard ? (
        // Registration Form Card
        <motion.div
          className="bg-[#84ACD8] rounded-xl px-6 py-8 sm:p-10 w-full max-w-md group"
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
                className="mb-4 px-4 py-2 rounded-md bg-[#0a2a43] text-white placeholder-gray-300 border border-[#0a51ad] focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="w-full">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  placeholder="Email"
                  className={`w-full mb-1 px-4 py-2 rounded-md bg-[#0a2a43] text-white placeholder-gray-300 border ${
                    emailError ? 'border-red-500 ring-1 ring-red-500' : 'border-[#0a51ad]'
                  } focus:outline-none focus:ring-2 ${
                    emailError ? 'focus:ring-red-400' : 'focus:ring-blue-400'
                  }`}
                />
                {emailError && (
                  <div className="flex items-center gap-1 mb-4">
                    <svg 
                      className="w-4 h-4 text-red-500" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <p className="text-sm text-red-500">{emailError}</p>
                  </div>
                )}
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="mb-4 px-4 py-2 mt-4 rounded-md bg-[#0a2a43] text-white placeholder-gray-300 border border-[#0a51ad] focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <select
                required
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="mb-6 px-4 py-2 rounded-md bg-[#0a2a43] text-white border border-[#0a51ad] focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="" disabled hidden>
                  Select Section
                </option>
                <option value="A">A Section</option>
                <option value="B">B Section</option>
              </select>

              <button
                type="button"
                onClick={handleInitialSubmit}
                disabled={isLoading}
                className="w-full py-2 rounded-md text-white font-semibold bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 shadow-lg flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending OTP...
                  </>
                ) : (
                  'Send OTP'
                )}
              </button>

              <div className="mt-4">
                <p className="text-sm text-white text-center">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-800 underline hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ) : showSuccessCard ? (
        // Success Card
        <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <div className="w-[320px] border-[4px] border-black bg-white p-6 shadow-[10px_10px_0_#000] font-sans">
      <div className="flex items-center gap-4 mb-4 border-b-[2px] border-black pb-4">
        <div className="flex items-center justify-center bg-black p-2 shrink-0">
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-white"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
        </div>
        <div className="font-black text-black text-xl uppercase">OTP</div>
      </div>

      <div className="text-black text-sm leading-relaxed font-semibold border-b-[2px] border-black pb-4">
        OTP sent to your email. Please check your <p className="text-blue-500 inline font-bold">INBOX</p> and <p className="text-red-500 inline font-bold"> SPAM</p> folder.
      </div>

      <div className="mt-4">
        <button
          onClick={() => {
            setShowSuccessCard(false);
            setShowOtpCard(true);
          }}
          className="block w-full mb-4 text-center text-base font-bold uppercase border-[3px] border-black bg-white text-black shadow-[5px_5px_0_#000] relative overflow-hidden transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#000] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none hover:bg-blue-700 hover:border-blue-700 hover:text-white before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-all before:duration-500 hover:before:left-[100%]"
        >
          Enter OTP
        </button>
      </div>
    </div>
  </motion.div>
      ) : (
        // OTP Verification Card
        <motion.div
          className="bg-[#84ACD8] rounded-xl px-6 py-8 sm:p-10 w-full max-w-md"
          initial={{ rotateX: 0, rotateY: 0 }}
          whileHover={{
            rotateX: -5,
            rotateY: 5,
            transition: { type: "spring", stiffness: 300, damping: 20 },
          }}
        >
          <div className="flex flex-col items-center">
            <h2 className="font-bold text-2xl sm:text-3xl text-[#0a51ad] mb-2">
              Verify OTP
            </h2>
            <p className="text-white text-sm sm:text-base mb-6 text-center">
              Enter the OTP sent to your email
            </p>

            <div className="flex flex-col w-full">
              <input
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="mb-4 px-4 py-2 rounded-md bg-[#0a2a43] text-white placeholder-gray-300 border border-[#0a51ad] focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button
                type="button"
                onClick={handleOtpVerify}
                disabled={isVerifyingOtp}
                className="w-full py-2 rounded-md text-white font-semibold bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 shadow-lg flex items-center justify-center"
              >
                {isVerifyingOtp ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </>
                ) : (
                  'Verify & Sign Up'
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Signup;