import {JwtPayload} from 'jsonwebtoken';
import {Request} from 'express'
import { User } from '../entity/User';
export interface MyToken extends JwtPayload{
    email: string;
    exp: number
}
export interface AuthRequest extends  Request{
    user: string
    userObj:User 
    
}
export interface userRequest extends  Request{
    user: []
    
}