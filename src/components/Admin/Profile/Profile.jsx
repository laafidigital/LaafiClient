import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import { setprofiledata } from '../../Store/ProfileSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserById } from '../../Store/Actions';
import { CardHeader } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { GetStaff } from '../../Store/ApiReducers/Auth';

const Profile = () => {
  
  const dispatch=useDispatch()

  const loggeddata=useSelector((state)=>state.Loggedpatient.loggedpatientdata)
  const alldata=useSelector((state)=>state.logindetails.logindata)
  const profiledata=useSelector((state)=>state.Assignrole.userbyid)

  const [filterprofile,setfilterprofile]=useState(null)
  const [isToken,setisToken]=useState(false)

  
  
  useEffect(() => {
    const Token=localStorage.getItem("accessToken")
    const decodedToken=jwtDecode(Token)
    const Id=decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    if(Id && !isToken){
      dispatch(GetStaff(Id))
      setisToken(true)
    }
  }, [loggeddata, alldata,isToken]);

 
 
  const navigate=useNavigate()
  return (
    <div>
        <div className='profile_main_div'>
        <Card sx={{ width: 345 }}>
      {/* <CardMedia
        sx={{ height: 140 }}
        image={}
        title="green iguana"
      /> */}
      <CardContent>
        <div className='d-flex'>
       
        <div style={{width:'178px'}}>
          <Typography gutterBottom variant="h5" component="div">
            Name:{profiledata && profiledata.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email:{profiledata && profiledata.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Phone:{profiledata && profiledata.phoneNumber}
          </Typography>
        </div>
        <div style={{marginLeft:'77px'}}>
          <AccountCircleIcon
          style={{width:'60px',height:'60px'}}
          />
        </div>
        </div>
        {/* <Typography variant="body2" color="text.secondary">
          Password:12345
        </Typography> */}
      </CardContent>
      <CardActions>
        <Button  variant='contained' onClick={()=>{navigate('editprofile')}}>Edit</Button>
      </CardActions>
    </Card>

        </div>
    </div>
  )
}

export default Profile