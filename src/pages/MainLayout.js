import React, { useState } from "react";
import Chatbot from "../components/Chatbot";
import Planner from "./Planner";
import Community from "./Community";
import "../components/styles/Navbar.css";

export default function MainLayout() {
  const [activeTab, setActiveTab] = useState("chatbot");

  const renderContent = () => {
    switch (activeTab) {
      case "chatbot":
        return <Chatbot />;
      case "planner":
        return <Planner />;
      case "community":
        return <Community />;
      default:
        return <Chatbot />;
    }
  };

  return (
    <div className="main-layout">
      <div className="content-with-padding">{renderContent()}</div>

      <nav className="bottom-nav">
        <button
          onClick={() => setActiveTab("chatbot")}
          className={activeTab === "chatbot" ? "active" : ""}
        >
          🤖
        </button>
        <button
          onClick={() => setActiveTab("planner")}
          className={activeTab === "planner" ? "active" : ""}
        >
          📅
        </button>
        <button
          onClick={() => setActiveTab("community")}
          className={activeTab === "community" ? "active" : ""}
        >
          👥
        </button>
      </nav>
    </div>
  );
}
