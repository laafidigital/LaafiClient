import React, { useEffect } from 'react'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import TvIcon from '@mui/icons-material/Tv';
import { useState } from 'react';
import { Drawer, FormControl, MenuItem, Select ,InputLabel, Button,ClickAwayListener, ListItemIcon, ListItemButton } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useDispatch, useSelector } from 'react-redux';
import { setprofiledata } from '../Store/ProfileSlice';
import Dashboard from '@mui/icons-material/Dashboard';
import { resetroledata, setemptyuserdataupdate } from '../Store/LoginSlice';
import { StyledAppbar } from '../../Styles/Appbar';
import { TransparentDrawer } from '../../Styles/Drawer';
import { resetError } from '../Store/ErrorSlice';
import navlog from '../../assets/Logos/laafi_logo_horizontal-light_504X251_invert.jpg'
import { SlChemistry } from "react-icons/sl";
import ScienceIcon from '@mui/icons-material/Science';
import EditNoteIcon from '@mui/icons-material/EditNote';
import logo from '../../assets/Logos/laafi_logo_horizontal-light_504X251_colored.jpg'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import applogo from '../../assets/Logos/laafi_logo_icon_485X435_invert.jpg'
import laafilogo from '../../assets/Logos/laafiheader_transparentlogo.png'
import { jwtDecode } from 'jwt-decode';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
  
 
const AdminNavpad = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    
    const loggeddata=useSelector((state)=>state.Loggedpatient.loggedpatientdata)
    const alldata=useSelector((state)=>state.logindetails.logindata)
    const userlogindata=useSelector((state)=>state.logindetails.userdetailsfordashboard)

    const {id}=useParams()
    const {pathname}=useLocation()
    const homeIndex = pathname.indexOf('/patient/');
    const idParam = homeIndex !== -1 ? pathname.substring(homeIndex + 9) : undefined;
    const Id=idParam && id ? parseInt(idParam) : undefined
    const [loggedperson,setloggedperson]=useState()
    const [userdetails,setuserDetails]=useState({name:''})

    const token=localStorage.getItem('accessToken')

    const [profileview,setprofileview]=useState(false)

    useEffect(()=>{
      if(token){
        const decodetoken=jwtDecode(token)
       
        setuserDetails({name:decodetoken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']})
      }
     },[token])
    
    
    const[searchValue,SetsearchValue]=useState({})
    const [DrawerOpen,setDrawerOpen]=useState(false)
    const [drawerOpen, setdrawerOpen] = useState(false);
    const handleOpenDrawer=()=>{
        setDrawerOpen(true)
    }
    const closedDrawer=()=>{
        setDrawerOpen(false)
    }

     const handleSearchChange=(e)=>{
      
      if(e.target.value==''){
        navigate('./dashboard')
       }
       else{
        navigate(`dashboard/${e.target.value}`)
       }
     }

     
  return (
    <nav className='navbar'>
      <div className='logo_div'>
        <img src={laafilogo}/>
      </div>
      <div className='menu_div'>
        <button >Dashboard</button>
        <button >Reports</button>
        <button >Users</button>
        <button >Settings</button>

      </div>
      <div className='user_div'>
        <p>Hello {userdetails &&(userdetails.name)}!</p>
        <button onClick={()=>{
              dispatch(resetroledata())
              localStorage.clear()
              dispatch(setemptyuserdataupdate())
              navigate('/')}}
              className='listitem ' >
                Sign out</button>
      </div>

      <div className='menu_icon'>
        <IconButton onClick={handleOpenDrawer}>
          <MenuIcon />
        </IconButton>
      </div>

      <Drawer anchor='right' open={drawerOpen} onClose={handleOpenDrawer}>
        <div className='drawer_content'>
          <button onClick={handleOpenDrawer}>Dashboard</button>
          <button onClick={handleOpenDrawer}>Manage Patients</button>
          
          {/* <button onClick={handleOpenDrawer}>Manage Staff</button> */}
          <button onClick={handleOpenDrawer}>Settings</button>
          <button onClick={handleOpenDrawer}>Logout</button>
        </div>
      </Drawer>
      </nav>
 
  )
}

export default AdminNavpad