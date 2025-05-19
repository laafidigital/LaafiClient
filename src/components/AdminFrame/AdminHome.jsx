import React, { useEffect } from 'react'
import { Navigate, Outlet, useParams } from "react-router-dom";
import Unauthorized from '../Admin/Unauthorized';
import AdminNavpad from './AdminNavpad';


const AdminHome = () => {
  
  const unauthorized=Unauthorized.Unauthorized()

  return (
    <div>
      {unauthorized ? (
        <>
         <AdminNavpad/>
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

export default AdminHome