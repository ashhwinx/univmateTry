import React ,{useContext,useEffect}from 'react'
import Navbar from '../components/home/Navbar';
import Lab1 from '../components/labw/Lab1';
import { useNavigate } from 'react-router-dom';
import ChatBotMenu from '../components/ChatBotMenu';

const LabWork = () => {
   const navigate = useNavigate();


  return (
    <>
    <Navbar/>
    <ChatBotMenu/>
    <Lab1/>
    </>
  )
}

export default LabWork