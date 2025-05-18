
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { useEffect } from 'react';
import { useState } from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import InputBase from '@mui/material/InputBase';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../Store/NurseFrame/SearchNavSlice';
import { jwtDecode } from 'jwt-decode';
import laafilogo from '../../assets/Logos/laafiheader_transparentlogo.png'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Drawer, FormControl, MenuItem, Select ,InputLabel, Button,ClickAwayListener, ListItemIcon, ListItemButton } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import ArticleIcon from '@mui/icons-material/Article';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { resetroledata, setemptyuserdataupdate } from '../Store/LoginSlice';
import { StyledAppbar } from '../../Styles/Appbar';
import { TransparentDrawer } from '../../Styles/Drawer';
import navlog from '../../assets/Logos/laafi_logo_horizontal-light_504X251_invert.jpg'
import { resetError } from '../Store/ErrorSlice';
import { GiMedicalDrip } from "react-icons/gi";
import VaccinesIcon from '@mui/icons-material/Vaccines';
import EditNoteIcon from '@mui/icons-material/EditNote';
import logo from '../../assets/Logos/laafi_logo_horizontal-light_504X251_colored.jpg'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { setaddscheduleDialoge, setscheduleDialoge } from '../Store/Doctor/AddDoctorSlice';
import AddSchedule from '../Admin/Doctor/AddSchedule';



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
  

const DocNavpad = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const seachvalue=useSelector((state)=>state.SearchNurse.searchValue)
  const addscheduleDialoge=useSelector((state)=>state.Adddoctor.addscheduleDialoge)
  const loggeddata=useSelector((state)=>state.Loggedpatient.loggedpatientdata)
  const alldata=useSelector((state)=>state.logindetails.logindata)
  const userlogindata=useSelector((state)=>state.logindetails.userdetailsfordashboard)
  
  const {id}=useParams()
  const {pathname}=useLocation()
  const homeIndex = pathname.indexOf('/doctor/');
  const idParam = homeIndex !== -1 ? pathname.substring(homeIndex + 8) : undefined;
  const Id=idParam && id ? parseInt(idParam) : undefined
  const token=localStorage.getItem('accessToken')

  const [kycverified,setkycverified]=useState(false)
  const [drawerOpen, setdrawerOpen] = useState(false);
  const [userdetails,setuserDetails]=useState({name:''})

  

  
  useEffect(()=>{
   if(token){
     const decodetoken=jwtDecode(token)
     if(decodetoken.KycStatus==="Completed"){
      setkycverified(true)
     }
     else{
      setkycverified(false)
     }
    
     setuserDetails({name:decodetoken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']})
   }
  },[token])
  
  
 

    const[searchValue,SetsearchValue]=useState({})
    const [DrawerOpen,setDrawerOpen]=useState(false)
    const [profileview,setprofileview]=useState(false)

    const handleOpenDrawer=()=>{
        setdrawerOpen(!drawerOpen)
    }
    const closedDrawer=()=>{
        setDrawerOpen(false)
    }

     const handleSearchChange=(e)=>{
      const {name,value}=e.target
      dispatch(setSearchValue({name,value}))

         if(e.target.value==''){
          navigate('doctordashboard')
         }
         else{
          navigate(`doctordashboard/dashboard/${e.target.value}`)
         }
     }
  return (
    <nav className='navbar'>
      <div className='logo_div'>
        <img src={laafilogo}/>
      </div>
      <div className='menu_div'>
        <button onClick={()=>navigate('doctordashboard')}>Dashboard</button>
        <button onClick={()=>navigate('mycalendar')}>Calendar</button>
        {/* <button>Manage Patients</button> */}
        {/* <button>Manage Staff</button> */}
        {/* <button>Settings</button> */}
      </div>
      <div className='user_div'>
        <p>Hello Doctor {userdetails &&  (`${userdetails.name}`)}!</p>
        <button onClick={()=>{
              dispatch(resetroledata())
              localStorage.clear()
              dispatch(setemptyuserdataupdate())
              navigate('/')}}
              className='listitem ' >
                Logout</button>
      </div>

      <div className='menu_icon'>
        <IconButton onClick={handleOpenDrawer}>
          <MenuIcon />
        </IconButton>
      </div>

      <Drawer anchor='right' open={drawerOpen} onClose={handleOpenDrawer}>
        <div className='drawer_content'>
          <button onClick={handleOpenDrawer}>Dashboard</button>
          {/* <button onClick={handleOpenDrawer}>Manage Patients</button> */}
          
          {/* <button onClick={handleOpenDrawer}>Manage Staff</button> */}
          {/* <button onClick={handleOpenDrawer}>Settings</button> */}
          <button onClick={handleOpenDrawer}>Logout</button>
        </div>
      </Drawer>
    {/*old code*/}
    {/* <Box sx={{ flexGrow: 1 }}>
      <StyledAppbar position="static" color='inherit'>
        <Toolbar>
            <div className='logodiv'>
            <img src={navlog} className={DrawerOpen? 'navlogostrech' : 'navlogo'}/>
          </div>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Patient Records"
              name='search'
              inputProps={{ 'aria-label': 'search' }}
              disabled={!kycverified}
              value={searchValue.search}
              onChange={handleSearchChange}   
            />
          </Search>
          {profileview &&(
            <div className='profilediv'
            >
            <div>
            <ArrowDropUpIcon style={{marginTop:'-30px',marginLeft:'206px'}}/>
            <div className='d-flex justify-content-between'>
              <img src={logo} style={{width:'80px'}}/> 
              <IconButton  onClick={()=>setprofileview(false)}>
                  <CloseIcon/>
              </IconButton>
            </div>
            <List >
              <ListItem disablePadding>
                <ListItemButton  className='profile_mainiconndiv'>
                  <ListItemIcon>
                    <AccountCircleRoundedIcon  style={{width:'100px',height:'50px'}}/>
                  </ListItemIcon>
                  <ListItemText primary={localStorage.getItem('name')} primaryTypographyProps={{ style: { color: 'black' } }}/>
                </ListItemButton>
              </ListItem>
              <hr></hr>
              <ListItem disablePadding onClick={()=>navigate('profile/editprofile')}>
                <ListItemButton  className='profile_main'>
                  <ListItemIcon>
                    <EditNoteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Edit " primaryTypographyProps={{ style: { color: 'black' } }}/>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton  className='profile_main'
                onClick={() => {
                  localStorage.clear();
                  dispatch(resetroledata())
                  dispatch(resetError())
                  navigate('/');
                 }}>               
                    <ListItemIcon>
                      <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sign out" primaryTypographyProps={{ style: { color: 'black' } }}/>
                </ListItemButton>
              </ListItem>
            </List>
            </div>
          </div> 
          )} 
           <div className='pl-4'>
            <div className='d-flex'>
              <div>
                <IconButton onMouseEnter={()=>setprofileview(true)}>
                  <AccountCircleRoundedIcon className='mt-2' style={{color:'white'}} />
                </IconButton>
              </div>
            </div>
        </div>
        </Toolbar>
      </StyledAppbar>

      <TransparentDrawer anchor="left" open={DrawerOpen} onClose={()=>setDrawerOpen(!DrawerOpen)} variant="permanent">
        <div className='Drawer'>
          <div className='d-flex' style={{justifyContent:'end',margin:'5px'}}>
            {!DrawerOpen ?(
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 0,ml:0 }}
              className='button_ouline'
              onClick={handleOpenDrawer}>
              <MenuIcon/>
            </IconButton>
            ):(
            <IconButton onClick={closedDrawer} className='iconbtn' >
              <CloseIcon className='logoutbtn'/>
            </IconButton>
            )}
          </div>
          <List>
          <ListItem button onClick={()=>{navigate('doctordashboard');closedDrawer()}} className='listitem '>
            <DashboardIcon className='mr-2 sub-listitem'/>
            {DrawerOpen &&(<ListItemText primary="Dashboard" />)}
          </ListItem>
          <ListItem button onClick={()=>{navigate('mypatients');closedDrawer()}} className='listitem '>
            <PersonAddAlt1Icon className='mr-2 sub-listitem'/>
            {DrawerOpen &&(<ListItemText primary="Offline Patients" />)}
          </ListItem>
          <ListItem button onClick={()=>{navigate('vedioconfernce');closedDrawer()}} className='listitem '>
            <PersonalVideoIcon className='mr-2 sub-listitem'/>
            {DrawerOpen &&(<ListItemText primary="Online Patients"/>)}
          </ListItem> 
          <ListItem button onClick={()=>{navigate('docinpatient');closedDrawer()}} className='listitem '>
            <VaccinesIcon className='mr-2 sub-listitem'/>
            {DrawerOpen &&(<ListItemText primary="In Patients"/>)}
          </ListItem>
          <ListItem button onClick={()=>{navigate('addarticle');closedDrawer()}} className='listitem '>
            <ArticleIcon className='mr-2 sub-listitem'/>
            {DrawerOpen &&(<ListItemText primary="Add Article"/>)}
          </ListItem>
          <ListItem button onClick={()=>{dispatch(setaddscheduleDialoge(true)) ;closedDrawer()}} className='listitem '>
            <AccessTimeIcon className='mr-2 sub-listitem'/>
            {DrawerOpen &&(<ListItemText primary="Add Schedule"/>)}
          </ListItem>     
         
          <ListItem  
              onClick={()=>{
              dispatch(resetroledata())
              localStorage.clear()
              navigate('/')}}
              className='listitem ' >
              <LogoutIcon
              className='mr-2 sub-listitem'
           /> 
            {DrawerOpen &&(<ListItemText primary="Log Out" /> )} 
          </ListItem>
        </List>
        </div>
        </TransparentDrawer> 

          {DrawerOpen && (
          <Box
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 999,
              }}
              onClick={closedDrawer}
            />
          )}
        </Box>
        {addscheduleDialoge &&(
          <AddSchedule data={''}/>
        )} */}
        </nav>
 
  )
}

export default DocNavpad