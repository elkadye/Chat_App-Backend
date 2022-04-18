import express from 'express'
import {User} from "../entity/User"
import bcrypt from 'bcryptjs'
import jwt ,{JwtPayload} from 'jsonwebtoken'
const router=express.Router()

import {AuthRequest} from '../types/auth'
import { isAuthenticated } from '../middleware/auth'

router.post('/signUp', async (req, res) => {
    try{
        const {email, password, firstName, lastName, username} = req.body
        console.log({ email, password, firstName, lastName, username });
        const userExists = await User.findOne({ where:[{email},{username}]})
        if(userExists){
            return res.status(400).json({
                message: 'User already exists',
            })
        }
       const hashedPassword = await bcrypt.hash(password, 12);
       console.log(hashedPassword)
       const user = User.create({
            firstName,
            lastName,
            email,
            username,
            password:hashedPassword
        })
        await user.save()
        res.status(200).json({ message: 'user created successfully',user})


    }catch(error){
 res.status(500).json({error});
    }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password} = req.body;
    const user = await User.findOne( {where: {email}})
    if (!user) {
      return res.status(400).json({
        message: "A user with this email does not exist",
      })
    }
    const validPass= await bcrypt.compare(password, user.password);
    if(!validPass){
         return res.status(400).json({
           message: "Invalid password",
         });
    }
    const token=jwt.sign({email:user.email}, process.env.HASHING_KEY,{expiresIn:'1d'})
    res.status(200).json({ message: "Logged in successfully", token });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/me', isAuthenticated, async (req: AuthRequest, res) =>{
    try {
        const user = req.user
        res.json({user:JSON.parse(user)})
        } catch (error) {
      res.status(500).json({ error });
    }

})

router.get('/users', isAuthenticated, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({users})
  } catch (error) {
    res.status(500).json({error});
  }
});



export {router as authRouter}