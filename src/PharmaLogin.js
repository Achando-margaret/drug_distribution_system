import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function PharmaLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple check (replace with real authentication later)
    if (username === "pharma" && password === "1234") {
      navigate("/pharma-dashboard"); // redirect to pharma page
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <h2>Pharmaceutical Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default PharmaLogin;