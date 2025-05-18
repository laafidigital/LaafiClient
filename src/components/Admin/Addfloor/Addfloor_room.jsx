import React, { useEffect, useState } from 'react'
import { FormControl } from '@mui/base/FormControl';
import { Button, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { styled } from '@mui/material/styles';
import { StyledSelect } from '../../../Styles/Select';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useSelector,useDispatch } from 'react-redux';
import { setinputfloordata,setFloordetails ,setresetinput, setemptyroombyfloor, setemptypostfloorresult} from '../../Store/AddfloorSlice';
import { width } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { GetAddedFloors, GetRoomsByfloorId, PostAddFloor, PostAddRoom, PostFloorData } from '../../Store/Actions';
import { ToastContainer } from 'react-toastify';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';


const Addfloor_room = () => {

    const dispatch=useDispatch()

    const addedfloors=useSelector((state)=>state.Addfloor.addedfloors)
    const postresult=useSelector((state)=>state.Addfloor.postresult)
    const roombyfloorid=useSelector((state)=>state.Addfloor.roombyfloorid)
    const roomnotavailable=useSelector((state)=>state.Addfloor.error)
    const postfloorresult=useSelector((state)=>state.Addfloor.postfloorresult)
    
    const [inputdata,setinputdata]=useState({floorNo:'',floorName:'',room_type:'',roomName:'',no_of_beds:'',price_of_bed:''})
    const [error,seterror]=useState({floorNo:'',floorName:'',room_type:'',roomName:'',no_of_beds:'',price_of_bed:''})
    const [isfloor,setisfloor]=useState(false)
    const [onhoverFloor,setonhoverFloor]=useState(false)
    
   

    useEffect(()=>{
      dispatch(GetAddedFloors())
      if(postresult && postresult.flr){
        setinputdata((prev)=>({
          ...prev,
          floorNo:postresult.floorno,
          floorName:postresult.flr.floorName
        }))
      }
      if(postfloorresult){
        dispatch(GetAddedFloors())
      }
    },[postresult,postfloorresult])

    const onchangeUserinput=(e)=>{
      const {name,value}=e.target
      const val=parseInt(value)
      if(name==='no_of_beds'||name==='price_of_bed'||name==='floorNo'){
        setinputdata((prev)=>({
          ...prev,
          [name]:val
        }))
      }
      // else if(name==='floorName'){
      //   setinputdata((prev)=>({
      //     ...prev,
      //     [name]:value,
      //     flr:{floorNumber:value}
      //   }))
      // }
      // else if(name==='floorno'){
      //   setinputdata((prev)=>({
      //     ...prev,
      //     [name]:value,
          
      //   }))
      // }
      else{
        setinputdata((prev)=>({
          ...prev,
          [name]:value
        }))
      }
      
    }

  const   onfloorHover=(id)=>{
     dispatch(GetRoomsByfloorId(id))
     setonhoverFloor(true)
  }

  const onfloorleave=()=>{
    setonhoverFloor(false)
    dispatch(setemptyroombyfloor())
  }


  const validateForm=()=>{
    if(inputdata.floorNo === undefined || inputdata.floorNo === null || inputdata.floorNo === ''){
     seterror({floorNo :'floor no is required'})
    }
    // else if(inputdata.floorno==0){
    //   seterror({floorno:''})
    // }
    else  if(!inputdata.floorName){
      seterror({floorName :'floor name is required'})
     }
     else  if(!inputdata.room_type){
      seterror({room_type :'Room type is required'})
     }
     else  if(!inputdata.roomName){
      seterror({roomNumber :'Room no is required'})
     }
     else  if(!inputdata.no_of_beds){
      seterror({no_of_beds :' No of beds is required'})
     }
     else  if(!inputdata.price_of_bed){
      seterror({price_of_bed :' Price of bed is required'})
     }
     else{
      seterror({
        floorNo:'',
        floorName:'',
        room_type:'',
        roomName:'',
        no_of_beds:'',
        price_of_bed:''
      })
     }
  }

    const submitForm=(e)=>{
     e.preventDefault()
  
     const allErrorsEmpty=Object.values(error).every(error=>error ==='')
    
    
     if(!isfloor && inputdata.floorName){
      dispatch(PostAddFloor(inputdata.floorName))
      setinputdata({floorNo:'',room_type:'',roomName:'',floorName:'',no_of_beds:'',price_of_bed:''})
      dispatch(setemptypostfloorresult())
      // setisfloor(true)
     }
      else{
      const updateddata=[
        {
          RoomType:inputdata.room_type,
          RoomNumber:inputdata.roomName,
          NumberOfBeds:inputdata.no_of_beds,
          Price:inputdata.price_of_bed
        }
      ]
      dispatch(PostAddRoom(inputdata.floorNo,updateddata))
      setinputdata({floorNo:'',room_type:'',roomName:'',floorName:'',no_of_beds:'',price_of_bed:''})
      setisfloor(false)
     }
    }

  return (
    <div className='addfloor_room'>
        <ToastContainer/>
        <div className='displayaddedfloor-headercontainer'>
        <h4 className='diplayaddedfloor-main-head'>Choose your floor</h4>
        <div className='diplayaddedfloor-main'>
        <div className='diplayaddedfloor'>
          {addedfloors && addedfloors.map((flr)=>(
            <div className='flrbtnmain'>
            <div className='flrbtn' 
              onClick={()=>{setinputdata({...inputdata,floorNo:flr.id,floorName:flr.floorName})
              setisfloor(true)}}
              onMouseEnter={()=>onfloorHover(flr.id)}
              onMouseLeave={onfloorleave}
              >
                {flr.floorName}
                {onhoverFloor &&(
             <div className='displayroom'>
              <ArrowDropUpIcon style={{marginTop:'-51px',marginRight:'24px',color:'white'}}/>
              { roombyfloorid.length>0 ? (
                  roombyfloorid.map((room) => (
                      <div key={room.id} className='room-details'>
                        <p>B:{room.no_of_beds}</p>
                        <h6> {room.roomName}</h6> 
                      </div>
                  ))
                ):roomnotavailable ?(
                <p>No rooms available</p>     
                ):(<p>Loading...</p>)}
            </div>
           )}
             </div>
            </div>
          ))}
        </div>
      </div>

        </div>
         <div className='addfloordiv'>
                <form onSubmit={submitForm}>
                <FormControl >
                <div className='addfloorsubdiv'>
                  <div style={{marginLeft:'30px'}}>
                    <div class="d-flex mt-3">
                        <label >Floor Name:</label>
                        <div style={{paddingLeft:'39px'}} >
                        <input type="text" class="form-control" name='floorName'  value={inputdata.floorName} onChange={onchangeUserinput}  />
                        </div>
                    </div>
                       { error.floorName && <div className='error-message'>{error.floorName}</div>}
                    {isfloor &&(
                      <>
                    <div className='d-flex mt-3'>
                    <label >Room Type</label>
                        <FormControl >
                                <StyledSelect
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                name='room_type'
                                value={inputdata.room_type}
                                onChange={onchangeUserinput}  
                                className="relationfeild"
                                style={{width:'215px',marginInlineStart:'50px',marginTop:'5px'}}
                                >
                                  <MenuItem value="ICCU">ICCU</MenuItem>
                                  <MenuItem value="ICU">ICU</MenuItem>
                                  <MenuItem value="premium">Premium</MenuItem>
                                  <MenuItem value="semiPremium">SemiPremium</MenuItem>
                                  <MenuItem value="general">General</MenuItem>
                               </StyledSelect>
                        </FormControl>
                      </div>
                        { error.room_type && <div className='error-message'>{error.room_type }</div>}
                      <div class="d-flex mt-3">
                          <label for="staticEmail">Room NO:</label>
                          <div className='addfloorinputdiv'>
                          <input type="text" class="form-control" name='roomName' value={inputdata.roomName} onChange={onchangeUserinput} />
                          </div>
                      </div>
                                  {error.roomName && <div className='error-message'>{error.roomName}</div>}
                
                    <div class="d-flex mt-3">
                        <label for="staticEmail"  >NO Of Beds:</label>
                        <div style={{paddingLeft:'36px'}}>
                        <input type="number"  class="form-control" name='no_of_beds'  value={inputdata.no_of_beds} onChange={onchangeUserinput} />
                        { error.no_of_beds && <div className='error-message'>{error.no_of_beds }</div>}
                        </div>
                    </div>
                    <div class="d-flex mt-3">
                        <label for="staticEmail">Price Of A Bed:</label>
                        <div  style={{paddingLeft:'19px'}}>
                             <input type="number"  class="form-control" name='price_of_bed'  value={inputdata.price_of_bed} onChange={onchangeUserinput}  />
                             { error.price_of_bed && <div className='error-message'>{error.price_of_bed }</div>}
                        </div>
                    </div>
                      </>
                    )}
                    
                    <div  className='d-flex justify-content-center m-3'>
                    <Button variant='contained ' type='submit' onClick={validateForm} style={{backgroundColor:'black'}}>submit</Button>
                    </div>
                    </div>
                    </div>
            </FormControl>
            </form>
            </div>
    </div>
  )
}

export default Addfloor_room