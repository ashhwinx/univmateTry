import React from 'react'
import { Route,Routes} from 'react-router-dom'
import UserLogin from "../pages/Login"
import UserSignup from "../pages/Signup"
import Home from "../pages/Home";
import Start from "../pages/Start";
import ClassNotes from "../pages/ClassNotes";
import PYQ from "../pages/PYQ";
import LabWork from "../pages/LabWork";
import ChatBot from '../pages/ChatBot';
import UserProtectWrapper from '../pages/UserProtectWrapper';
import UnitPDFViewer from '../components/UnitPDFViewer';

function App() {
  

  
  return (
    <>
      <Routes>
      
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/signup' element={<UserSignup/>}/>
        <Route path='/pyq' element={<PYQ/>}/>
        <Route path='/labwork' element={<LabWork/>}/>
        <Route path='/classnotes' element={<ClassNotes/>}/>
        <Route path='/chatbot' element={<ChatBot/>}/>
        <Route path='/' element={
          <UserProtectWrapper>
            <Start/>
          </UserProtectWrapper>
        }/>
        <Route path="/unit-pdf" element={<UnitPDFViewer />} />
        <Route path="/home" element={<Home/>} />

      </Routes>
    </>
  );
}

export default App;
