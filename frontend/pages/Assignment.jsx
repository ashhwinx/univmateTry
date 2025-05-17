import React,{useContext,useEffect} from 'react'
import Navbar from '../components/home/Navbar';
import { UserDataContext } from "../src/context/UserContext";
import { useNavigate } from 'react-router-dom';
import ChatBotMenu from '../components/ChatBotMenu';
import Assignment1 from '../components/Assignments/Assignment1';
import Assignment2 from '../components/Assignments/Assignment2';

const  Assignment = () => {
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
    {user.section=="A"?<Assignment1/>:<Assignment2/>}
    </>
  )
}

export default Assignment;