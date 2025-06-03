import React, { useState, useEffect, useRef,useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../src/context/UserContext"; // Adjust the import path as necessary


const CNHero = () => {
  const [subjectsData, setSubjectsData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const selectorRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useContext(UserDataContext); // Use context to get user data
  console.log(user)
  useEffect(() => {
   const fetchSubjects = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/materials/${user.section}/pyq`);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await res.json();
    setSubjectsData(data);
  } catch (error) {
    console.error("Failed to fetch subjects:", error);
  }
};
    fetchSubjects();
  }, []);

  // Move selector to active subject
  useEffect(() => {
    const container = containerRef.current;
    const selector = selectorRef.current;
    const activeItem = container?.children[activeIndex + 1];
    if (activeItem && selector) {
      selector.style.top = activeItem.offsetTop + "px";
    }
  }, [activeIndex]);

  const handleUnitClick = (unit) => {
    const subject = subjectsData[activeIndex].subjectName;  // <-- Fixed here
    navigate("/unit-pdf", {
      state: {
        subject,
        unit: unit.name,
        pdfUrl: unit.driveLink,
      },
    });
  };

  return (
    <div
      className="w-full bg-gradient-to-br from-[#0e0e0e] to-[#1f1f1f] text-white font-[Poppins] overflow-auto lg:overflow-hidden"
      style={{ height: "calc(100vh - 70px)" }}
    >
      <div className="min-h-full px-4 sm:px-6 lg:px-16 py-10 flex flex-col gap-10">
        {/* Hero Text */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="bg-[#004aad] p-6 sm:p-8 rounded-xl text-center shadow-xl max-w-4xl mx-auto"
        >
          <p className="text-lg sm:text-xl font-medium leading-relaxed text-blue-100">
            Access class notes to stay ahead. Simplified explanations, concise
            summaries — ace your exams with ease.
          </p>
        </motion.div>

        {/* Subject Selector + Units */}
        <div className="flex flex-1 flex-col lg:flex-row gap-8">
          {/* Subject Selector */}
          <div className="flex justify-center lg:justify-start">
            <div
              className="relative w-[300px] bg-[#004aad] rounded-2xl py-3 overflow-hidden h-full"
              ref={containerRef}
            >
              <div
                ref={selectorRef}
                className="absolute left-3 w-[90%] h-[45px] bg-white rounded-xl transition-all duration-300 z-0"
              ></div>

              {subjectsData.map((subjectObj, index) => (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`relative z-10 cursor-pointer px-6 py-3 transition-colors duration-300 ${
                    activeIndex === index
                      ? "text-[#004aad] font-bold"
                      : "text-white"
                  }`}
                >
                  {subjectObj.subjectName}  {/* <-- Fixed here */}
                </div>
              ))}
            </div>
          </div>

          {/* Units Grid */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {subjectsData[activeIndex]?.units?.map((unit, index) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                key={index}
                onClick={() => handleUnitClick(unit)}
                className="bg-white text-[#004aad] font-semibold rounded-xl py-6 text-center shadow-md hover:shadow-lg cursor-pointer transition-all"
              >
                {`Unit - ${index + 1}`}
                <br />
                <span className="text-sm font-medium text-gray-600">
                  {unit.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CNHero;
