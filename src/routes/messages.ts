import express from 'express';
const router = express.Router();

import { User } from '../entity/User';
import { Conversation } from '../entity/Conversation';
import { Message } from '../entity/Message';

import { isAuthenticated } from '../middleware/auth';
import { AuthRequest } from '../types/auth';


router.get('/all', isAuthenticated, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error });
  }
});



export { router as messageRouter };