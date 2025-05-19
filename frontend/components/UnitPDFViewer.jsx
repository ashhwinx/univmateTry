import React from "react";
import { useLocation } from "react-router-dom";
import ChatBotMenu from '../components/ChatBotMenu';
import { Link } from "react-router-dom";

const UnitPDFViewer = () => {
  const location = useLocation();
  
  const { subject, unit, pdfUrl } = location.state || {};  // Add default empty object

  if (!subject || !unit || !pdfUrl) {
    return (
      <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Missing PDF Information</h2>
          <p className="text-gray-600 mb-4">Required information is missing to display the PDF.</p>
          <Link 
            to="/home" 
            className="bg-[#004aad] text-white px-6 py-2 rounded-lg hover:bg-[#003a8d]"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  // Ensure URL has required parameters
  const getEnhancedUrl = (url) => {
    if (!url) return '';  // Add null check
    if (!url.includes('rm=minimal')) {
      return url + (url.includes('?') ? '&' : '?') + 'rm=minimal';
    }
    return url;
  };

  return (
    <div className="w-full h-screen bg-gray-100">
      <Link 
        to="/home" 
        className="fixed top-4 right-4 z-50 hover:scale-110 transition-transform"
      >
        <p className="text-2xl text-white bg-transparent">🏠︎</p>
      </Link>
      <ChatBotMenu/>
      {/* Header */}
      <div className="p-4 bg-[#004aad] text-white">
        <h1 className="text-xl font-bold">{subject}</h1>
        <p className="text-sm">{unit}</p>
      </div>
      <div className="w-full h-[calc(100vh-80px)]">
        <iframe
          src={getEnhancedUrl(pdfUrl)}
          width="100%"
          height="100%"
          allow="autoplay"
          className="border-none"
          title="PDF Viewer"
        ></iframe>
      </div>
    </div>
  );
};

export default UnitPDFViewer;