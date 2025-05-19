import React, {useEffect, useState} from 'react'
import Header from './Header'
import carosalimage1 from '../assets/landingPage/section1/carosalimage1.jpeg'
import CarosalSection from './Body/CarosalSection'
import AboutLaafi from './Body/AboutLaafi'
import Whatweoffer from './Body/Whatweoffer'
import Doctors from './Body/Doctors'
import Latestupdate from './Body/Latestupdate'
import Ourproducts from './Body/Ourproducts'
import npmFooter from './Footer'
import scripts from '../../package.json'
import DownloadLinks from './Body/DownloadLinks'
import Footer from './Footer'

const LandingIndex = () => {
  
  
  return (
    <div>
        <Header/>
        <CarosalSection/>
        <AboutLaafi/>
        <Whatweoffer/>
        <Doctors/>
        <Latestupdate/>
        {/* <Ourproducts/> */}
        <DownloadLinks/>
        <Footer/>
    </div>
  )
}

export default LandingIndex
