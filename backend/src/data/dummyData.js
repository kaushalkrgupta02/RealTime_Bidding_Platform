import { Mutex } from 'async-mutex';

export const items = [
  {
    id: 1,
    title: 'Indian Cricket Jersey',
    startingPrice: 500,
    currentBid: 850,
    highestBidder: 'user_123',
    auctionEndTime: Date.now() + 3600000, // 1 hour from now
    bidHistory: [
      { bidderId: 'user_123', amount: 850, timestamp: Date.now() - 5000 }
    ]
  },
  {
    id: 2,
    title: 'Vintage Guitar',
    startingPrice: 300,
    currentBid: 450,
    highestBidder: 'user_456',
    auctionEndTime: Date.now() + 7200000, // 2 hours from now
    bidHistory: [
      { bidderId: 'user_456', amount: 450, timestamp: Date.now() - 10000 }
    ]
  },
  {
    id: 3,
    title: 'Antique Watch',
    startingPrice: 1000,
    currentBid: 1200,
    highestBidder: 'user_789',
    auctionEndTime: Date.now() + 1800000, // 30 minutes from now
    bidHistory: [
      { bidderId: 'user_789', amount: 1200, timestamp: Date.now() - 15000 }
    ]
  }
];

// Create mutexes for each item to prevent race conditions
export const itemMutexes = new Map();
items.forEach(item => {
  itemMutexes.set(item.id, new Mutex());
});