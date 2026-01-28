import { Mutex } from 'async-mutex';

export const items = [
  {
    id: 1,
    title: 'Indian Cricket Jersey',
    startingPrice: 500,
    currentBid: 850,
    highestBidder: 'Alex',
    highestBidderId: 'bidder_alex_001',
    auctionEndTime: Date.now() + (40 * 60 * 1000), // 40 minutes
    bidHistory: [
      { userId: 'bidder_alex_001', userName: 'Alex', amount: 850, timestamp: Date.now() - 5000 }
    ]
  },
  {
    id: 2,
    title: 'Classic Guitar',
    startingPrice: 300,
    currentBid: 450,
    highestBidder: 'Sarah',
    highestBidderId: 'bidder_sarah_001',
    auctionEndTime: Date.now() + (50 * 60 * 1000), // 50 minutes
    bidHistory: [
      { userId: 'bidder_sarah_001', userName: 'Sarah', amount: 450, timestamp: Date.now() - 10000 }
    ]
  },
  {
    id: 3,
    title: 'Antique Watch',
    startingPrice: 1000,
    currentBid: 1200,
    highestBidder: 'Marcus',
    highestBidderId: 'bidder_marcus_001',
    auctionEndTime: Date.now() + (60 * 60 * 1000), // 60 minutes (1 hour)
    bidHistory: [
      { userId: 'bidder_marcus_001', userName: 'Marcus', amount: 1200, timestamp: Date.now() - 15000 }
    ]
  },
  {
    id: 4,
    title: 'iPhone 15 Pro Max',
    startingPrice: 1200,
    currentBid: 1450,
    highestBidder: 'Emma',
    highestBidderId: 'bidder_emma_001',
    auctionEndTime: Date.now() + (70 * 60 * 1000), // 70 minutes
    bidHistory: [
      { userId: 'bidder_emma_001', userName: 'Emma', amount: 1450, timestamp: Date.now() - 8000 }
    ]
  },
  {
    id: 5,
    title: 'MacBook Pro M3',
    startingPrice: 2500,
    currentBid: 2850,
    highestBidder: 'David',
    highestBidderId: 'bidder_david_001',
    auctionEndTime: Date.now() + (80 * 60 * 1000), // 80 minutes
    bidHistory: [
      { userId: 'bidder_david_001', userName: 'David', amount: 2850, timestamp: Date.now() - 12000 }
    ]
  }
];

// Create mutexes for each item to prevent race conditions
export const itemMutexes = new Map();
items.forEach(item => {
  itemMutexes.set(item.id, new Mutex());
});