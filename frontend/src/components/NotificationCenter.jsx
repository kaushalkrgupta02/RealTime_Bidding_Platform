import { useState, useEffect, useRef } from 'react';
import './NotificationCenter.css';

export const notificationStore = {
  notifications: [],
  listeners: [],
  addNotification(message, type = 'info') {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date(),
      read: false
    };
    this.notifications.unshift(notification);
    this.notifyListeners();
    return notification.id;
  },
  markAsRead(id) {
    const notif = this.notifications.find(n => n.id === id);
    if (notif) {
      notif.read = true;
      this.notifyListeners();
    }
  },
  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
    this.notifyListeners();
  },
  clearAll() {
    this.notifications = [];
    this.notifyListeners();
  },
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) this.listeners.splice(index, 1);
    };
  },
  notifyListeners() {
    this.listeners.forEach(listener => listener([...this.notifications]));
  }
};

export function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const unsubscribe = notificationStore.subscribe(setNotifications);
    return unsubscribe;
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handlePanelOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      notificationStore.markAllAsRead();
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (seconds < 60) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <div className="notification-center" ref={panelRef}>
      <button className="notification-bell" onClick={handlePanelOpen}>
        <span className="bell-icon">🔔</span>
        {unreadCount > 0 && (
          <span className={`unread-badge ${unreadCount > 0 ? 'blinking' : ''}`}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="notification-panel">
          <div className="panel-header">
            <h3>Notifications</h3>
            {notifications.length > 0 && (
              <button className="clear-btn" onClick={() => notificationStore.clearAll()}>
                Clear all
              </button>
            )}
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="empty-notifications">
                <span className="empty-icon">📭</span>
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map(notif => (
                <div key={notif.id} className={`notification-item notification-${notif.type} ${notif.read ? 'read' : 'unread'}`}>
                  <div className="notif-icon">
                    {notif.type === 'success' && '✅'}
                    {notif.type === 'warning' && '⚠️'}
                    {notif.type === 'error' && '❌'}
                    {notif.type === 'info' && 'ℹ️'}
                  </div>
                  <div className="notif-content">
                    <p className="notif-message">{notif.message}</p>
                    <span className="notif-time">{formatTime(notif.timestamp)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function addNotification(message, type = 'info') {
  return notificationStore.addNotification(message, type);
}
