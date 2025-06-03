import React, { useState } from "react";
import logo from "./univmatelogo.png";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === `/${path.toLowerCase().replace(" ", "")}`;
  };

  return (
    <>
      <div className="w-full bg-[#0a51ae] shadow-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-[70px]">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Univmate Logo" className="h-10" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-5 text-[19px] text-white font-semibold">
            {["Class Notes", "Lab Work", "PYQ", "Assignment","UniBuddy"].map((item, i) => (
              <Link
                to={`/${item.toLowerCase().replace(" ", "")}`}
                className={`hover:text-yellow-300 transition p-2 duration-300 ease-in-out transform hover:scale-105 ${isActive(item) ? 'bg-blue-700 rounded-md' : ''}`}
                key={i}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-3xl focus:outline-none"
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
              
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Navbar;