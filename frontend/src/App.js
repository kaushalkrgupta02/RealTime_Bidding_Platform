import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import './App.css';

const socket = io('http://localhost:5000');

function App() {
  const [items, setItems] = useState([]);
  const [connected, setConnected] = useState(false);
  const [userId] = useState(`user_${Math.random().toString(36).substr(2, 9)}`);

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

    // Load items
    fetchItems();

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/items');
      setItems(response.data);
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

  return (
    <div className="app">
      <header className="header">
        <h1>Live Bidding Platform</h1>
        <div className="status">
          <span className={`dot ${connected ? 'connected' : 'disconnected'}`}></span>
          {connected ? 'Connected' : 'Disconnected'}
        </div>
        <div className="user">User: {userId}</div>
      </header>

      <main className="main">
        <div className="items-grid">
          {items.map(item => (
            <div key={item.id} className="item-card">
              <h3>{item.title}</h3>
              <div className="price">${item.currentBid}</div>
              <div className="info">
                <span>Starting: ${item.startingPrice}</span>
                <span>Bids: {item.bidCount}</span>
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