import { Mutex } from 'async-mutex';

export const items = [
  {
    id: 1,
    title: 'Indian Cricket Jersey',
    startingPrice: 500,
    currentBid: 850,
    highestBidder: 'user_123',
    auctionEndTime: Date.now() + 300000, // 5 minutes from now
    bidHistory: [
      { bidderId: 'user_123', amount: 850, timestamp: Date.now() - 5000 }
    ]
  },
  {
    id: 2,
    title: 'Classic Guitar',
    startingPrice: 300,
    currentBid: 450,
    highestBidder: 'user_456',
    auctionEndTime: Date.now() + 360000, // 6 minutes from now
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
    auctionEndTime: Date.now() + 420000, // 7 minutes from now
    bidHistory: [
      { bidderId: 'user_789', amount: 1200, timestamp: Date.now() - 15000 }
    ]
  },
  {
    id: 4,
    title: 'iPhone 15 Pro Max',
    startingPrice: 1200,
    currentBid: 1450,
    highestBidder: 'user_101',
    auctionEndTime: Date.now() + 480000, // 8 minutes from now
    bidHistory: [
      { bidderId: 'user_101', amount: 1450, timestamp: Date.now() - 8000 }
    ]
  },
  {
    id: 5,
    title: 'MacBook Pro M3',
    startingPrice: 2500,
    currentBid: 2850,
    highestBidder: 'user_202',
    auctionEndTime: Date.now() + 540000, // 9 minutes from now
    bidHistory: [
      { bidderId: 'user_202', amount: 2850, timestamp: Date.now() - 12000 }
    ]
  },
  {
    id: 6,
    title: 'Vintage Wine Collection',
    startingPrice: 800,
    currentBid: 1100,
    highestBidder: 'user_303',
    auctionEndTime: Date.now() + 600000, // 10 minutes from now
    bidHistory: [
      { bidderId: 'user_303', amount: 1100, timestamp: Date.now() - 3000 }
    ]
  },
  {
    id: 7,
    title: 'Diamond Necklace',
    startingPrice: 3000,
    currentBid: 3800,
    highestBidder: 'user_404',
    auctionEndTime: Date.now() + 900000, // 15 minutes from now
    bidHistory: [
      { bidderId: 'user_404', amount: 3800, timestamp: Date.now() - 20000 }
    ]
  },
  {
    id: 8,
    title: 'Gaming PC Setup',
    startingPrice: 1500,
    currentBid: 1850,
    highestBidder: 'user_505',
    auctionEndTime: Date.now() + 1200000, // 20 minutes from now
    bidHistory: [
      { bidderId: 'user_505', amount: 1850, timestamp: Date.now() - 6000 }
    ]
  },
  {
    id: 9,
    title: 'Royal Enfield Motorcycle',
    startingPrice: 4000,
    currentBid: 4650,
    highestBidder: 'user_606',
    auctionEndTime: Date.now() + 720000, // 12 minutes from now
    bidHistory: [
      { bidderId: 'user_606', amount: 4650, timestamp: Date.now() - 25000 }
    ]
  },
  {
    id: 10,
    title: 'Artisan Coffee Machine',
    startingPrice: 400,
    currentBid: 580,
    highestBidder: 'user_707',
    auctionEndTime: Date.now() + 1080000, // 18 minutes from now
    bidHistory: [
      { bidderId: 'user_707', amount: 580, timestamp: Date.now() - 4000 }
    ]
  }
];

// Create mutexes for each item to prevent race conditions
export const itemMutexes = new Map();
items.forEach(item => {
  itemMutexes.set(item.id, new Mutex());
});