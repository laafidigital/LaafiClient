import React, { useEffect, useState } from 'react'
import { Button, MenuItem } from '@mui/material'
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import {TextField} from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddIcon from '@mui/icons-material/Add';
import Purchase from './Purchase'
import Sales from './Sales'
import Expired from './Expired'
import Inventory from './Inventory'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPharmacyData } from '../../Store/PharmacydetailsSlice';
import { color } from '@mui/system';


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

  const StyledSelect = styled(Select)(({ theme }) => ({
    width:'80px',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
       // Set the border color to white
      },
      '&:hover fieldset': {
        borderColor: 'white', // Set the border color to white on hover
      },
    },
    '& .MuiSelect-select': {
      color: 'black', // Set the text color to white
      '&:focus': {
        backgroundColor: 'transparent', // Set the background color to transparent when focused
      },
    },
    '& .MuiSelect-icon': {
      color: 'black', // Set the dropdown icon color to white
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '1px',
      borderColor: 'black', // Set the border color to white
    },
  }));
  
  const StyledDialoge = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
      maxWidth: '1000px',
      overflowX:'hidden',
      overflowY:'hidden',
      maxHeight:'100vh', // Set your desired width here
      padding: 0, // Remove padding
      marginLeft: 0, // Remove margin
    },
  }));
  
  
  
  
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Addmedicine = () => {

  const dispatch=useDispatch()
  const navigate=useNavigate()
   const {id}=useParams()

   const Id=parseInt(id)

   const consultationArray=useSelector((state)=>state.Addpatentdetails.consultationarray)
   const purchasedata=useSelector((state)=>state.purchase.purchaseArray)
   const pharmacyDetailsArray=useSelector((state)=>state.PharmacyDetails.PharmacyData)
 
   
   const [printdata,setprintdata]=useState()
   const [isShow,setisShow]=useState(false)
   const [rowsToAdd, setRowsToAdd] = useState([]);
   const [filterMRPArray,setfilterMRPArray]=useState()
   const [addTotal,setaddTotal]=useState(0)
   const [newmedicalDeatails,setnewmedicalDetails]=useState()
   const [medicineList, setMedicineList] = useState([]);
   const [data,setdata]=useState()
   const [Open,setOpen]=useState(false)
   const [creditInput,setcreditInput]=useState({paid:'',balance:''})

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add 1 to month because it's zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

   
   useEffect(()=>{
    const filterpatient=consultationArray.filter((item)=>item.mrnno === Id)
    setprintdata(filterpatient)

    const filterPatientMedName=filterpatient.map((item)=> 
    item.doctordetails && item.doctordetails.medicindata && item.doctordetails.medicindata.map((items)=>items.medicinename))
   

    if(filterPatientMedName[0]){
      let i = 0;
        while (i < filterPatientMedName.length) {
          const filterMRP = purchasedata.filter((item) =>
            filterPatientMedName[0].includes(item.items)
          );
          setfilterMRPArray(filterMRP); 
          i++;
        }
      }
    },[consultationArray,purchasedata])
    


    useEffect(()=>{
      if(printdata && filterMRPArray){
        const newData = printdata.map((item)=>{
          if(item.doctordetails && item.doctordetails.medicindata){
            const updatedMedData = item.doctordetails.medicindata.map((med,index)=>{
              const mrp = filterMRPArray[index];
              const sum=mrp.MRPone * med.total_med
        
              caluculateTotal(mrp,med)
              return{
                ...med,sum
              }
            })
            return{
            //   ...item,
            //   doctordetails: {
            //     ...item.doctordetails,
                 name:printdata[0].name,
                 doctor:printdata[0].doctor,
                 mrnno:printdata[0].mrnno,
                 number:printdata[0].number,
                 updatedMedData,
            //   },
            }
          }
          // return item;
        })
        setdata(newData);
      }
    },[printdata, filterMRPArray])

    
    
    const caluculateTotal=(mrp,medTotal)=>{
  
       const sum= mrp.MRPone * medTotal.total_med;
    
       setaddTotal((prevTotal) => prevTotal + sum);
      }


     const changenNewinput=(e)=>{
      const{name,value}=e.target
 
      if(name==='medicinename'||name==='medicine_time'){
        setnewmedicalDetails((prevdata)=>({
         ...prevdata,
         [name]:value
        }))
      } 
      else{
        setnewmedicalDetails((prevdata)=>({
          ...prevdata,
          [name]:parseInt(value)
         }))
      }
      }

      const clickAddBtn=()=>{
        setisShow(true)
        setRowsToAdd((prevRows) => [{}]);
        if(newmedicalDeatails){
          setMedicineList((prevdata)=>[...prevdata,newmedicalDeatails])
          setnewmedicalDetails({total_med:'',medicinename:'',MRPone:'',medicine_time:'',sum:''})     
        }
      }

      const overAlltotal=()=>{
        let totalVal = 0;
        if(addTotal){
          totalVal+=addTotal
        }
        if(newmedicalDeatails &&newmedicalDeatails.sum ){
          totalVal+=newmedicalDeatails.sum
        }
        if(medicineList && medicineList.length>0){
          medicineList.forEach((item)=>(
            totalVal+=item.sum
            ))
          }
    
          setaddTotal(totalVal)
      }
   

    const clisksubmitBtn=(ispaid)=>{
 
      if(ispaid==='pending'){
        setOpen(true)
      }
      if (newmedicalDeatails) {
        setdata((prevdata) => {
          return prevdata.map((item) => {
            if (item.updatedMedData && item.updatedMedData.length > 0) {
              return {
                ...item,
                updatedMedData: [...item.updatedMedData, newmedicalDeatails],
                total: addTotal,
                date:formattedDate,
                payment:ispaid
              };
            }
            return {
              item,
            };
          });
        });
        setMedicineList([])
         setisShow(false)         
      }
      if (medicineList && medicineList.length > 0) {
        setdata((prevdata) => {
          return prevdata.map((item) => {
            if (item.updatedMedData && item.updatedMedData.length > 0) {
              const updatedMedData = item.updatedMedData.map((innerItem)=>{
                return{
                  ...innerItem,
                }
              })
              const combinedMedicineList = [].concat(...updatedMedData, ...medicineList);
              return {
                ...item,
                updatedMedData: combinedMedicineList,
                total: addTotal,
                date:formattedDate,
                payment:ispaid
              };
            }
            return item;
          });
        });
         setMedicineList([])
         setisShow(false)
      }
      else{
        setdata((prevdata)=>{
          return prevdata.map((item)=>{
          return{
            ...item,
            total: addTotal,
            payment:ispaid,
            date:formattedDate,
          }
        })
        })}
    }

    const closedialoge=()=>{
      setOpen(false)
    }

    const creditAmountChange=(e)=>{
     const {name,value}=e.target
     setcreditInput((prevdata)=>({
      ...prevdata,
      paid:parseInt(value)
     }))
    }

    const creditBalance=()=>{
      let balanceamount=addTotal-creditInput.paid
      setcreditInput((prevdata)=>({
        ...prevdata,
        balance:balanceamount
      }))
    }
    const creditsubmit=()=>{
      if(creditInput.balance===''){
        let balanceamount=addTotal-creditInput.paid
        setdata((prevdata)=>{
          const newData = prevdata.map((item) => ({
            ...item,
            paid: creditInput.paid,
            balance: balanceamount
          }));
          dispatch(setPharmacyData(newData[0]))
          navigate('../pharmacy')
        }
        )
      }
      else{
        setdata((prevdata)=>{
          const newData=prevdata.map((item)=>({
            ...item,
            paid: creditInput.paid,
            balance: creditInput.balance
          }))
          dispatch(setPharmacyData(newData[0]))
          navigate('../pharmacy')
        })
      }
      setOpen(false)   
      
    }

    const submitForm=(e)=>{
      e.preventDefault()
   
      dispatch(setPharmacyData(data[0]))
      navigate('../pharmacy')
    }

  
  return (
    <div className='Dashboard_maindiv'>
    <div className='d-flex'  style={{position:'fixed'}}>
        <Button variant='contained' className='m-2' sx={ { borderRadius: 28 ,height:30} } onClick={()=>navigate('../pharmacy')}>back</Button>
    </div>
    {/* {currentComponent=='addmedicine' &&( */}
    <div className='pt-5'>
      <form onSubmit={submitForm}>
    <div className='printresult_main p-2 '>
        <div className='d-flex justify-content-between '>
            <h6>Bill No:110</h6>
            <h6>Date:{formattedDate}</h6>
         </div>
         <div className='d-flex justify-content-center'>
            <h6>
            Cash Bill (License No. KA-B12-159413/17)<br></br>
            KRUTHIKA PHARMA<br></br>
            Nanjappa Cross, Vidyaranyapura Main Road, Bangalore - 560097
            </h6>
         </div>
         <div className='d-flex justify-content-between'>
            <h6>Name:{printdata && printdata[0].name}</h6>
            <h6>Doctor:{printdata && printdata[0].doctor}</h6>
        </div>
        <div className='pt-3'>
        <TableContainer component={Paper} >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Quantity</StyledTableCell>
            <StyledTableCell align="center">Items</StyledTableCell>
            {/* <StyledTableCell align="center">Availability</StyledTableCell> */}
            <StyledTableCell align="center">MRP</StyledTableCell>
            <StyledTableCell align="center">Time</StyledTableCell>    
            <StyledTableCell align="center">Total</StyledTableCell>
            <StyledTableCell align="center">Add More</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody >
          {data && data.map((item)=>(
            item.updatedMedData  && item.updatedMedData.map((items,itemsIndex )=>{
              const mrp = filterMRPArray && filterMRPArray[itemsIndex];
              // const medNO=item.doctordetails.medicindata && item.doctordetails.medicindata[itemsIndex]
              // let sum= mrp.MRPone * medNO.total_med;
              return(
                <>
                    <StyledTableRow >
                      <StyledTableCell  align="right" scope="row" style={{width:'20px'}} >
                        <TextField
                            required
                            id="filled-required"
                            type='text'
                            variant="filled"
                            value={items.total_med}
                            />
                      </StyledTableCell>
                      <StyledTableCell align="right">
                      <TextField
                             id="filled-required"
                             label="name"
                             type='text'  // Change the type to 'text'
                             variant="filled"
                             value={items.medicinename}  // Access the medicinename property
                            />
                      </StyledTableCell>
                      {/* <StyledTableCell align="right" style={{width:'100px'}}>
                        <StyledSelect
                        name='available'
                        value={medicalDeatails.available}
                        onChange={(e)=>changeInputfeild(e,itemsIndex)}
                        // onClick={()=>clickYesbtn(items,itemsIndex)}
                        
                        >
                          <MenuItem value='yes'  >YES</MenuItem>
                          <MenuItem value='no'>NO</MenuItem>
                        </StyledSelect>
                      </StyledTableCell> */}
                      <StyledTableCell align="right">
                      <TextField
                            id="filled-required"
                            type='number'
                            value={items.MRPone ? items.MRPone :mrp && mrp.MRPone}
                            variant="filled"                        
                            />
                            </StyledTableCell>
                      <StyledTableCell align="right">
                      <TextField
                        
                            id="filled-required"
                            label=""
                            type='text'
                            variant="filled"
                            value={items.medicine_time}
                           
                            />
                            
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <TextField
                        
                            id="filled-required"
                            label=""
                            type='text'
                            variant="filled"
                            value={items.sum}
                           
                            />
                            
                    </StyledTableCell>
                    <StyledTableCell align="right">
                           <Button variant='contained' onClick={() => clickAddBtn()}><AddIcon/></Button>       
                    </StyledTableCell>
                </StyledTableRow>
            
            
                  </>
                )
                })
        ))}

            {medicineList && medicineList.length > 0 &&(
              medicineList.map((item)=>(
                <StyledTableRow >
          <StyledTableCell component="th" scope="row"  style={{width:'20px'}}>
            <TextField
                id="filled-required"
                type='text'
                variant="filled"
                name='total_med'
                value={item.total_med}
                onChange={changenNewinput}
                />
          </StyledTableCell>
          <StyledTableCell align="right">
          <TextField
                 id="filled-required"
                 label="name"
                 type='text'
                 variant="filled"
                 name='medicinename'
                 value={item.medicinename}
                 onChange={changenNewinput}
                />
          </StyledTableCell>
          {/* <StyledTableCell align="right" >
            <StyledSelect>
              <MenuItem value={'yes'}>YES</MenuItem>
              <MenuItem> value={'no'}NO</MenuItem>
            </StyledSelect>
          </StyledTableCell> */}
          <StyledTableCell align="right">
          <TextField
                required
                id="filled-required"
                label="MRP"
                type='number'
                variant="filled"
                name='MRPone'
                value={item.MRPone}
                onChange={changenNewinput}
                />
          </StyledTableCell>
          {/* <StyledTableCell align="right">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                label=""
                >

                </DatePicker>
            </LocalizationProvider>
          </StyledTableCell> */}
          
        
          <StyledTableCell align="right">
          <TextField
                required
                id="filled-required"
                label=""
                type='text'
                variant="filled"
                name='medicine_time'
                value={item.medicine_time}
                onChange={changenNewinput}

                />
        </StyledTableCell>
        <StyledTableCell align="right">
          <TextField
                required
                id="filled-required"
                label=""
                type='number'
                variant="filled"
                name='sum'
                value={item.sum}
                onChange={changenNewinput}
                />
        </StyledTableCell>
        <StyledTableCell align="right">
               <Button variant='contained' onClick={() => clickAddBtn()}><AddIcon/></Button>       
        </StyledTableCell>
              </StyledTableRow>
              )) 
              )}
              {isShow && 
          rowsToAdd.map((row,index)=>(
            <>
                <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row"  style={{width:'20px'}}>
              <TextField
                  id="filled-required"
                  type='text'
                  variant="filled"
                  name='total_med'
                  value={newmedicalDeatails ? newmedicalDeatails.total_med:null}
                  onChange={changenNewinput}
                  />
            </StyledTableCell>
            <StyledTableCell align="right">
            <TextField
                   id="filled-required"
                   label="name"
                   type='text'
                   variant="filled"
                   name='medicinename'
                   value={newmedicalDeatails ? newmedicalDeatails.medicinename:null}
                   onChange={changenNewinput}
                  />
            </StyledTableCell>
            {/* <StyledTableCell align="right" >
              <StyledSelect>
                <MenuItem value={'yes'}>YES</MenuItem>
                <MenuItem> value={'no'}NO</MenuItem>
              </StyledSelect>
            </StyledTableCell> */}
            <StyledTableCell align="right">
            <TextField
                  required
                  id="filled-required"
                  label="MRP"
                  type='number'
                  variant="filled"
                  name='MRPone'
                  value={newmedicalDeatails ?newmedicalDeatails.MRPone:null}
                  onChange={changenNewinput}
                  />
            </StyledTableCell>
            {/* <StyledTableCell align="right">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                  label=""
                  >
  
                  </DatePicker>
              </LocalizationProvider>
            </StyledTableCell> */}
            
          
            <StyledTableCell align="right">
            <TextField
                  required
                  id="filled-required"
                  label=""
                  type='text'
                  variant="filled"
                  name='medicine_time'
                  value={newmedicalDeatails ? newmedicalDeatails.medicine_time:null}
                  onChange={changenNewinput}
  
                  />
          </StyledTableCell>
          <StyledTableCell align="right">
            <TextField
                  required
                  id="filled-required"
                  label=""
                  type='number'
                  variant="filled"
                  name='sum'
                  value={newmedicalDeatails ?newmedicalDeatails.sum:null}
                  onChange={changenNewinput}
                  />
          </StyledTableCell>
          <StyledTableCell align="right" className='d-flex '>
                 <Button variant='contained' className='m-1' onClick={() => clickAddBtn()}><AddIcon/></Button>       
          </StyledTableCell>
          </StyledTableRow>
              </>
          ))} 

 {/* total amount row */}
          <StyledTableRow>
                <StyledTableCell>
                    <label>Total amount</label>
                </StyledTableCell>
              <StyledTableCell >
                <div className='d-flex justify-content-end'>
              <TextField
                        required
                        id="filled-required"
                        label=""
                        type='number'
                        value={addTotal}
                        variant="filled"
                        />
                </div>
              </StyledTableCell>
              <StyledTableCell align="right">
                    <Button variant='contained' type='submit' onClick={()=>clisksubmitBtn('paid')}>Pay</Button>       
              </StyledTableCell>
              {printdata && printdata[0].type==='in_patient' &&(
              <StyledTableCell align="right">
                    <Button variant='contained'   onClick={()=>clisksubmitBtn('pending')}>credit</Button>       
              </StyledTableCell>
              )}
              <StyledTableCell align="right">
               <Button variant='contained' color='error'onClick={()=>overAlltotal()}>total</Button>       
              </StyledTableCell>
            </StyledTableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    </div>
    </form>
    </div>
     <StyledDialoge
         open={Open}
         TransitionComponent={Transition}
         keepMounted
         aria-describedby="alert-dialog-slide-description"
        className='dialoge_class'
      >
          <div className='addmedcineDialoge '>
             <div  className='d-flex p-3'>
              <label>Total</label>
              <TextField
              variant="filled"
              type='number'
              className='ml-2'
              value={addTotal}
              />
              <label  className='ml-2'>Pay</label>
              <TextField
               variant="filled"
               type='number'
               className='ml-2'
               name='paid'
               value={creditInput.paid}
               onChange={creditAmountChange}
               />
             </div>
             <div  className='d-flex'>
              <Button className='ml-5 mr-2' style={{width:'80px', height:'40px'}} variant='contained' onClick={creditBalance}>Balance</Button> 
              {creditInput && creditInput.balance &&(
              <TextField
               variant="filled"
               type='number'
               className='balancetextfeild'
               value={creditInput.balance}
               />
              )}
             </div>
             <DialogActions>
          <Button onClick={closedialoge}>CLOSE</Button>
          <Button onClick={creditsubmit}>SUBMIT</Button>
        </DialogActions>
          </div>

     </StyledDialoge>

  {/* //  <div>
      
  //     {currentComponent === 'purchase' && <Purchase />}
  //     {currentComponent === 'sales' && <Sales />}
  //     {currentComponent === 'expired' && <Expired />}
  //     {currentComponent === 'inventory' && <Inventory />}
  //     </div>  */}

</div>
  )
}

export default Addmedicine
           
            
            
           

            