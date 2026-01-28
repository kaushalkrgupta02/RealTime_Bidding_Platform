import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const httpServer = createServer(app);

const isProduction = process.env.NODE_ENV === 'production';
const configuredCorsOrigin = process.env.CORS_ORIGIN;

if (!configuredCorsOrigin) {
  const message = 'CORS_ORIGIN environment variable is not set.';
  if (isProduction) {
    throw new Error(
      message + ' Refusing to start server in production without explicit CORS configuration.'
    );
  } else {
    console.warn(
      message + ' Falling back to http://localhost:3000 for development use only.'
    );
  }
}

const effectiveCorsOrigin = configuredCorsOrigin || 'http://localhost:3000';

const io = new Server(httpServer, {
  cors: {
    origin: effectiveCorsOrigin,
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes and socket handlers
import itemsRouter from './api/items.js';
import setupSocketHandlers from './socket/bidding.js';

// Routes
app.use('/api', itemsRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Socket.io handlers
setupSocketHandlers(io);

// Start server
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
