import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import { ItemCard } from './components/ItemCard';
import { useAuctionSocket } from './hooks/auctionSocket';
import { fetchItems } from './services/item';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [userId] = useState(`user_${Math.random().toString(36).substr(2, 9)}`);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [serverTimeOffset, setServerTimeOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const { connectionStatus, flashingItems, outbidItems, placeBid } = useAuctionSocket(
    isLoggedIn ? userId : null,
    setItems
  );

  useEffect(() => {
    if (isLoggedIn) {
      const loadItems = async () => {
        setLoading(true);
        try {
          const response = await fetchItems();
          setItems(response.data || []);
          setServerTimeOffset(response.serverTime - Date.now());
        } catch (error) {
          console.error('Failed to fetch items:', error);
        } finally {
          setLoading(false);
        }
      };
      loadItems();
    }
  }, [isLoggedIn]);

  const handleBid = (itemId, bidAmount) => {
    placeBid(itemId, bidAmount);
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

    // Note: Socket event listeners are handled in useAuctionSocket hook
    // This effect is now simplified
  }, []);

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Live Bidding Platform</h1>
        <div className="status">
          <span className={`dot ${connectionStatus === 'Connected' ? 'connected' : 'disconnected'}`}></span>
          {connectionStatus}
        </div>
        <div className="user-info">
          <span>Welcome, {userName}!</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <main className="main">
        {loading ? (
          <div className="loading">Loading items...</div>
        ) : (
          <div className="items-grid">
            {items.length === 0 ? (
              <div className="no-items">No items available</div>
            ) : (
              items.map(item => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onBid={handleBid}
                  currentUserId={userId}
                  isFlashing={flashingItems.has(item.id)}
                  isOutbid={outbidItems.has(item.id)}
                  serverTimeOffset={serverTimeOffset}
                />
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;