import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // Import UserContext
import "../components/styles/Home.css";

function Home() {
    const { setUser } = useContext(UserContext); // Use context
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setUser({ name, age });
        navigate("/select-condition");
    };

    return (
        <div className="home-container">
            <div className="form-card">
                <h1>Welcome! 🎉</h1>
                <p>Please enter your details</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Enter your age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                    <button type="submit">Start</button>
                </form>
            </div>
        </div>
    );
}

export default Home;
