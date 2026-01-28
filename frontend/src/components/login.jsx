import React, { useState } from "react";
import './Login.css'

function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    setError("");
    setIsLoading(true);
    
    // Simulate form submission delay for better UX
    setTimeout(() => {
      onLogin(name.trim());
      setIsLoading(false);
    }, 300);
  };

  const handleChange = (e) => {
    setName(e.target.value);
    if (error) setError("");
  };

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
      
      <div className="login-container">
        <div className="login-header">
          <div className="logo-icon">⚡</div>
          <h1>Live Bidding</h1>
          <p className="tagline">Join the auction, win amazing items!</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name..."
              value={name}
              onChange={handleChange}
              disabled={isLoading}
              maxLength={30}
              className={`form-input ${error ? 'input-error' : ''}`}
              autoFocus
            />
            {error && <span className="error-message">⚠️ {error}</span>}
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading || !name.trim()}
          >
            <span className="button-icon">{isLoading ? '⏳' : '🚀'}</span>
            <span className="button-text">
              {isLoading ? 'Joining...' : 'Enter Auction'}
            </span>
          </button>
        </form>

        <div className="login-footer">
          <p className="info-text">
            💡 Real-time bidding with instant updates
          </p>
        </div>
      </div>

      <div className="background-decoration">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
    </div>
  );
}

export default Login;
