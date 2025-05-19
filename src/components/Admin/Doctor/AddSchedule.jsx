import { Button, Checkbox, Dialog, DialogActions, DialogContent, ListItemText, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setaddscheduleDialoge } from '../../Store/Doctor/AddDoctorSlice'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { StyledTimePicker } from '../../../Styles/TimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { toast, ToastContainer } from 'react-toastify'
import { PostEditDoctorByToken, PostEditDoctorSchedule } from '../../Store/ApiReducers/DoctorSchedules'

const AddSchedule = (props) => {
  
    const dispatch=useDispatch()
    const days=[{dow:'Monday'},{dow:'Tuesday'},{dow:'Wednesday'},{dow:'Thursday'},{dow:'Friday'},{dow:'Saturday'},{dow:'Sunday'}]
    const addscheduleDialoge=useSelector((state)=>state.Adddoctor.addscheduleDialoge)

    const [isAll,setisAll]=useState(false)
    const [selected,setselected]=useState({dow:[],from_time:'',to_time:'',consultationTime:''})
    const [inputData,setinputData]=useState([{dow:'Monday',from_time:'',to_time:'',consultationTime:''},
                                             {dow:'Tuesday',from_time:'',to_time:'',consultationTime:''},
                                             {dow:'Wednesday',from_time:'',to_time:'',consultationTime:''},
                                             {dow:'Thursday',from_time:'',to_time:'',consultationTime:''},
                                             {dow:'Friday',from_time:'',to_time:'',consultationTime:''},
                                             {dow:'Saturday',from_time:'',to_time:'',consultationTime:''},
                                             {dow:'Sunday',from_time:'',to_time:'',consultationTime:''},
                                            ])
  

    const handleinputchange=(e,index)=>{
      const {name,value,checked}=e.target
      if(isAll){
        if(name=='select_all'){
          setisAll(checked)
        }
       else{
        setselected((prev)=>({
          ...prev,
          [name]:value
        }))
       }
      }
      else{
        if(name=='select_all'){
          setisAll(checked)
        }
        else{
          setinputData((prev)=>{
            const updateddata=[...prev]
            updateddata[index]={
              ...updateddata[index],
              [name]:value
            }
            return updateddata
          })
        }
      }
    }   
    

    const handleTimeChange = (newtime,index) => {
      const {newTime,name}=newtime
        let Hours = newTime.$H;
        let Minutes = newTime.$m;
        let updatedTime = `${Hours}:${Minutes < 10 ? '0' + Minutes : Minutes}`;
        if(isAll){
          setselected((prev)=>({
            ...prev,
            [name]:updatedTime
          }))

        }
        else{
          setinputData((prevData) => {
            const updatedData = [...prevData];
              updatedData[index]={
                ...updatedData[index],
                [name]: updatedTime,
              }
            return updatedData;
          });
          };
        }
        
        const handleMultiSelectChange=(e,item)=>{
          const {checked,value}=e.target
       
          if (checked) {
            setselected((prev) => ({
                ...prev,
                dow: [...new Set([...prev.dow, item.dow])]
            }));
        } else {
            setselected((prev) => ({
                ...prev,
                dow: prev.dow.filter((day) => day !== item.dow)
            }));
        }
        }
       
      const submitForm=()=>{
        let iserror=true
        if(isAll){
          if(!selected.dow ||!selected.from_time ||!selected.to_time||!selected.consultationTime){
            iserror=false
            toast('Error  Check The Feild ')
          }
          if(iserror){
            const dayswithtime = selected.dow.reduce((acc, day) => {
              acc[day] = `${selected.from_time},${selected.to_time}`;
              return acc;
             }, {});
             const scheduledata={
               ...dayswithtime,
               TimeWindow:parseInt(selected.consultationTime)
              }
             
              if(props.data ==''){
                dispatch(PostEditDoctorByToken(scheduledata))
              }
              else{
                dispatch(PostEditDoctorSchedule(props.data,scheduledata))
              }
            setselected({dow:[],from_time:'',to_time:'',consultationTime:''})
          }
        }
        else{
          const validDate=inputData.filter(item=>{
            const keys=Object.keys(item).filter(key=>key!=='dow')
            const keysWithValues=keys.filter(key=>item[key])
            if (keysWithValues.length === 3) {
              return true; 
          } else {
              return false;
          }})
   
          if(validDate && validDate.length>0){
            const daywithtime = validDate.reduce((acc, item) => {
              acc[item.dow] = `${item.from_time},${item.to_time};${item.consultationTime}`;
              return acc;
            }, {});
            if(props.data ==''){
              dispatch(PostEditDoctorByToken(daywithtime))
            }
            else{
              dispatch(PostEditDoctorSchedule(props.data,daywithtime))
            }
          }
          else{
            toast('Error  Check The Feild ')
          }
        }
      }

  return (
    <div>
      <ToastContainer/>
        <Dialog open={addscheduleDialoge}
          PaperProps={{
            style: {
              width: '70%',  
              maxWidth: '1000px'
            },
          }}
        >
            <DialogContent>
                <div className='Addscedule_container'>   
                    <div><label >Day</label></div>
                    <div><label >From </label></div>
                    <div><label >To</label></div>
                    <div>
                        <label >Cosultation Time</label>
                        <Checkbox name='select_all' onChange={handleinputchange} checked={isAll}></Checkbox>
                      </div>
                       {isAll ?(
                        <>
                        <div>
                         <Select
                          style={{width:'200px',height:'50px'}}
                          multiple
                          value={selected.dow}
                          renderValue={(data)=>data.join(',')}
                          name='days'
                          // onChange={handleinputchange}
                         >
                          {days.map(item=>
                          <MenuItem value={item.dow}>
                            <Checkbox 
                             onChange={(e)=>handleMultiSelectChange(e,item)}
                             checked={selected.dow.includes(item.dow)}
                            />
                            <ListItemText primary={item.dow}/>
                           </MenuItem>
                          )}
                         </Select>
                        </div>
                        <div>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DemoContainer components={['TimePicker', 'TimePicker']} >
                                <StyledTimePicker
                                    name="from_time"
                                    value={inputData.from_time}
                                    onChange={(newTime)=>handleTimeChange({newTime,name:'from_time'})}
                                    
                                />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker', 'TimePicker']}>
                                    <StyledTimePicker
                                     name="to_time"
                                     value={inputData.to_time}
                                     onChange={(newTime)=>handleTimeChange({newTime,name:'to_time'})}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div>
                                <Select
                                  labelId="demo-multiple-checkbox-label"
                                  id="demo-multiple-checkbox"
                                  name='consultationTime'
                                  value={inputData.consultationTime}
                                  onChange={(e)=>handleinputchange(e)}
                                  style={{width:'200px',height:'50px'}}
                                >
                                  <MenuItem value='15 '>15 min</MenuItem>
                                  <MenuItem value='30 '>30 min</MenuItem>
                                  <MenuItem value='45 '> 45 min</MenuItem>
                                  <MenuItem value='60 '>60 min</MenuItem>
                               </Select>
                        </div>
                        </>
                       ):(
                        inputData.map((item,index)=>(
                         <>
                        <div>
                            <h5>{item.dow}</h5>
                        </div>
                        <div>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DemoContainer components={['TimePicker', 'TimePicker']} >
                                <StyledTimePicker
                                    name="from_time"
                                    value={inputData.from_time}
                                    onChange={(newTime)=>handleTimeChange({newTime,name:'from_time'},index)}
                                />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker', 'TimePicker']}>
                                    <StyledTimePicker
                                     name="to_time"
                                     value={inputData.to_time}
                                     onChange={(newTime)=>handleTimeChange({newTime,name:'to_time'},index)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div>
                                <Select
                                  labelId="demo-multiple-checkbox-label"
                                  id="demo-multiple-checkbox"
                                  name='consultationTime'
                                  value={inputData.consultationTime}
                                  onChange={(e)=>handleinputchange(e,index)}
                                  style={{width:'200px',height:'50px'}}
                                >
                                  <MenuItem value='15 '>15 min</MenuItem>
                                  <MenuItem value='30 '>30 min</MenuItem>
                                  <MenuItem value='45 '> 45 min</MenuItem>
                                  <MenuItem value='60 '>60 min</MenuItem>
                               </Select>
                        </div>
                            </>
                          ))
                       )}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>dispatch(setaddscheduleDialoge(false))}>close</Button>
                <Button onClick={submitForm}>submit</Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default AddSchedule
