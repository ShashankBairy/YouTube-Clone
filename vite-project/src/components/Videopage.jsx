import './videopagestyle.css';
import example from '../assets/SURIYASS.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock,faBell } from '@fortawesome/free-regular-svg-icons';
import { faPlay, faForwardStep, faVolumeLow, faExpand, faGear, faClosedCaptioning,faUserCircle,faThumbsUp,faThumbsDown,faShare,faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function Videopage() {
    const { id } = useParams();
    const [videoInfo, setVideoInfo] = useState({});
    const [commentText,setCommentText] = useState('');
    const [comments,setComments] = useState([]); 

    useEffect(() => {
        const fetchVideodetais = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/videos/${id}`);
                console.log(response.data);
                setVideoInfo(response.data.video);
            } catch (error) {
                console.log('Error fetching video details', error);
            }
        }; // used to fetch the video details by Id
        
        const fetchComments = async()=>{
            try{
                const response = await axios.get(`http://localhost:3000/api/comments/${id}`);
                console.log(response.data);
                setComments(response.data.comments);
            }catch(error){
                console.log('Error fetching comments', error);
            }
        } // used to get the comments by video Id

        console.log('Video ID:', id); 
        fetchComments();
        fetchVideodetais();
    }, [id]);

    const handleAddcomment = async()=>{

        if (!commentText.trim()) {
            console.log("Comment cannot be empty.");
            return; // Prevents submitting if the comment is empty
        }
        try{
            const response = await fetch('http://localhost:3000/api/comments/addComment',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ videoId:id, text:commentText}),
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error: ${errorData.message || response.statusText}`);
            }
            const data = await response.json();
            setCommentText('');
            // setComments(data);
            console.log("Comments Data:",data)
        }catch(error){
            console.log('Error adding comment', error);
        }
    } // used to add the comment for a video 

    return (
        <>
            <div className="video-container">
                {videoInfo ? (
                    <div key={videoInfo._id} className="videocontent">
                        <div className="videodetails">
                            <img src={example} alt='random-pic' />
                            <div className="videooperation">
                                <FontAwesomeIcon icon={faPlay} style={{ color: 'white', fontSize: '20px', cursor: 'pointer', marginRight: '20px' }} />
                                <FontAwesomeIcon icon={faForwardStep} style={{ color: 'white', fontSize: '20px', cursor: 'pointer', marginRight: '20px' }} />
                                <FontAwesomeIcon icon={faVolumeLow} style={{ color: 'white', fontSize: '20px', cursor: 'pointer', marginRight: '20px' }} />
                                <FontAwesomeIcon icon={faClosedCaptioning} className='captionIcon' style={{ color: 'white', fontSize: '20px', cursor: 'pointer', marginLeft: '340px' }} />
                                <FontAwesomeIcon icon={faGear} style={{ color: 'white', fontSize: '20px', cursor: 'pointer', marginLeft: '20px' }} />
                                <FontAwesomeIcon icon={faExpand} style={{ color: 'white', fontSize: '20px', cursor: 'pointer', marginLeft: '20px' }} />
                            </div>
                        </div>
                        <div className="videoinfo">
                            <div className="detailsofvideobyId">
                            <h1 style={{ color: 'white' }}>{videoInfo.title|| "hello"}</h1>
                            </div>
                            <div className="logoofuser">
                             <FontAwesomeIcon icon={faUserCircle} style={{color:'white'}} className='circleIcon'/>
                             <p style={{color:'white', marginLeft:'10px'}}>{videoInfo.uploader}</p>
                             <div className="buttonforsubscribe">
                            <FontAwesomeIcon icon={faBell}/>
                             <p>Subscribe</p>
                             </div>
                             <div className="thumbsupdiv">
                             <FontAwesomeIcon icon={faThumbsUp} style={{color:'white'}} className='thumbsupIcon'/>
                             </div>
                             <div className="thumbsdowndiv">
                             <FontAwesomeIcon icon={faThumbsDown} style={{color:'white'}} className='thumbsdownIcon'/>
                             </div>
                              <div className="sharediv">
                                <FontAwesomeIcon icon={faShare}/>
                                <p>Share</p>
                              </div>
                              <div className="threedots">
                                <FontAwesomeIcon icon={faEllipsisH}/>
                              </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
                
{/*-------------------- Comment Section -------------- */}
                <div className="commentssection">
                <div className="commentsinputs">
                 <FontAwesomeIcon icon={faUserCircle} className='commentsectionIcon'/>
                 <input placeholder='Add a comment...' value={commentText} onChange={(e)=> setCommentText(e.target.value)} />
                 <button className="cancel-button">Cancel</button>
                 <button className="comment-button" onClick={handleAddcomment}>Comment</button> {/* used to create the comment*/}
                </div>
                <div className="commentsinfo">
                {Array.isArray(comments) && comments.map(comment => (
                <div key={comment._id} className="comment" style={{color:'white'}}>
                 <FontAwesomeIcon icon={faUserCircle} className='commentsectionIcon' />
                 <p>{comment.text}</p> {/* here comments are visible only when we reload the browser*/}
                 </div>
                ))}
                </div>
                </div>

{/*-------------------- Suggestion Section -------------- */}
{/* here i have given static data, just to have a better experience and to replicate how YouTube looks*/}
                <div className="suggestionscontent">
                    <div className="suggestiontop">
                        <ul>
                            <div className="suggestiondiv">
                                <li>Random 1</li>
                            </div>
                            <div className="suggestiondiv">
                                <li>Random 1</li>
                            </div>
                            <div className="suggestiondiv">
                                <li>Random 1</li>
                            </div>
                            <div className="suggestiondiv">
                                <li>Random 1</li>
                            </div>
                        </ul>
                    </div>

                    <div className="suggestionvideos">
                        <img src={example} alt="random-pic" />
                        <FontAwesomeIcon icon={faClock} className='clockIcon' />
                        <div className="suggestioninfo">
                            <h1>hello</h1>
                        </div>
                        <img src={example} alt="random-pic" />
                        <div className="suggestioninfo">
                            <h1>hello</h1>
                        </div>
                        <img src={example} alt="random-pic" />
                        <div className="suggestioninfo">
                            <h1>hello</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Videopage;
