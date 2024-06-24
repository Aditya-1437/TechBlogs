import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

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

app.listen(3000, ()=>{
    console.log("Port : 3000\nStatus : Running");
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
