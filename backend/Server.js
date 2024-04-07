import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectToMongoDB from "./db/ConnectToMongoDB.js";
import messageRoutes from "./routes/messageRoutes.js";
import cookieParser from "cookie-parser";
// import { rateLimit } from 'express-rate-limit'
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"
import { app,server} from "./Sockets/socket.js";



dotenv.config();
// const limiter = rateLimit({
//     windowMs: 15*60*1000,
//     limit: 10,
  
//   })
  
// app.use(limiter);
app.use(express.json())
app.use(cookieParser())

app.use(cors())

const PORT = process.env.PORT || 5000;
// app.get("/",(req,res)=>{
//     res.send("Server is ready Now!!!")
// })

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes);


server.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`)})