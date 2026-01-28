# Live Bidding Platform - Frontend

A React-based frontend for the Live Bidding Platform that provides real-time auction bidding functionality.

## Features

- Real-time bidding with Socket.io
- Live connection status indicator
- Responsive design for auction items
- Automatic bid updates across all connected clients
- Winning bid indicators

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

### Docker

To run with Docker:

```bash
# From the root directory
docker-compose up frontend
```

## Environment Variables

- `REACT_APP_BACKEND_URL`: Backend server URL (default: http://localhost:5000)
- `REACT_APP_API_URL`: API base URL (default: http://localhost:5000/api)

## Architecture

- **App.js**: Main component with Socket.io integration
- **Real-time Updates**: Automatic bid synchronization across clients
- **Responsive Design**: Mobile-friendly auction interface
- **Connection Status**: Visual indicator for server connectivity

## Usage

1. Ensure the backend is running on port 5000
2. Start the frontend development server
3. View auction items and place bids in real-time
4. See live updates when other users place bids