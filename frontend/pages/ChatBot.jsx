import React ,{useEffect} from 'react'
import Navbar from '../components/home/Navbar'
import ChatBotHero from '../components/chat/ChatBotHero'
import { useNavigate } from 'react-router-dom';

const ChatBot = () => {
   const navigate = useNavigate();

 
useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, []); 
  return (
    <>
    <Navbar />
    <ChatBotHero />
    </>
  )
}

export default ChatBot