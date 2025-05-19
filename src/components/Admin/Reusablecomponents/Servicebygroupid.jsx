import { Button, Checkbox, Dialog, DialogActions, DialogContent, ListItemText, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removefromselectedservice, setemptyservicesbyservicegroupid, setselectedservices, setservicegroupstatus } from '../../Store/AddservicesSlice';
import { useLocation } from 'react-router-dom';
import { removeselectedservicefrompacakge, setpackagestatus, setselectedservicesforpackages } from '../../Store/AddpackageSlice';
import { removedocselectedservices, setdocselectedservices, setdocservicestatus } from '../../Store/DoctorFrame/DiagnosisSlice';
import { removepatientselectedservices, setpatientselectedservices, setpatientservicestatus } from '../../Store/PatientFrame/Bookconsultation';

const Servicebygroupid = (props) => {

    const dispatch=useDispatch()
    const ispackageRoute=useLocation().pathname.includes('/addpackages');
    const isdocroute=useLocation().pathname.includes('/diagnosis')
    const ispatientroute=useLocation().pathname.includes('/patient')
    const selectedservices=useSelector((state)=>state.Addservices.selectedservices)
    const selectedpackageservices=useSelector((state)=>state.Addpackages.selectedserviceforpackage)
    const docselectedservices=useSelector((state)=>state.DiagnosePatient.docselectedservices)
    const patientselectedservices=useSelector((state)=>state.Bookconsultation.patientselectedservices)



    const[services,setservices]=useState([])
    const[Open,setOpen]=useState(false)
    const[isprops,setisprops]=useState(false)

    useEffect(()=>{
        
        setOpen(true)
    },[props])

    


    const handleinputchange=(e,item)=>{
    const checked=e.target.checked
      if(checked){
        if (ispackageRoute) {
          dispatch(setselectedservicesforpackages(item.Id));
        } else if (isdocroute) {
          dispatch(setdocselectedservices(item.Id));
        }else if (ispatientroute) {
          dispatch(setpatientselectedservices({Id:item.Id,price:item.Price}));
        }
         else {
          dispatch(setselectedservices({ Id: item.Id, price: item.Price }));
        }      
       }
       else{
        if (ispackageRoute) {
          dispatch(removeselectedservicefrompacakge(item.Id));
        } else if(isdocroute){
          dispatch(removedocselectedservices(item.Id))
        }else if(ispatientroute){
          dispatch(removepatientselectedservices(item.Id))
        }
        else {
          dispatch(removefromselectedservice(item.Id));
        } 
       }
    }
    const handleClose = () => {
        setOpen(false);
        setservices([]);
        if(ispackageRoute){
          dispatch(setpackagestatus(false))
          dispatch(setemptyservicesbyservicegroupid())
        }
        else if(isdocroute){
          dispatch(setdocservicestatus(false))
          dispatch(setemptyservicesbyservicegroupid())
        }
        else if(ispatientroute){
          dispatch(setpatientservicestatus(false))
          dispatch(setemptyservicesbyservicegroupid())
        }
        else{
          dispatch(setservicegroupstatus(false))
          dispatch(setemptyservicesbyservicegroupid())
        }
        // ispackageRoute ? dispatch(setpackagestatus(false)) : isdocroute ? dispatch(setdocservicestatus(false)) : ispatientroute ? dispatch(setpatientservicestatus(false)) : dispatch(setservicegroupstatus(false))
    };

    // const handleClickSubmit=()=>{
    //     dispatch(setselectedservices(services))
    //     handleClose()
    //     setOpen(false)  
    // }
  return (
    <div className='servicebygroupmain'>
         <Dialog open={Open}>
          {props.data ?(
            <DialogContent>
            {props.data.map((item)=>(
            <MenuItem  value={item.Id}>
                <Checkbox
                  onChange={(e) => handleinputchange(e, item)}
                  checked={
                     ispackageRoute 
                    ? selectedpackageservices.includes(item.Id)
                    :isdocroute
                    ?docselectedservices.includes(item.Id)
                    :ispatientroute
                    ?patientselectedservices.some(inneritem=>inneritem.Id==item.Id)
                     :selectedservices.some(inneritem=>inneritem.Id==item.Id)
                    }
                  />
               <ListItemText primary={item.ServiceName}/>
            </MenuItem>
           ))}
            </DialogContent>
          ):(
            <DialogContent>
              <h4>No Services Are Available For This Service Group</h4>
            </DialogContent>
          )}
            
          <DialogActions>
            <Button onClick={handleClose}>submit</Button>
            {/* <Button onClick={handleClickSubmit}>submit</Button> */}
          </DialogActions>
         </Dialog>
      
    </div>
  )
}

export default Servicebygroupid
