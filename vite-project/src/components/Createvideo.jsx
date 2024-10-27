import { useState } from 'react';
import './videopagestyle.css';
import { useNavigate } from 'react-router-dom';

function Createvideo() {
    const [videoId, setVideoId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [uploader, setUploader] = useState('');
    const [uploadDate, setUploadDate] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const channelId = localStorage.getItem('channelId');


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            alert('Please log in to upload videos');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/videos/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    videoId,
                    title,
                    description,
                    uploader,
                    uploadDate,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error: ${errorData.message || response.statusText}`);
            }

            const data = await response.json();
            console.log("Video Created: ", data);
            navigate(`/channelpage/${channelId}`);
        } catch (error) {
            // console.log('Error during video creation:', error);
            alert(`Failed to create video: ${error.message}`);
        }
    }; // here it is used to enter the video details. It is used to create the video by entering the video details in Form

    return (
        <div className="videoform">
            <form onSubmit={handleSubmit}>
                <label>Video Id</label>
                <input 
                    type="text" 
                    placeholder="Video Id" 
                    required 
                    value={videoId} 
                    onChange={(e) => setVideoId(e.target.value)} 
                />
                <label>Title</label>
                <input 
                    type="text" 
                    placeholder="Title" 
                    required 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <label>Description</label>
                <textarea 
                    placeholder="Description" 
                    required 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label>Uploader</label>
                <input 
                    type="text" 
                    placeholder="Uploader" 
                    required 
                    value={uploader} 
                    onChange={(e) => setUploader(e.target.value)} 
                />
                <label>Uploaded Date</label>
                <input 
                    type="datetime-local" 
                    required 
                    value={uploadDate} 
                    onChange={(e) => setUploadDate(e.target.value)} 
                />
                <button type="submit" className="videoformbutton">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Createvideo;
