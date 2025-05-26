import React, { useContext, useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import UserLogin from "../pages/Login";
import UserSignup from "../pages/Signup";
import Home from "../pages/Home";
import Start from "../pages/Start";
import ClassNotes from "../pages/ClassNotes";
import PYQ from "../pages/PYQ";
import LabWork from "../pages/LabWork";
import ChatBot from '../pages/ChatBot';
import UserProtectWrapper from '../pages/UserProtectWrapper';
import UnitPDFViewer from '../components/UnitPDFViewer';
import Assignment from '../pages/Assignment';
import Admin from '../pages/admin/AdminPannel';
import AdminProtectWrapper from '../pages/admin/AdminProtectWraper';
import { UserDataContext } from "./context/UserContext";

function App() {
  const { user } = useContext(UserDataContext);
  const [isAdmin, setIsAdmin] = useState(false);
  console.log("User data:", user);
  console.log("Admin email:", import.meta.env.VITE_ADMIN_EMAIL);

  // Check if the user is an admin
  useEffect(() => {
    if (user.email === import.meta.env.VITE_ADMIN_EMAIL || user.password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  return (
    <>
      <Routes>

        <Route path="/admin" element={
          isAdmin ? (
            <AdminProtectWrapper>
              <Admin />
            </AdminProtectWrapper>
          ) : (
            <Home/>
          )
        } />

        <Route path="/assignment" element={<Assignment />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/pyq" element={<PYQ />} />
        <Route path="/labwork" element={<LabWork />} />
        <Route path="/classnotes" element={<ClassNotes />} />
        <Route path="/unibuddy" element={<ChatBot />} />
        <Route path="/" element={
          <UserProtectWrapper>
            <Start />
          </UserProtectWrapper>
        } />
        <Route path="/unit-pdf" element={<UnitPDFViewer />} />
        <Route path="/home" element={<Home />} />

      </Routes>
    </>
  );
}

export default App;
