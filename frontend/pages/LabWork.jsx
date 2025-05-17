import React ,{useContext,useEffect}from 'react'
import Navbar from '../components/home/Navbar';
import Lab1 from '../components/labw/Lab1';
import Lab2 from '../components/labw/Lab2';
import { UserDataContext } from "../src/context/UserContext";
import { useNavigate } from 'react-router-dom';
import ChatBotMenu from '../components/ChatBotMenu';

const LabWork = () => {
  const { user } = useContext(UserDataContext);
   const navigate = useNavigate();

 
useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, []); 
  return (
    <>
    <Navbar/>
    <ChatBotMenu/>
    {user.section=="A"?<Lab1/>:<Lab2/>}
    </>
  )
}

export default LabWork