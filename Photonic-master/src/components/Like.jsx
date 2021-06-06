import React, { Component } from 'react'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

export default class Like extends Component {
    state={
        likes:0
    }
    addLikes = () =>{
        let newCount = this.state.likes+1;
        this.setState({
            likes:newCount
        });
    }
    render() {
        const likes = this.state.likes;
        if(likes === 0){
            return(
                <div className="post-thumpUp">
                    <button onClick={this.addLikes} style={{backgroundColor:'black',borderStyle:"none"}}>
                    <ThumbUpIcon style={{color:'black'}}/>
                    </button>
                </div>
            );
        }
        if(likes === 1){
            return(
                <div>
                    <button onClick={this.addLikes} style={{backgroundColor:'black',borderStyle:"none"}}>
                    <ThumbUpIcon style={{color:'black'}}/>
                    </button>
                </div>
            );
        }
        if(likes > 1){
            return (
                <div>
                    <button onClick={this.addLikes} style={{backgroundColor:'black',borderStyle:"none"}}>
                    <ThumbUpIcon style={{color:'black'}}/>
                    {" "}
                    {likes}
                    </button>
                   
                </div>
            )
        }

    }
}
