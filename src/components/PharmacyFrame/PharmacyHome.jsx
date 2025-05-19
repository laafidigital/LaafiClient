import React from 'react'
import PharmacyNavbar from './PharmacyNavbar'
import pharmecydashimg from '../../assets/pharmacydashimg.jpg'
import { Navigate, Outlet, useParams } from "react-router-dom";
import Unauthorized from '../Admin/Unauthorized';

const PharmacyHome = () => {
   const unauthorized=Unauthorized.Unauthorized()
  return (
    <div>
        {unauthorized ? (
          <>
           <PharmacyNavbar/>
        <div className="Home_maindiv">
          <div className="Home_maindiv" style={{ position: "relative" }}> 
             <img src={pharmecydashimg} alt="New Home Background" className='dashimage' />
          </div>
         <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
          <Outlet />
         </div>
       </div>
          </>
        ):(
          <Navigate to={'/'}/>
        )}
       
    </div>
  )
}

export default PharmacyHome