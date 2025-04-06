import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../components/styles/SelectCondition.css";

const conditions = [
  { name: "Autism", path: "/chatbot/autism" },
  { name: "ADHD", path: "/chatbot/adhd" },
  { name: "Dyslexia", path: "/chatbot/dyslexia" },
  { name: "Anxiety", path: "/chatbot/anxiety" },
  { name: "OCD", path: "/chatbot/ocd" },
  { name: "Depression", path: "/chatbot/depression" },
  { name: "Tourette", path: "/chatbot/tourette" },
  { name: "Sensory Processing Disorder", path: "/chatbot/spd" },
  { name: "Bipolar Disorder", path: "/chatbot/bipolar" },
  { name: "PTSD", path: "/chatbot/ptsd" },
];

function SelectCondition() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext); // user now assumed to have name and age already
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleConditionClick = (condition) => {
    if (!user?.name || !user?.age) {
      alert("User information is missing. Please start from the welcome page.");
      navigate("/welcome");
      return;
    }

    setUser({ ...user, condition: condition.name });
    navigate(condition.path);
  };

  return (
    <div className={`select-condition-container ${darkMode ? "night" : "day"}`}>
      <div className="small-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "🌙" : "☀️"}
      </div>

      <h1>Select a Condition</h1>

      <div className="conditions-grid">
        {conditions.map((condition, index) => (
          <div
            key={index}
            className="condition-box"
            onClick={() => handleConditionClick(condition)}
          >
            {condition.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectCondition;
