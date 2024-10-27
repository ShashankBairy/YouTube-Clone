import Video from '../Model/videomodel.js'
import Channel from '../Model/channelmodel.js';


// Add Video
export const addVideo = async (req,res)=>{
    const {videoId, title, thumbnailUrl, description,channelId, uploader, views, likes,dislikes, uploadDate} = req.body;
    try{
        
        const video = new Video({videoId, title, thumbnailUrl, description, channelId, uploader, views, likes,dislikes, uploadDate});
        await video.save();
     res.status(201).json({ message: 'Video Added', videoId })
    }catch(error){
     res.status(500).json({ message: 'Something went wrong', error });
    }

}

// Get All Videos
export const getVideos = async(req,res)=>{
    try{
        const videos = await Video.find();
        res.json(videos);
    }catch(error){
        res.status(500).json({message:'Error in Video Controller', error});
    }
}

// Get Video By ID

export const getVideoById = async(req,res)=>{
    const {id} = req.params;
    try{
        const video = await Video.findById(id);
        if(!video){
            return res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json({ message: 'Video found successfully', video });
    }catch(error){
        res.status(500).json({ message: 'Error fetching video', error });
    }
}


// Edit Video by ID

export const editVideo = async(req,res)=>{
    const {id} = req.params;

    const{title,description,uploader,uploadDate} = req.body;
    try{
        const video = await Video.findByIdAndUpdate(id,{title,description,uploader,uploadDate},{new:true});
        if(!video){
            return res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json({ message: 'Video updated successfully', video });
    }catch(error){
        res.status(500).json({ message: 'Error updating video', error });
    }
}

// Delete Video by ID

export const deleteVideo = async(req,res)=>{
    const {id} = req.params;
    try{
        const video = await Video.findByIdAndDelete(id);
        if(!video){
            return res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json({ message: 'Video deleted successfully' });
    }catch(error){
        res.status(500).json({ message: 'Error deleting video', error });
    }
}