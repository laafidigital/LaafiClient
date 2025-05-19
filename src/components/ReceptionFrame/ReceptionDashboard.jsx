import React from 'react'
import admincardoneimg from '../../assets/admincardimg/person-gear.svg'
import admincardtwoimg from '../../assets/admincardimg/clipboard2-pulse.svg'
import doctorcardthree from '../../assets/admincardimg/prescription.svg'
import { MdOutlineWaterDrop } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import doctorpharmacy from '../../assets/admincardimg/capsule.svg'

const ReceptionDashboard = () => {

    const navigate=useNavigate()

    const clickPatientdetails=()=>{
        navigate('dashboard')
    }

    const clicklabdetails=()=>{
        navigate('../addservices')
    }

    const clickconsultpatients=()=>{
        navigate('../pharmacydetails')
    }
  return (
    <div className='Dashboard_maindiv'>
        <div className='admindashmain '>
            <div className='row'>

                <div className="card text-white  mb-3 admincard col ml-2 patient_history" onClick={clickPatientdetails}>
                    <div className='card_img_div'>
                       <img className="card-img adminimgone" src={admincardoneimg} alt="Card image" ></img>
                    </div>
                    <div className="card-img-overlay ">
                        <h4 className="admincardhead" >Todays Patient/History</h4>
                    </div>
                    <div className='admincard_round1 purple_card1'></div>
                 <div className='admincard_round2 purple_card2'></div>
                </div>

                <div className="card text-white  mb-3 lab_summary admincard col ml-2" onClick={clicklabdetails} >
                    <div className='card_img_div'>
                       <img className="card-img adminimgone" src={admincardtwoimg} alt="Card image"></img>
                    </div>
                    <div class="card-img-overlay" >
                        <h4 className="admincardhead">Lab Details</h4>
                    </div>
                    <div className='admincard_round1 red_card1'></div>
                    <div className='admincard_round2 red_card2'></div>
                </div>

                 {/* <div className="card text-white roombookingcard mb-3 admincard ml-2 col-4"  >
                    <div className='card_img_div'>
                        <img className="card-img adminimgone" src={doctorcardthree } alt="Card image"></img>
                    </div>
                    <div class="card-img-overlay" >
                        <h4 className="admincardhead"> Consulted Patients</h4>
                    </div>
                    <div className='admincard_round1 yellow_card1'></div>
                    <div className='admincard_round2 yellow_card1'></div>
                </div> */}
            </div>

            <div className='row'>
                
            </div>
            <div className='row'>
                <div className="card text-white remote_monitoring mb-3 admincard col ml-2 col-4">
                   <div className='card_img_div'>
                       <img className="card-img adminimgone" src={doctorpharmacy} alt="Card image"></img>
                   </div>   
                    <div class="card-img-overlay">
                        <h4 className="admincardhead"> Stock Out</h4>
                    </div>
                    {/* <div className='admincard_round1' style={{backgroundColor:'#939c16'}}></div>
                    <div className='admincard_round2' style={{backgroundColor:'#adaf12'}}></div> */}
                </div>
                {/* css : blood_bank,onclick:navigate('requestdonation')*/}
                <div className="card text-white  mb-3 admincard col-4 ml-2 remote_monitoring" >
                    <div className='card_img_div'>
                           <MdOutlineWaterDrop className='adminimgone'/>
                    </div>
                    <div class="card-img-overlay d-flex">
                        <h4 className="admincardhead">Blood Bank</h4>
                    </div>
                    {/* <div className='admincard_round1 blood_card1'></div>
                    <div className='admincard_round2 blood_card1'></div> */}
                </div>

            </div>
            

        </div>

    </div>
  )
}

export default ReceptionDashboard