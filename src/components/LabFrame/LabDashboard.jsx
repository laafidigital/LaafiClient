import React from 'react'
import admincardoneimg from '../../assets/admincardimg/person-gear.svg'
import admincardtwoimg from '../../assets/admincardimg/clipboard2-pulse.svg'
import doctorcardthree from '../../assets/admincardimg/prescription.svg'
import { useNavigate } from 'react-router-dom'
import { MdOutlineWaterDrop } from "react-icons/md";
import doctorpharmacy from '../../assets/admincardimg/capsule.svg'
import doctorarticle from '../../assets/admincardimg/journal-richtext.svg'


const LabDashboard = () => {
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

  return (
     <div className='Dashboard_maindiv'>
        <div className='admindashmain '>
            <div className='row'>

            <div className="card text-white  mb-3 admincard col ml-2 patient_footfall" onClick={clickPatientdetails}>
               <div className='card_img_div'>
                    <img className="card-img adminimgone" src={admincardoneimg} alt="Card image" ></img>
               </div>
                  <div className="card-img-overlay ">
                     <h4 className="admincardhead" >Patient Details</h4>
                 </div>
                 <div className='admincard_round1 green_card1'></div>
                 <div className='admincard_round2 green_card2'></div>
            </div>

            <div className="card text-white  mb-3 admincard col ml-2 lab_summary" onClick={clicklabdetails}>
                <div className='card_img_div'>
                    <img className="card-img  adminimgone" src={admincardtwoimg} alt="Card image"></img>
                </div>
                <div class="card-img-overlay">
                     <h4 className="admincardhead">Lab Details</h4>
                </div>
                <div className='admincard_round1 red_card1'></div>
                <div className='admincard_round2 red_card2'></div>
            </div>

            {/* <div className="card text-white  mb-3 admincard col ml-2 roombookingcard" onClick={clickconsultpatients} >
              <div className='card_img_div'>
                  <img className="card-img adminimgone" src={doctorcardthree} alt="Card image"></img>
              </div>
                <div class="card-img-overlay">
                    <h4 className="admincardhead">Consulted Patients</h4>
                </div>
                <div className='admincard_round1 yellow_card1' ></div>
                <div className='admincard_round2 yellow_card2' ></div>
            </div> */}
            </div>

            <div className='row'>
                 {/* <div className="card text-white bg-primary mb-3 admincard ml-2 col-4"  >
                    <img className="card-img adminimgone" src={doctorpharmacy} alt="Card image"></img>
                        <div class="card-img-overlay">
                            <h4 className="admincardhead"> Pharmacy</h4>
                        </div>
                </div> */}
                <div className="card text-white  mb-3 admincard ml-2 col-4 remote_monitoring" style={{backgroundColor:'#85898d'}} >
                     <div className='card_img_div'>
                       <img className="card-img adminimgone" src={doctorarticle} alt="Card image"></img>
                     </div>
                    <div class="card-img-overlay">
                        <h4 className="admincardhead"> Your Article</h4>
                    </div>
                    <div className='admincard_round1 dark_card1'></div>
                    <div className='admincard_round2 dark_card2'></div>
                </div>

                <div className="card text-white  mb-3 admincard col-4 ml-2 blood_bank"  onClick={()=>{navigate('requestdonation')}} >
                    <div className='card_img_div'>
                           <MdOutlineWaterDrop className='adminimgone'/>
                    </div>
                    <div class="card-img-overlay d-flex">
                        <h4 className="admincardhead">Blood Bank</h4>
                    </div>
                    <div className='admincard_round1 blood_card1'></div>
                    <div className='admincard_round2 blood_card2'></div>
                </div>
            </div>
            

        </div>

    </div>
  )
}

export default LabDashboard