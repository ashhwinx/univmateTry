import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatBotHero from "../components/chat/ChatBotHero"; // Apne file path ke hisaab se adjust kar lo


const ChatBotToggle = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isChatOpen ? (
        <div className="relative w-[95vw] max-w-md h-[500px] sm:h-[600px]">
          {/* Close Button */}
          <button
            onClick={() => setIsChatOpen(false)}
            className="absolute top-[-14px] right-[-14px] bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 z-50"
          >
            <X size={18} />
          </button>

          {/* Chat Component */}
          <div className="w-full h-full shadow-lg rounded-xl overflow-hidden">
            <ChatBotHero />
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsChatOpen(true)}
          className="bg-white text-[#0a51ae] p-3 gap-2 rounded-full flex shadow-md hover:scale-110 transition-transform"
          aria-label="Open Chatbot"
        >
          <MessageCircle size={24}  />
          UniBuddy
        </button>
      )}
    </div>
  );
};

export default ChatBotToggle;
