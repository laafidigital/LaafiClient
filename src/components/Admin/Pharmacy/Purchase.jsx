import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { StyledTableCell,StyledTableRow } from '../../../Styles/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MenuItem, Select, TextField } from '@mui/material';
import {Button} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import { setShowAdditionalField,setMinday,setitemno} from '../../Store/PurchaseSlice'; // Make sure to adjust the import path
import { width } from '@mui/system';
import { GetMedicinMaster, PostPharmacyPurchaseData } from '../../Store/Actions';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';



export default function CustomizedTables() {
  
  const dispatch=useDispatch()
 
  const showAdditionalField = useSelector((state) => state.purchase.showAdditionalField);
  const inputFieldData = useSelector((state) => state.purchase.inputFieldData);
  const purchasearray=useSelector((state)=>state.purchase.purchaseArray)
  const error=useSelector((state)=>state.purchase.errors)
  const minday=useSelector((state)=>state.purchase.minday.min_day)
  const itemno=useSelector((state)=>state.purchase.item_no)
  const medicineMaster=useSelector((state)=>state.purchase.medicineMaster)
  const postresult=useSelector((state)=>state.purchase.postPurcahseresult)

  const [mindayerror,setmindayerror]=useState(null)
  const [autocompleteValue, setAutocompleteValue] = useState(null);

  const [inputData,setInputdata]=useState({ 
              category:'',
              item:'',
              nooftablets_bottles:'',
              tax:'',
              expDate:'',
              barcode:'',
              itemName:'',
              description:'',
              costpertable_bottle:'',
              mrpOne:'',
              reorderLevel:'',
            })
  const [errors,seterrors]=useState()


  useEffect(()=>{
    dispatch(GetMedicinMaster())
    if(postresult.length>0){
      dispatch(GetMedicinMaster())
    }
  },[postresult])

  const clicktaxbtn=()=>{
    dispatch (setShowAdditionalField(!showAdditionalField))

  }



  const onChangeInput=(e)=>{

    const { name, value } = e.target;
  
    if(name==='itemName'){
      dispatch(setMinday(value))
      setInputdata((prevdata)=>({
        ...prevdata,
        [name]:value,
        item:0
      }))
    }
    else if(name==='minday'){
      dispatch(setMinday(value))
      setInputdata((prevdata)=>({
        ...prevdata,
        [name]:value
      }))
    }

    else if(name==='item'||name==='category'||name==='description'||name==='barcode'){
      setInputdata((prevdata)=>({
        ...prevdata,
        [name]:value,
      }))
    }
    else{
      setInputdata((prevdata)=>({
        ...prevdata,
        [name]:parseInt(value),
      }))
    }
   
    
    if (name==='expDate') {
  
      const selectedDate=new Date(value)
      const selectedYear=selectedDate.getFullYear()
      const selectedMonth=(selectedDate.getMonth() + 1).toString().padStart(2, '0');
      const selectedDay=selectedDate.getDate().toString().padStart(2, '0');
      const selectednewDate=`${selectedYear}-${selectedMonth}-${selectedDay}`
  

      // const selectedDate = new Date(inputFieldData.date);
      //todaysdate convertion
      const currentDate = new Date();
      const currentYear=currentDate.getFullYear()
      const currentMonth=(currentDate.getMonth()+1).toString().padStart(2, '0');
      const currentDay=currentDate.getDate().toString().padStart(2, '0');
     
      const todaysDate=`${currentYear}-${currentMonth}-${currentDay}`
      
      
      const mindayDate = new Date(currentDate);
      
      mindayDate.setDate(currentDate.getDate() + minday);
      // const formattedSelectedDate = selectedDate.toLocaleDateString('en-US');
      const daysUntilSelectedDate = Math.floor((selectedDate - currentDate) / (24 * 60 * 60 * 1000));
      
      if (daysUntilSelectedDate >= minday) {
        
        setmindayerror(null)
        setInputdata((prevdata)=>({
          ...prevdata,
          [name]:selectednewDate,
          purchaseDate:todaysDate,
        }))
      }
       else {
        
        setmindayerror('Selected date is not valid. It is not at least ' + minday + ' days from today.')
      }
    }
  }

  const onChangeAutocomplete=(e,value)=>{
    const {name}=e.target

    if(name==='itemName'){
      setInputdata((prev)=>({
        ...prev,
        [name]:value,
        item:0
      }))
      setAutocompleteValue({id:0,name:value}); 
    }
    else{
      setInputdata((prev)=>({
        ...prev,
        itemName: value ? value.name : '', // Check if value is not null
        item: value ? value.id : 0
      }))
      setAutocompleteValue(value);    }

  }

  const validateForm=()=>{
       const newerror={ category:'',item:'',nooftablets_bottles:'', tax:'',expDate:'',barcode:'',itemName:'',costpertable_bottle:'', mrpOne:'',}

      if(!inputData.category){
        newerror.category='category is required'
      }
       if(inputData.item===undefined||inputData.item===''){
        newerror.item='items is required'
      }
       if(!inputData.itemName){
        newerror.itemName='itemname is required'
      }
       if(!inputData.nooftablets_bottles){
        newerror.nooftablets_bottles='noofboxes is required'
      }
       if(!inputData.tax){
        newerror.tax='tax is required'
      }
       if(!inputData.expDate){
        newerror.date='date is required'
      }
       if(!inputData.barcode){
        newerror.barcode='barcode is required'
      }
       if(!inputData.costpertable_bottle){
        newerror.costpertable_bottle='costpertab/bottle is required'
      }
       if(!inputData.mrpOne){
        newerror.mrpOne='MRP is required'
      }
    
      seterrors(newerror)
      
  }

    const SubmitForm=(e)=>{
      e.preventDefault()
      const allErrorsEmpty = Object.values(errors).every(error => error === "");
      if(allErrorsEmpty && mindayerror==null){
        dispatch(setitemno())
        dispatch(PostPharmacyPurchaseData(inputData))
        setInputdata({category:'',item:'',nooftablets_bottles:'',tax:'',expDate:'',barcode:'',itemName:'',description:'',
        costpertable_bottle:'',
        mrpOne:'',
      reorderLevel:'',
    }
        )
        setAutocompleteValue(null)
      }
    }
    
   
  return (
    <div style={{marginTop:'30px'}}>
  <div className='purchase_main' >
      <div className='d-flex purchasetext_div'>
        <ToastContainer/>
        <h6 style={{color:'black'}}>Allow Purchase Entry Of Drugs With More Than</h6>
              <input type='number' style={{width:'50px',height:'23px',borderRadius:'28px',}} className='ml-2 mr-2' name='minday' value={minday} onChange={onChangeInput}></input>
        <h6 style={{color:'black'}}>days</h6>
      </div>
      <div className='error-message_addpatient' >{mindayerror}</div>
      <form onSubmit={SubmitForm}>

 <TableContainer component={Paper} >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>CATEGORY</StyledTableCell>
            <StyledTableCell align="center">ITEM</StyledTableCell>
            <StyledTableCell align="center">NO OF TABLETS/BOTTLES</StyledTableCell>
            <StyledTableCell align="center" >TAX%
            
              <Button
                variant='outlined'
                style={{ backgroundColor: 'black', color: 'white', borderColor: 'white' }}
                onClick={clicktaxbtn}
              >
                /unit
              </Button>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                <Select 
                name='category' value={inputData.category}
                onChange={onChangeInput}
                style={{width:'145px'}}
                >
                  <MenuItem value={'tablet'}>Tablet</MenuItem>
                  <MenuItem value={'bottle'}> Bottle</MenuItem>
                  <MenuItem value={'others'}>Others</MenuItem>

                </Select>
                {/* <TextField
                    
                    id="filled-required"
                    label=""
                    type='text'
                    defaultValue=""
                    variant="filled"
                    name='category'
                    value={inputFieldData.category}
                    onChange={onChangeInput}
                
                    /> */}
              {errors &&(<div className='error-message_addpatient'>{errors.category}</div>) }
              </StyledTableCell>
              <StyledTableCell align="right">
                <Autocomplete
                    disablePortal
                    name="itemName"
                    options={medicineMaster}
                    getOptionLabel={(option) => (option ? option.name : '')}
                    onChange={(e,value)=>onChangeAutocomplete(e,value)}
                    value={autocompleteValue}
                    sx={{ width: 300 }}
                    renderInput={(params) =>
                      <TextField 
                      type='text'
                      name="itemName"
                      value={inputData.itemName}
                      onChange={(e)=>onChangeAutocomplete(e,e.target.value)}
                      {...params}
                      label="Medicine"
                      />}
                  />
                 
              {errors &&(<div className='error-message_addpatient'>{errors.itemName}</div>) }
              </StyledTableCell>
              <StyledTableCell align="right">
              <TextField
                    label=""
                    type='number'
                    defaultValue=""
                    variant="filled"
                    name='nooftablets_bottles'
                    value={inputData.nooftablets_bottles}
                    onChange={onChangeInput}
                    />
              {errors &&(<div className='error-message_addpatient'>{errors.nooftablets_bottles}</div>) }
              </StyledTableCell>
              <StyledTableCell align="right">
              <TextField 
                    label=""
                    type='number'
                    defaultValue=""
                    variant="filled"
                    name='tax'
                    value={inputData.tax}
                    onChange={onChangeInput}
                     />
              {errors &&(<div className='error-message_addpatient'>{errors.tax}</div>) }
                    {showAdditionalField && (
                      <TextField
  
                        label="/unit"
                        type='number'
                        defaultValue=""
                        variant="filled"
                        name='taxperunit'
                        value={inputData.taxperunit}
                        onChange={onChangeInput}
                       />
              )}
              </StyledTableCell>
              
            </StyledTableRow>

            <StyledTableRow>
                <StyledTableCell component="th" scope="row">EXPIRY DATE</StyledTableCell>
                <StyledTableCell align='center' >BARCODE</StyledTableCell>
                <StyledTableCell align='center'>COST PER TABLET/BOTTLE</StyledTableCell>
                <StyledTableCell align='center'>MIN REQUIREMENT</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row" style={{width:'180px'}}>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker
                    label=""
                    name='expDate'
                    disablePast
                    value={inputData.expDate}
                    onChange={(date) => onChangeInput({ target: { name: 'expDate', value: date } })}
                    >

                    </DatePicker>
                </LocalizationProvider>
                {errors &&(<div className='error-message_addpatient'>{errors.expDate}</div>) }
              </StyledTableCell>
              <StyledTableCell align="right">
              <TextField
                    label=""
                    type='text'
                    defaultValue=""
                    variant="filled"
                    name='barcode'
                    value={inputData.barcode}
                    onChange={onChangeInput}
                    />
              {errors &&(<div className='error-message_addpatient'>{errors.barcode}</div>) }
              </StyledTableCell>
              <StyledTableCell align="right">
              <TextField
                    label=""
                    type='number'
                    defaultValue=""
                    variant="filled"
                    name='costpertable_bottle'
                    value={inputData.costpertable_bottle}
                    onChange={onChangeInput}
                    />
              {errors &&(<div className='error-message_addpatient'>{errors.costpertable_bottle}</div>) }
              </StyledTableCell> 
              <StyledTableCell align="right">
              <TextField
                    label=""
                    type='number'
                    defaultValue=""
                    variant="filled"
                    name='reorderLevel'
                    value={inputData.reorderLevel}
                    onChange={onChangeInput}
                    />
              {/* {errors &&(<div className='error-message_addpatient'>{errors.costpertable_bottle}</div>) } */}
              </StyledTableCell> 
            </StyledTableRow>

            <StyledTableRow>
                <StyledTableCell component="th" scope="row">DISCRIPTION</StyledTableCell>
                <StyledTableCell align='right'>MRP OF TABLET/BOTTLES</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
              <TextField
                    label=""
                    type='text'
                    defaultValue=""
                    variant="filled"
                    name='description'
                    value={inputData.description}
                    onChange={onChangeInput}
                    />
              </StyledTableCell>
              {/* <StyledTableCell align="right">
              
              </StyledTableCell> */}
              <StyledTableCell align="right">
              <TextField
                    
                    label=""
                    type='number'
                    defaultValue=""
                    variant="filled"
                    name='mrpOne'
                    value={inputData.mrpOne}
                    onChange={onChangeInput}
                    />
              {errors &&(<div className='error-message_addpatient'>{errors.mrpOne}</div>) }
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button variant='contained' type='submit' onClick={validateForm}>Add</Button>
              </StyledTableCell>
              
            </StyledTableRow>

            
        </TableBody>
      </Table>
    </TableContainer>

    </form>
    </div>
    </div>

  );
}