import jwt from 'jsonwebtoken'
import { User } from '../entity/User'
import {AuthRequest, MyToken} from '../types/auth'

export const isAuthenticated = async (req: AuthRequest, res, next)=>{
    const {authorization} = req.headers
    jwt.verify(
        authorization,
        process.env.HASHING_KEY,
        async (err, token:MyToken)=>{
            if (err) {
                return res.status(401).json({message: "Invalid token"})
            }
            const email = token.email
            const user = await User.findOne( { where:{email}})
            req.user = JSON.stringify(user)
            next()
        }

        )
}