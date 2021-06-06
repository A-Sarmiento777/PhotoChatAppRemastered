import React from 'react'
import Photos from '../components/Photos'

const PhotosPosts = ({userName, photos}) => {
    let today = new Date();
    let timeNow= today.getHours() + ":" + today.getMinutes()
    return (
        <div>
            <Photos photos={photos} userName={userName} time={timeNow}/>
        </div>
    )
}

export default PhotosPosts
