import React from 'react'
import AllPhotos from '../components/AllPhotos'
import '../styleapp/HomePage.css'
import LogoHeader from '../components/LogoHeader'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'
//import { PostAddSharp } from '@material-ui/icons';

const HomePage = () => {
   const { name } = useParams()
    //console.log(name)
    return (
        <div className="Homepage-feed">
            <LogoHeader/>  
            <div className="Main">
               {/* <AllPhotos name={name}/>  */}  
                <AllPhotos />    
            </div>
            <Footer/>
        </div>
    )
   
}

export default HomePage
