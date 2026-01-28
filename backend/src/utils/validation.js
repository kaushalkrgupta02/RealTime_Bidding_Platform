import { getItemById } from '../models/item.js';

/**
 * Validate a bid before processing
 */
export const validateBid = (itemId, bidAmount) => {
  const item = getItemById(itemId);

  if (!item) {
    return {
      valid: false,
      reason: 'Item not found',
      code: 'ITEM_NOT_FOUND'
    };
  }

  if (new Date() > new Date(item.endTime)) {
    return {
      valid: false,
      reason: 'Auction has ended',
      code: 'AUCTION_ENDED'
    };
  }

  if (!Number.isFinite(bidAmount) || bidAmount < 0) {
    return {
      valid: false,
      reason: `Bid must be higher than ${item.currentBid}`,
      code: 'INVALID_BID'
    };
  }

  if (bidAmount <= item.currentBid) {
    return {
      valid: false,
      reason: `Bid must be higher than $${item.currentBid}`,
      code: 'BID_TOO_LOW'
    };
  }

  return { valid: true };
};
