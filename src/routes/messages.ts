import express from 'express';
const router = express.Router();

import { User } from '../entity/User';
import { Conversation } from '../entity/Conversation';
import { Message } from '../entity/Message';

import { isAuthenticated } from '../middleware/auth';
import { AuthRequest, userRequest } from '../types/auth';

// create new conversation
router.post('/conversation', isAuthenticated, async (req: AuthRequest, res) => {
  try {
    const { users } = req.body;
    let conversationUsers =[]
    for (let i = 0; i < users.length; i++) {
      const userObj = users[i];
      const user = await User.findOneBy({ id: +userObj.id });
      conversationUsers.push(user)
    };
     const conversation = new Conversation()
     
     conversation.users=conversationUsers
     await conversation.save()
    
    const createdConversation =await Conversation.find({
        where:{id: +conversation.id},
        relations:{users: true}
    })
    res.status(200).json({ createdConversation });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Get User conversations
router.get('/conversations/:user_id', isAuthenticated, async (req: userRequest, res) => {
  try {
    const {user_id} = req.params;
    const conversations = await Conversation.find({
    //   relations: {users:true},
      where: {users:{id: +user_id}},
      relations:{users:true, messages:true}
    });
    res.status(200).json({ conversations });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//get conversation messages by conversation ID
router.get(
  '/conversation/:conversation_id',
  isAuthenticated,
  async (req, res) => {
    try {
      const { conversation_id } = req.params;
      const conversation = await Conversation.findOne({
        where: { id: +conversation_id },
        relations: {users:true,messages:true}
      });
      res.status(200).json({ conversation });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
);
// router.get('/conversations', isAuthenticated, async (req: userRequest, res) => {
//   try {
//     const user = req.user;
//     const conversations = await Conversation.find({
//       where: { User: user },
//       //   relations: { conversation: true },
//     });
//     res.status(200).json({ conversations });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });

export { router as messageRouter };
