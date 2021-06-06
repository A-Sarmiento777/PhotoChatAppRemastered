import React,{useEffect, useState} from 'react';
import mongoosy from 'mongoosy/frontend';
const { User, Photo } = mongoosy;
import PhotoPost from './PhotoPost';


const Photos = () => {
    const [allPhotos, setAllPhotos]=useState([]);
    let [count, setCount]=useState(0)

    
    const getAllPhotos=async ()=>{
        let photos=await Photo.find();
        photos.sort((a, b) => a.posted > b.posted ? -1 : 1);
        console.log(photos);
        setAllPhotos(photos)
        
    }

    useEffect(() => {
        getAllPhotos();
    }, [])

    return (
        <div>
             {allPhotos.map(photo =>
             <PhotoPost 
                 key={photo._id}
                 url={photo.url}
                 authorName={photo.authorName}
                 author={photo.author}
                 description={photo.description}
                 likes={photo.likes}
                 tags={photo.tags}
                 time={photo.posted}
             />)}
        </div>
    )
}

export default Photos
