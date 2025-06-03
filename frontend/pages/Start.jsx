import React, { useState,useContext } from "react";
import logo from "../components/home/univmatelogo.png";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Background1 from "../components/home/Background 1.png";
import Background2 from "../components/home/Background 2.png";
import {UserDataContext } from "../src/context/UserContext";



const Start = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, setUser } = useContext(UserDataContext);
  const [selected, setSelected] = useState(user.section); 


  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value); 
    setUser((prev) => ({ ...prev, section: value })); 
  };
  
  
  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#0e0e0e] to-[#1f1f1f] text-white font-[Poppins] overflow-hidden">
      
      {/* Navbar */}
      <div className="w-full bg-[#0a51ae] shadow-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-[70px]">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Univmate Logo" className="h-10" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 text-[18px] font-semibold">
            {["Class Notes", "Lab Work", "PYQ", "Assignment","UniBuddy"].map((item, i) => (
              <Link
                to={`/${item.toLowerCase().replace(" ", "")}`}
                className="hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-105"
                key={i}
              >
                {" "}
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
                        className="text-base font-semibold hover:text-gray-300"
                        key={i}>{item}</Link>
                  
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      
      {/* Hero Section */}
      <div className="relative w-full h-[calc(100vh-240px)] overflow-hidden">
        <img
          src={Background1}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-2 grid md:grid-cols-2 gap-6 items-center h-full">
          {/* Text */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-center md:text-left"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#e2e8f0]">
              All Your College Needs in One Place
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Class notes, lab work, previous year questions, syllabus — you
              name it, UnivMate has it.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            whileHover={{ rotate: 3, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="flex justify-center"
          >
            <img
              src={Background2}
              alt="Student"
              className="w-64 md:w-[22rem] object-contain rounded-xl shadow-xl "
            />
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0a51ae] h-[250px] text-center text-white ">
        <h2 className="text-xl font-semibold py-2">Join UnivMate Today!</h2>
        <p className="text-sm text-gray-100 pb-4 ">
          Made with ❤️ by students, for students
        </p>
        <div className="flex justify-center  gap-4 ">
         <div className="flex flex-col   items-center justify-center ">
       <label className="text-white text-sm mb-2 *: font-medium">Choose Section!</label>
        <select
        value={selected}
        onChange={handleChange}
        
        className="w-48 px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
      >
        <option value="" disabled>Select A or B</option>
        <option value="A">Option A</option>
        <option value="B">Option B</option>
      </select>
    </div>
        </div>
        
      </footer>
    </div>
  );
};

export default Start;
