import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import Login from './components/Login';
import { ItemCard } from './components/ItemCard';
import './App.css';

const socket = io('http://localhost:3000');

function App() {
  const [items, setItems] = useState([]);
  const [connected, setConnected] = useState(false);
  const [userId] = useState(`user_${Math.random().toString(36).substr(2, 9)}`);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [flashingItems, setFlashingItems] = useState(new Set());
  const [outbidItems, setOutbidItems] = useState(new Set());
  const [serverTimeOffset, setServerTimeOffset] = useState(0);

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
      // Calculate server time offset
      setServerTimeOffset(response.data.serverTime - Date.now());
    } catch (error) {
      console.error('Failed to fetch items:', error);
    }
  };

  const handleBid = (itemId, bidAmount) => {
    socket.emit('BID_PLACED', {
      itemId,
      bidderId: userId,
      amount: bidAmount
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
        prevItems.map(item => {
          if (item.id === data.itemId) {
            const wasWinning = item.highestBidder === userId;
            const isNowWinning = data.highestBidder === userId;

            // Add flashing effect for the updated item
            setFlashingItems(prev => new Set([...prev, data.itemId]));
            setTimeout(() => {
              setFlashingItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(data.itemId);
                return newSet;
              });
            }, 600);

            // Handle outbid logic
            if (wasWinning && !isNowWinning) {
              setOutbidItems(prev => new Set([...prev, data.itemId]));
              setTimeout(() => {
                setOutbidItems(prev => {
                  const newSet = new Set(prev);
                  newSet.delete(data.itemId);
                  return newSet;
                });
              }, 3000);
            }

            return {
              ...item,
              currentBid: data.currentBid,
              highestBidder: data.highestBidder
            };
          }
          return item;
        })
      );
    };

    socket.on('UPDATE_BID', handleUpdateBid);

    return () => {
      socket.off('UPDATE_BID', handleUpdateBid);
    };
  }, [userId]);

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
            <ItemCard
              key={item.id}
              item={item}
              onBid={handleBid}
              currentUserId={userId}
              isFlashing={flashingItems.has(item.id)}
              isOutbid={outbidItems.has(item.id)}
              serverTimeOffset={serverTimeOffset}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;