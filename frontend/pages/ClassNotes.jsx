import React,{useContext,useEffect} from 'react'
import Navbar from '../components/home/Navbar';
import CNHero from '../components/CNnotes/CNHero';
import CNHero2 from '../components/CNnotes/CNHero2';
import { UserDataContext } from "../src/context/UserContext";
import { useNavigate } from 'react-router-dom';
import ChatBotMenu from '../components/ChatBotMenu';

const ClassNotes = () => {
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
    {user.section=="A"?<CNHero/>:<CNHero2/>}
    </>
  )
}

export default ClassNotes