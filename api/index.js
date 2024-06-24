import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.mongopassword)
.then(()=>{
    console.log("Database : Connected")
})
.catch((err)=>{
    console.log("Database : No Connection " + err)
});

const app = express();

app.listen(3000, ()=>{
    console.log("Port : 3000\nStatus : Running");
})
