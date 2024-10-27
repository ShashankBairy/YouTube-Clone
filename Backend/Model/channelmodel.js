import mongoose from "mongoose";


const channelSchema = new mongoose.Schema({
    channelId:String,
    channelName:String,
    owner:String,
    description:String,
    channelBanner:String,
    subscribers:Number,
    videos:[{type:mongoose.Schema.Types.ObjectId,ref:'Video'}]
})

const Channel = mongoose.model('Channel', channelSchema);
export default Channel;