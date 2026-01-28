import { updateBid, getItemById } from '../models/item.js';
import { validateBid } from '../utils/validation.js';

// Track concurrent bids to prevent race conditions
const bidLocks = new Map();

/**
 * Setup Socket.io event handlers for real-time bidding
 */
const setupSocketHandlers = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // User joins an item's bidding room
    socket.on('JOIN_ITEM', (itemId) => {
      socket.join(`item_${itemId}`);
      console.log(`User ${socket.id} joined item ${itemId}`);
    });

    // Handle incoming bid
    socket.on('BID_PLACED', async (data) => {
      const { itemId, userId, bidAmount } = data;

      // Acquire lock for this item to prevent race conditions
      const lockKey = `item_${itemId}`;
      
      if (bidLocks.has(lockKey)) {
        socket.emit('BID_REJECTED', {
          itemId,
          reason: 'Another bid is being processed',
          code: 'CONCURRENT_BID'
        });
        return;
      }

      // Acquire lock
      bidLocks.set(lockKey, true);

      try {
        // Validate bid
        const validation = validateBid(itemId, bidAmount);
        if (!validation.valid) {
          socket.emit('BID_REJECTED', {
            itemId,
            reason: validation.reason,
            code: validation.code
          });
          return;
        }

        // Update bid in database
        const updatedItem = updateBid(itemId, userId, bidAmount);

        // Broadcast successful bid to all clients
        io.to(`item_${itemId}`).emit('UPDATE_BID', {
          itemId,
          currentBid: updatedItem.currentBid,
          highestBidder: updatedItem.highestBidder,
          timestamp: Date.now()
        });

        // Confirm to bidder
        socket.emit('BID_ACCEPTED', {
          itemId,
          bidAmount: updatedItem.currentBid,
          timestamp: Date.now()
        });

        console.log(`Bid accepted: ${userId} bid $${bidAmount} on item ${itemId}`);
      } catch (error) {
        socket.emit('BID_REJECTED', {
          itemId,
          reason: error.message,
          code: 'BID_ERROR'
        });
        console.error(`Bid error: ${error.message}`);
      } finally {
        // Release lock
        bidLocks.delete(lockKey);
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

export default setupSocketHandlers;
