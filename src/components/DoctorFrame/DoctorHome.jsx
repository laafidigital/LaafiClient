import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import DocNavpad from './DocNavpad';
import docframedashimg from '../../assets/docframdashimg.jpg'
import Unauthorized from '../Admin/Unauthorized';

const DoctorHome = () => {
 
  const unauthorized=Unauthorized.Unauthorized()
    
   
  return (
    <div>
      {unauthorized ?(
        <>
        <DocNavpad/>
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

export default DoctorHome