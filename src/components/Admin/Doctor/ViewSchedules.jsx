import { Dialog,DialogContent,DialogActions, Button, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setemptydoctorschedulebydocid, setscheduleDialoge } from '../../Store/Doctor/AddDoctorSlice';

const ViewSchedules = (props) => {
    const dispatch=useDispatch()

    const scheduleDialoge=useSelector((state)=>state.Adddoctor.scheduleDialoge)

  return (
    <div>
         <Dialog open={scheduleDialoge}>
            {props.data ?(
                <DialogContent>
                <div className='docdialoge_div1'>
                  <div className='d-flex'>
                     <h5 className='doddays'>Monday</h5>
                     <div className='docdialoge_div2'> 
                       {props.data.Monday ? (
                         props.data.Monday.split(',').map((time, index) => (
                          <Button key={index} className="green-button">{time.trim()}</Button> 
                         ))
                        ) : (
                          <p> Schedules not assigned</p>
                        )}
                    </div>
                  </div>
                  <hr></hr>
                  <div className='d-flex'>
                     <h5 className='doddays'>Tuesday</h5>
                     <div className='docdialoge_div2'>
                     {props.data.Tuesday ? (
                         props.data.Tuesday.split(',').map((time, index) => (
                          <Button key={index} className="green-button">{time.trim()}</Button> 
                         ))
                        ) : (
                          <p> Schedules not assigned</p>
                        )}
                    </div>
                  </div>
                  <hr></hr>
                  <div className='d-flex'>
                     <h5 className='doddays'>Wednesday</h5>
                     <div className='docdialoge_div2'>
                        {props.data.Wednesday ? (
                         props.data.Wednesday.split(',').map((time, index) => (
                          <Button key={index} className="green-button">{time.trim()}</Button> 
                         ))
                        ) : (
                          <p> Schedules not assigned</p>
                        )}
                     </div>
                  </div>
                  <hr></hr>
                  <div className='d-flex'>
                     <h5 className='doddays'>Thursday</h5>
                     <div className='docdialoge_div2'>
                     {props.data.Thursday ? (
                         props.data.Thursday.split(',').map((time, index) => (
                          <Button key={index} className="green-button">{time.trim()}</Button> 
                         ))
                        ) : (
                          <p> Schedules not assigned</p>
                        )}
                      </div>
                  </div>
                  <hr></hr>
                  <div className='d-flex'>
                     <h5 className='doddays'>Friday</h5>
                     <div className='docdialoge_div2'>
                     {props.data.Friday ? (
                         props.data.Friday.split(',').map((time, index) => (
                          <Button key={index} className="green-button">{time.trim()}</Button> 
                         ))
                        ) : (
                          <p> Schedules not assigned</p>
                        )}
                      </div>
                  </div>
                  <hr></hr>
                  <div className='d-flex'>
                     <h5 className='doddays'>Saturday</h5>
                     <div className='docdialoge_div2'>
                     {props.data.Saturday ? (
                         props.data.Saturday.split(',').map((time, index) => (
                          <Button key={index} className="green-button">{time.trim()}</Button> 
                         ))
                        ) : (
                       <p> Schedules not assigned</p>
                        )}
                      </div>
                  </div>
                  <hr></hr>
                  <div className='d-flex'>
                     <h5 className='doddays'>Sunday</h5>
                     <div className='docdialoge_div2'>
                     {props.data.Sunday ? (
                         props.data.Sunday.split(',').map((time, index) => (
                          <Button key={index} className="green-button">{time.trim()}</Button> 
                         ))
                        ) : (
                      <p> Schedules not assigned</p>
                        )}
                      </div>
                  </div>
                </div>
               </DialogContent>

            ):(
                <div style={{width:'200px',display:'flex',justifyContent:'center'}}>
                    <h4>No Schedules </h4>
                </div>
            )}
              <DialogActions sx={{display:'flex',justifyContent:'center'}}>
                <Button variant='outlined' 
                onClick={()=>{
                    dispatch(setscheduleDialoge(false))
                    dispatch(setemptydoctorschedulebydocid())
                }}
                >
                 CLOSE
                 </Button>
              </DialogActions>
            </Dialog>
      
    </div>
  )
}

export default ViewSchedules
