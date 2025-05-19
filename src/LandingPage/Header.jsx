import { Drawer, IconButton } from '@mui/material'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import laafilogo from '../assets/Logos/laafiheader_transparentlogo.png'
import { useNavigate } from 'react-router-dom';
import { LuLogIn } from "react-icons/lu";

const Header = () => {
    const navigate=useNavigate()
    const[drawerOpen,setdrawerOpen]=useState(false)

    const handleOpenDrawer=()=>{
        setdrawerOpen(!drawerOpen)
        navigate('login')
    }
  return (
    <nav className='navbar'>
    <div className='logo_div'>
      <img src={laafilogo}/>
    </div>
    <div className='menu_div'>
      {/* <button onClick={()=>navigate('login')} >Dashboard</button> */}
      <button onClick={()=>navigate('login')}>View Doctor</button>
      <button onClick={()=>navigate('login')}>Book Consultation</button>
      <button onClick={()=>navigate('pricing')}>Pricing</button>
      <button onClick={()=>navigate('refund')}>Refund Policy</button>
      {/* <button>Manage Staff</button> */}
    </div>
    <div className='nav_btn_div'>
      <button className='landing_login_btn1'  onClick={()=>navigate('login')}><LuLogIn/> Login</button>
      <button className='landing_login_btn2 ' onClick={()=>navigate('login')} >Signup</button>
    </div>

    <div className='menu_icon'>
      <IconButton onClick={()=>setdrawerOpen(!drawerOpen)}>
        <MenuIcon />
      </IconButton>
    </div>

    <Drawer anchor='right' open={drawerOpen} onClose={()=>setdrawerOpen(!drawerOpen)}>
      <div className='drawer_content'>
        {/* <button >Dashboard</button> */}
        {/* <button onClick={handleOpenDrawer}>Manage Staff</button> */}
        <button onClick={handleOpenDrawer}>View Doctor</button>
        <button onClick={handleOpenDrawer}>Book Consultation</button>
        <button className='landing_login_btn1'  onClick={handleOpenDrawer}><LuLogIn/> Login</button>
        <button className='landing_login_btn2 ' style={{backgroundColor:'#008080'}} onClick={handleOpenDrawer} >Signup</button>
      </div>
    </Drawer>
    </nav>
  )
}

export default Header
