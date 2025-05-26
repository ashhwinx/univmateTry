import React,{useContext,useEffect} from 'react'
import Navbar from '../components/home/Navbar';
import { useNavigate } from 'react-router-dom';
import ChatBotMenu from '../components/ChatBotMenu';
import Assignment1 from '../components/Assignments/Assignment1';
import { UserDataContext } from '../src/context/UserContext'; // Adjust the import path as necessary

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
    <Assignment1/>
    </>
  )
}

export default Assignment;