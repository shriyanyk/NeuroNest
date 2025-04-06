import React, { useState, useRef, useEffect, useContext } from "react";
import "../components/styles/Chatbot.css";
import { useNavigate } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import { UserContext } from "../context/UserContext"; // ✅ adjust path if needed

const GEMINI_API_KEY = "AIzaSyCSJ1rZWuWOYrH80y8Z-lJO9fuTjvbAFTA";

export default function GeminiChat() {
  const { user } = useContext(UserContext);
  const { name, age, condition } = user;

  const [messages, setMessages] = useState([
    { text: "Hey there! How can I help you today?", role: "model" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  const chatRef = useRef(null);
  const navigate = useNavigate();

  const sendMessage = async (customInput = null) => {
    const inputToSend = customInput || userInput;
    if (!inputToSend.trim()) return;

    const updatedMessages = [...messages, { role: "user", text: inputToSend }];
    setMessages(updatedMessages);
    setUserInput("");
    setShowSuggestions(false);
    setLoading(true);

    const prePrompt = `
    You are a friendly assistant who responds like a real person having a casual conversation — be warm, 
    expressive, and natural.You're helping a patient named ${name}, age ${age}, diagnosed with ${condition}. 
    Keep your responses short (1–4 sentences max), avoid sounding robotic, and talk like you're chatting 
    with a friend.Use emojis or expressions when appropriate and keep it rare,avoid using repetitive sentences and emojis keep 
    it natural and offer follow-up help only if needed.Only answer based on the condition "${condition}".
    Be consoling and act like a friend.Act like a therapist avoid sounding like an AI Robot.
    Use lingos according to the users age type how a normal human does while texting .`;
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: `${prePrompt}\n\n${inputToSend}` }],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      let geminiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
      geminiReply = geminiReply.replace(/\*{1,2}([^*]+)\*{1,2}/g, "$1");

      setMessages([...updatedMessages, { role: "model", text: geminiReply }]);
    } catch (err) {
      console.error("Error calling Gemini:", err);
      setMessages([...updatedMessages, { role: "model", text: "Failed to generate response." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    const common = [
      `Tips to manage ${condition}?`,
      `Is ${condition} treatable or lifelong?`,
      `Things to avoid with ${condition}?`,
      `How to support someone with ${condition}?`
    ];

    const ageNumber = parseInt(age);
    const isChild = ageNumber <= 12;
    const isTeen = ageNumber > 12 && ageNumber <= 18;

    const ageBased = isChild
      ? [
        `How to help a child with ${condition}?`,
        `Fun activities for kids with ${condition}`
      ]
      : isTeen
        ? [
          `How can teens handle ${condition}?`,
          `Is it okay to talk to friends about ${condition}?`
        ]
        : [
          `Workplace tips for adults with ${condition}`,
          `Can adults with ${condition} lead a normal life?`
        ];

    const personal = [
      `Hi ${name}, daily routine tips for ${condition}?`,
      `Can someone aged ${age} with ${condition} play sports?`,
      `Healthy foods that help with ${condition}`
    ];

    setSuggestions([...ageBased, ...personal, ...common].slice(0, 5));
  }, [age, condition, name]);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className={`chatbot-container ${darkMode ? "night" : "day"}`}>
      <button className="back-btn" onClick={() => navigate("/select-condition")}>⬅</button>

      <div className="small-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "🌙" : "☀️"}
      </div>

      <div className="chatbox" style={{ overflowY: "auto", maxHeight: "70vh" }}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role === "user" ? "user" : "bot"}`}>
            {msg.text}
          </div>
        ))}

        {showSuggestions && (
          <div className="suggestion-box">
            {suggestions.map((suggestion, index) => (
              <button key={index} onClick={() => sendMessage(suggestion)} className="suggestion-btn">
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <div ref={chatRef} />
      </div>

      <div className="input-area">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
        />
        <button onClick={() => sendMessage()} className="send-btn" disabled={loading || !userInput.trim()}>
          {loading ? "..." : <IoSend size={18} />}
        </button>
      </div>
    </div>
  );
}
