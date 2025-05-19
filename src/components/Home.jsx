import React from "react";
import Navpad from './Navpad'
import dashboardimage from '../assets/newdashboard.jpg'
import labimage from '../assets/labdashimg.jpg'
import { Navigate, Outlet } from "react-router-dom";
import Unauthorized from "./Admin/Unauthorized";
import { Dialog } from "@mui/material";
// import usewindowSize from "../hooks/usewindowSize";




function NavScrollExample() {

  const unauthorized=Unauthorized.Unauthorized()

  
  return (
    <div >
      {unauthorized ?(
        <>
        <Navpad/>
        <div className="Home_maindiv">
          <div className="Home_maindiv" style={{ position: "relative" }}> 
             {/* <img src={labimage} alt="New Home Background" className='dashimage' /> */}
          </div>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 ,marginTop:'20px'}}>
             <Outlet />
             
          </div>
       </div>
        </>
      ):(
        <Navigate to={'/'}/>
      )}
      
     </div>
  );
}

export default NavScrollExample;