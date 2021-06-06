import React,{useEffect, useState} from 'react';
import mongoosy from 'mongoosy/frontend';
const { User, Photo } = mongoosy;
import AllPhotos from '../components/AllPhotos'
import Avataricon from "@material-ui/core/Avatar";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import DeleteIcon from '@material-ui/icons/Delete';
import LastPosted from '../components/LastPosted'
import '../styleapp/Post.css'
import PhotosPage from './PhotosPage';


const Post = ({userName, photos}) => {

    return (

    <div className="feed">

         <div className="post">

            <div className="post-header">
                <Avataricon
                    className="post-avatar"
                    alt={''}
                    src="/static/images/avatar/1.jpg"
                />
                <h3>{photo.authorName}</h3>
            </div>

            <img 
                className="post-image"
                src={'/uploads/' + photo.url}
                alt="picture"
                />
    
            <h4 className="post-text"><strong>{photo.authorName}</strong>{photo.description}</h4>
            <h4 className="post-likes">{count} likes</h4>
            <h4 className="post-tags">{tags}</h4>
            <p>{photo.tags}</p>
            <LastPosted date={photo.posted} />


            <div className="post-icons">   
                <FavoriteBorderIcon
                    className="post-heartIcon"
                    alt={''}
                    src=""
                />
                <ChatBubbleOutlineIcon
                    className="post-commentIcon"
                    alt={''}
                    src=""
                    onclick={""}
                />
            </div>
        </div>
    </div>
        
    )
}

export default Post

