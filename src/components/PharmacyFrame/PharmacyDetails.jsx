import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import Select from '@mui/material/Select';
import Slide from '@mui/material/Slide';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { Button, TextField } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#008080',
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
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white', // Set the border color to white
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
      color: 'white', // Set the dropdown icon color to white
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
  
  
  

const PharmacyDetails = () => {
    const pharmacyDetailsArray=useSelector((state)=>state.PharmacyDetails.PharmacyData)
   

    const[searchValue,setsearchValue]=useState()
    const[isOpen,setIsopen]=useState(false)
    const[dialogeData,setdialogeData]=useState()
    const[filterdata,setfilterdata]=useState(pharmacyDetailsArray)





    const changeSearch=(e)=>{
        const {name,value}=e.target
 
        if(isNaN(value)){
            const filterData=pharmacyDetailsArray.filter((item)=>item.name.toLowerCase().includes(value.toLowerCase()))
            setfilterdata(filterData)
        }
        else if (value){
            const filtered = pharmacyDetailsArray.filter((item)=>item.mrnno == parseInt(value))
            setfilterdata(filtered)
        }
        else {
            setfilterdata(pharmacyDetailsArray)
        }
       
    }

    const onClickView=(mrnno)=>{
      setIsopen(true)
      const filterMrn=pharmacyDetailsArray.filter((item)=>item.mrnno===mrnno)
      setdialogeData(filterMrn)
    }

    const handleClose=()=>{
    setIsopen(false)
    }

  return (
    <div className='Dashboard_maindiv'>
        <div className='availbledoctor_maindiv'> 
            <div class="input-group">
                <div class="form-outline avalabledoc_input">
                    <input type="search" id="form1" class="form-control avalabledoc_input" placeholder='Search' name='search' value={searchValue?searchValue.search:null}  onChange={changeSearch}/>
                </div>
            <Button startIcon={<SearchIcon/>} variant='contained'></Button>
            </div>
        </div>
        
        <div style={{ maxHeight: '65vh', overflowY: 'auto',paddingTop:'15px' }}>
      <TableContainer component={Paper} className='tablecontainer_main' >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell  align="center">MRN</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center"> Doctor</StyledTableCell>
            <StyledTableCell align="center">Phone No</StyledTableCell>
            <StyledTableCell align="center"> Date</StyledTableCell>
            <StyledTableCell align="center">View Details</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            
            {filterdata && filterdata.length > 0 && (
                filterdata.map((item)=>(
            <StyledTableRow>
                <StyledTableCell  align="center">{item.mrnno} </StyledTableCell>
                <StyledTableCell  align="center">{item.name} </StyledTableCell>
                <StyledTableCell  align="center">{item.doctor} </StyledTableCell>
                <StyledTableCell  align="center">{item.number} </StyledTableCell>
                <StyledTableCell  align="center">{item.date} </StyledTableCell>
                <StyledTableCell align="center">
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {onClickView(item.mrnno)}}
                >
                  view details
                </Link>
                </StyledTableCell>
            </StyledTableRow>
                ))
            )}

        </TableBody>
        </Table>
        </TableContainer>
        </div>
        <StyledDialoge
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
           className='dialoge_class'
          >
            <div className='dialogeForm '>
            <div className='pl-3'>
                <h5>Date :{dialogeData && dialogeData[0].date}</h5>
            </div>
            <div style={{ maxHeight: '65vh', overflowY: 'auto',paddingTop:'15px' }}>
                <TableContainer component={Paper} className='tablecontainer_main' >
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell  align="center">MED QNTY</StyledTableCell>
                        <StyledTableCell align="center">Items </StyledTableCell>
                        <StyledTableCell align="center">Time</StyledTableCell>
                        <StyledTableCell align="center">Total</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {dialogeData && dialogeData[0].updatedMedData && (
                            dialogeData[0].updatedMedData.map((items)=>(
                                <StyledTableRow>
                                    <StyledTableCell  align="center"> {items.total_med}</StyledTableCell>
                                    <StyledTableCell  align="center"> {items.medicinename}</StyledTableCell>
                                    <StyledTableCell  align="center"> {items.medicine_time}</StyledTableCell>
                                    <StyledTableCell  align="center"> {items.sum}</StyledTableCell>
                                </StyledTableRow>
                                ))
                        )}
                        {dialogeData &&(
                            <StyledTableRow>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>

                                <StyledTableCell align="center">Total Amount : {dialogeData[0].total}</StyledTableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                    </Table>
                    </TableContainer>
        </div>   
            </div>
         </StyledDialoge>
    </div>
  )
}

export default PharmacyDetails