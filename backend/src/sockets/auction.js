import { items, itemMutexes } from "../data/item_data.js";

export const auctionSocket = (io, socket) => {
  socket.on("BID_PLACED", async ({ itemId, userId: bidUserId, userName: bidUserName, amount }) => {
    const item = items.find(i => i.id === itemId);
    const mutex = itemMutexes.get(itemId);

    if (!item || !mutex) {
      socket.emit("BID_RESPONSE", {
        success: false,
        message: "Invalid item"
      });
      return;
    }

    await mutex.runExclusive(() => {
      const now = Date.now();

      if (now >= item.auctionEndTime) {
        socket.emit("BID_RESPONSE", {
          success: false,
          message: "Auction ended"
        });
        return;
      }

      if (amount <= item.currentBid) {
        socket.emit("OUTBID", {
          itemId,
          currentBid: item.currentBid
        });
        return;
      }

      item.currentBid = amount;
      item.highestBidder = bidUserName;
      item.highestBidderId = bidUserId;
      item.bidHistory.push({ 
        userId: bidUserId,
        userName: bidUserName,
        amount, 
        timestamp: now 
      });

      io.emit("UPDATE_BID", {
        itemId,
        currentBid: amount,
        highestBidder: bidUserName,
        highestBidderId: bidUserId,
        timestamp: now
      });

      socket.emit("BID_RESPONSE", {
        success: true,
        message: "Bid accepted"
      });
    });
  });

  socket.on("disconnect", () => {
    // User disconnected
  });
};