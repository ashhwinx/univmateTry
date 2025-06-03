import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Start from "../pages/Start";
import ClassNotes from "../pages/ClassNotes";
import PYQ from "../pages/PYQ";
import LabWork from "../pages/LabWork";
import ChatBot from '../pages/ChatBot';
import UnitPDFViewer from '../components/UnitPDFViewer';
import Assignment from '../pages/Assignment';
import Admin from '../pages/admin/AdminPannel';

function App() {
  return (
    <>
      <Routes>
        <Route path={`/${import.meta.env.VITE_ADMIN}`} element={<Admin />} />
        <Route path="/assignment" element={<Assignment />} />
        <Route path="/pyq" element={<PYQ />} />
        <Route path="/labwork" element={<LabWork />} />
        <Route path="/classnotes" element={<ClassNotes />} />
        <Route path="/unibuddy" element={<ChatBot />} />
       
        <Route path="/" element={<Start />} />
        <Route path="/unit/:id" element={<UnitPDFViewer />} />
      </Routes>
    </>
  );
}

export default App;
