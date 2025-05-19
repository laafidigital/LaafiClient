import React, { useEffect, useState } from 'react'
import admincardoneimg from '../../assets/admincardimg/person-gear.svg'
import admincardtwoimg from '../../assets/admincardimg/clipboard2-pulse.svg'
import doctorcardthree from '../../assets/admincardimg/prescription.svg'
import { useNavigate } from 'react-router-dom'
import doctorpharmacy from '../../assets/admincardimg/capsule.svg'
import doctorarticle from '../../assets/admincardimg/journal-richtext.svg'
import { FaHandHoldingMedical } from "react-icons/fa";
import { MdOutlineWaterDrop } from "react-icons/md";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import { style } from '@mui/system'
import { useSelector } from 'react-redux'
import { Button } from '@mui/base'

const Doctordashboard = () => {
    
    const navigate=useNavigate()

    const clickPatientdetails=()=>{
        navigate('dashboard')
    }

    const clicklabdetails=()=>{
        navigate('../addservices')
    }

    const clickconsultpatients=()=>{
        // navigate('../consultedpatients')
    }

    const clickPychomatic=()=>{
        navigate('pychomatric')

    }

  return (
    <div className='Dashboard_maindiv'>
        <div className='admindashmain '>
            <div className='row'>

            <div className="card text-white  mb-3 admincard col-4 ml-2 patient_footfall" onClick={clickPatientdetails}>
                <div className='card_img_div'>
                    <img className="card-img adminimgone" src={admincardoneimg} alt="Card image" ></img>
                </div> 
                <div className="card-img-overlay ">
                     <h4 className="admincardhead" >Patients today/History</h4>
                 </div>
                 <div className='admincard_round1 green_card1'></div>
                 <div className='admincard_round2 green_card2'></div>
            </div>

            <div className="card text-white mb-3 admincard ml-2 col patient_history" onClick={clickPychomatic}>
                    <div className='card_img_div'>
                        <FaHandHoldingMedical className='adminimgone' style={{color:'black'}}/>
                    </div>
                        <div class="card-img-overlay" style={{zIndex:'2'}}>
                            <h4 className="admincardhead" style={{width:'131px',zIndex:'3'}}> Psychometric Evaluation </h4>
                        </div>
                        <div className='admincard_round1 purple_card1'></div>
                        <div className='admincard_round2 purple_card2'></div>
            </div>

            {/* <div className="card text-white roombookingcard mb-3 admincard col-4 ml-2" onClick={clickconsultpatients} >
                <div className='card_img_div'>
                    <img className="card-img adminimgone" src={doctorcardthree} alt="Card image"></img>
                </div>
                <div class="card-img-overlay" >
                    <h4 className="admincardhead" style={{zIndex:2}}>Consulted Patients</h4>
                </div>
                <div className='admincard_round1 yellow_card1'></div>
                <div className='admincard_round2 yellow_card2'></div>
            </div> */}
            </div>

            <div className='row'>
                {/*css:lab_summary click:'clicklabdetails*/}
                <div className="card text-white  mb-3 admincard col-4 ml-2  remote_monitoring" >
                    <div className='card_img_div'>
                        <img className="card-img adminimgone" src={admincardtwoimg} alt="Card image"></img>
                    </div> 
                    <div class="card-img-overlay" >
                        <h4 className="admincardhead" style={{zIndex:2}}>Lab Reports</h4>
                    </div>
                    {/* <div className='admincard_round1 red_card1'></div>
                    <div className='admincard_round2 red_card2'></div> */}
                </div>
                    
               

                 <div className=" col-4 " onClick={clickPychomatic}>
                </div>
            </div>

            <div className='row'>
                <div className="card text-white  mb-3 admincard ml-2 col-4 remote_monitoring" >
                    <div className='card_img_div'>
                       <img className="card-img adminimgone" src={doctorarticle} alt="Card image"></img>
                    </div>
                        <div class="card-img-overlay" >
                            <h4 className="admincardhead" style={{zIndex:2}}> Your Article</h4>
                        </div>
                        {/* <div className='admincard_round1 dark_card1'></div>
                        <div className='admincard_round2 dark_card2'></div> */}
                 </div>
                 {/* css for the pharmacy card laundry_services,  blue_card1,blue_card2*/}
                 <div className="card text-white  mb-3 admincard ml-2 col remote_monitoring">
                    <div className='card_img_div'>
                       <img className="card-img adminimgone" src={doctorpharmacy} alt="Card image"></img>
                    </div>
                        <div class="card-img-overlay">
                            <h4 className="admincardhead"> Pharmacy</h4>
                        </div>
                        {/* <div className='admincard_round1 dark_card1'></div>
                        <div className='admincard_round2 dark_card2'></div> */}
                </div>
                 {/* css for the bloodbank card blood_bank,  blood_card1,blood_card2*/}
                <div className="card text-white  mb-3 admincard col-4 ml-2 remote_monitoring"  >
                                      <div className='card_img_div'>
                                          <MdOutlineWaterDrop className='adminimgone' style={{color:'black'}}/>
                                     </div>
                                     <div class="card-img-overlay d-flex">
                                           <h4 className="admincardhead">Blood Bank</h4>
                                     </div>
                                           {/* <div className='admincard_round1 blood_card1'></div>
                                           <div className='admincard_round2 blood_card2'></div> */}
                </div>
                           
            </div>
            

        </div>

    </div>
  )
}

export default Doctordashboard