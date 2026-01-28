import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
// import Login from './components/Login';
import './App.css';

const socket = io('http://localhost:3000');

function App() {
  const [items, setItems] = useState([]);
  const [connected, setConnected] = useState(false);
  const [userId] = useState(`user_${Math.random().toString(36).substr(2, 9)}`);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Socket connection
    socket.on('connect', () => {
      console.log('Connected to server');
      setConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      setConnected(false);
    });

    // Load items only if logged in
    if (isLoggedIn) {
      fetchItems();
    }

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [isLoggedIn]);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/items');
      setItems(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    }
  };

  const handleBid = (itemId, currentBid) => {
    const bidAmount = currentBid + 10;
    socket.emit('BID_PLACED', {
      itemId,
      userId,
      bidAmount
    });
  };

  const handleLogin = (name) => {
    setUserName(name);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  useEffect(() => {
    // Listen for bid updates
    const handleUpdateBid = (data) => {
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === data.itemId
            ? { ...item, currentBid: data.currentBid, highestBidder: data.highestBidder }
            : item
        )
      );
    };

    socket.on('UPDATE_BID', handleUpdateBid);

    return () => {
      socket.off('UPDATE_BID', handleUpdateBid);
    };
  }, []);

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Live Bidding Platform</h1>
        <div className="status">
          <span className={`dot ${connected ? 'connected' : 'disconnected'}`}></span>
          {connected ? 'Connected' : 'Disconnected'}
        </div>
        <div className="user-info">
          <span>Welcome, {userName}!</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <main className="main">
        <div className="items-grid">
          {items.map(item => (
            <div key={item.id} className="item-card">
              <h3>{item.title}</h3>
              <div className="price">${item.currentBid}</div>
              <div className="info">
                <span>Starting: ${item.startingPrice}</span>
                <span>Time Left: {Math.floor(item.timeRemaining / 60000)}m</span>
              </div>
              <button
                className="bid-btn"
                onClick={() => handleBid(item.id, item.currentBid)}
              >
                Bid +$10
              </button>
              {item.highestBidder === userId && (
                <div className="winning">You're winning!</div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;