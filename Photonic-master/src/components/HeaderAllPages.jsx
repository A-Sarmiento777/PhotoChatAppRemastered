import React from 'react'
import LogoChat from '../styleapp/icons/LogoChat.png'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import '../styleapp/LogoHeader.css'

function HeaderAllPages() {
    return (
        <div className="header">
            <img src={LogoChat} 
                alt="LogoChat" 
                id="LogoChat"
            />
                
       {/* <div className="avatar-header">
            <AccountBoxIcon 
                    fontSize="large"
                    className="header-avatar"
                    alt={''}
                    src="/static/images/avatar/1.jpg"
                />
            </div>*/}
        </div>
    )
}
export default HeaderAllPages
