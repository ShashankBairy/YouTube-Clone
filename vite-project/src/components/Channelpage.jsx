import { useEffect, useState } from "react";
import axios from 'axios';
import './channel.css';
import { FaUserCircle, FaVideo, FaEllipsisV } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";

function Channelpage() {
  const [channeldetails, setChanneldetails] = useState([]);
  const { channelId } = useParams();
  const [videodetails, setVideodetails] = useState([]);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchChanneldetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/channel/${channelId}`);
        setChanneldetails(response.data);
      } catch (error) {
        console.error("Error fetching channel details:", error);
      }
    }; // opens the channelpage with channelId

    const fetchVideodetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/videos`);
        setVideodetails(response.data);
      } catch (error) {
        console.log("Error fetching Video Details: ", error);
      }
    }; // fetches the video details once the video is created

    fetchChanneldetails();
    fetchVideodetails();
  }, [channelId]);

  const handleSettingsToggle = (videoId) => {
    setSelectedVideoId(videoId);
    setSettingsVisible(!settingsVisible);
  };  // used to display the edit and delete button , once settings icon is clicked

  const handleEdit = (videoId) => {
    const videoToEdit = videodetails.find(video => video._id === videoId);
    navigate(`/videoform/${videoId}`,{state:{video:videoToEdit}});
  }; // used to edit the video edit details by Id

  const handleDelete = async (videoId) => {
    try {
      await axios.delete(`http://localhost:3000/api/videos/${videoId}`);
      setVideodetails(videodetails.filter(video => video._id !== videoId));
    } catch (error) {
      // console.error("Error deleting video: ", error);
      console.log("Error deleting video: ", error)
    } 
  }; // used to delete the video by Id

  return (
    <div className="channelpage-container">
      <div className="channeldetails">
        <div className="channellogodiv">
          <FaUserCircle className="userIcon" />
        </div>
        <div className="channelinfo">
          <h1>{channeldetails.channelName || "Channel Name"}</h1>
          <h3>{channeldetails.owner || "Owner's Name"}</h3>
          <p>{channeldetails.description || "Description"}</p>
        </div>
      </div>
      <div className="videosinfo">
        <div className="creatediv">
          <Link to='/videoform'>
            <button className="createvideobutton">Create Video</button>
          </Link>
          <FaVideo style={{ color: 'white', fontSize: '20px' }} />
        </div>
        <hr />
        <div className="createdvideos">
          <div className="videos-row">
            {videodetails.map(video => (
              <div key={video._id} className="detailsofvideo">
                <img src={video.thumbnailUrl || "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"} alt={video.title} /> {/* here i have used random image to show how the screen will be visible in real YouTube channel. Its just for better experience*/}
                <div className="infoofchannel">
                  <div className="channeluserlogo">
                    <FaUserCircle />
                  </div>
                  <div className="infochanneldetails">
                    <h3>{video.title}</h3>
                    <p>{video.uploader}</p>
                    <p>{video.uploadDate}</p>
                  </div>
                  <div className="settingsdiv">
                    <FaEllipsisV className="settingsicon" onClick={() => handleSettingsToggle(video._id)} />
                    {settingsVisible && selectedVideoId === video._id && (
                      <div className="settingsbox">
                        <button onClick={() => handleEdit(video._id)}>Edit</button>
                        <button onClick={() => handleDelete(video._id)}>Delete</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Channelpage;
