# Real Time Bidding Platform

A modern, real-time auction platform where multiple users can bid simultaneously on items with live updates. Experience the magic of real-time synchronization across all connected clients.

## Quick Start

### Option 1: Docker Compose (Recommended) ⚡

**Prerequisites:**
- Docker
- Docker Compose

**Run in one command:**
```bash
cd live_bidding_paltform
docker-compose up
```

That's it! 🎉 The app is running:
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000

**Stop with:**
```bash
docker-compose down
```

---

### Option 2: Local Node Setup

**Prerequisites:**
- Node.js 18+
- npm or yarn

**Install & Run:**
```bash
# Navigate to project
cd live_bidding_paltform

# Terminal 1 - Backend
cd backend
npm install
npm start
# Backend runs on http://localhost:3000

# Terminal 2 - Frontend (new terminal)
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

## How It Works

The platform uses **Socket.io** for real-time bidding synchronization. Here's the magic:

### Try It Yourself (Open 2-3 Tabs):

1. **Open multiple browser tabs** at `http://localhost:5173`
2. **First Tab**: Login as "Alice"
3. **Second Tab**: Login as "Bob"
4. **Third Tab**: Login as "Charlie"
5. **Alice bids** on "Indian Cricket Jersey" → Watch Bob & Charlie's screens **instantly update**
6. **Bob outbids Alice** → Alice sees "⚠️ Outbid" notification, Bob sees "👑 Winning"
7. **Watch timers countdown** in real-time across all tabs
8. **See notification center** (bell icon) track all bidding history

**The magic**: All users see the same bidder name and current bid instantly—no refresh needed!

## Project Structure

```
live_bidding_paltform/
├── backend/
│   ├── src/
│   │   ├── index.js                 # Server entry point
│   │   ├── routes/
│   │   │   └── itemsRoutes.js       # Auction items API
│   │   ├── sockets/
│   │   │   └── auction.js           # Real-time bidding logic
│   │   └── data/
│   │       └── item_data.js         # 5 auction items (40-80 min)
│   ├── Dockerfile                   # Backend Docker image
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── index.jsx                # React entry
│   │   ├── App.jsx                  # Main app component
│   │   ├── App.css                  # Layout styles
│   │   ├── components/
│   │   │   ├── Login.jsx            # User login form
│   │   │   ├── Login.css
│   │   │   ├── ItemCard.jsx         # Auction item display
│   │   │   ├── ItemCard.css
│   │   │   ├── NotificationCenter.jsx   # Bid history & alerts
│   │   │   └── NotificationCenter.css
│   │   ├── hooks/
│   │   │   └── auctionSocket.js     # Socket.io connection
│   │   └── services/
│   │       └── item.js              # API calls
│   ├── Dockerfile                   # Frontend Docker image
│   ├── package.json
│   ├── vite.config.js               # Vite configuration
│   └── .env.example
│
├── docker-compose.yml               # Multi-container orchestration
├── package.json                     # Root package (monorepo)
├── .gitignore
└── README.md
```

## Tech Stack

### Frontend
- **React** 18.2+ - UI framework
- **Vite** 7.3 - Lightning fast build tool
- **Socket.io-client** 4.8 - Real-time bidding
- **CSS3** - Modern styling with animations

### Backend
- **Node.js** 18+ - JavaScript runtime
- **Express.js** 4.18 - Web framework
- **Socket.io** 4.6 - Real-time communication
- **async-mutex** 0.4 - Concurrency control

### DevOps
- **Docker** - Container orchestration
- **Docker Compose** - Multi-container application setup
- **Alpine Linux** - Lightweight base images

## Example Scenario

**10:00 AM** - Alice logs in
**10:01 AM** - Bob opens in another tab
**10:02 AM** - Alice bids $550 on Item 1
  → Bob's screen instantly shows: `Current Bid: $550` | `Bidder: Alice`
**10:03 AM** - Bob bids $560
  → Alice sees: "Outbid by Bob"
  → Bob sees: "You're winning!"
**10:39 AM** - Item 1 auction ends
  → Winner announcement: Bob (final bid: $560)

All without any page refresh! ⚡

**Made with ❤️ for real-time enthusiasts**

