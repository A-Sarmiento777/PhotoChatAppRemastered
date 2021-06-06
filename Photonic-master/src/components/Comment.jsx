import { Button } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import React,{ useEffect, useState } from 'react';
import { useHistory, useParams, Link, useLocation } from 'react-router-dom';
import mongoosy from 'mongoosy/frontend';
import '../styleapp/comments.css';
const { Photo, User } = mongoosy;

const CommentRow =(props) => {
    const {parentIdPost,name,idPost,sent,text}=props

    

if(idPost==parentIdPost){

    return <div className="comments_list">        
        <p>{name}</p>
        <p>{text}</p>
        <p>{sent}</p>
    </div>
}
    
    return <div/>
    
}

const {
    Message, Login
} = mongoosy;


const Comments = (props) => {
    const {author, imageUrl, photoId} = props
    console.log(props)


    let location = useLocation();
    let imgSrc = location.state && location.state.photoUrl;
    
    

    const { id, user, url, name,testvalue } = useParams();
    
    
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    

    const getAllComments=async ()=>{
        let messages = await Message.find( );                
        //console.log("messages",messages)
        setComments(messages)
        
    }

    
    useEffect( () => {       
        getAllComments()        
    },[]);

    useEffect( () => {       
        const interval = setInterval(() => {
            getAllComments()
          },  1000  );         
          return () => clearInterval(interval);
    },[]);
    

    

    const addComment = async () => {

        if( newComment === '' )
        { return; }
     
            
        let loginuser = await Login.check();
        

        let newMessage = new Message ({
            text: newComment,
            author: loginuser._id,
            name: loginuser.name,
            idPost: id
            
        }) 
        await newMessage.save();
        setNewComment("")
    }

    return(
        <div className="container_com">
            <div className="container_body">
                <div className="div_image_com">
                    <img 
                        className="imagen_com"
                        src={'/uploads/' + imgSrc}                    
                        alt="picture"
                    />
                </div> 
                
                <div className="comments">
                    {comments.map((c,idx)=>{

                        return <><CommentRow parentIdPost={id} {...c} /></>
                    }
                    )}
                  
                    <div className="comments_input">
                        <input
                            className="input_com"
                            type="text"
                            value={newComment}
                            onChange={ (event) => setNewComment( event.target.value ) }
                            placeholder="Write a Comment"
                            autoFocus
                        />                    
                        <Button className="btn_com" onClick={ () => addComment() }> Send </Button>
                    
                        <Link className="back_com" to={"/homepage"}>
                            <ArrowBackIosIcon color="secondary"  title="Back"/>
                        </Link>
                    
                    </div>
                </div>    
            </div>                 
        </div>
    )
}

export default Comments;