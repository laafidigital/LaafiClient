import React from 'react'
import { Navigate, Outlet, useParams } from "react-router-dom";
import labdashimg from '../../assets/labdashimg.jpg'
import Labnavbar from './Labnavbar';
import Unauthorized from '../Admin/Unauthorized';

const LabHome = () => {

  const unauthorized=Unauthorized.Unauthorized()
  return (
    <div>
      {unauthorized ?(
        <>
         <Labnavbar/>
        <div className="Home_maindiv">
           <div className="Home_maindiv" style={{ position: "relative" }}> 
             <img src={labdashimg} alt="New Home Background" className='dashimage' />
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

export default LabHome