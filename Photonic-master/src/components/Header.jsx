import React from 'react'
import Logo from '../styleapp/icons/LogoChat.png'
import Group2 from '../styleapp/icons/Group2.png'
import {motion} from 'framer-motion'


function Header() {
    return (
        <div className="head">
        <img src={Group2} alt="group2" id="group2"></img>
        <motion.img 
        animate={{x:100,y:0,opacity:1,scale:1,rotate:360}} 
        transition={{delay:0.2,duration:3,ease:'backInOut'}} 
        src={Logo} alt="logo" id="logo">
        </motion.img>
        <span id="glow">Share Photos & Chat</span>
            
        </div>
    )
}

export default Header
