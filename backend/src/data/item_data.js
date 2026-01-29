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
  },
  // 5-10 minute auctions (Quick Deals)
  {
    id: 6,
    title: 'Limited Edition Sneakers',
    startingPrice: 80,
    currentBid: 120,
    highestBidder: 'Sophia',
    highestBidderId: 'bidder_sophia_001',
    auctionEndTime: Date.now() + (5 * 60 * 1000), // 5 minutes
    bidHistory: [
      { userId: 'bidder_sophia_001', userName: 'Sophia', amount: 120, timestamp: Date.now() - 1000 }
    ]
  },
  {
    id: 7,
    title: 'Wireless Earbuds Pro',
    startingPrice: 100,
    currentBid: 180,
    highestBidder: 'James',
    highestBidderId: 'bidder_james_001',
    auctionEndTime: Date.now() + (7 * 60 * 1000), // 7 minutes
    bidHistory: [
      { userId: 'bidder_james_001', userName: 'James', amount: 180, timestamp: Date.now() - 2000 }
    ]
  },
  {
    id: 8,
    title: 'Portable Phone Charger',
    startingPrice: 50,
    currentBid: 85,
    highestBidder: 'Nina',
    highestBidderId: 'bidder_nina_001',
    auctionEndTime: Date.now() + (6 * 60 * 1000), // 6 minutes
    bidHistory: [
      { userId: 'bidder_nina_001', userName: 'Nina', amount: 85, timestamp: Date.now() - 1500 }
    ]
  },
  {
    id: 9,
    title: 'USB-C Cable 3-Pack',
    startingPrice: 25,
    currentBid: 45,
    highestBidder: 'Oliver',
    highestBidderId: 'bidder_oliver_001',
    auctionEndTime: Date.now() + (8 * 60 * 1000), // 8 minutes
    bidHistory: [
      { userId: 'bidder_oliver_001', userName: 'Oliver', amount: 45, timestamp: Date.now() - 1000 }
    ]
  },
  // 10-15 hour auctions (Long-term Auctions)
  {
    id: 10,
    title: 'Gaming PC RTX 4080',
    startingPrice: 5000,
    currentBid: 6200,
    highestBidder: 'Isabella',
    highestBidderId: 'bidder_isabella_001',
    auctionEndTime: Date.now() + (10 * 60 * 60 * 1000), // 10 hours
    bidHistory: [
      { userId: 'bidder_isabella_001', userName: 'Isabella', amount: 6200, timestamp: Date.now() - 5000 }
    ]
  },
  {
    id: 11,
    title: 'Luxury Mechanical Watch',
    startingPrice: 3500,
    currentBid: 4800,
    highestBidder: 'Ethan',
    highestBidderId: 'bidder_ethan_001',
    auctionEndTime: Date.now() + (11 * 60 * 60 * 1000), // 11 hours
    bidHistory: [
      { userId: 'bidder_ethan_001', userName: 'Ethan', amount: 4800, timestamp: Date.now() - 3000 }
    ]
  },
  {
    id: 12,
    title: '4K Smart TV 65-inch',
    startingPrice: 2000,
    currentBid: 2750,
    highestBidder: 'Ava',
    highestBidderId: 'bidder_ava_001',
    auctionEndTime: Date.now() + (12 * 60 * 60 * 1000), // 12 hours
    bidHistory: [
      { userId: 'bidder_ava_001', userName: 'Ava', amount: 2750, timestamp: Date.now() - 2000 }
    ]
  },
  {
    id: 13,
    title: 'Professional Camera Canon EOS R5',
    startingPrice: 4500,
    currentBid: 5650,
    highestBidder: 'Liam',
    highestBidderId: 'bidder_liam_001',
    auctionEndTime: Date.now() + (13 * 60 * 60 * 1000), // 13 hours
    bidHistory: [
      { userId: 'bidder_liam_001', userName: 'Liam', amount: 5650, timestamp: Date.now() - 4000 }
    ]
  },
  {
    id: 14,
    title: 'Diamond Engagement Ring',
    startingPrice: 8000,
    currentBid: 10500,
    highestBidder: 'Charlotte',
    highestBidderId: 'bidder_charlotte_001',
    auctionEndTime: Date.now() + (15 * 60 * 60 * 1000), // 15 hours
    bidHistory: [
      { userId: 'bidder_charlotte_001', userName: 'Charlotte', amount: 10500, timestamp: Date.now() - 6000 }
    ]
  },
];

export const itemMutexes = new Map();
items.forEach(item => {
  itemMutexes.set(item.id, new Mutex());
});