import React from 'react';
import LogoChat from '../styleapp/icons/LogoChat.png'
// import Avataricon from "@material-ui/core/Avatar";
import SearchIcon from '@material-ui/icons/Search';
import '../styleapp/LogoHeader.css'
import AccountBoxIcon from '@material-ui/icons/AccountBox';

function LogoHeader() {

    return (
        <div className="header">
            <img src={LogoChat} 
                alt="LogoChat" 
                id="LogoChat"/>
                {/* <h1 id="photonicLogo">Photonic</h1> */}
                
            <div className="search-icon">
                <input 
                    type="text" 
                    id="userinput"
                    placeholder="Find user..."
                    className="post-search"
                        
                    // <SearchIcon
                    // className="post-search"
                    // alt={''}
                    // src="" />
                />
                </div>
                {/* <div className="avatar-header"> */}
               {/* <AccountBoxIcon 
                    {/* <AccountBoxIcon 
                    fontSize="large"
                    className="header-avatar"
                    alt={''}
                    src="/static/images/avatar/1.jpg"
                />*/}
            {/* </div> */}
        </div>
    )
}

export default LogoHeader
