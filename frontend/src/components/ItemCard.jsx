import { useState, useEffect } from "react";
import { addNotification } from "./NotificationCenter";
import "./ItemCard.css";

export function ItemCard({
  item,
  onBid,
  currentUserId,
  currentUserName,
  isFlashing,
  isOutbid,
  serverTimeOffset,
}) {
  const [timeRemaining, setTimeRemaining] = useState(
    item.auctionEndTime - (Date.now() + serverTimeOffset),
  );
  const [prevBid, setPrevBid] = useState(item.currentBid);
  const [notifiedUrgent, setNotifiedUrgent] = useState(false);
  const [notifiedEnded, setNotifiedEnded] = useState(false);
  const [notifiedWinning, setNotifiedWinning] = useState(false);
  const [notifiedOutbid, setNotifiedOutbid] = useState(false);
  
  const isWinning = item.highestBidderId === currentUserId;
  const isAuctionEnded = timeRemaining <= 0;
  const isUrgent = timeRemaining < 60000; // Less than 1 minute

  // Notify when auction is ending soon
  useEffect(() => {
    if (isUrgent && !notifiedUrgent && timeRemaining > 0) {
      setNotifiedUrgent(true);
      addNotification(`⏰ "${item.title}" ending in ${Math.ceil(timeRemaining / 1000)}s!`, 'warning');
    }
  }, [isUrgent, notifiedUrgent, timeRemaining, item.title]);

  // Notify when auction ends
  useEffect(() => {
    if (isAuctionEnded && !notifiedEnded) {
      setNotifiedEnded(true);
      const winner = item.highestBidder.length > 8 ? item.highestBidder.slice(0, 8) : item.highestBidder;
      addNotification(`🏆 "${item.title}" - Winner: ${winner}`, 'info');
    }
  }, [isAuctionEnded, notifiedEnded, item.title, item.highestBidder]);

  // Notify when user wins
  useEffect(() => {
    if (isWinning && !notifiedWinning && !isAuctionEnded) {
      setNotifiedWinning(true);
      addNotification(`👑 You are the highest bidder for "${item.title}"!`, 'success');
    }
  }, [isWinning, notifiedWinning, isAuctionEnded, item.title]);

  // Notify when user is outbid
  useEffect(() => {
    if (!isWinning && prevBid < item.currentBid && !notifiedOutbid) {
      setNotifiedOutbid(true);
      addNotification(`⚠️ You were outbid on "${item.title}"`, 'warning');
    }
  }, [isWinning, prevBid, item.currentBid, notifiedOutbid, item.title]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(
        Math.max(0, item.auctionEndTime - (Date.now() + serverTimeOffset)),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [item.auctionEndTime, serverTimeOffset]);

  useEffect(() => {
    if (item.currentBid !== prevBid) {
      setPrevBid(item.currentBid);
    }
  }, [item.currentBid, prevBid]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleBid = () => {
    onBid(item.id, item.currentBid + 10);
  };

  const bidderName = item.highestBidder.length > 8 
    ? item.highestBidder.slice(0, 8) 
    : item.highestBidder;

  return (
    <div
      className={`item-card ${isFlashing ? "flashing" : ""} ${isOutbid ? "outbid" : ""} ${isWinning ? "winning-card" : ""}`}
    >
      {/* Header with Title */}
      <div className="card-header">
        <h3 className="item-title">{item.title}</h3>
        {isWinning && (
          <div className="badge-winning">
            <span className="badge-icon">👑</span>
            <span>Winning</span>
          </div>
        )}
        {!isWinning && isOutbid && (
          <div className="badge-outbid">
            <span className="badge-icon">⚠️</span>
            <span>Outbid</span>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="card-body">
        {/* Compact Info Row */}
        <div className="compact-info">
          <div className="info-item">
            <span className="info-label">Bid</span>
            <span className="info-value">${item.currentBid.toLocaleString()}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Bidder</span>
            <span className="info-value">{bidderName}</span>
          </div>
          <div className={`info-item time-item ${isUrgent ? "urgent" : ""} ${isAuctionEnded ? "ended" : ""}`}>
            <span className="info-label">⏱️</span>
            <span className={`info-value ${isUrgent ? "blink" : ""}`}>
              {isAuctionEnded ? "Ended" : formatTime(timeRemaining)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer with Bid Button */}
      <div className="card-footer">
        <button
          onClick={handleBid}
          disabled={isAuctionEnded}
          className="bid-button"
        >
          <span className="button-icon">{isAuctionEnded ? "🔒" : "💰"}</span>
          <span className="button-text">
            {isAuctionEnded ? "Closed" : "Bid +$10"}
          </span>
        </button>
      </div>
    </div>
  );
}