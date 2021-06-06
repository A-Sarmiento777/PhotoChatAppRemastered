import React,{useEffect, useState} from 'react';
import mongoosy from 'mongoosy/frontend';
const { User, Photo } = mongoosy;
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import DeleteIcon from '@material-ui/icons/Delete';
import LastPosted from '../components/LastPosted'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Avataricon from "@material-ui/core/Avatar";
import '../styleapp/HomePage.css'
import {Link,useParams} from "react-router-dom"
import Like from '../components/Like'
import Comment from '../components/Comment'

const Photos = ({name}) => {
    const [allPhotos, setAllPhotos]=useState([]);
    let [count, setCount]=useState(0)
    const getAllPhotos=async ()=>{
        let photos=await Photo.find();        
        photos.sort((a, b) => a.posted > b.posted ? -1 : 1);        
        setAllPhotos(photos)   
    }
    useEffect(() => {
        getAllPhotos();
    }, [])

    
    // const handleLikes=()=> {
    //     count++;
    //     setCount(count);
    //     console.log(`icon is clicked ${count} times`)
    // }
    const renderUpdate=(authorName, url, id)=> {
        //alert(JSON.stringify({authorName, url, id},null,2))
        console.log(authorName, url, id)
        const someCondition = true;
    
        if (someCondition) {
          return  <Comment author={authorName} imageUrl={url} photoId={id} />
        }
    
        return null
      }
                  
    return (
        <div className="feed">
            <div className="post">
                
             {allPhotos.map(photo => <div key={photo.url}>

                <div className="post-header">
                <Link to={`/uploads/${photo["author"]}`}>
                    <Avataricon
                    className="post-avatar"
                    alt={photo.authorName}
                    src="/static/images/avatar/1.jpg"
                    />
                </Link>
                    <h3 className="post-text-user">{photo.authorName}</h3>
                </div>
                <img 
                    src={'/uploads/' + photo.url} 
                    className="post-image"
                    alt="picture"
                />

                <div className="post-icons">
                    <div className="post-commentIcon">  
                    
                    <Link  
                     to={{
                        pathname:`/comments/${photo._id}`,
                      
                        state: { photoUrl:photo.url }
                      }}
                    >
                        
                        <ChatBubbleOutlineIcon
                            alt={''}
                            src=""
                        />
                    </Link>
                    </div>
                    <Like/>
                    
                </div>
               
                
               <h4 className="post-text"><strong className="post-strong-text">{photo.authorName} </strong>{photo.description}</h4>

                <h4 className="post-tags">{photo.tags}</h4>

                <div className="post-date">
                    <LastPosted 
                    className="posted"
                    date={photo.posted} />
                
                </div>

                <hr/>        
            </div>)}
        </div>
    </div>
    )
}

export default Photos
