import React, { useEffect, useState } from 'react';
import Login from './components/login';
import { ItemCard } from './components/ItemCard';
import { useAuctionSocket } from './hooks/auctionSocket';
import { fetchItems } from './services/item';
import { NotificationCenter } from './components/NotificationCenter';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [userId] = useState(`user_${Math.random().toString(36).substr(2, 9)}`);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [serverTimeOffset, setServerTimeOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { connectionStatus, flashingItems, outbidItems, placeBid } = useAuctionSocket(
    isLoggedIn ? userId : null,
    setItems,
    userName
  );

  useEffect(() => {
    if (isLoggedIn) {
      const loadItems = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetchItems();
          setItems(response.data || []);
          setServerTimeOffset(response.serverTime - Date.now());
        } catch (error) {
          console.error('Failed to fetch items:', error);
          setError(`Failed to load items: ${error.message}`);
          setItems([]);
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

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <header className="header">
        <h1>⚡ Real Time Bidding Platform</h1>
        <div className="status">
          <span className={`dot ${connectionStatus === 'Connected' ? 'connected' : 'disconnected'}`}></span>
          {connectionStatus}
          <span className="status-date">• {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <div className="user-info">
          <NotificationCenter />
          <span className="username">👤 {userName}</span>
          <button onClick={handleLogout} className="logout-btn"><span className="exit-icon">🚪</span><span>Exit</span></button>
        </div>
      </header>

      <main className="main">
        {loading ? (
          <div className="loading">⏳ Loading items...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="items-grid">
            {items.length === 0 ? (
              <div className="no-items">📭 No items available</div>
            ) : (
              items.map(item => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onBid={handleBid}
                  currentUserId={userId}
                  currentUserName={userName}
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