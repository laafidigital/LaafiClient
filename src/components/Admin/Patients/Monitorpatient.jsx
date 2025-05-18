import React, { useState } from 'react'
import img1 from "../../../assets/admindoctorimg/men1.jpg"
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';



const Monitorpatient = () => {

  const monitordata=useSelector((state)=>state.MonitorPatient.monitorPatients) 

  
  const [dialogeOpen,setdialogeOpen]=useState(false)
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedData,setselectedData]=useState(null)

  
  const handleToggleExpansion = (row) => {
    setselectedData(row)

    setIsExpanded(prev => !prev);
    setdialogeOpen(true)
  };
  const handleCloseDialoge=()=>{
    setdialogeOpen(false)
  }

  return (
    <div className='servicemaindiv'>
      <div className='monitor_main'>
        {monitordata && monitordata.map((item)=>(
        <div className='monitor_subdiv'>
          <div className='monitor_mrn_div'>
            <h6>MRN</h6>
            <p>{item.mrn}</p>
          </div>
          <div className='display_div'> 
            <h6>VIEW MORE</h6>
            <IconButton onClick={()=>handleToggleExpansion(item)} className={`rotate-icon ${isExpanded ? 'rotated' : ''} display-button`}>
              {isExpanded ? <KeyboardDoubleArrowUpIcon /> : <KeyboardDoubleArrowRightIcon />}
            </IconButton>
          </div>
      </div>
        ))}
      </div>
      <Dialog open={dialogeOpen} onClose={handleCloseDialoge}>
        <DialogContent>
          {selectedData &&(
          <div>
            <div>
              <h6>BLOOD PRESSURE</h6>
              <p>{selectedData.bp}</p>
            </div>
          </div>
          ) }
        </DialogContent>
      </Dialog>
        
    </div>
  )
}

export default Monitorpatient