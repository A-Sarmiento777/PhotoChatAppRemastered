import React, {useState, useEffect, useContext} from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import LastPosted from './LastPosted'
import mongoosy from 'mongoosy/frontend';
const { User, Photo } = mongoosy;


const PhotoPost = ({url,authorName,description,likes,tags,time}) => {
    

    return (
        <div >
            <h4>created by: {authorName}</h4>
            <img src={'/uploads/' + url} style={{width:'100%'}}/>
            <FavoriteBorderIcon />
            <span>{likes} likes</span>
            <p>{authorName}: {description}</p>
            <p>{tags}</p>
            <LastPosted date={time} />
            <DeleteIcon />
            <hr/>      
        </div>
        
    
        )

}

export default PhotoPost;
