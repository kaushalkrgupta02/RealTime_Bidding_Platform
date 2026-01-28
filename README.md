# Real Time Bidding Platform

A real-time auction platform built with Node.js, Socket.io, and React.

## Features

- **Real-time Bidding**: Instant bid updates using WebSocket connections
- **Race Condition Handling**: Atomic operations ensure only valid bids are accepted
- **Live Countdown Timer**: Server-synced timers prevent client-side manipulation
- **Responsive Design**: Mobile-friendly auction interface
- **Connection Status**: Visual indicators for server connectivity

## Project Structure

```
live_bidding_platform/
├── backend/          # Node.js + Socket.io server
├── frontend/         # React client application
├── docker-compose.yml # Multi-service Docker setup
└── README.md
```

## Tech Stack

### Backend
- Node.js 18+
- Express.js
- Socket.io
- CORS handling

### Frontend
- React 18
- Socket.io-client
- Axios for API calls
- Responsive CSS

## Setup

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Docker (optional)

### Local Development

1. **Clone and navigate to the project:**
   ```bash
   cd live_bidding_platform
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm start
   ```

3. **Frontend Setup (in a new terminal):**
   ```bash
   cd frontend
   npm install
   cp .env.example .env.local
   npm start
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Docker Setup

```bash
# Run both services
docker-compose up

# Or run individually
docker-compose up backend
docker-compose up frontend
```

## API Endpoints

- `GET /api/items` - Get all auction items

## Socket Events

### Client → Server
- `BID_PLACED` - Place a new bid
  ```json
  {
    "itemId": "uuid",
    "userId": "string",
    "bidAmount": 150
  }
  ```

### Server → Clients
- `UPDATE_BID` - Broadcast new highest bid
- `AUCTION_ENDED` - Notify when auction ends

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
```

### Frontend (.env.local)
```
REACT_APP_BACKEND_URL=http://localhost:5000
REACT_APP_API_URL=http://localhost:5000/api
```

## Development

### Running Tests
```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

### Building for Production
```bash
# Backend
cd backend && npm run build

# Frontend
cd frontend && npm run build
```


## License

MIT License

