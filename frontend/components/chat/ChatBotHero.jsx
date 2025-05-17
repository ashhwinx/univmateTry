import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

const ChatBotHero = () => {

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
    <div className="flex justify-center items-center h-[calc(100vh-70px)] bg-[#0e0e0e] px-2">
      <div className="w-full max-w-[95%] sm:max-w-2xl md:max-w-3xl flex flex-col justify-between h-full border rounded-md shadow-md bg-[#1e1e1e]">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar text-sm sm:text-base">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[75%] p-3 rounded-lg whitespace-pre-wrap ${
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
            // Custom loading div with bouncing dots
            <div className="bg-[#2e2e2e] text-white p-3 rounded-lg self-start max-w-[75%]">
              <div className="flex flex-row gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-700 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-2 h-2 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>  

        {/* Input Area */}
        <div className="p-3 border-t border-gray-700 flex gap-2 bg-[#1e1e1e]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-[#2a2a2a] border border-gray-600 text-white rounded-full px-4 py-2 focus:outline-none"
            placeholder="Ask your question..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-all"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBotHero;
