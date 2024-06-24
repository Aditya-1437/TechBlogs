import express from 'express';

const app = express();

app.listen(3000, ()=>{
    console.log("Port : 3000\nStatus : Running");
})
