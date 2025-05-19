import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetDoctorSlotsForTheWeek, Getdoctorsonly } from '../../Store/ApiReducers/DoctorSchedules'
import { Checkbox } from '@mui/material';

const DocScheSlots = (props) => {
    const { doctorId, setselectedday, selectedday,recallapi } = props;
    const dispatch=useDispatch()
    const doctorslotsfortheweek=useSelector(state=>state.Adddoctor.doctors)

    const dayarray=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
   
    
    

    
    
    useEffect(()=>{
        dispatch(Getdoctorsonly(doctorId))
    },[doctorId,recallapi])

    const getSlotCount = (day) => {

        if (!doctorslotsfortheweek) {
            return 0; // Return 0 if doctorslotsfortheweek is null or undefined
          }

        const dayKey = day.toLowerCase(); 
        const dayValue = doctorslotsfortheweek[dayKey];
    
        if (dayValue === null) {
          return 0; 
        } else {
            const slotsString = dayValue.match(/\{(.*?)\}/)?.[1] || ''; 
            return slotsString.split(',').length;
        }
      };

    const handleinputchange=(e,day)=>{
        const checked=e.target.checked
        
        if (checked) {
            setselectedday(prevState => ({
                ...prevState,
                slot: [...prevState.slot, day],
            }));
        } else {
            setselectedday(prevState => ({
                ...prevState, 
                slot: prevState.slot.filter((d) => d !== day), 
            }));
        }
    }  

  return (
    <div className='DocScheSlots'>
        <h4>My Weekly Schedule</h4>
        <div className='DocScheSlots_container' >
            {dayarray && dayarray.map((item)=>{
                const chechedday=selectedday.slot.find(inneritem=>inneritem===item)
                
                return(
                <div className='docScheduleCard'>
                    <div className='docScheduleCardheaderdiv'>
                        <div  className='d-flex justify-content-end'>
                            <Checkbox  checked={Boolean(chechedday)} onChange={(e)=>handleinputchange(e,item)}/>
                         </div>   
                        <div className='d-flex justify-content-center'>
                            <div className={getSlotCount(item)==0?'emptyslotcolor':'fillslotcolor'}></div><p>{getSlotCount(item)} slots</p>
                        </div> 
                    </div>
                    <h4>{item}</h4>
                </div>
                )
             }
            )}
        </div>
    </div>
  )
}

export default DocScheSlots
