import { useState, useEffect } from 'react';
import './Toast.css';

export const toastQueue = [];
export const toastListeners = [];

export function addToast(message, type = 'info', duration = 3000) {
  const id = Date.now();
  const toast = { id, message, type, duration };
  toastQueue.push(toast);
  
  // Notify all listeners
  toastListeners.forEach(listener => listener([...toastQueue]));

  // Auto remove after duration
  setTimeout(() => {
    removeToast(id);
  }, duration);

  return id;
}

export function removeToast(id) {
  const index = toastQueue.findIndex(t => t.id === id);
  if (index > -1) {
    toastQueue.splice(index, 1);
    toastListeners.forEach(listener => listener([...toastQueue]));
  }
}

export function Toast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const listener = (newToasts) => {
      setToasts(newToasts);
    };
    
    toastListeners.push(listener);
    
    return () => {
      const index = toastListeners.indexOf(listener);
      if (index > -1) {
        toastListeners.splice(index, 1);
      }
    };
  }, []);

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <div className="toast-content">
            {toast.type === 'success' && <span className="toast-icon">✅</span>}
            {toast.type === 'warning' && <span className="toast-icon">⚠️</span>}
            {toast.type === 'error' && <span className="toast-icon">❌</span>}
            {toast.type === 'info' && <span className="toast-icon">ℹ️</span>}
            <span className="toast-message">{toast.message}</span>
          </div>
          <div className="toast-progress" style={{ animation: `slideOut ${toast.duration}ms linear forwards` }}></div>
        </div>
      ))}
    </div>
  );
}
