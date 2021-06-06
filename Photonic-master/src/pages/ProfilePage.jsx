import React from 'react'
import mongoosy from 'mongoosy/frontend';
import HeaderAllPages from '../components/HeaderAllPages';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Footer from '../components/Footer';
import '../styleapp/upload-camera.css';
 import '../styleapp/Footer.css';
import '../styleapp/LogoHeader.css';
import '../styleapp/ProfilePage.css';
const { Photo, User } = mongoosy;
import { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import {Link} from 'react-router-dom';
import LastPosted  from '../components/LastPosted'
import Like from '../components/Like'

const ProfilePage = () => {
  const [photos, setPhotos] = useState()
  const [profile, setProfile] = useState()
   const {id} = useParams()

    //console.log(id)

    //"60b61518865850152fa74e32"
     
    useEffect(() => {
       getSingleAuthorId(id);
     }, []);
     
     
      const getSingleAuthorId = async(userId) => {
      const photos = await Photo.find({author:userId}).populate('author')
      const author = await User.findById(userId)
        setProfile(author)
        setPhotos(photos)

       console.log(author)
       console.log(photos)
     
    }
   
    return (
   <>  

   <HeaderAllPages  />
   <div className="title"><title>My Posts</title></div>
   
   <div className="button-back">
      <Link to={'/homepage'}><button>&larr; Back</button></Link>
      </div>
      {profile && photos && photos.map((phot) =>(

   <div className="profile">
      <h3>{profile.name}</h3>
      <img src={phot.url}/> 
      <span className="postdate"><LastPosted date={phot.posted}/></span>

      <span className="postcoment">{phot.description}</span> 
      <br/>
      <div className="likeIcon">
         {/* <ThumbUpIcon/> <span className="likes">{phot.likes}</span>  */}
         <Like/>
         
      </div>
             
    </div>
))}

<Footer />
</>)


}         
export default ProfilePage

