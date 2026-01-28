import { v4 as uuidv4 } from 'uuid';

// In-memory item storage (replace with database in production)
let items = [
  {
    id: uuidv4(),
    title: 'Indian Cricket Jersey',
    startingPrice: 500,
    currentBid: 850,
    highestBidder: 'user_123',
    endTime: new Date(Date.now() + 3600000).toISOString(),
    bids: [
      { userId: 'user_123', amount: 85, timestamp: Date.now() - 5000 }
    ]
  }
];

export const getItems = () => {
  return items.map(item => ({
    id: item.id,
    title: item.title,
    startingPrice: item.startingPrice,
    currentBid: item.currentBid,
    highestBidder: item.highestBidder,
    endTime: item.endTime,
    bidCount: item.bids.length
  }));
};

export const getItemById = (id) => {
  return items.find(item => item.id === id);
};

export const updateBid = (itemId, userId, bidAmount) => {
  const item = getItemById(itemId);
  if (!item) throw new Error('Item not found');
  if (new Date() > new Date(item.endTime)) throw new Error('Auction has ended');
  if (bidAmount <= item.currentBid) throw new Error('Bid must be higher than current bid');

  item.currentBid = bidAmount;
  item.highestBidder = userId;
  item.bids.push({
    userId,
    amount: bidAmount,
    timestamp: Date.now()
  });

  return item;
};

export const getAllItems = () => items;
