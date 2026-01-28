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
    title: 'Classic Guitar',
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
  },
  {
    id: 4,
    title: 'iPhone 15 Pro Max',
    startingPrice: 1200,
    currentBid: 1450,
    highestBidder: 'user_101',
    auctionEndTime: Date.now() + 5400000, // 1.5 hours from now
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
    auctionEndTime: Date.now() + 10800000, // 3 hours from now
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
    auctionEndTime: Date.now() + 900000, // 15 minutes from now
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
    auctionEndTime: Date.now() + 14400000, // 4 hours from now
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
    auctionEndTime: Date.now() + 3600000, // 1 hour from now
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
    auctionEndTime: Date.now() + 21600000, // 6 hours from now
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
    auctionEndTime: Date.now() + 2700000, // 45 minutes from now
    bidHistory: [
      { bidderId: 'user_707', amount: 580, timestamp: Date.now() - 4000 }
    ]
  },
  {
    id: 11,
    title: 'Designer Handbag',
    startingPrice: 800,
    currentBid: 1050,
    highestBidder: 'user_808',
    auctionEndTime: Date.now() + 7200000, // 2 hours from now
    bidHistory: [
      { bidderId: 'user_808', amount: 1050, timestamp: Date.now() - 9000 }
    ]
  },
  {
    id: 12,
    title: 'Professional Camera Kit',
    startingPrice: 2000,
    currentBid: 2450,
    highestBidder: 'user_909',
    auctionEndTime: Date.now() + 10800000, // 3 hours from now
    bidHistory: [
      { bidderId: 'user_909', amount: 2450, timestamp: Date.now() - 15000 }
    ]
  },
  {
    id: 13,
    title: 'Luxury Yacht Model',
    startingPrice: 5000,
    currentBid: 6200,
    highestBidder: 'user_111',
    auctionEndTime: Date.now() + 18000000, // 5 hours from now
    bidHistory: [
      { bidderId: 'user_111', amount: 6200, timestamp: Date.now() - 30000 }
    ]
  },
  {
    id: 14,
    title: 'Rare Comic Book Collection',
    startingPrice: 1500,
    currentBid: 2100,
    highestBidder: 'user_222',
    auctionEndTime: Date.now() + 3600000, // 1 hour from now
    bidHistory: [
      { bidderId: 'user_222', amount: 2100, timestamp: Date.now() - 7000 }
    ]
  },
  {
    id: 15,
    title: 'Tesla Model S',
    startingPrice: 45000,
    currentBid: 48500,
    highestBidder: 'user_333',
    auctionEndTime: Date.now() + 43200000, // 12 hours from now
    bidHistory: [
      { bidderId: 'user_333', amount: 48500, timestamp: Date.now() - 45000 }
    ]
  },
  {
    id: 16,
    title: 'Original Picasso Painting',
    startingPrice: 50000,
    currentBid: 67500,
    highestBidder: 'user_444',
    auctionEndTime: Date.now() + 86400000, // 24 hours from now
    bidHistory: [
      { bidderId: 'user_444', amount: 67500, timestamp: Date.now() - 60000 }
    ]
  },
  {
    id: 17,
    title: 'Smart Home System',
    startingPrice: 1200,
    currentBid: 1580,
    highestBidder: 'user_555',
    auctionEndTime: Date.now() + 5400000, // 1.5 hours from now
    bidHistory: [
      { bidderId: 'user_555', amount: 1580, timestamp: Date.now() - 11000 }
    ]
  },
  {
    id: 18,
    title: 'Vintage Rolex Watch',
    startingPrice: 8000,
    currentBid: 9850,
    highestBidder: 'user_666',
    auctionEndTime: Date.now() + 7200000, // 2 hours from now
    bidHistory: [
      { bidderId: 'user_666', amount: 9850, timestamp: Date.now() - 18000 }
    ]
  },
  {
    id: 19,
    title: 'Mountain Bike',
    startingPrice: 600,
    currentBid: 780,
    highestBidder: 'user_777',
    auctionEndTime: Date.now() + 2700000, // 45 minutes from now
    bidHistory: [
      { bidderId: 'user_777', amount: 780, timestamp: Date.now() - 5000 }
    ]
  },
  {
    id: 20,
    title: 'Beachfront Property',
    startingPrice: 250000,
    currentBid: 285000,
    highestBidder: 'user_888',
    auctionEndTime: Date.now() + 172800000, // 48 hours from now
    bidHistory: [
      { bidderId: 'user_888', amount: 285000, timestamp: Date.now() - 120000 }
    ]
  },
  {
    id: 21,
    title: 'Drone with 4K Camera',
    startingPrice: 800,
    currentBid: 1050,
    highestBidder: 'user_999',
    auctionEndTime: Date.now() + 3600000, // 1 hour from now
    bidHistory: [
      { bidderId: 'user_999', amount: 1050, timestamp: Date.now() - 8000 }
    ]
  },
  {
    id: 22,
    title: 'Grand Piano',
    startingPrice: 3000,
    currentBid: 3850,
    highestBidder: 'user_121',
    auctionEndTime: Date.now() + 14400000, // 4 hours from now
    bidHistory: [
      { bidderId: 'user_121', amount: 3850, timestamp: Date.now() - 22000 }
    ]
  },
  {
    id: 23,
    title: 'Gold Investment Bars (1kg)',
    startingPrice: 55000,
    currentBid: 58200,
    highestBidder: 'user_232',
    auctionEndTime: Date.now() + 21600000, // 6 hours from now
    bidHistory: [
      { bidderId: 'user_232', amount: 58200, timestamp: Date.now() - 35000 }
    ]
  },
  {
    id: 24,
    title: 'E-Sports Gaming Chair',
    startingPrice: 300,
    currentBid: 420,
    highestBidder: 'user_343',
    auctionEndTime: Date.now() + 1800000, // 30 minutes from now
    bidHistory: [
      { bidderId: 'user_343', amount: 420, timestamp: Date.now() - 2000 }
    ]
  },
  {
    id: 25,
    title: 'Private Island Paradise',
    startingPrice: 2000000,
    currentBid: 2250000,
    highestBidder: 'user_454',
    auctionEndTime: Date.now() + 259200000, // 72 hours from now
    bidHistory: [
      { bidderId: 'user_454', amount: 2250000, timestamp: Date.now() - 200000 }
    ]
  },
  {
    id: 26,
    title: 'Vintage Wine Cellar',
    startingPrice: 15000,
    currentBid: 18700,
    highestBidder: 'user_565',
    auctionEndTime: Date.now() + 10800000, // 3 hours from now
    bidHistory: [
      { bidderId: 'user_565', amount: 18700, timestamp: Date.now() - 28000 }
    ]
  },
  {
    id: 27,
    title: 'Robot Vacuum Cleaner',
    startingPrice: 400,
    currentBid: 550,
    highestBidder: 'user_676',
    auctionEndTime: Date.now() + 2700000, // 45 minutes from now
    bidHistory: [
      { bidderId: 'user_676', amount: 550, timestamp: Date.now() - 6000 }
    ]
  },
  {
    id: 28,
    title: 'Luxury Sports Car',
    startingPrice: 75000,
    currentBid: 82500,
    highestBidder: 'user_787',
    auctionEndTime: Date.now() + 28800000, // 8 hours from now
    bidHistory: [
      { bidderId: 'user_787', amount: 82500, timestamp: Date.now() - 55000 }
    ]
  },
  {
    id: 29,
    title: 'Antique Furniture Set',
    startingPrice: 2500,
    currentBid: 3150,
    highestBidder: 'user_898',
    auctionEndTime: Date.now() + 7200000, // 2 hours from now
    bidHistory: [
      { bidderId: 'user_898', amount: 3150, timestamp: Date.now() - 14000 }
    ]
  },
  {
    id: 30,
    title: 'Cryptocurrency Mining Rig',
    startingPrice: 3000,
    currentBid: 3850,
    highestBidder: 'user_909',
    auctionEndTime: Date.now() + 5400000, // 1.5 hours from now
    bidHistory: [
      { bidderId: 'user_909', amount: 3850, timestamp: Date.now() - 19000 }
    ]
  }
];

// Create mutexes for each item to prevent race conditions
export const itemMutexes = new Map();
items.forEach(item => {
  itemMutexes.set(item.id, new Mutex());
});