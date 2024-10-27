import express from 'express';
import mongoose from 'mongoose';
import userroute from './Route/userroute.js';
import videoroute from './Route/videoroute.js';
import channelroute from './Route/channelroute.js';
import commentroute from './Route/commentsroute.js' 
import cors from 'cors';


const app = new express();
app.use(cors());
app.use(express.json());

app.use('/api/users',userroute);
app.use('/api/videos', videoroute);
app.use('/api/channel', channelroute);
app.use('/api/comments', commentroute);


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})


mongoose.connect('mongodb://localhost:27017/YouTubeCloneBackend');
const db = mongoose.connection;

db.on('open',()=>{
    console.log("Connected to Mongoose");
})

db.on('error',()=>{
    console.log("Error connecting to Mongoose");
})
