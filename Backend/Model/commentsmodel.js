import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    commentId:String,
    userId:String,
    text:String,
    timestamp:Date,
    videoId:{type:mongoose.Schema.Types.ObjectId,ref:"Video",required:true}
})

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;