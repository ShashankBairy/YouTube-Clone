import './style.css'
import {FaBars, FaYoutube, FaSearch,FaVideo,FaBell,FaUserCircle,FaHistory, FaFilm, FaShoppingBag,FaMusic,FaGamepad,FaTrophy,FaTshirt,FaPodcast,FaExclamation} from "react-icons/fa"
import {MdMic } from 'react-icons/md'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFire,faSquareEnvelope, faUser,faGear,faC} from '@fortawesome/free-solid-svg-icons';
import {faClock,faThumbsUp, faNewspaper,faLightbulb,faFlag,faCircleQuestion} from '@fortawesome/free-regular-svg-icons'
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function Header(){
    const [sidebar, setSidebar] = useState(false);
    const [username,setUsername] = useState(null);
    const [channelCreated, setChannelCreated] = useState(false);
    const [channelId, setChannelId] = useState('')
    const navigate = useNavigate();

    const toggleSlidebar = ()=>{
        setSidebar(!sidebar);
    }

    useEffect(()=>{
        document.body.classList.toggle('no-scroll',sidebar);

    },[sidebar]);

    useEffect(()=>{
       const storedUsername = localStorage.getItem('username');
       const storedChannelStatus = localStorage.getItem('channelCreated');
       const storedChannelId = localStorage.getItem('channelId');
       console.log(storedUsername,storedChannelStatus);
       if(storedUsername){
        setUsername(storedUsername);
       }
       if(storedChannelStatus){
        setChannelCreated(true);
       }
       if (storedChannelId) {
        setChannelId(storedChannelId);
      }
    },[])

    const handleChannelClick = () => {
        if (channelCreated && channelId) {
            navigate(`/channelpage/${channelId}`);
        } else {
            navigate('/channelform');
        }
    };

    const handlelogout =()=>{
        localStorage.removeItem('username');
        localStorage.removeItem('channelCreated');
        localStorage.removeItem('channelId');
        setUsername(null);
        setChannelCreated(false);
        setChannelId('');
        navigate('/'); // Redirect to the homepage after logout
    }

    return(
        <>

        {/* Header Part */}
        <header>
        <div className="headerleft">
        <div className="bardiv" onClick={toggleSlidebar}>
        <FaBars className='barIcon' style={{fontSize:'22px'}}/>
        </div>
        <Link to='/' className='no-underline'>
        <div className="logodiv">
        <FaYoutube style={{cursor:'pointer', color:'red', fontSize:'30px'}}/>
        <p style={{color:'white'}}>YouTube</p>
        </div>
        </Link>
        </div>
        <div className="headercenter">
        <div className="searchbar">
        <input type='text' placeholder='Search'/>
        <FaSearch className='searchIcon'/>
        </div>
        <MdMic className='micIcon' style={{cursor:'pointer'}}/>
        </div>
        <div className="headerright">
        <Link to='/user' className='no-underline'>
        <div className="userdiv">
        <FaUserCircle className='userIcon' style={{cursor:'pointer', fontSize:'30px'}}/>
        <p>{username ? username:'Sign In'}</p> {/* changes from signin to user name, username is visible only after reloading the browser*/}
        </div>
        </Link>
        {username && (
             <div className="channeldiv">
             <button className='channelButton' onClick={handleChannelClick} >Channel</button>
             </div>)} {/*changes the channels paths, firstly its takes to channelform path, once we create the channel, it changes to channelpage*/}
        <div onClick={handlelogout} className="logoutdiv">
        <button className='logoutButton'>Log Out</button>
        </div>
        </div>
        </header>
         
        {/* Toggle Slidebar */}
        <nav className={sidebar? 'sidebar active':'sidebar'}>
          <div className="sidebar-header">
            <div className="bardiv" onClick={toggleSlidebar}>
            <FaBars  className='barIcon' style={{fontSize:'22px', color:'white'}}  onClick={toggleSlidebar}/>
            </div>
            <Link to='/' className='no-underline'>
            <div className="logodiv">
                <FaYoutube style={{cursor:'pointer', color:'red', fontSize:'30px'}}/>
                <p style={{color:'white'}}>YouTube</p>
            </div>
            </Link>
            
          </div>
          <div className="sidebar-content">
            <div className="sidehome">
                <FontAwesomeIcon icon={faHouse}  className='homeIcon'/>
                <p style={{color:'white', fontSize:'14px'}}>Home</p>
            </div>
            <div className="sidehome">
                <FontAwesomeIcon className='homeIcon' icon={faFire}/>
                <p style={{color:'white', fontSize:'14px'}}>Shorts</p>
            </div>
            <div className="sidehome">
                <FontAwesomeIcon icon={faSquareEnvelope} className='homeIcon'/>
                <p style={{color:'white', fontSize:'14px'}}>Subscriptions</p>
            </div>
            <hr/>
            <div className="sidehome" style={{marginLeft:'10px'}}>
                <p style={{marginLeft:'20px'}}>You</p>
            </div>
            <div className="sidehome">
            <FontAwesomeIcon icon={faUser} className='homeIcon'/>
            <p style={{fontSize:'14px'}}>Your channel</p> 
            </div>
            <div className="sidehome">
                <FaHistory className='homeIcon'/>
                <p style={{fontSize:'14px'}}>History</p>
            </div>
            <div className="sidehome">
                <FaBars className='homeIcon'/>
                <p style={{fontSize:'14px'}}>Playlists</p>
            </div>
            <div className="sidehome">
                <FaVideo className='homeIcon'/>
                <p style={{fontSize:'14px'}}>Yours Videos</p>
            </div>
            <div className="sidehome">
                <FaFilm className='homeIcon'/>
                <p style={{fontSize:'14px'}}>Your Movies</p>
            </div>
            <div className="sidehome">
                <FontAwesomeIcon icon={faClock} className='homeIcon'/>
                <p style={{fontSize:'14px'}}>Watch later</p>
            </div>
            <div className="sidehome">
                <FontAwesomeIcon icon={faThumbsUp} className='homeIcon'/>
                <p style={{fontSize:'14px'}}>Liked videos</p>
            </div>
            <hr/>
            <p className='substext'>Subscription</p>
            <hr/>
            <p  className='substext' style={{marginBottom:'10px'}}>Explore</p>
            <div className="sidehome">
                <FontAwesomeIcon className='homeIcon' icon={faFire}/>
                <p style={{fontSize:'14px'}}>Trending</p>
            </div>
            <div className="sidehome">
                <FaShoppingBag className='homeIcon' />
                <p style={{fontSize:'14px'}}>Shopping</p>
            </div>
            <div className="sidehome">
                 <FaMusic className='homeIcon'/>
                 <p style={{fontSize:'14px'}}>Music</p>
            </div>
            <div className="sidehome">
                <FaFilm className='homeIcon' />
                <p style={{fontSize:'14px'}}>Movies</p>
            </div>
            <div className="sidehome">
                <FaGamepad className='homeIcon' />
                <p style={{fontSize:'14px'}}>Gaming</p>
            </div>
            <div className="sidehome">
                <FontAwesomeIcon icon={faNewspaper} className='homeIcon'/>
                <p style={{fontSize:'14px'}}>News</p>
            </div>
            <div className="sidehome">
                 <FaTrophy className='homeIcon' />
                 <p style={{fontSize:'14px'}}>Sports</p>
            </div>
            <div className="sidehome">
                <FontAwesomeIcon icon={faLightbulb} className='homeIcon'/>
                <p style={{fontSize:'14px'}}>Courses</p>
            </div>
            <div className="sidehome">
                <FaTshirt className='homeIcon' />
                <p style={{fontSize:'14px'}}>Fashion</p>
            </div>
            <div className="sidehome">
                <FaPodcast className='homeIcon'/>
                <p style={{fontSize:'14px'}}>Podcasts</p>
            </div>
            <hr/>
            <p style={{marginBottom:'8px'}} className='substext'>More from YouTube</p>
            <div className="sidehome">
                <FaYoutube className='homeIcon' style={{color:'red'}}/>
                <p style={{fontSize:'14px'}}>YouTube Premium</p>
            </div>
            <div className="sidehome">
                <FaYoutube className='homeIcon' style={{color:'red'}}/>
                <p style={{fontSize:'14px'}}>YouTube Studios</p>
            </div>
            <div className="sidehome">
                <FaYoutube className='homeIcon' style={{color:'red'}}/>
                <p style={{fontSize:'14px'}}>YouTube Music</p>
            </div>
            <div className="sidehome">
                <FaYoutube className='homeIcon' style={{color:'red'}}/>
                <p style={{fontSize:'14px'}}>YouTube Kids</p>
            </div>
            <hr/>
            <div className="sidehome">
                <FontAwesomeIcon icon={faGear} className='homeIcon'/>
                <p style={{fontSize:'14px', color:'white'}}>Settings</p>
            </div>
            <div className="sidehome">
                <FontAwesomeIcon icon={faFlag} className='homeIcon'/>
                <p style={{fontSize:'14px'}}>Report history</p>
            </div>
            <div className="sidehome">
                <FontAwesomeIcon icon={faCircleQuestion} className='homeIcon'/>
                <p style={{fontSize:'14px'}}>Help</p>
            </div>
            <div className="sidehome">
                <FaExclamation className='homeIcon'/>
                <p style={{fontSize:'14px'}}>Feedback</p>
            </div>
            <hr/>
          </div>
        </nav>
        <div className={sidebar ? 'overlay active' : 'overlay'} onClick={toggleSlidebar}></div>
        </>
    )
}

export default Header;