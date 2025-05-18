import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { StyledAppbar } from '../Styles/Appbar';
import { TransparentDrawer } from '../Styles/Drawer';
import { useState } from 'react';
import { Drawer, FormControl, MenuItem, Select ,InputLabel, } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import ArticleIcon from '@mui/icons-material/Article';
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TvIcon from '@mui/icons-material/Tv';
import PaymentIcon from '@mui/icons-material/Payment';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useEffect } from 'react';
import { resetroledata } from './Store/LoginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from './Store/NurseFrame/SearchNavSlice';
import { resetError } from './Store/ErrorSlice';
import { FaUserDoctor } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import navlog from '../assets/Logos/laafi_logo_horizontal-light_504X251_invert.jpg'
import EditNoteIcon from '@mui/icons-material/EditNote';
import logo from '../assets/Logos/laafi_logo_horizontal-light_504X251_colored.jpg'
import { MdOutlineBedroomChild } from "react-icons/md";



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
      width: '18.5ch',
      '&:focus': {
        width: '28ch',
      },
    },
  },
}));

  
  

export default function SearchAppBar() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const location = useLocation();

  const seachvalue=useSelector((state)=>state.SearchNurse.searchValue)


  const isDashboardRoute = location.pathname.includes('/Home/');
 

  const [username,setuername]=useState()
  const [typeselect,settypeselect]=useState(false)
  const [profileview,setprofileview]=useState(false)
  const [selected,setselected]=useState()

    useEffect(()=>{
      // if(Id !==undefined){
        const user=localStorage.getItem('username')
        if(user){
          setuername(user)
        }
    },[])
    useEffect(()=>{
      if(seachvalue.search===''){
          settypeselect(true)
      }
      else{
        settypeselect(false)
      }
    },[seachvalue])
   
    const [DrawerOpen,setDrawerOpen]=useState(false)
    
    const handleOpenDrawer=()=>{
        setDrawerOpen(!DrawerOpen)
    }
    const closedDrawer=()=>{
        setDrawerOpen(false)
    }

     const handleSearchChange=(e)=>{
       if(isDashboardRoute){
         navigate('./admindashboard/dashboard')
       }
      const {name,value}=e.target
     
      dispatch(setSearchValue({name,value}))
     }
     const typeClick=(type)=>{
  
      dispatch(setSearchValue({name:'searchtype',value:type}))
     }

  return (
    // <ClickAwayListener onClickAway={handleClickAway}>
    <nav className='navbar'>
    <Box sx={{ flexGrow: 1 }}>
      <div className='navpad'>
      <StyledAppbar position="static" color='inherit'>
        <Toolbar>
           <div className='logodiv'>
            <img src={navlog} className={DrawerOpen? 'navlogostrech' : 'navlogo'}/>
          </div>
          <Search
          onMouseEnter={()=>{seachvalue.searchtype ===''?settypeselect(true):settypeselect(false)}}
          // onClick={()=>{seachvalue.searchtype !=='' ? settypeselect(true) :settypeselect(false)}}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Patient Records/Name/Phone/Mrn"
              name='search'
              type='text'
              inputProps={{ 'aria-label': 'search' }}
              // value={searchValue.search}
              onChange={handleSearchChange}   
            />
          </Search>
          {/* {typeselect &&(
            <>
          <div className='typeselect_div' 
          //  onMouseLeave={()=>settypeselect(false)}
           >
            <div>
             
             <ArrowDropUpIcon style={{marginTop:'-14px'}}/>
             <IconButton className='ml-5' onClick={()=>settypeselect(false)}>
                <CloseIcon/>
             </IconButton>
             <List>
              <ListItem disablePadding>
                <ListItemButton onClick={()=>typeClick('Patient')}>
                  <ListItemIcon>
                    <IoPerson/>
                  </ListItemIcon>
                  <ListItemText primary="Patient" primaryTypographyProps={{ style: { color: 'black' } }}/>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton  onClick={()=>typeClick('Doctor')}>
                  <ListItemIcon>
                  <FaUserDoctor />
                  </ListItemIcon>
                  <ListItemText primary="Doctor" primaryTypographyProps={{ style: { color: 'black' } }}/>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton  onClick={()=>typeClick('Staff')}>               
                     <ListItemIcon>
                    <FaUserGroup />
                  </ListItemIcon>
                  <ListItemText primary="Staff" primaryTypographyProps={{ style: { color: 'black' } }}/>
                </ListItemButton>
              </ListItem>
            </List>
            </div>
          </div>
            </>
          )} */}

    {profileview &&(
      <div className='profilediv'
      //  onMouseLeave={()=>setprofileview(false)} 
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
      </div>
      <TransparentDrawer anchor="left" open={DrawerOpen} onClose={closedDrawer}  variant="permanent">
        <div className='Drawer'>
          <div className='d-flex' style={{justifyContent:'end',margin:'5px'}}>
          {!DrawerOpen ?(
            <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr:0,ml:0 }}
            className='button_ouline'
             onClick={handleOpenDrawer}>
            <MenuIcon/>
          </IconButton>
          ):(
            <IconButton onClick={closedDrawer} className='iconbtn' style={{color:'white'}}>
            <CloseIcon/>
          </IconButton>
          )}
        
          </div>
          <List>
          <ListItem button onClick={()=>{navigate('admindashboard');closedDrawer()}} className='listitem '>
            <div className='d-flex '>
              <DashboardIcon className='mr-2 sub-listitem'/>
              {DrawerOpen &&(<ListItemText primary="Dashboard" /> )}  
            </div>
          </ListItem>
          {/* <ListItem button onClick={()=>{navigate('profile');closedDrawer()}} className='listitem '>
            <div className='d-flex'>
              <PersonIcon className='mr-2 sub-listitem'/>
              {DrawerOpen &&(<ListItemText primary="Profile" /> )}  
            </div>
          </ListItem> */}
          <ListItem button onClick={()=>{navigate('addpateints');closedDrawer()}} className='listitem '> 
             <div className='d-flex'>
              <PersonAddIcon className='mr-2 sub-listitem'/>      
              {DrawerOpen &&(<ListItemText primary="Add Patient" /> )}      
            </div>
          </ListItem>
          <ListItem button onClick={()=>{navigate('invoicemain');closedDrawer()}} className='listitem '> 
             <div className='d-flex'>
              <PaymentIcon className='mr-2 sub-listitem'/>      
              {DrawerOpen &&(<ListItemText primary="Invoices" /> )}      
            </div>
          </ListItem>
          <ListItem button onClick={()=>{navigate('addepartment');closedDrawer()}} className='listitem '> 
            <div className='d-flex'>
              <AddBusinessIcon className='mr-2 sub-listitem'/>      
              {DrawerOpen &&(<ListItemText primary="Add Department" /> )}  
            </div>
          </ListItem>
          <ListItem button onClick={()=>{navigate('adddoctor');closedDrawer()}} className='listitem '> 
            <div className='d-flex'>
              <FaUserDoctor className='mr-2 sub-listitem' style={{height:'28px'}}/>      
              {DrawerOpen &&(<ListItemText primary="Add Doctor" /> )}  
            </div>
          </ListItem>
         
          <ListItem button onClick={()=>{navigate('addfloor');closedDrawer()}} className='listitem '>
            <div className='d-flex'>
             <MdOutlineBedroomChild className='mr-2 sub-listitem1'/>      
             {DrawerOpen &&(<ListItemText primary="Floors/Rooms" /> )}       
            </div> 
          </ListItem>
          <ListItem button onClick={()=>{navigate('addtemplate');closedDrawer()}} className='listitem '> 
           <div className='d-flex'>
             <ArticleIcon className='mr-2 sub-listitem'/>      
             {DrawerOpen &&(<ListItemText primary="Add Template" /> )}    
          </div>
          </ListItem>
          <ListItem button onClick={()=>{navigate('pharmacy');closedDrawer()}} className='listitem '>
            <div className='d-flex'>
              <LocalPharmacyIcon className='mr-2 sub-listitem'/>
              {DrawerOpen &&(<ListItemText primary="Pharmacy" /> )}  
            </div>
          </ListItem>
          <ListItem button onClick={()=>{navigate('monitor');closedDrawer()}} className='listitem '> 
             <div className='d-flex'>
              <TvIcon className='mr-2 sub-listitem'/>      
             {DrawerOpen &&(<ListItemText primary="Monitor Patient" /> )}    
            </div>
          </ListItem>
          {!DrawerOpen ?(
            <ListItem button onClick={()=>{setDrawerOpen(true)}} className='listitem '> 
            <div className='d-flex'>
             <MoreHorizIcon className='mr-2 sub-listitem'/>   
           </div>
           </ListItem>
          ):(
            <div>
            <ListItem button className='listitem '>
              <FormControl sx={{ minWidth: 120 , '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' } }}}>
              <InputLabel id="demo-simple-select-label" className='listitem-dropdown'>Lab</InputLabel>
                  <Select
                    labelId="patient-select-label"
                    id="patient-select"
                    value={''} // You can set the selected value here
                    label="Patients"
                  >
                    <MenuItem onClick={()=>{navigate('results');closedDrawer()}}>Results</MenuItem>
                    <MenuItem onClick={()=>{navigate('addservicegroup');closedDrawer()}}>Add Services Groups</MenuItem>
                    <MenuItem onClick={()=>{navigate('addspecimen');closedDrawer()}}>Add Specimen</MenuItem>
                    <MenuItem onClick={()=>{navigate('addservices');closedDrawer()}}>Add Services</MenuItem>
                    <MenuItem onClick={()=>{navigate('addpackages');closedDrawer()}}>Add Packages</MenuItem>
                    {/* Add more patients as needed */}
                  </Select>
                </FormControl>
            </ListItem>
            <ListItem button className='listitem '>
              <FormControl sx={{ minWidth: 120 , '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' } }}}>
              <InputLabel id="demo-simple-select-label" className='listitem-dropdown'>Set Up</InputLabel>
                  <Select
                    labelId="patient-select-label"
                    id="patient-select"
                    value={''} // You can set the selected value here
                    label="Patients"
                  >
                    {/* <MenuItem onClick={()=>{navigate('addusers');closedDrawer()}} >Add users</MenuItem> */}
                    <MenuItem onClick={()=>{navigate('assignrole');closedDrawer()}} >Assign Role</MenuItem>
                    {/* <MenuItem >Data backup</MenuItem> */}
                  </Select>
                </FormControl>

            </ListItem>
            <ListItem button className='listitem '>
              <FormControl sx={{ minWidth: 120, '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' } } }}>
              <InputLabel  className='listitem-dropdown'>Manage in patient</InputLabel>
                  <Select
                    labelId="patient-select-label"
                    id="patient-select"
                    value={''} // You can set the selected value here
                    label="Manage in patient"
                  >
                    <MenuItem ></MenuItem>
                    <MenuItem onClick={()=>{navigate('dischargepatient');closedDrawer()}}>Discharge Patient</MenuItem>
                    {/* <MenuItem onClick={()=>{closedDrawer()}}>Change Room</MenuItem> */}
                    {/* Add more patients as needed */}
                  </Select>
                </FormControl>
            </ListItem>

            </div>
          )}
          
          {/* Add more list items or components as needed */}
          <ListItem className='listitem '>
            <div className='d-flex'>
            <IconButton
                onClick={() => {
                    localStorage.clear();
                    dispatch(resetroledata())
                    dispatch(resetError())
                    navigate('/');
                }}
                // style={{ color: 'white' }}
                className='listitem '
            >
                <LogoutIcon className='logoutbtn sub-listitem'/>
            </IconButton>
            {DrawerOpen &&(<ListItemText primary="Log Out" /> )} 
            </div>
        </ListItem>
        </List>
        </div>
          </TransparentDrawer> 
          {/* {DrawerOpen && (
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
          )} */}
        </Box>
        </nav>
  
    // </ClickAwayListener>

  );
}