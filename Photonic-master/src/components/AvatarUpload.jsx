import React, { useEffect, useRef } from 'react';
import { Style, useStates, useNamedContext } from 'react-easier';
import {useHistory} from 'react-router-dom'
import mongoosy from 'mongoosy/frontend';
const { User, Photo } = mongoosy;
import '../styleapp/upload-camera.css'
import AvatarPlaceholder from '../styleapp/icons/avatar-placeholder.png'
import AddIcon from '@material-ui/icons/Add';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

const AvatarUpload=()=>{
  const g = useNamedContext('global');
  const s = useStates({
    users: [],
    imageData: '',
  });
  const chosenImg=useRef()
  const placeholderPhoto=useRef()
  const history = useHistory();
  
  const getUsers = async () => {
    s.users = await User.find();
  }
  useEffect(() => getUsers(), []);

  const photoChosen = () => {
    let file = document.forms.photoUpload.file.files[0];
    if (!file) { return; }
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      s.imageData = reader.result;
    }, false);
    reader.readAsDataURL(file);
    placeholderPhoto.current.style.display="none";
  }

  const uploadPhoto = async e => {
    e.preventDefault();
    if (!s.imageData) { return; }
    let photo = new Photo({
      author: g.user._id,
      authorName:g.user.name,
      url: s.imageData,
    });
    let result=await photo.save();
    g.photos=[...g.photos,photo]
    chosenImg.current.style.display='none';
  }
return (
        <div className='upload-photo-wrapper'>
            <form name="photoUpload" onSubmit={uploadPhoto} className="upload-form">
                
                {s.imageData && <img src={s.imageData} ref={chosenImg} className="avatar-photo"/>}
                {!s.imageData && <img src={AvatarPlaceholder} alt="placeholder" ref={placeholderPhoto} className="avatar-placeholder"/>}
                <div>
                    <label htmlFor="files" ><AddIcon /></label>
                    <input name="file" type="file" id="files"
                        accept="image/*" onChange={photoChosen} style={{display:'none'}} className="upload-input"/>
                </div>
                <button type="submit" ><SaveAltIcon style={{backgroundColor:'black', border:'none'}}/></button>
            </form>
        </div>)
}

export default AvatarUpload
