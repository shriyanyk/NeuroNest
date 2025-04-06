import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../components/styles/Welcome.css";
import { UserContext } from "../context/UserContext";

function Welcome() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const conditions = [
    { name: "Autism", path: "/chat" },
    { name: "ADHD", path: "/chat" },
    { name: "Dyslexia", path: "/chat" },
    { name: "Anxiety", path: "/chat" },
    { name: "OCD", path: "/chat" },
    { name: "Depression", path: "/chat" },
    { name: "Tourette Syndrome", path: "/chat" },
    { name: "Sensory Processing Disorder", path: "/chat" },
    { name: "Bipolar Disorder", path: "/chat" },
    { name: "PTSD", path: "/chat" },
  ];

  const handleSelect = (conditionName) => {
    setUser({ ...user, condition: conditionName }); // Update condition
    navigate("/chat");
  };

  return (
    <div className="welcome-container">
      <h1>Welcome, {user?.name}!</h1>
      <p>Select your condition to get personalized tasks</p>

      <div className="conditions-grid">
        {conditions.map((condition, index) => (
          <div
            key={index}
            className="condition-box"
            onClick={() => handleSelect(condition.name)}
          >
            {condition.name}
          </div>
        ))}
      </div>

      <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
}

export default Welcome;
