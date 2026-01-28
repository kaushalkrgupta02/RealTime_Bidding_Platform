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
  const isWinning = item.highestBidder === currentUserId;
  const isAuctionEnded = timeRemaining <= 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(
        Math.max(0, item.auctionEndTime - (Date.now() + serverTimeOffset)),
      );
    }, 100);

    return () => clearInterval(interval);
  }, [item.auctionEndTime, serverTimeOffset]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleBid = () => {
    onBid(item.id, item.currentBid + 10);
  };

  return (
    <div
      className={`item-card ${isFlashing ? "flashing" : ""} ${isOutbid ? "outbid" : ""}`}
    >
      <div className="card-header">
        <h3>{item.title}</h3>
      </div>

      <div className="card-body">
        <div className="price-section">
          <span className="label">Current Bid</span>
          <span className="price">${item.currentBid}</span>
        </div>

        <div className="timer-section">
          <span className="label">Time Remaining</span>
          <div
            className={`countdown ${isAuctionEnded ? "ended" : timeRemaining < 30000 ? "warning" : ""}`}
          >
            {formatTime(timeRemaining)}
          </div>
        </div>

        <div className="bidder-section">
          <span className="label">Highest Bidder</span>
          <span className="bidder">
            {
              item.highestBidder.replace("user_", "")
              .replace(/^./, (str) => str.toUpperCase())
            }
          </span>
        </div>

        <div className="badge-section">
          {isWinning && <span className="badge winning">✓ WINNING</span>}
          {isOutbid && <span className="badge outbid-badge">✗ OUTBID</span>}
        </div>
      </div>

      <div className="card-footer">
        <button
          onClick={handleBid}
          disabled={isAuctionEnded}
          className="bid-button"
        >
          {isAuctionEnded ? "AUCTION ENDED" : "Bid +$10"}
        </button>
      </div>
    </div>
  );
}