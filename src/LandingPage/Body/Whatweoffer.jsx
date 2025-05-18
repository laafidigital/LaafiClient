import React from 'react'
import { LuLock } from "react-icons/lu";
import { MdOutlineWaterDrop } from "react-icons/md";
import { FaRegCirclePlay } from "react-icons/fa6";
import { MdLocalHospital } from "react-icons/md";
import { ImLab } from "react-icons/im";
import { IoIosCalendar } from "react-icons/io";
import { BsPersonCheck } from "react-icons/bs";
import { FaRobot } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import { MdMonitorHeart } from "react-icons/md";
import { GiVacuumCleaner } from "react-icons/gi";

const Whatweoffer = () => {
    const section1card=['Secure Authentication','Blood Bank','Online Consultation']
    const section2card=['Patient Management','Labs','Scheduling','Human Resources']
    const section3card=['AI Diagnosis','Pharmacy','Remote Monitoring','HouseKeeping']
    const section1icons=[<LuLock/>,<MdOutlineWaterDrop/>,<FaRegCirclePlay/>]
    const section2icons=[<MdLocalHospital/>,<ImLab/>,<IoIosCalendar/>,<BsPersonCheck/>]
    const section3icons=[<FaRobot/>,<GiMedicines/>,<MdMonitorHeart/>,<GiVacuumCleaner/>]
  return (
    <div className='aboutlaafi'>
        <h2>What we offer</h2>
        <div className='whatseoffersecition1_main'>
            {section1card.map((item,index)=>{
                let classCard='offersec1card'
                index==0? classCard+=' secureauth' : index==1 ? classCard += ' bloodbank' : classCard += ' onlineconsutation';
                return(
                <div className={classCard}>
                    <div>
                         {section1icons[index]}
                    </div>
                    <h4>{item}</h4>
                </div>
                )
            })}
           
        </div>
        <div className='whatseoffersecition1_main'>
        {section2card.map((item,index)=>{
                let classCard2='offersec2card'
                index==0? classCard2+=' pateintmana' : index==1 ? classCard2 += ' labs' : index==2 ? classCard2 += ' scheduling': classCard2 += ' scheduling';
                return(
                    <div className={classCard2}>
                        <div>
                        {section2icons[index]}
                        </div>
                        <h4>{item}</h4>
                    </div>
                )
            })}

           {section3card.map((item,index)=>{
                let classCard2='offersec2card'
                index==0? classCard2+=' pateintmana' : index==1 ? classCard2 += ' labs' : index==2 ? classCard2 += ' remotemonitor': classCard2 += ' housekeeping';
                return(
                    <div className={classCard2}>
                        <div>
                        {section3icons[index]}
                        </div>
                        <h4>{item}</h4>
                    </div>
                )
            })}
        </div>
      
    </div>
  )
}

export default Whatweoffer
