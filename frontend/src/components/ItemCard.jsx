import { useState, useEffect } from "react";
import "./ItemCard.css";

export function ItemCard({
  item,
  onBid,
  currentUserId,
  isFlashing,
  isOutbid,
  serverTimeOffset,
}) {
  const [timeRemaining, setTimeRemaining] = useState(
    item.auctionEndTime - (Date.now() + serverTimeOffset),
  );
  const [prevBid, setPrevBid] = useState(item.currentBid);
  const isWinning = item.highestBidder === currentUserId;
  const isAuctionEnded = timeRemaining <= 0;
  const isUrgent = timeRemaining < 60000; // Less than 1 minute

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

  const bidderName = item.highestBidder
    .replace("user_", "")
    .slice(0, 12);

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
        {/* Price Section */}
        <div className="price-section">
          <span className="section-label">Current Bid</span>
          <div className="price-display">
            <span className="currency">$</span>
            <span className="price-value">{item.currentBid.toLocaleString()}</span>
          </div>
        </div>

        {/* Timer Section */}
        <div className={`timer-section ${isUrgent ? "urgent" : ""} ${isAuctionEnded ? "ended" : ""}`}>
          <div className="timer-label">
            <span className="timer-icon">⏱️</span>
            <span className="section-label">Time Left</span>
          </div>
          <div className="timer-display">
            {isAuctionEnded ? (
              <span className="ended-text">Auction Ended</span>
            ) : (
              <span className={`time-value ${isUrgent ? "blink" : ""}`}>
                {formatTime(timeRemaining)}
              </span>
            )}
          </div>
        </div>

        {/* Bidder Info */}
        <div className="bidder-section">
          <span className="section-label">Highest Bidder</span>
          <div className="bidder-name">
            <span className="bidder-avatar">{bidderName.charAt(0).toUpperCase()}</span>
            <span className="bidder-text">{bidderName}</span>
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
            {isAuctionEnded ? "Auction Closed" : "Bid +$10"}
          </span>
        </button>
      </div>
    </div>
  );
}