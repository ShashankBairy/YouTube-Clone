import Channel from '../Model/channelmodel.js'

export const createChannel = async(req,res)=>{
    const {channelId, channelName, owner, description, channelBanner, subscribers} = req.body;

    try{
        const channel = new Channel({channelId, channelName, owner, description, channelBanner, subscribers});
        await channel.save();
        res.status(201).json({message:'Channel created', channelId});
    }catch(error){
        res.status(400).json({message:'Something error in Channel', error});
    }
}

export const getChannel = async(req,res)=>{
    try{
        console.log("Requested Channel ID: ", req.params.id);
        const channel = await Channel.findOne({channelId: req.params.id});
        res.json(channel)
    }catch(error){
        res.status(500).json({message:"Error in getChannel",error});
    }
}