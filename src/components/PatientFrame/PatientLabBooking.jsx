import React, { useEffect, useState } from 'react'
import image1 from '../../assets/receptiondashimg.jpg'
import image2 from '../../assets/newdashboard.jpg'
import image3 from '../../assets/patientdashimg.jpg'
import ServiceGroup from './PatientLabBookingreuseable/ServiceGroup'
import image from '../../assets/admindoctorimg/labbooking.png'
import { Button, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Packages from './PatientLabBookingreuseable/Packages'
import { useDispatch, useSelector } from 'react-redux'
import { GetPackageByPackageids, GetServicesByServiceids, PostBookLabPackage, PostBookLabServices } from '../Store/Actions'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { removepatientselectedservices, setemptypatientservices } from '../Store/PatientFrame/Bookconsultation'
import { removebooklabselectedpackages, setemptybooklabselectedpackages } from '../Store/AddpackageSlice'
import { jwtDecode } from 'jwt-decode'
import { setemptyselectedservices } from '../Store/AddservicesSlice'
import { ToastContainer } from 'react-toastify'


const PatientLabBooking = () => {
    const dispatch=useDispatch()
    const token=localStorage.getItem('accessToken')

    const selectedservices=useSelector((state)=>state.Bookconsultation.patientselectedservices)
    const services=useSelector((state)=>state.Addservices.servicesbyserviceids)
    const bookedlab=useSelector((state)=>state.Addpackages.booklabselectedpackages)
    const packages=useSelector((state)=>state.Addpackages.packagebypackageids)

    const[reusablecomponents,setresusablecomponents]=useState(<ServiceGroup/>)
    const[mrn,setmrn]=useState()
    const[selected,setselected]=useState(false)
    
 
    useEffect(()=>{
      if(token){
        const decodeToken=jwtDecode(token)
        const patientmrn=decodeToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
        setmrn(patientmrn)
      }
    },[token])


    useEffect(()=>{
      if(selectedservices && selectedservices.length>0){
        const service=selectedservices.map(item=>item.Id).join(',')
        dispatch(GetServicesByServiceids(service))
      }
      if(bookedlab && bookedlab.length>0){
        const pakages=bookedlab.map(item=>item).join(',')
        dispatch(GetPackageByPackageids(pakages))
      }
    },[selectedservices,bookedlab])


    const handleSelect=(selected)=>{
      if(selected=='test'){
        setresusablecomponents(<ServiceGroup/>)
        setselected(false)
      }
      else{
        setresusablecomponents(<Packages/>)
        setselected(true)
      }
    }

    const submitForm=()=>{
      if(selectedservices && selectedservices.length>0){
        const service=selectedservices.map(item=>item.Id).join(',')
        dispatch(PostBookLabServices(service,mrn))
        dispatch(setemptypatientservices())
      }
      if(bookedlab && bookedlab.length>0){
        const pakages=bookedlab.map(item=>item).join(',')
        dispatch(PostBookLabPackage(pakages,mrn))
        dispatch(setemptybooklabselectedpackages())
      }
      }

  return (
    <div>
      <ToastContainer/>
        <div className='booklab_maindiv'>
          <div className='booklab_header'>
            <div className='booklab_selection_div'>
              <div className={!selected ?'selected_service_group_selection' : 'service_group_selection'} onClick={()=>handleSelect('test')} >
                <h5>Book Lab Test </h5>
                <div>
                  <p>Choose lab services from the groups for you and your loved once</p>
                </div>
                <img src={image} className='booklabimage'></img>
              </div>
              <div className={selected ? 'selected_service_group_selection' : 'service_group_selection'} onClick={()=>handleSelect('')}>
              <h5>Book a Package </h5>
               <div>
                  <p>Choose Packages with offers suited to address your specific health condition</p>
               </div>
               <img src={image} className='booklabimage'></img>
              </div>
              <div>
              </div>
            </div>
            <div className='booklab_advertising'>
                {selectedservices && selectedservices.length>0 || bookedlab && bookedlab.length>0 ?(
                  <>
                  <div className='booklabselectedservices_div'>
                    {services && services.length>0 && services.map(item=>
                      <div className='booklabservices'>
                        <div className='booklabservices_subdiv1'>
                          <h5 className='pt-2 pl-2'>
                          {item.ServiceName}
                          </h5>
                          <p>Price:{item.Price}</p>
                        </div>
                        <div>
                        <IconButton style={{color:'red'}} onClick={()=> dispatch(removepatientselectedservices(item.Id))}>
                           <DeleteTwoToneIcon/>
                        </IconButton>
                        </div>
                      </div>
                    )}
                    {bookedlab && bookedlab.length>0 &&(
                    packages && packages.length>0 && packages.map(item=>
                       <div className='booklabservices'>
                        <div className='booklabservices_subdiv2'>
                          <h5 className='pt-2 pl-2'>
                            {item.Name}
                          </h5>
                          <p>Price:{item.Price}</p>
                        </div>
                       <div>
                        <IconButton style={{color:'red'}} onClick={()=> dispatch(removebooklabselectedpackages(item.Id))}>
                            <DeleteTwoToneIcon/>
                        </IconButton>
                       </div>
                     </div>
                    )
                    )}
                  </div>
                  <div className='d-flex justify-content-center'>
                    <Button size='small' variant='contained' onClick={submitForm}>submit</Button>
                  </div>
                  </>
                ):(
                 <div className='advertise_container'>
                  <div>
                    <img src={image1} className='image1'></img>
                  </div>
                  <div>
                    <img src={image2} className='image1'></img>
                  </div>
                  <div>
                    <img src={image3} className='image1'></img>
                  </div>
                </div>
                )}
            </div>
          </div>
          <hr></hr>
          <div className='booklabsearch_div'>
             <div class="input-group1 d-flex mr-3">
                    <div class="form-outline avalabledoc_input">
                        <input type="search" id="form1" class="form-control avalabledoc_input" placeholder='Search' name='search'/>
                    </div>
                    <Button startIcon={<SearchIcon/>} variant='contained'></Button>
             </div>
          </div>
          <div className='booklab_contentdiv'>
           {reusablecomponents}
          </div>
        </div>
    </div>
  )
}

export default PatientLabBooking
