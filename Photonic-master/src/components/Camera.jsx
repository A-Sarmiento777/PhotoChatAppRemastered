import React, { useState, useRef } from 'react';
import Webcam from "react-webcam";
import {useHistory} from 'react-router-dom'
import { useStates, useNamedContext } from 'react-easier';
import mongoosy from 'mongoosy/frontend';
const { User, Photo } = mongoosy;
import '../styleapp/upload-camera.css';
import HeaderAllPages from './HeaderAllPages';
import Footer from './Footer';

const WebcamComponent = () => <Webcam />

const videoConstraints = {
  width: 100+'%',
  height: 100+'%',
  facingMode: "user"
};

const Camera = ({userName}) => {
        const webcamRef = React.useRef(null);
        const [src,setSrc]=useState('');
        const g = useNamedContext('global');
        const s = useStates({
          users: [],
          imageData: '',
          tags:'',
          description:'',
          posted: ''
        });
        const capturedImg=useRef();
        const history=useHistory();
        const capture = React.useCallback(
            () => {
            const imageSrc = webcamRef.current.getScreenshot();
            console.log(imageSrc)
            setSrc(imageSrc)
            },
            [webcamRef],
        );
       
        const uploadPhoto = async e => {
          e.preventDefault();
          if (!src) { return; }
          let photo = new Photo({
            author: g.user._id,
            authorName:g.user.name,
            url: src,
            description:s.description,
            tags:s.tags
          });
          await photo.save();
          console.log('hello from upload')
          g.photos=[...g.photos,photo]
          capturedImg.current.style.display='none';
          console.log(capturedImg.current)
          history.push('/homepage')
        }
        const handleDescriptionChange=(e)=>{
          s.description=e.target.value;
      }
        const handleTags=(e)=>{
          s.tags=e.target.value;
      }
     
  return (
    <>
    <HeaderAllPages/>
    <div className="camera-container">
        {src==''
        ? (<Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="camera"
          />)
        : (<img src={src} ref={capturedImg} className="captured-photo"/>)}
        <div className="captured-photo-information-wrapper">
          <div>
            <textarea
              name="description" 
              placeholder="what's in your mind..." 
              onChange={handleDescriptionChange}
              className="camera-description-input"
            />
          </div>
          <div>
              <textarea 
                type="text"
                name="tags"
                placeholder="Tags"
                onChange={handleTags}
                className="camera-tags-input"
              />
          </div>

          {src!=''
          ?
            (<button onClick={(e)=>
            {
            e.preventDefault();
            setSrc('')
            }}
            className="webcam-btn-retake">
            Retake</button>)
            :
            (<button onClick={(e)=>{
            e.preventDefault();
            capture()}}
          className="webcam-btn">Capture</button>)
          }  
        <br />
        <form name="photoUpload" onSubmit={uploadPhoto}>
          {s.imageData && <img src={src} width="300" className="captured-photo"/>}
          
          <button type="submit" className="camera-publish-button">Publish</button>
        </form>
     
      </div>
    </div>
    <Footer/>
    </>)
}

export default Camera;
