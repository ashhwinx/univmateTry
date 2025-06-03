import React ,{useContext,useEffect}from 'react'
import Navbar from '../components/home/Navbar';
import PYQs1 from '../components/Pyq/PYQs1';
import { useNavigate } from 'react-router-dom';
import ChatBotMenu from '../components/ChatBotMenu';

const PYQ = () => {
  
   const navigate = useNavigate();
    

  return (
    <>
    <Navbar/>
    <ChatBotMenu/>
    <PYQs1/>
    </>
  )
}

export default PYQ