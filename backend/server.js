import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authRoutes from './routes/authRoute.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import cors from "cors"
import Path from "path"
import { connectDB } from "./config/db.js";
// dotenv.config();
// app 
const app= express();
// port
const port=process.env.PORT ||3000

const __dirname=Path.resolve()

app.use(cors(
    {origin:"https://chat-app-frontend-kzr9.onrender.com/",
        credentials:true
    }
))
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/chat",chatRoutes)
await connectDB()


// server 
app.listen(port,()=>{
    
    console.log("server is running: "+port)
})


