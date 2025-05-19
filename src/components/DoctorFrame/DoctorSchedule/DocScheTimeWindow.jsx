import { Button, ButtonGroup, Checkbox, Dialog, DialogActions, DialogContent, ToggleButton, ToggleButtonGroup } from '@mui/material'
import React, { useState } from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { GoClock } from "react-icons/go";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { toast, ToastContainer } from 'react-toastify';
import { FaArrowLeft } from "react-icons/fa6";
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { PostEditDoctorByToken } from '../../Store/ApiReducers/DoctorSchedules';

const DocScheTimeWindow = (props) => {

  const dispatch=useDispatch()

  const {selectedday,setselectedday,setrecallapi,recallapi}=props
  const [time,settime]=useState({opentime:'AM',closetime:'AM'})
  const [Open,setOpen]=useState(false)
  const [timetype,settimetype]=useState()
  const [splittime,setsplittime]=useState(false)
  const [slots, setSlots] = useState([]);
  
  


  const handlechangeinput=(e)=>{
    const {name,value}=e.target
    
      setselectedday(prev=>({
        ...prev,
        [name]:value
      }))
  }

  const handleTimePickerChange = (newValue) => {
    
    if (timetype) {
      const formattedTime = newValue.format('HH:mm') === '00:00' ? '24:00' : newValue.format('HH:mm');
      setselectedday(prev => ({
        ...prev,
        [timetype]: formattedTime 
      }));
      settime({...time,[timetype]:newValue.format('A')})
    }
  };

  const ampmconvertion=(e,type)=>{
  const newPeriod = e.target.value; 
  let [hours, minutes] = selectedday[type].split(':'); 
    hours = parseInt(hours, 10);
    
     
  if (newPeriod === 'AM') {
    if (hours > 12) {
      hours = hours - 12; 
    }
    else if(hours==12){
      hours =12 + hours;
    }
  }
 
  else if (newPeriod === 'PM') {
    if (hours < 12) {
      hours = hours + 12;
    }
    else if(hours==24){
      hours =hours - 12;
    }
  }

  settime({ ...time, [type]: newPeriod });
  setselectedday(prev => ({
    ...prev,
    [type]: `${String(hours).padStart(2, '0')}:${minutes}`
  }));
  }

  const selectslot=()=>{
    const {opentime,closetime,timewindow}=selectedday
      if (!opentime) {
        toast.error("Open time is required");
        return;
      }
      if (!closetime) {
        toast.error("Close time is required");
        return;
      }
      if (!timewindow) {
        toast.error("Consultation window is required");
        return;
      }
  setsplittime(true);
  splitTimeSlots()
  }

  const splitTimeSlots = () => {
    const { opentime, closetime, timewindow } = selectedday;
    
    const startTime = dayjs(opentime, 'HH:mm');
    const endTime = dayjs(closetime, 'HH:mm');
    const interval = parseInt(timewindow, 10); 
  
    const tempSlots = [];
    let current = startTime;
  
    while (current.add(interval, 'minute').isBefore(endTime) || current.add(interval, 'minute').isSame(endTime)) {
      const nextSlot = current.add(interval, 'minute');
      tempSlots.push(`${current.format('HH:mm')} - ${nextSlot.format('HH:mm')}`);
      current = nextSlot;
    }
    setSlots(tempSlots); 
  };

  const clickSlot=(slot)=>{
    const isSlotIn = selectedday.time.some(item => item === slot);
   if (isSlotIn) {
    setselectedday(prev => ({
      ...prev,
      time: prev.time.filter(item => item !== slot) 
    }));
  } else {
    setselectedday(prev => ({
      ...prev,
      time: [...prev.time, slot] 
    }));
  }
  }

  const clickDayCheckbox=(e,day)=>{
    const cheched=e.target.checked
    if(cheched && day=='allday'){
      setselectedday(prev=>({
        ...prev,
        slot:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
      }))
    }
    else if(cheched && day=='weekday'){
      setselectedday(prev=>({
        ...prev,
        slot:['Monday','Tuesday','Wednesday','Thursday','Friday']
      }))
    }
    else{
      setselectedday(prev=>({
        ...prev,
        slot:[]
      }))
    }
  }

  const clickSaveBtn=()=>{
    if(selectedday.time && selectedday.time.length>0){
      const updateddata={}
      selectedday.slot.forEach((day,index)=>{
       const startTime =selectedday.opentime
       const closeTime=selectedday.closetime
       const window=selectedday.timewindow
       const timeSlotsArray = selectedday.time; // Assuming 'time' is an array of time ranges
      const slotsArray = timeSlotsArray.map(slot => slot.replace(' - ', '-')).join(',');
       updateddata[day.toLowerCase()]=`startTime:${startTime},closeTime:${closeTime},window:${window},{${slotsArray}}`
      })
      
      dispatch(PostEditDoctorByToken(updateddata)).then((res)=>{
        if(res){
          setselectedday({slot:[],time:[],opentime:'',closetime:'',timewindow:'60'})
          toast.success('Successfully Updated Schedules')
          setrecallapi(!recallapi)
        }
      })
      .catch((err)=>{
        toast.error(err)
      })
    }
    else{
      toast.error('please select the time slot')
    }
  }

  
  return (
    <div className='DocScheTimeWindow'>
      <ToastContainer/>
      {splittime ?(
        <div className='docsplittime'>
          <div>
            <button className='doctimearrowleft' onClick={()=>setsplittime(false)}>
              <FaArrowLeft />
            </button>
            <h4>Select your slot</h4>
          </div>
          <div className='docsplittime_timeslotdiv'>
              {slots.map(item=>{
                const isexist=selectedday.time.some(inneritem=>inneritem==item)
                return(
                  <button className={isexist ? 'selectslobtn':'cancelbtn'} onClick={(e)=>clickSlot(item)}>{item}</button>
                )
              })}
          </div>
          <div>
            <Checkbox onClick={(e)=>clickDayCheckbox(e,'allday')}></Checkbox>
            <p>Apply to all days</p>
          </div>
          
          <div>
            <Checkbox onClick={(e)=>clickDayCheckbox(e,'weekday')}></Checkbox>
            <p>Apply to week days</p>
          </div>
          <div>
            <button className='selectslobtn'onClick={clickSaveBtn}>Save</button>
            <button className='cancelbtn'>Cancel</button>
          </div>
        </div>
      ):(
        <>
         <div>
        <div className='DocScheTimeWindow_contentdiv'>
          <h5>Consultation window</h5>
          <div>
            <GoClock />
            <select value={selectedday.timewindow} name='timewindow' onChange={handlechangeinput}>
              <option value='60'>60 minutes</option>
              <option value='45'>45 minutes</option>
              <option value='30'>30 minutes</option>
              <option value='15'>15 minutes</option>
            </select>
          </div>
        </div>
        <div className='DocScheTimeWindow_contentdiv'>
          <h5>Open Time</h5>
           <div >
            <button className='opentimebtn' name='opentime' 
            onClick={()=>{setOpen(true),
                      settimetype('opentime')}}>
              {selectedday.opentime?selectedday.opentime :'select time'}</button>
            {/* <ToggleButtonGroup color="primary"
              value={time.opentime}
              exclusive
              onChange={(e)=>ampmconvertion(e,'opentime')}
              aria-label="Platform"
              className='togglebuttongroup'
              
            >
            <ToggleButton value="AM">AM</ToggleButton>
            <ToggleButton value="PM">PM</ToggleButton>
            </ToggleButtonGroup> */}
          </div>
        </div>
        <div className='DocScheTimeWindow_contentdiv'>
          <h5>Close Time</h5>
           <div>
            <button className='opentimebtn' name='closetime' 
            onClick={()=>{setOpen(true),
            settimetype('closetime')}}>
              {selectedday.closetime?selectedday.closetime :'select time'}</button>
            {/* <ToggleButtonGroup color="primary"
              value={time.closetime}
              exclusive
              onChange={(e)=>ampmconvertion(e,'closetime')}
              aria-label="Platform"
              className='togglebuttongroup'
            >
              <ToggleButton value="AM">AM</ToggleButton>
              <ToggleButton value="PM">PM</ToggleButton>
            </ToggleButtonGroup> */}
          </div>
        </div>
        <div></div>
      </div>
      <div>
        <button className='selectslobtn' onClick={selectslot}>Select Slots <IoIosArrowForward /></button>
      </div>
        </>
      )}
     
      <Dialog open={Open}>
        <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['TimePicker']}>
            <TimePicker label="Basic time picker" onChange={handleTimePickerChange} />
          </DemoContainer>
        </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DocScheTimeWindow
