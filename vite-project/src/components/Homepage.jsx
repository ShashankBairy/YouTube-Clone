import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './homepagestyle.css'    
import {faHouse,faFire,faSquareEnvelope,faVolumeLow} from '@fortawesome/free-solid-svg-icons';
import {faClosedCaptioning} from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import example from '../assets/SURIYASS.png'
import { FaEllipsisV, FaUserCircle } from 'react-icons/fa';
function Homepage(){
    // used to fetch the videos 
    const [videoInfo,setVideoInfo] = useState([]);
    useEffect(()=>{
      const fetchVideoinfo = async()=>{
        try{
            const response = await axios.get('http://localhost:3000/api/videos/');
            console.log(response.data);
            setVideoInfo(response.data);
        }catch(error){
            console.log(error);
        }
      };
      fetchVideoinfo();
    },[])
 
    return(
        <>
        <div className="main-container">
           <div className="asidediv">
            <Link to='/' style={{color:'white',textDecoration:'none' }}>
            <div className="homediv">
            <FontAwesomeIcon icon={faHouse} className='houseIcon'/>
                <p>Home</p>
            </div>
            </Link>
            
            <div className="homediv">
                <FontAwesomeIcon icon={faFire} className='houseIcon'/>
                <p>Shorts</p>
            </div>
            <div className="homediv">
                <FontAwesomeIcon icon={faSquareEnvelope} className='houseIcon'/>
                <p>Subscriptions</p>
            </div>
           </div>
            {/* Main Content */}
            <div className="main-content">
                <div className="maintop">
                <ul>
                    <div className="lidiv">
                    <li >Random 1</li>
                    </div>
                    <div className="lidiv">
                    <li>Random 2</li>
                    </div>
                    <div className="lidiv">
                    <li>Random 3</li>
                    </div>
                    <div className="lidiv">
                    <li>Random 4</li>
                    </div>
                </ul>
                </div>
                <div className="mainmatter">
                    {videoInfo.map((info)=>(
                        <Link to={`/videos/${info._id}`} className='no-underline'  key={info._id}>
                         <div className="videodiv">
                            <div className="imgdiv">
                              <img src={example}/>
                              <div >
                              <FontAwesomeIcon icon={faVolumeLow} className='watchIcon'/>
                              <FontAwesomeIcon icon={faClosedCaptioning} className='captionIcon'/>
                              </div>
                            
                            </div>
                         <div  className="videoinfo">
                            <div className="userlogodiv">
                                 <FaUserCircle style={{fontSize:'30px'}}/>
                            </div>
                            <div className="uservideodetails">
                              <h3>{info.title}</h3>
                              <p>{info.uploader}</p>
                              <p>{info.uploadDate}</p>
                            </div>
                            <div className="settingsoption">
                                <FaEllipsisV/>
                            </div>
                          
                         </div>
                        </div>
                        </Link>
                    ))}
                   </div>
                </div>
            </div>
        </>
    )
}

export default Homepage;