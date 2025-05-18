import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import NurseNavpad from './NurseNavpad';
import docframedashimg from '../../assets/docframdashimg.jpg'
import Unauthorized from '../Admin/Unauthorized';


const DoctorHome = () => {

  const unauthorized=Unauthorized.Unauthorized()

      
  return (
    <div>
      {unauthorized ?(
        <>
         <NurseNavpad/>
        <div className="Home_maindiv">
          <div className="Home_maindiv" style={{ position: "relative" }}> 
              <img src={docframedashimg} alt="New Home Background" className='dashimage' />
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

export default DoctorHome