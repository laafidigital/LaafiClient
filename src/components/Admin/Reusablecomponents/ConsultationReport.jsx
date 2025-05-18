import { Button, Dialog, DialogActions, DialogContent, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { setispreviewdialoge } from '../../Store/DoctorFrame/DiagnosisSlice'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../../../assets/Logos/laafi_logo_horizontal-light_504X251_invert.jpg'
import { StyledTableCell, StyledTableRow } from '../../../Styles/Table'
import { GetOutPatientReport, GetPackageByPackageids, GetServicesByGroupId, GetServicesByServiceids, PostConsultation, PostDoctorconsultation } from '../../Store/Actions'
import { setemptyconsultationreport, setreportstatus } from '../../Store/DashboardSlice'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'


const ConsultationReport = (props) => {
  const dispatch=useDispatch()
  

  const consultationreport=useSelector((state)=>state.Dashboard.consultationreport)
  const reportstatus=useSelector((state)=>state.Dashboard.reportstatus)

  

  

  useEffect(()=>{
      dispatch(GetOutPatientReport(props.data))
      
  },[props])

  const submitPrint=()=>{
    const capture=document.querySelector('.previewmaindiv')
    html2canvas(capture).then((canvas)=>{
      const imgData=canvas.toDataURL('img/png')
      const doc = new jsPDF('p','mm','a4')
      const componentWidth=doc.internal.pageSize.getWidth()
      const componentHeight=doc.internal.pageSize.getHeight()
      doc.addImage(imgData,'PNG',0,0,componentHeight,componentWidth)
      doc.save('report.pdf')
    })
  }

  
  return (
    <div>
      {consultationreport &&(
      <Dialog open={reportstatus}
       PaperProps={{
        style: {
          width: '70%',  
          maxWidth: '1000px',
          minHeight:'10rem'
        },
      }}
      >
        <DialogContent style={{margin:'0',padding:0}}>
          {consultationreport && consultationreport.Consultation && consultationreport.Consultation.ConsultStatus ?(
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
                  <p>Name :{consultationreport.Consultation.PatientName}</p>
                  {/* <p>Age :{consultationreport.Consultation.Age}</p> */}
                  <p>Gender :{consultationreport.Consultation.Gender}</p>
                  <p>Date :{consultationreport.Consultation.ConsultationDate}</p>
                  {/* <p>Occupation :{consultationreport.PatientHistory.Occupation=='' ?'N/A' : consultationreport.PatientHistory.Occupation }</p> */}
                </div>
                <div className='d-flex justify-content-between'>
                  <p>Type :{consultationreport.Consultation.Type}</p>
                  <p>Doctor :{consultationreport.Consultation.DoctorName}</p>
                  <p>Department :{consultationreport.Consultation.DepartmentName}</p>
                </div>
                <div className='d-flex justify-content-between'>
                  <p>Consultid :{consultationreport.Consultation.Id}</p>         
                </div>
                <hr></hr>
                <div className='d-flex justify-content-between'>
                  <div className='allergydiv'>
                     <p>Chief Complaint :{consultationreport.Consultation.ChiefComplaint==null ?'N/A' : consultationreport.Consultation.ChiefComplaint}</p>
                  </div>
                  <div className='allergydiv'>
                     <p>Allergy :{consultationreport.Consultation.Allergy==null ?'N/A' : consultationreport.Consultation.Allergy }</p>                   </div>
                </div>
                  <hr></hr>
                <h5>Patient History</h5>
                 <div className='patienthistory_div'>
                     <p>Family History :{consultationreport.Consultation.FamilyHistory==null ?'N/A' : consultationreport.Consultation.FamilyHistory }</p> 
                     <p>Past History :{consultationreport.Consultation.PastHistory==null ?'N/A' : consultationreport.Consultation.PastHistory }</p> 
                 </div>
                 <hr></hr>
                 {consultationreport.PatientChart !==null &&(
                  <>
                 <h5>Vital Science</h5>
                 <div className='vitalscience_div'>
                  <div>
                    <p>Systolic :{consultationreport.PatientChart && consultationreport.PatientChart.Systolic==0 ?'N/A' : consultationreport.PatientChart.Systolic }</p> 
                    <p>Diastolic :{consultationreport.PatientChart && consultationreport.PatientChart.Diastolic==0 ?'N/A' : consultationreport.PatientChart.Diastolic}</p> 
                    <p>Oxygen Saturation :{consultationreport.PatientChart && consultationreport.PatientChart.OxygenSaturation==0 ?'N/A' : consultationreport.PatientChart.OxygenSaturation }</p> 
                    <p>Pulse :{ consultationreport.PatientChart && consultationreport.PatientChart.Pulse==0 ?'N/A' : consultationreport.PatientChart.Pulse }</p>
                  </div> 
                  <div>
                    <p>Respiratory Rate :{consultationreport.PatientChart && consultationreport.PatientChart.RespiratoryRate==0 ?'N/A' : consultationreport.PatientChart.RespiratoryRate}</p> 
                    <p>Temperature :{ consultationreport.PatientChart && consultationreport.PatientChart.Temperature==0 ?'N/A' : consultationreport.PatientChart.Temperature }</p> 
                    <p>Weight :{consultationreport.PatientChart && consultationreport.PatientChart.Weight==0 ?'N/A' : consultationreport.PatientChart.Weight}</p> 
                    <p>Notes :{consultationreport.PatientChart && consultationreport.PatientChart.Notes==null?'N/A' : consultationreport.PatientChart.Notes}</p>
                  </div>
                 </div>
                  </>
                 )}
                 <hr></hr>
                 <h5>Consultation Details</h5>
                  <div className='cheifcomplain_div'>
                      <p>Final Diagnosis :{consultationreport.Consultation.FinalDiagnosis==null ?'N/A' : consultationreport.Consultation.FinalDiagnosis}</p>
                      <p>HPI :{consultationreport.Consultation.HPI==null ?'N/A' : consultationreport.Consultation.HPI}</p>
                      <p>Systemic Examination :{consultationreport.Consultation.SystemicExamination==null ?'N/A' : consultationreport.Consultation.SystemicExamination}</p>
                  </div>
                  <hr></hr>
                  <h5>Additional Information</h5>
                  <div className='cheifcomplain_div'>
                    {props.template && props.template.length>0 && props.template.map((item)=>{
                      if(consultationreport.AdditionalInfo && consultationreport.AdditionalInfo.length > 0){
                        const matchingInfo =consultationreport.AdditionalInfo.find(innerittem => innerittem.TemplateId === item.Id)
                        
                        if (matchingInfo) {
                          return (
                            <p key={item.Id}>{item.FieldName}: {matchingInfo.Value}</p>
                          );
                        } else {
                          return (
                            <p key={item.Id}>{item.FieldName}: N/A</p>
                          );
                        }
                      }
                      else{
                        return(
                          <p key={item.Id}>{item.FieldName}: N/A</p>
                        )
                      }
                    })}
                  </div>
                  <hr></hr>
                  <div className='service_packagemaindiv'>
                    <div>
                      <h5>Services</h5>
                       <div className='service_packagemainsub'>
                        {consultationreport.Labs && consultationreport.Labs.length>0 && consultationreport.Labs.map((item)=>(
                          <p>{item.IsPackage==false ? item.Service_PackageName:''}</p>
                        ))}
                       </div>
                    </div>
                    <div>
                      <h5>Packages</h5>
                      <div className='service_packagemainsub'>
                      {consultationreport.Labs && consultationreport.Labs.length>0 && consultationreport.Labs.map((item)=>(
                          <p>{item.IsPackage==true ?item.Service_PackageName :''}</p>
                        ))}
                       </div>
                    </div>
                  </div>
                  <h5>Prescription</h5>
                    <div>
                      {consultationreport.Prescriptions &&consultationreport.Prescriptions.length>0 &&(
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
                          {consultationreport.Prescriptions.map((item)=>(
                          <StyledTableRow>
                            <StyledTableCell align='center'>{item.medicinename}</StyledTableCell>
                            <StyledTableCell align='center'>{item.Dosage}</StyledTableCell>
                            <StyledTableCell align='center'>{item.WhenToTake}</StyledTableCell>
                            <StyledTableCell align='center'>{item.BeforeAfter}</StyledTableCell>
                            <StyledTableCell align='center'>{item.NumberOfDays}</StyledTableCell>
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
          ):(
            <h4 className='no_apponmentheading'>Sorry Consultation Not Completed</h4>
          )}
          
        </DialogContent>
        <DialogActions className='d-flex justify-content-center'>
          <Button onClick={()=>{
            dispatch(setreportstatus(false))
            dispatch(setemptyconsultationreport())
            }}>close
            </Button>
            {consultationreport && consultationreport.Consultation && consultationreport.Consultation.ConsultStatus &&(
              <Button onClick={submitPrint}>Download</Button>
            )}
        </DialogActions>
      </Dialog>
      )}
    </div>
  )
}

export default ConsultationReport
