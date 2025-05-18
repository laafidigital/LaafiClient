
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { Drawer, FormControl, MenuItem, Select ,InputLabel, Button,ClickAwayListener } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import ArticleIcon from '@mui/icons-material/Article';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { resetroledata } from '../Store/LoginSlice';
import { StyledAppbar } from '../../Styles/Appbar';
import { TransparentDrawer } from '../../Styles/Drawer';
import { setSearchValue } from '../Store/NurseFrame/SearchNavSlice';
import { resetError } from '../Store/ErrorSlice';
import navlog from '../../assets/Logos/laafi_logo_horizontal-light_504X251_invert.jpg'
import VaccinesIcon from '@mui/icons-material/Vaccines';



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
  
  

const NurseNavpad = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const loggeddata=useSelector((state)=>state.Loggedpatient.loggedpatientdata)
  const alldata=useSelector((state)=>state.logindetails.logindata)
  const seachvalue=useSelector((state)=>state.SearchNurse.searchValue)

  
  const [DrawerOpen,setDrawerOpen]=useState(false)

 



  const {id}=useParams()
  const {pathname}=useLocation()
  const homeIndex = pathname.indexOf('/doctor/');
  const idParam = homeIndex !== -1 ? pathname.substring(homeIndex + 8) : undefined;
  const Id=idParam && id ? parseInt(idParam) : undefined
    const [loggedperson,setloggedperson]=useState()

    useEffect(()=>{
      if(Id !==undefined){
        if(loggeddata && loggeddata.length >0){
          const filterdata=loggeddata.filter((item)=>item.id===Id)
          setloggedperson(filterdata)
        }
        else if(alldata && alldata.length > 0){
          const filternewdata = alldata.filter((item) => item.id === Id);
           setloggedperson(filternewdata)
        }
      }
    },[loggeddata, alldata, Id])
 

  
    const handleOpenDrawer=()=>{
        setDrawerOpen(true)
    }
    const closedDrawer=()=>{
        setDrawerOpen(false)
    }

     const handleSearchChange=(e)=>{
      const {name,value}=e.target
      dispatch(setSearchValue({name,value}))
      if(e.target.value==''){
        navigate('nursedashboard')
       }
       else{
        navigate(`nursedashboard/dashboard`)
       }
     }
  return (
    <nav className='navbar'>

    

    <Box sx={{ flexGrow: 1 }}>
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
              // value={searchValue.search}
              onChange={handleSearchChange}   
            />
          </Search>
          <div className='pl-4'>
          <IconButton
                onClick={() => {
                    localStorage.clear();
                    dispatch(resetroledata())
                    dispatch(resetError())
                    navigate('/');
                }}
                className='listitem '
               >
                <LogoutIcon className='logoutbtn sub-listitem'/>
            </IconButton>
          {/* {loggedperson!==undefined && loggedperson.map((item)=>(
            <div className='d-flex'>
              <AccountCircleRoundedIcon/>
              <h5 className='pl-1'>{item.name}</h5>
              
            </div>
          ))} */}
          </div>
        </Toolbar>
      </StyledAppbar>
      <TransparentDrawer anchor="left" open={DrawerOpen} onClose={closedDrawer} variant='permanent'>
        <div className='Drawer'>
          <div className='d-flex' style={{justifyContent:'end',margin:'5px'}}>
            {!DrawerOpen ? (
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
          <ListItem button onClick={()=>{navigate('nursedashboard');closedDrawer()}} className='listitem '>
            <DashboardIcon className='mr-2 sub-listitem'/>
            {DrawerOpen &&(<ListItemText primary="Dashboard" />)}
          </ListItem>
          {/* <ListItem button onClick={()=>{navigate('profile');closedDrawer()}} className='listitem '>
            <PersonIcon className='mr-2 sub-listitem'/>
            {DrawerOpen &&(<ListItemText primary="Profile" />)}
          </ListItem> */}
          <ListItem button onClick={()=>{navigate('nursemypatient');closedDrawer()}} className='listitem '>
            <PersonAddAlt1Icon className='mr-2 sub-listitem'/>
            {DrawerOpen &&(<ListItemText primary="Patients" />)}
          </ListItem>
          <ListItem button onClick={()=>{navigate('nurseinpatient');closedDrawer()}} className='listitem '>
            <VaccinesIcon className='mr-2 sub-listitem'/>
            {DrawerOpen &&(<ListItemText primary="IN Patients" />)}
          </ListItem>
          {/* <ListItem button onClick={()=>{navigate('requestdonation');closedDrawer()}} className='listitem '>
            <BloodtypeIcon className='mr-2 sub-listitem'/>
            {DrawerOpen &&(<ListItemText primary="Blood Donation" />)}
          </ListItem> */}
          <ListItem button onClick={()=>{navigate('addarticle');closedDrawer()}} className='listitem '>
            <ArticleIcon className='mr-2 sub-listitem'/>
            {DrawerOpen &&(<ListItemText primary="Add Article" />)}
          </ListItem>   
          <ListItem  onClick={()=>{
              dispatch(resetroledata())
              localStorage.clear()
              navigate('/')}}
              className='listitem ' >
            {/* <IconButton
              onClick={()=>{
              dispatch(resetroledata())
              localStorage.clear()
              navigate('/')}}
              className='listitem '
              >
                </IconButton> */}
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
        </nav>
 
  )
}

export default NurseNavpad