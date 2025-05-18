import { Button, Dialog, DialogActions, DialogContent, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { setemptydocselectedservices, setispreviewdialoge } from '../../Store/DoctorFrame/DiagnosisSlice'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../../../assets/Logos/laafi_logo_horizontal-light_504X251_invert.jpg'
import { StyledTableCell, StyledTableRow } from '../../../Styles/Table'
import { GetPackageByPackageids, GetServicesByGroupId, GetServicesByServiceids, PostConsultation, PostDoctorconsultation } from '../../Store/Actions'
import { setemptyservicesbyserviceids } from '../../Store/AddservicesSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const Preveiw = (props) => {
  const navigate=useNavigate();
  const dispatch=useDispatch()
  const previewstatus=useSelector((state)=>state.DiagnosePatient.ispreviewdialoge)
  const services=useSelector((state)=>state.Addservices.servicesbyserviceids)
  const packages=useSelector((state)=>state.Addpackages.packagebypackageids)
  const postdoctorconsultationresult=useSelector((state)=>state.DiagnosePatient.Postdoctorconsultationresult)


  useEffect(()=>{
   if(props.data.ConsultationDetails.Services){
      dispatch(GetServicesByServiceids(props.data.ConsultationDetails.Services))
      dispatch(GetPackageByPackageids(props.data.ConsultationDetails.Packages))
   }
  },[props])

  const submitForm = (e) => {
    e.preventDefault();
    
    if(props.data && props.data.ConsultationDetails.ChiefComplaint && props.data.ConsultationDetails.HPI) {
      dispatch(PostDoctorconsultation(props.data, props.consultid))
        .then(() => {
         
          dispatch(setispreviewdialoge(false));
          toast('Consultation updated scucessfully')
          navigate('/doctor/doctordashboard', { 
            state: { focusSection: 'mypatients' } 
          });
          dispatch(setemptydocselectedservices());
          dispatch(setemptyservicesbyserviceids());
        })
        .catch(() => {
          // Handle any errors that weren't caught in the action
        });
    } else {
      toast('Please Fill Chief Complaint and HPI Fields');
    }
  }
  return (
    <div>
      <ToastContainer/>
      <Dialog open={previewstatus}
       PaperProps={{
        style: {
          width: '70%',  
          maxWidth: '1000px'
        },
      }}
      >
        <DialogContent style={{margin:'0',padding:0}}>
          <div className='previewmaindiv'>
            <div className='previewmaindiv_subdiv1'>
              <h3>PATIENT REPORT</h3>
              <img src={logo} style={{width:'80px'}}/>
            </div>
            <div className='previewmaindiv_subdiv2'>
              <div className='previewmaindiv_subdiv2_div'>
                <h5>Patient Demographics</h5>
                <hr></hr>
                <div className='d-flex justify-content-between'>
                  <p>Name :{props.patientdetails.PatientName}</p>
                  {/* <p>Age :{props.patientdetails.Age}</p> */}
                  <p>Gender :{props.patientdetails.Gender}</p>
                  <p>Occupation :{props.data && props.data.PatientHistory.Occupation=='' ?'N/A' : props.data.PatientHistory.Occupation }</p>
                </div>
                <div className='d-flex justify-content-between'>
                  <p>Type :{props.patientdetails.Type}</p>
                  <p>Doctor :{props.patientdetails.DoctorName}</p>
                  <p>Department :</p>
                  {props.patientdetails.DepartmentName}
                </div>
                <div className='d-flex justify-content-between'>
                  <p>Consultid :{props.consultid}</p>
                </div>
                <hr></hr>
                <div className='d-flex justify-content-between'>
                  <div className='allergydiv'>
                     <p>Chief Complaint :{props.data && props.data.ConsultationDetails.ChiefComplaint==null ?'N/A' : props.data.ConsultationDetails.ChiefComplaint}</p>
                  </div>
                  <div className='allergydiv'>
                     <p>Allergy :{props.patientdetails.Allergy==null ?'N/A' : props.patientdetails.Allergy }</p>                   </div>
                  </div>
                  <hr></hr>
                <h5>Patient History</h5>
                 <div className='patienthistory_div'>
                     <p>Family History :{props.data.PatientHistory.FamilyHistory==null ?'N/A' : props.data.PatientHistory.FamilyHistory }</p> 
                     <p>Past History :{props.data.PatientHistory.PastHistory==null ?'N/A' : props.data.PatientHistory.PastHistory }</p> 
                 </div>
                 <hr></hr>
                 <h5>Vital Science</h5>
                 <div className='vitalscience_div'>
                  <div>
                    <p>Systolic :{props.data.Chart.Systolic==0 ?'N/A' : props.data.Chart.Systolic }</p> 
                    <p>Diastolic :{props.data.Chart.Diastolic==0 ?'N/A' : props.data.Chart.Diastolic}</p> 
                    <p>Oxygen Saturation :{props.data.Chart.OxygenSaturation==0 ?'N/A' : props.data.Chart.OxygenSaturation }</p> 
                    <p>Pulse :{props.data.Chart.Pulse==0 ?'N/A' : props.data.Chart.Pulse }</p>
                  </div> 
                  <div>
                    <p>Respiratory Rate :{props.data.Chart.RespiratoryRate==0 ?'N/A' : props.data.Chart.RespiratoryRate}</p> 
                    <p>Temperature :{props.data.Chart.Temperature==0 ?'N/A' : props.data.Chart.Temperature }</p> 
                    <p>Weight :{props.data.Chart.Weight==0 ?'N/A' : props.data.Chart.Weight}</p> 
                    <p>Notes :{props.data.Chart.Notes==null?'N/A' : props.data.Chart.Notes}</p>
                  </div>
                 </div>
                 <hr></hr>
                 <h5>Consultation Details</h5>
                  <div className='cheifcomplain_div'>
                      <p>Final Diagnosis :{props.data.ConsultationDetails.FinalDiagnosis==null ?'N/A' : props.data.ConsultationDetails.FinalDiagnosis}</p>
                      <p>HPI :{props.data.ConsultationDetails.HPI==null ?'N/A' : props.data.ConsultationDetails.HPI}</p>
                      <p>Systemic Examination :{props.data.ConsultationDetails.SystemicExamination==null ?'N/A' : props.data.ConsultationDetails.SystemicExamination}</p>
                  </div>
                  <hr></hr>
                  <h5>Additional Information</h5>
                  <div className='cheifcomplain_div'>
                    {props.template &&  props.template.SpecialityInfos.length>0 && props.template.SpecialityInfos.map((item)=>{
                     
                      return <p >{item.FieldName}: {item.Value}</p>
                      
                    })}
                  </div>
                  <hr></hr>
                  <div className='service_packagemaindiv'>
                    <div>
                      <h5>Services</h5>
                       <div className='service_packagemainsub'>
                        {services && services.length>0 && services.map((item)=>(
                          <p>{item.ServiceName}</p>
                        ))}
                       </div>
                    </div>
                    <div>
                      <h5>Packages</h5>
                      <div className='service_packagemainsub'>
                        {packages && packages.length>0 && packages.map((item)=>(
                          <p>{item.Name}</p>
                        ))}
                       </div>
                    </div>
                  </div>
                  <h5>Prescription</h5>
                    <div>
                      {props.medicine &&props.medicine.length>0 &&(
                      <TableContainer>
                       <Table>
                        <TableHead>
                          <StyledTableCell align='center'>MEDICINE NAME</StyledTableCell>
                          <StyledTableCell align='center'>HOW MANY TIMES/DAY</StyledTableCell>
                          <StyledTableCell align='center'>WHEN TO TAKE</StyledTableCell>
                          <StyledTableCell align='center'>BEFORE FOOD/AFTER FOOD</StyledTableCell>
                          <StyledTableCell align='center'>TOTAL DAYS</StyledTableCell>
                        </TableHead>
                        <TableBody>
                          {props.medicine.map((item)=>(
                          <StyledTableRow>
                            <StyledTableCell>{item.medicinename}</StyledTableCell>
                            <StyledTableCell>{item.dosage}</StyledTableCell>
                            <StyledTableCell>{item.when_to_take}</StyledTableCell>
                            <StyledTableCell>{item.before_after}</StyledTableCell>
                            <StyledTableCell>{item.no_of_days}</StyledTableCell>
                          </StyledTableRow>
                          ))}
                        </TableBody>
                       </Table>
                      </TableContainer>
                      ) }
                    </div>
                  <hr></hr>

              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions className='d-flex justify-content-center'>
          <Button onClick={submitForm}>submit</Button>
          <Button onClick={()=>dispatch(setispreviewdialoge(false))}>Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Preveiw
