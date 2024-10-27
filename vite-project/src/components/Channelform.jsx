import './channel.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Channelform(){
    // this is to create the channel, we have used form to enter the channel details
    const [channelId, setChannelId] = useState('');
    const [channelName, setChannelName] = useState('');
    const [owner,setOwner] = useState('');
    const [description,setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!channelId || !channelName || !owner || !description){
            alert('Please fill in all fields');
            return;
        }

        try{
            const response = await fetch('http://localhost:3000/api/channel/create',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({channelId:channelId,channelName:channelName,owner:owner,description:description}),
            });
            if (!response.ok) {
                const errorData = await response.json(); // Get error details
                throw new Error(`Error: ${errorData.message || response.statusText}`);
            }

            const data = await response.json();
            console.log('Channel Details: ',data);
            console.log('ChannelId: ',data.channelId);
            localStorage.setItem('channelId', data.channelId);
            localStorage.setItem('channelCreated', 'true');
            navigate(`/channelpage/${channelId}`);
        }catch(error){
            console.error('Error during channel creation:', error); 
            alert('Error creating channel');
            return;
        }
    }

    return(
        <>
        <div className="channelform">
            <form onSubmit={handleSubmit}>
               <label>Channel Id</label>
               <input type='text' value={channelId} onChange={(e)=>setChannelId(e.target.value)}
                  placeholder='Channel Id' required/>
               <label>Channel Name</label>
               <input type='text' value={channelName}
                onChange={(e)=> setChannelName(e.target.value)} placeholder='Channel Name' required></input>
                <label>Owner</label>
                <input type='text' value={owner} onChange={(e)=>setOwner(e.target.value)} placeholder='Owner' required></input>
                <label>Description</label>
                <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Description' required></textarea>
                <button type='submit'className='submitButton'>Submit</button>
            </form>
        </div>
        </>
    )
}

export default Channelform;