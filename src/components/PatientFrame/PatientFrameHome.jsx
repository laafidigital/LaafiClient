import React, { useEffect } from 'react'
import PatientNavpad from './PatientNavpad'
import patientdashimg from '../../assets/patientdashimg.jpg'
import { Navigate, Outlet, useParams } from "react-router-dom";
import Unauthorized from '../Admin/Unauthorized';


const PatientFrameHome = () => {
  
  const unauthorized=Unauthorized.Unauthorized()

  return (
    <div>
      {unauthorized ? (
        <>
         <PatientNavpad/>
         <div className="Home_maindiv">
          {/* <div className="Home_maindiv" style={{ position: "relative" }}> 
              <img src={docframedashimg} alt="New Home Background" className='dashimage' />
          </div> */}
          <div className='docouletdiv'>
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

export default PatientFrameHome