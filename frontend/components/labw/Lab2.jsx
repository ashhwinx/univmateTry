import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const subjects = [
  "CAEG",
  "Engineering Physics",
  "Basic Electrical Engineering",
  "Programming for Problem Solving",
  "Communication Skills",
];

// Add this after the subjects array
const subjectUnits = {
  "CAEG": [
    // "Matrices and Linear Equations",
    // "Calculus",
    // "Multiple Integrals",
    // "Vector Calculus",
    // "Differential Equations",
    // "Laplace Transforms",


    "Coming Soon!",
    "Coming Soon!",
    "Coming Soon!",
    "Coming Soon!",
    "Coming Soon!",
    "Coming Soon!"
  ],
  "Engineering Physics": [

    // "Wave Optics",
    // "Quantum Mechanics & Coherence and Optical Fibers",
    // "Laser",
    // "Material Science & Semiconductor Physics",
    // "Introduction to Electromagnetism",

    "Coming Soon!",
    "Coming Soon!",
    "Coming Soon!",
    "Coming Soon!",
    "Coming Soon!",
    
  ],
  "Basic Electrical Engineering": [
    // "DC Circuits",
    // "AC Circuits",
    // "Transformers",
    // "Electrical Machines",
    // "Power Converters & Electrical Installations",

    "Coming Soon!",
    "Coming Soon!",
    "Coming Soon!",
    "Coming Soon!",
    "Coming Soon!",

  ],
  "Programming for Problem Solving": [
    // "Fundamentals of Computer",
    // "Number system",
    // "Algorithms Statements",
    // "Fundamental of C programming",
    // "Functions and file handling Programming",
    // "Fluid Mechanics"


    "Coming Soon!",
    "Coming Soon!",
    "Coming Soon!",
    "Coming Soon!",
    "Coming Soon!",
  ],
  "Communication Skills": [
    // "Communication",
    // "Grammer",
    // "Composition",
    // "Short Stories",
    // "Poems"

    "Coming Soon!",
    "Coming Soon!",
    "Coming Soon!",
    "Coming Soon!",
    "Coming Soon!",
  ]
};
// Add this after subjectUnits object
const pdfUrls = {
  "CAEG": {

    "Matrices and Linear Equations": "https://drive.google.com/file/d/1_eDxUT4ZakU-9Q_Q77f_mfznpUJRcqlg/preview?embedded=true&rm=minimal",

    "Calculus": "https://drive.google.com/file/d/YOUR_PDF_ID/preview?embedded=true&rm=minimal",

     "Multiple Integrals": "https://drive.google.com/file/d/YOUR_PDF_ID/preview?embedded=true&rm=minimal",

    "Vector Calculus": "https://drive.google.com/file/d/YOUR_PDF_ID/preview?embedded=true&rm=minimal",
    
    "Differential Equations": "https://drive.google.com/file/d/YOUR_PDF_ID/preview?embedded=true&rm=minimal",

    "Laplace Transforms": "https://drive.google.com/file/d/YOUR_PDF_ID/preview?embedded=true&rm=minimal"    // Add URLs for other units
  },
  "Engineering Physics": {

    "Wave Optics": "https://drive.google.com/file/d/YOUR_PDF_ID/preview?embedded=true&rm=minimal",

    "Quantum Mechanics & Coherence and Optical Fibers": "https://drive.google.com/file/d/YOUR_PDF_ID/preview?embedded=true&rm=minimal",

    "Laser": "https://drive.google.com/file/d/YOUR_PDF_ID/preview?embedded=true&rm=minimal",

    "Material Science & Semiconductor Physics": "https://drive.google.com/file/d/YOUR_PDF_ID/preview?embedded=true&rm=minimal",

    "Introduction to Electromagnetism": "https://drive.google.com/file/d/YOUR_PDF_ID/preview?embedded=true&rm=minimal",


},
"Basic Electrical Engineering": {

    "DC Circuits": "https://drive.google.com/file/d/YOUR_PDF_ID/preview?embedded=true&rm=minimal",

    "AC Circuits": "https://drive.google.com/file/d/YOUR_PDF_ID/preview?embedded=true&rm=minimal",

    "Transformers": "https://drive.google.com/file/d/YOUR_PDF_ID/preview?embedded=true&rm=minimal",

    "Electrical Machines": "https://drive.google.com/file/d/YOUR_PDF_ID/preview?embedded=true&rm=minimal",

    "Power Converters & Electrical Installations": "https://drive.google.com/file/d/YOUR_PDF_ID/preview?embedded=true&rm=minimal",

},
"Programming for Problem Solving": {
    "Fundamentals of Computer": "https://drive.google.com/file/d/YOUR_PDF_ID/preview?embedded=true&rm=minimal",

    "Number system": "https://drive.google.com/file/d/YOUR_PDF_ID/preview?embedded=true&rm=minimal",

    "Algorithms Statements": "https://drive.google.com/file/d/YOUR_PDF_ID/preview?embedded=true&rm=minimal",

    "Fundamental of C programming": "https://drive.google.com/file/d/YOUR_PDF_ID/preview?embedded=true&rm=minimal",

    "Functions and file handling Programming": "https://drive.google.com/file/d/YOUR_PDF_ID/preview?embedded=true&rm=minimal",

    "Fluid Mechanics": "https://drive.google.com/file/d/YOUR_PDF_ID/preview?embedded=true&rm=minimal",
   
},

  "Communication Skills": {

    "Communication": "https://drive.google.com/file/d/YOUR_PDF_ID/preview?embedded=true&rm=minimal",

    "Grammer": "https://drive.google.com/file/d/YOUR_PDF_ID/preview?embedded=true&rm=minimal",

    "Composition": "https://drive.google.com/file/d/YOUR_PDF_ID/preview?embedded=true&rm=minimal",

    "Short Stories": "https://drive.google.com/file/d/YOUR_PDF_ID/preview?embedded=true&rm=minimal",

    "Poems": "https://drive.google.com/file/d/YOUR_PDF_ID/preview?embedded=true&rm=minimal",

  }
  // ... other subjects
};



const Lab2 = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const containerRef = useRef(null);
  const selectorRef = useRef(null);

  const navigate = useNavigate();

const handleUnitClick = (unit) => {
  const subject = subjects[activeIndex];
  const pdfUrl = pdfUrls[subject][unit];
  navigate("/unit-pdf", {
    state: {
      subject,
      unit,
      pdfUrl,
    },
  });
};

  useEffect(() => {
    const container = containerRef.current;
    const selector = selectorRef.current;
    const activeItem = container?.children[activeIndex + 1];
    if (activeItem && selector) {
      selector.style.top = activeItem.offsetTop + "px";
    }
  }, [activeIndex]);

  return (
    <div
      className="w-full bg-gradient-to-br from-[#0e0e0e] to-[#1f1f1f] text-white font-[Poppins] 
                 overflow-auto lg:overflow-hidden"
      style={{ height: "calc(100vh - 70px)" }} // 70px navbar
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
            Get all the practicals you need — neatly written, file-ready content to save your time and effort.
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

              {subjects.map((subject, index) => (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`relative z-10 cursor-pointer px-6 py-3 transition-colors duration-300 ${
                    activeIndex === index
                      ? "text-[#004aad] font-bold"
                      : "text-white"
                  }`}
                >
                  {subject}
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
  {subjectUnits[subjects[activeIndex]].map((unit, index) => (
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
        {unit}
      </span>
    </motion.div>
  ))}
</motion.div>
        </div>
      </div>
    </div>
  );
};

export default Lab2;

