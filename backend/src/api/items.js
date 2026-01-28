import express from 'express';
import { getItems } from '../models/item.js';

const router = express.Router();

/**
 * GET /api/items
 * Returns a list of auction items
 */
router.get('/items', (req, res) => {
  try {
    const items = getItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
