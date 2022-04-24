import cors from 'cors'
import dotenv from 'dotenv'
import express, {json, urlencoded} from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import AppDataSource from './data-source'
import {authRouter} from './routes/auth'
import { messageRouter } from './routes/messages';
dotenv.config()
// console.log(process.env)
const app=express()

app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
app.use(json())
app.use(urlencoded({ extended:false }))

app.get('/', function(req,res) { res.send('Server is running')})

app.use('/message', messageRouter);
app.use('/auth', authRouter)

app.listen(process.env.PORT||8080, async ()=>{await AppDataSource.initialize()
console.log('connected to DB')})


const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
});
let users = []
const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) &&
        users.push({userId,socketId})
};

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}
io.on("connection", (socket) => {
    console.log("a user connected")
    socket.on("addUser", userId => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    // send and get message
    socket.on("chat message", (message) => {
        console.log({ message });
        
    }  )

    //disconnect 
    socket.on("disconnect", (socket) => {
        console.log("a user disconnected")
        removeUser(socket.Id);
        io.emit("getUsers", users);
    })
});