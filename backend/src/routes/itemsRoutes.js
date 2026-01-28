import express from "express";
import { items } from "../data/item_data.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    data: items.map(item => ({
      id: item.id,
      title: item.title,
      startingPrice: item.startingPrice,
      currentBid: item.currentBid,
      highestBidder: item.highestBidder,
      highestBidderId: item.highestBidderId,
      auctionEndTime: item.auctionEndTime,
      timeRemaining: Math.max(0, item.auctionEndTime - Date.now())
    })),
    serverTime: Date.now()
  });
});

router.get("/:id", (req, res) => {
  const item = items.find(i => i.id === Number(req.params.id));

  if (!item) {
    return res.status(404).json({ success: false, message: "Item not found" });
  }

  res.json({
    success: true,
    data: item,
    serverTime: Date.now()
  });
});

export default router;