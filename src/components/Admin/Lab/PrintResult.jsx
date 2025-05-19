import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setconsultationarray } from '../../Store/AddpatientSlice';
import { GetTodaysLabreports } from '../../Store/Actions';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor:'#008080',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
const PrintResult = () => {

  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {id}=useParams()
  const isDashboardRoute = useLocation().pathname.includes('/printresult/');
  const Id = isDashboardRoute && id ? parseInt(id) : undefined;
 
  const patientdata=useSelector((state)=>state.Addpatentdetails.consultationarray)
  const todayslabResult=useSelector((state)=>state.Results.todaysLabresult)

  const [filtermrn,setfiltermrn]=useState(null)


  useEffect(()=>{
    dispatch(GetTodaysLabreports())
  },[])

  useEffect(() => {
    if (Id) {
      const filtetTodaysReport=todayslabResult.filter(item=>item.consultID===Id)
      setfiltermrn(filtetTodaysReport)
     
    } 
  }, [ todayslabResult]);
  const currentDateTime = new Date().toLocaleString();

  const submitPrint=()=>{
    const capture=document.querySelector('.printresult_main')
    html2canvas(capture).then((canvas)=>{
      const imgData=canvas.toDataURL('img/png')
      const doc = new jsPDF('p','mm','a4')
      const componentWidth=doc.internal.pageSize.getWidth()
      const componentHeight=doc.internal.pageSize.getHeight()
      doc.addImage(imgData,'PNG',0,0,componentHeight,componentWidth)
      doc.save('reciept.pdf')
    })
    
    // const updateddata={
    //   ...filtermrn[0],
    //   paymentstatus:true
    // }
    // dispatch(setconsultationarray(updateddata))
    // navigate('../results')
  }


  return (
    <div className='Dashboard_maindiv'>
           <Button variant='contained' className='m-2' sx={ { borderRadius: 28,height:30 } } onClick={()=>navigate('../results')} >back</Button>
        <div className='pt-5'>
          {filtermrn !==null &&(
            <div className='printresult_main ' >
                <div className='d-flex justify-content-between '>
                {/* {filtermrn && filtermrn.map(item => item.name && (<h6>Name: {item.name}</h6>))} */}
                    <h6>{currentDateTime}</h6>
                </div>
                <div className='d-flex justify-content-center'>
                    <h6>
                    Cash Bill (License No. KA-B12-159413/17)<br></br>
                    ABC PHARMA<br></br>
                
                    </h6>
                </div>
              
                  <div className='d-flex justify-content-center' >
                <div className='pt-5 align-item-center' style={{width:'700px',}}>
                {/* {filtermrn[0].name&&(
                  <div className='row'>
                  <div className='col'>
                      <h6>Name</h6>
                    </div>
                    <div  className='col'>
                      <h6>{filtermrn[0].name}</h6>
                    </div>
                  </div>
                  )} */}
                  {/* {filtermrn[0].doctor&&(
                  <div className='row'>
                  <div className='col'>
                      <h6>Doctor</h6>
                    </div>
                    <div  className='col'>
                      <h6>{filtermrn[0].doctor}</h6>
                    </div>
                  </div>
                  )} */}
                  {/* {filtermrn[0].allergy&&(
                     <div className='row'>
                     <div className='col'>
                         <h6>Allergy</h6>
                       </div>
                       <div  className='col'>
                         <h6>{filtermrn[0].allergy}</h6>
                       </div>
                     </div>
                  )} */}
                 
                  </div>
                  </div>
                
                  <div style={{ maxHeight: '70vh', overflowY: 'auto', marginTop:'40px' }}>
                      <TableContainer component={Paper}>
                        {filtermrn !==null &&(
                          <Table  sx={{ minWidth: 700 }} aria-label="customized table">
                              <TableHead>
                                <TableRow>
                                <StyledTableCell align="center">Services</StyledTableCell>
                                <StyledTableCell align="center">Specimen</StyledTableCell>
                                <StyledTableCell align="center">Min val</StyledTableCell>
                                <StyledTableCell align="center">Max val</StyledTableCell>
                                <StyledTableCell align="center">Actual</StyledTableCell>
                                <StyledTableCell align="center">Observation</StyledTableCell>
                                <StyledTableCell align="center">price</StyledTableCell>
                                </TableRow>
                              </TableHead>
                       
                              <TableBody>
                                {filtermrn.map((row,index)=>(
                                  <StyledTableRow key={index}>
                                      <StyledTableCell align="center">{row.serv.serviceName}</StyledTableCell>
                                      <StyledTableCell align="center">{row.specimen}</StyledTableCell>
                                      <StyledTableCell align="center">{row.serv.minVal}</StyledTableCell>
                                      <StyledTableCell align="center">{row.serv.maxVal}</StyledTableCell>
                                      <StyledTableCell align="center">{row.actualValue}</StyledTableCell>
                                      <StyledTableCell align="center">{row.observation}</StyledTableCell>
                                      <StyledTableCell align="center">{row.serv.price}</StyledTableCell>
                                  </StyledTableRow>
                                ))}
                                <StyledTableRow>
                                  <StyledTableCell></StyledTableCell>
                                  <StyledTableCell></StyledTableCell>
                                   {/* <StyledTableCell align="center">Total Amount : {filtermrn[0].labdetails.map((item)=>item.totalLabprice)}</StyledTableCell> */}
                                   <StyledTableCell></StyledTableCell>
                                  <StyledTableCell></StyledTableCell>
                                  <StyledTableCell></StyledTableCell>
                                </StyledTableRow>
                          </TableBody>
                        
                          </Table>
                        )}
                      </TableContainer>

                    </div>
                

            </div>
          )}
    </div>
            <div className='d-flex justify-content-center'>
            <Button variant='contained' className='m-2' sx={ { borderRadius: 28,height:30 } } onClick={submitPrint} >Download</Button>
            </div>
</div>
  )
}

export default PrintResult