import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../src/context/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const cardRef = useRef(null);
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      userData
    );

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    setEmail("");
    setPassword("");
  };

  // 👇 Tilt Effect Handler
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top; // y position within the element

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 15;
    const rotateY = (x - centerX) / 15;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div>
      <Link 
        to="/" 
        className="fixed top-4 right-4 z-50 hover:scale-110 transition-transform"
      >
        <p className="text-2xl text-white bg-transparent">🏠︎</p>
      </Link>
     
      <form onSubmit={submitHandler}>
        
        <div className="h-screen w-screen bg-[#111]">
        
          <div className="h-screen w-screen flex justify-center items-center">
            <div
              ref={cardRef}
              className="h-94 w-96 bg-[#84ACD8] rounded-xl transition-transform duration-150 ease-linear"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex flex-col items-center">
                <div className="font-welcome font-semibold text-2xl pt-5 pb-2 text-[#0a51ad]">
                  WELCOME
                </div>
                <div className="font-normal font-medium text-sm pt-1 pb-7 text-white">
                  Login to continue!
                </div>

                <div className="flex flex-col justify-items-start w-full px-6">
                  <input
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter your email"
                    className="w-full mb-4 px-4 py-2 rounded-md bg-[#0a2a43] text-white placeholder-gray-300 border border-[#0a51ad] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  />

                  <input
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Enter your password"
                    className="w-full mb-6 px-4 py-2 rounded-md bg-[#0a2a43] text-white placeholder-gray-300 border border-[#0a51ad] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  />

                  <button className="w-full py-2 rounded-md text-white font-semibold bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 shadow-lg shadow-blue-900/40 transition-all duration-200">
                    Log In
                  </button>
                </div>

                <div className="text-sm text-white mt-4">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-800 underline hover:text-white transition-colors"
                  >
                    Create New Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
