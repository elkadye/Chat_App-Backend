import express from 'express';
const router = express.Router();

import { User } from '../entity/User';
import { Conversation } from '../entity/Conversation';
import { Message } from '../entity/Message';

import { isAuthenticated } from '../middleware/auth';
import { AuthRequest } from '../types/auth';


router.post('/conversation', isAuthenticated, async (req: AuthRequest, res) => {
  try {
      const conversation = Conversation.create()
      await conversation.save();
      const {users}=req.body
      for (let i=0;1<users.length;i++) {
          const user=
      }
    const user = req.user;
    const conversations = await Message.find({
      relations: { conversation: true },
    });
    res.status(200).json({ conversations });
  } catch (error) {
    res.status(500).json({ error });
  }
});



router.get('/all', isAuthenticated, async (req: AuthRequest, res) => {
  try {
    const user = req.user;
    const conversations = await Message.find({ 
         relations:{conversation:true}
        });
    res.status(200).json({ conversations });
  } catch (error) {
    res.status(500).json({ error });
  }
});



export { router as messageRouter };