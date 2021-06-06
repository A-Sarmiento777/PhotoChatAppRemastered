import React, { useEffect } from 'react';
import { Style, useStates, useNamedContext } from 'react-easier';
import mongoosy from 'mongoosy/frontend';
const { User, Photo } = mongoosy;
import Logo from "./styleapp/icons/LogoChat.png"
import './styleapp/Startpage.css'

export default function StartPage() {
  // LOGIC

  const g = useNamedContext('global');

  const s = useStates({
    users: [],
    chatMessage: '',
    toWhom: '',
    imageData: '',
    display: null
  });

  const getUsers = async () => {
    s.users = await User.find();
    s.display = true;
  }

  // when the StartPage mounts
  useEffect(() => getUsers(), []);

  // show a preview when a photo is chosen
  const photoChosen = () => {
    let file = document.forms.photoUpload.file.files[0];
    if (!file) { return; }
    // convert the file data to a base64-encoded url
    // used for preview and also for saving the photo later
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      s.imageData = reader.result;
    }, false);
    reader.readAsDataURL(file);
  }

  // upload photo
  const uploadPhoto = async e => {
    e.preventDefault();
    // If no photo chosen do nothing
    if (!s.imageData) { return; }
    // Create a new Photo
    let photo = new Photo({
      // (we are not using tag and description fields yet)
      author: g.user._id,
      url: s.imageData
    });
    await photo.save();
  }

  // TEMPLATE
  const render = () => s.display && <Style css={css()}>
  <div className="header_part">
      <img src={Logo} alt="logo" style={{height:60,width:60}}></img>
  </div>
    <h3>Chat</h3>
    <form name="writeInChat">
      <label>To whom:&nbsp;
      <select {...s.bind('toWhom')}>
          {s.users
            .filter(x => x._id !== g.user._id)
            .map((x, i) => <option key={x._id}>{x.name}</option>)}
        </select>
      </label>
      <input type="text" placeholder="Message"
        {...s.bind('chatMessage')} />
      <input type="submit" value="Send" />
    </form>

    <h3>Upload photo</h3>
    <form name="photoUpload" onSubmit={uploadPhoto}>
      <input name="file" type="file"
        accept="image/*" onChange={photoChosen} />
      {s.imageData && <img src={s.imageData} width="300" />}
      <input type="submit" value="Publish photo" />
    </form>
    <hr />
    <div className="footer_part"></div>

    {/* <h2>All photos</h2>
    {g.photos.map(photo => <div key={photo.url}>
      <img src={'/uploads/' + photo.url} />
      <p>By: {photo.author.name}</p>
    </div>)} */}


  </Style>;

  // STYLE
  const css = () => /*css*/`
    label {
      display: block;
      margin-bottom: 20px;
    }
    
    select {
      width: 200px;
    }

    img {
      width: 300px;
      padding: 10px;
    }
  `;

  return render();
}