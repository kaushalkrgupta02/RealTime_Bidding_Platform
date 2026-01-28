import { items, itemMutexes } from "../data/dummyData.js";

export const auctionSocket = (io, socket) => {
  console.log("User connected:", socket.id);

  socket.on("BID_PLACED", async ({ itemId, bidderId, amount }) => {
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
      item.highestBidder = bidderId;
      item.bidHistory.push({ bidderId, amount, timestamp: now });

      io.emit("UPDATE_BID", {
        itemId,
        currentBid: amount,
        highestBidder: bidderId,
        timestamp: now
      });

      socket.emit("BID_RESPONSE", {
        success: true,
        message: "Bid accepted"
      });

      console.log(`Bid accepted: Item ${itemId} -> $${amount}`);
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
};