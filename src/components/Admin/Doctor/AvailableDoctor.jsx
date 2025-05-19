import { Button } from '@mui/material'
import React, { useState } from 'react'
import doctorone from '../../../assets/admindoctorimg/doctor1.jpg'
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetdocSchedulebyDay } from '../../Store/ApiReducers/DoctorSchedules';

const AvailableDoctor = () => {

    const dispatch=useDispatch()
    const navigate=useNavigate()
    const pathname=useLocation().pathname

    const doctorarray=useSelector((state)=>state.Adddoctor.doctorArray)
    const getdoctors=useSelector((state)=>state.Adddoctor.doctorbyday)
    const isadmin=pathname.includes('admindashboard')

   
    const [todaysDoctor,setTodaysDoctor]=useState()
    const [searchValue,setsearchValue]=useState({})
    const [filterSearch,setFilterSearch]=useState()
 

    const currentDate=new Date()
    const options = { weekday: 'long' };
    const dayName = currentDate.toLocaleDateString('en-US', options);
  

    useEffect(()=>{
        dispatch(GetdocSchedulebyDay(''))
    },[])

    useEffect(()=>{
        setTodaysDoctor(getdoctors)
        setFilterSearch(getdoctors)
      },[doctorarray,getdoctors])

     const clickBack=()=>{
        switch(true){
          case pathname.includes('/Home'):
          navigate('../admindashboard');
          break;
          case pathname.includes('/doctor'):
          navigate('../doctordashboard');
          break
          case pathname.includes('/patientdashboard'):
          navigate('../patientdashboard');
          break
        }
      }

      const changeSearch=(e)=>{
      
        if(e.target.value){
            const searchDoctor=getdoctors.filter((item)=>item.doctorName.toLowerCase().includes(e.target.value.toLowerCase()))
   
            setFilterSearch(searchDoctor)
        }
        else{
            setFilterSearch(getdoctors)
        }
      }

  return (
    //Dashboard_maindiv
    <div className='availabledoctor'>
       {filterSearch ?(
        <div className={isadmin ? 'availbledoctoradmin_maindiv': 'availbledoctor_maindiv'}> 
            <div class="input-group d-flex justify-content-center">
                <div class="form-outline avalabledoc_input">
                    <input type="search" id="form1" class="form-control avalabledoc_input" placeholder='Search' name='search' value={searchValue.search}  onChange={changeSearch}/>
                </div>
                <Button startIcon={<SearchIcon/>} variant='contained'></Button>
            </div>
           {/* <div className='d-flex justify-content-end pt-2'>
              <Button startIcon={<ArrowBackIcon/>}  onClick={clickBack} variant='outlined' color='inherit' className='m-2 mr-5'>Back</Button>
          </div> */}
          <div className='cardcontain_div'>
            {filterSearch &&(
                <div className='d-flex flex-wrap'>
             {filterSearch.map((item)=>{
                const Time=item.schedule.split(',').map(time=>time.trim())
  
                
                const firstTime=Time[0]
                const lastTime=Time[1]
             
                
                return(
            <div class="card m-3 " style={{width:'280px'}} >
                <div class="card-body d-flex">
                    <div>
                        <AccountCircleRoundedIcon
                        style={{height:"50px",width:"50px"}}
                        />
                    </div>
                    {/* <img class="card-img-top availabledoc_img " src={<AccountCircleRoundedIcon/>} alt="Card image cap"></img> */}
                    <h5 class="card-title pl-3 doccarddetails">{item.doctorName}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item doccarddetails" >DEPARTMENT</li>
                    <li class="list-group-item " >{item.departmentName}</li>
                    <li class="list-group-item doccarddetails" doccarddetails>CONSULTATION FEE</li>
                    <li class="list-group-item">{item.fee}</li>
                    <li class="list-group-item doccarddetails" doccarddetails> TIME</li>
                    <div className='d-flex'>
                        <Button variant='contained' className='m-1'>{firstTime}</Button>
                        <Button variant='contained' className='m-1'>{lastTime}</Button>
                    </div>
                    {/* <div className='d-flex justify-content-center'>
                        {!isadmin &&(
                        <Button variant='outkined' color='primary' onClick={()=>navigate(`../patientbooking/${item.doctorId}`)}>Book now</Button>
                        )}
                    </div> */}
                    {/* <li class="list-group-item">{item.fee}</li> */}
                </ul>
                {/* <div class="card-body">
                    <a href="#" class="card-link">More Details</a>
                </div> */}
            </div>
                )
             }
             )}
            </div>
            )}
       
         </div>
        </div>
       ):(
        <h4 className='no_apponmentheading'>No Doctors Available For Today</h4>
       )}
        
         </div>
   
  )
}

export default AvailableDoctor