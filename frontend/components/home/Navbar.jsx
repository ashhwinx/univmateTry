import React, { useState } from "react";
import logo from "./univmatelogo.png";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === `/${path.toLowerCase().replace(" ", "")}`;
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then((response)=>{
        if(response.status===200){
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          navigate('/')
        }
      })
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Failed to logout. Please try again.');
    }
  };

  return (
    <>
      <div className="w-full bg-[#0a51ae] shadow-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-[70px]">
          <Link to="/home" className="flex items-center">
            <img src={logo} alt="Univmate Logo" className="h-10" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-5 text-[19px] text-white font-semibold">
            {["Class Notes", "Lab Work", "PYQ", "Assignment","UniBuddy"].map((item, i) => (
              <Link
                to={`/${item.toLowerCase().replace(" ", "")}`}
                className={`hover:text-yellow-300 transition p-2 duration-300 ease-in-out transform hover:scale-105
                  ${isActive(item) ? 'bg-white/20 rounded-lg' : ''}`}
                key={i}
              >
                {item}
              </Link>
            ))}
            <Link 
              onClick={handleLogout}
              className="transition p-2 duration-300 ease-in-out transform hover:scale-105 text-base font-semibold text-center text-[18px] text-red-400 border-none rounded-lg hover:text-gray-300"
            >
              Log Out
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-3xl focus:outline-none text-white"
            >
              {menuOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden px-4 py-4 bg-[#0a51ae] flex flex-col gap-4"
            >
              {["Class Notes", "Lab Work", "PYQ", "Assignment","UniBuddy"].map(
                (item, i) => (
                  <Link
                    to={`/${item.toLowerCase().replace(" ", "")}`}
                    className={`text-base font-semibold text-white hover:text-gray-300
                      ${isActive(item) ? 'bg-white/20 rounded-lg p-2' : ''}`}
                    key={i}
                  >
                    {item}
                  </Link>
                )
              )}
              <Link 
                onClick={handleLogout}
                className="text-base font-semibold text-white bg-red-600 border-none p-2 rounded-lg hover:text-gray-300"
              >
                Log Out
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Navbar;