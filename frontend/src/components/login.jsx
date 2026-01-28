import React, { useState } from "react";
import './Login.css'

function Login({ onLogin }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login to Live Bidding Platform</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Enter your name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button type="submit">Enter Dashboard</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
