import React,{useContext,useEffect} from 'react'
import Navbar from '../components/home/Navbar';
import CNHero from '../components/CNnotes/CNHero';
import { useNavigate } from 'react-router-dom';
import ChatBotMenu from '../components/ChatBotMenu';

const ClassNotes = () => {
  const navigate = useNavigate();

 
 
  
  return (
    <>
    <Navbar/>
    <ChatBotMenu/>
    <CNHero/>
    </>
  )
}

export default ClassNotes