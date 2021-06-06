import React from 'react'
import '../styleapp/Footer.css'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
// import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import HomeIcon from '@material-ui/icons/Home';
import {Link} from 'react-router-dom'
import AccountBoxIcon from '@material-ui/icons/AccountBox';




function Footer() {
    return (
        <div className="footer">
        

            <Link to="/homepage"> 
                <div className="footer-icons">
                    <HomeIcon
                    className="footer-pics"
                    alt={''}
                    src=""
                    />
                </div>
            </Link>  

           
            <Link to="/camera">
            <div className="footer-icons">
            <PhotoCameraIcon
                className="footer-camera"
                alt={''}
                src=""

                />
            </div>
            </Link> 
            <Link to="/upload"> 
                <div className="footer-icons">
                    <CropOriginalIcon
                    className="footer-pics"
                    alt={''}
                    src=""
                    />
                </div>
            </Link>    

                
            <Link to={`/uploads/`}>
                <div className="footer-icons">
            <AccountBoxIcon
                className="footer-profile"
                alt={''}
                src=""
            />
            </div>
            </Link>

        </div>
    )
}

export default Footer