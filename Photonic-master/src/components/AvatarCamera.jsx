import React, { useState, useRef } from 'react';
import Webcam from "react-webcam";
import { useStates, useNamedContext } from 'react-easier';
import mongoosy from 'mongoosy/frontend';
const { User, Photo } = mongoosy;
import '../styleapp/upload-camera.css'
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import SaveAltIcon from '@material-ui/icons/SaveAlt';


const WebcamComponent = () => <Webcam />

const videoConstraints = {
  width: 150,
  height:150,
  facingMode: "user"
};

const AvatarCamera = () => {
        const webcamRef = React.useRef(null);
        const [src,setSrc]=useState('');
        const g = useNamedContext('global');
        const s = useStates({
          users: [],
          imageData: '',
        });
        const capturedImg=useRef();
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
            url: src
          });
          await photo.save();
          console.log('hello from upload')
          g.photos=[...g.photos,photo]
          console.log(capturedImg.current)
        }
     
  return (
    <div className="camera-wrapper">
        {src==''
        ? ( <div>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="avatar-camera"
          />
           </div>)
        : (<img src={src} ref={capturedImg} id='captured-avatar'/>)}


        <div className="avatar-icons">
            {src!=''
            ?
                (<button onClick={(e)=>
                    {
                    e.preventDefault();
                    setSrc('')
                    }} 
                    id='retake-button'>Retake</button>)
                :
                (<CameraAltIcon 
                onClick={(e)=>{
                e.preventDefault();
                capture()}}
                style={{color:'teal'}} 
                id='capture-icon'/>)
            }  
            <SaveAltIcon onClick={uploadPhoto} style={{color:'teal'}} />
        </div>
    </div>)
}

export default AvatarCamera;