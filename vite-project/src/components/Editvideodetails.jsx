import { useState, useEffect } from 'react';
import './videopagestyle.css';
import { useParams, useNavigate } from 'react-router-dom';

function EditVideoDetails() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [uploader, setUploader] = useState('');
    const [uploadDate, setUploadDate] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const channelId = localStorage.getItem('channelId')
    const { id } = useParams(); // Get video ID from URL params

    useEffect(() => {
        if (id) {
            fetchVideoDetails(id);
        }
    }, [id]);

    const fetchVideoDetails = async (videoId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/videos/${videoId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log("Video Details: ", data);

            if (response.ok) {
                // Set the input fields with existing video data
                setTitle(data.title || ''); // Default to empty string if data is undefined
                setDescription(data.description || ''); // Default to empty string if data is undefined
                setUploader(data.uploader || ''); // Default to empty string if data is undefined
                setUploadDate(data.uploadDate || ''); // Default to empty string if data is undefined
            } else {
                throw new Error(data.message || 'Failed to fetch video details');
            }
        } catch (error) {
            // console.error('Error fetching video details:', error);
            alert(`Failed to load video details: ${error.message}`);
        }
    }; 

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            alert('Please log in to edit videos');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/videos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    // Send existing data for fields that are left empty
                    title: title || undefined, // Send undefined if the title is empty
                    description: description || undefined, // Send undefined if the description is empty
                    uploader: uploader || undefined, // Send undefined if the uploader is empty
                    uploadDate: uploadDate || undefined, // Send undefined if the uploadDate is empty
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error: ${errorData.message || response.statusText}`);
            }

            // Redirect after successful update
            navigate(`/channelpage/${channelId}`);
        } catch (error) {
            console.error('Error during video update:', error);
            alert(`Failed to update video: ${error.message}`);
        }
    };// here we have used another form to edit the video details

    return (
        <div className="videoform">
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <label>Description</label>
                <textarea 
                    placeholder="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label>Uploader</label>
                <input 
                    type="text" 
                    placeholder="Uploader" 
                    value={uploader} 
                    onChange={(e) => setUploader(e.target.value)} 
                />
                <label>Upload Date</label>
                <input 
                    type="datetime-local" 
                    value={uploadDate} 
                    onChange={(e) => setUploadDate(e.target.value)} 
                />
                <button type="submit" className="videoformbutton">
                    Update
                </button>
            </form>
        </div>
    );
}

export default EditVideoDetails;
