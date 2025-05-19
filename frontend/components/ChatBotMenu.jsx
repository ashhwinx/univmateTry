
import { MessageCircle, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

const ChatBotToggle = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

   const [messages, setMessages] = useState([
    { text: "Hi! How can I help you?", type: "bot" },
  ]);
  
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, type: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Send the user query to Gemini API
      const res = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBLXFQf-b2CRZ8bYUJtn2C8sxhNoDFQXGQ",
        {
          contents: [{
            parts: [{
              text: `You are a helpful and concise university-level study assistant. Answer the following question and give introduction and briefly explain and 3-5 short bullet points, using simple language:${input}`
            }]
          }],
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      
      // Extract bot response from the API
      const botReply =
        res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't understand.";

      setMessages((prev) => [...prev, { text: botReply, type: "bot" }]);
    } catch (error) {
      // Fallback error message
      setMessages((prev) => [
        ...prev,
        { text: "Something went wrong. Try again later.", type: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-[20px] sm:bottom-5 right-5 z-50">
      {isChatOpen ? (
        <div className="relative w-[95vw] max-w-md h-[80vh] sm:h-[600px] bg-white">
          {/* Close Button */}
          <button
            onClick={() => setIsChatOpen(false)}
            className="absolute top-[-14px] right-[-14px] bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 z-50"
          >
            <X size={18} />
          </button>

          {/* Chat Component */}
          <div className="w-full h-full shadow-lg rounded-xl  overflow-hidden bg-white">
             <div className="flex justify-center items-center h-full bg-[#0e0e0e]">
    <div className="w-full h-full flex flex-col justify-between border rounded-md shadow-md bg-[#1e1e1e]">
      {/* Chat Area - Different padding for mobile/desktop */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-2 sm:space-y-4 custom-scrollbar text-sm sm:text-base">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] sm:max-w-[75%] p-2 sm:p-3 rounded-lg whitespace-pre-wrap ${
              msg.type === "user"
                ? "bg-blue-600 text-white self-end ml-auto"
                : "bg-[#2e2e2e] text-gray-100 self-start mr-auto prose prose-invert prose-sm sm:prose-base"
            }`}
          >
            {msg.type === "bot" ? (
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            ) : (
              msg.text
            )}
          </div>
        ))}
        {loading && (
          <div className="bg-[#2e2e2e] text-white p-2 sm:p-3 rounded-lg self-start max-w-[75%]">
            <div className="flex flex-row gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-700 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
              <div className="w-2 h-2 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>  

      {/* Input Area - Different padding for mobile/desktop */}
      <div className="p-2 sm:p-3 border-t border-gray-700 flex gap-2 bg-[#1e1e1e]">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 bg-[#2a2a2a] border border-gray-600 text-white rounded-full px-3 sm:px-4 py-1.5 sm:py-2 focus:outline-none text-sm sm:text-base"
          placeholder="Ask your question..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 sm:p-2 rounded-full transition-all"
        >
          <Send size={18} className="sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsChatOpen(true)}
          className="bg-white text-[#0a51ae] p-3 rounded-full shadow-md flex gap-2 hover:scale-110 transition-transform"
          aria-label="Open Chat"
        >
          <MessageCircle size={24} />
          UniBuddy
        </button>
      )}
    </div>
  );
};

export default ChatBotToggle;

