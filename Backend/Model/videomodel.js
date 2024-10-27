import mongoose from "mongoose";
// import Channel from './channelmodel.js'
// import Comment from "./commentsmodel";

const videoSchema = new mongoose.Schema({
    videoId:String,
    title:String,
    thumbnailUrl:String,
    description:String,
    channelId:{type: mongoose.Schema.Types.ObjectId, ref: 'Channel'},
    uploader:String,
    views:Number,
    likes:Number,
    dislikes:Number,
    uploadDate:Date,
    comments:[{type:mongoose.Schema.Types.ObjectId, ref:'Comment'}]
})

const Video = mongoose.model('Video', videoSchema);
export default Video;