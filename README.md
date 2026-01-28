# Live Bidding Platform

A real-time auction platform built with Node.js, Socket.io, and React.

## Features

- **Real-time Bidding**: Instant bid updates using WebSocket connections
- **Race Condition Handling**: Atomic operations ensure only valid bids are accepted
- **Live Countdown Timer**: Server-synced timers prevent client-side manipulation


## Project Structure

```
live_bidding_platform/
├── backend/          
├── frontend/        
├── docker-compose.yml
├── Dockerfile
└── .gitignore
```

## Tech Stack

### Backend
- Node.js
- Express.js
- Socket.io

### Frontend
- React


## Setup

### Prerequisites
- Node.js (v16+)


### Local Development



## API Endpoints

- `GET /api/items` - Get all auction items

## Socket Events

### Client → Server
- `BID_PLACED` - Place a new bid

### Server → Clients
- `UPDATE_BID` - Broadcast new highest bid
- `AUCTION_ENDED` - Notify when auction ends

