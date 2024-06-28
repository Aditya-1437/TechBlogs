import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose.connect(process.env.mongopassword)
.then(()=>{
    console.log("Database : Connected")
})
.catch((err)=>{
    console.log("Database : No Connection " + err)
});

const app = express();
app.use(express.json())
app.use(cookieParser())

app.listen(3000, ()=>{
    console.log("Port : 3000\nStatus : Running");
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Maybe error on our side :(';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})
