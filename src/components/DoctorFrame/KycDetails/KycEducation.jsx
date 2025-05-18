import { Autocomplete, Button, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState,useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllCountries, GetDegreesByCountryCode, GetDegreesByUniversityId, GetuniversitiesByCountryCode } from '../../Store/Actions'
import { setCheklistStatus, setemptyerror, seterror, setparentstatus } from '../../Store/DoctorFrame/KycDetailSlice'
import countryList from 'react-select-country-list'
import { CustomTextField } from '../../../Styles/Autocomplete'
import { PatchAdminUpdateEducationDetails, PatchUpdateEducationDetails, PatchUpdateEducationProofs, PostAdminUploadEducationDetails, PostUploadEducationCertificate } from '../../Store/ApiReducers/Auth'
import { uploadToBlob } from '../AzureBlob/Blob'
import { IoIosAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

const KycEducation = () => {
    const dispatch=useDispatch()
    const formdata=new FormData()

    const options = useMemo(() => countryList().getData(), [])
    const universities=useSelector((state)=>state.KycDetails.universities)
    const degrees=useSelector((state)=>state.KycDetails.degree)
    const error=useSelector((state)=>state.KycDetails.error)
    const Dockycdetails=useSelector((state)=>state.KycDetails.kycDoctorId)

    const [row,setrow]=useState({qualification:[{Degree:'',University:'',GraduationYear:'',}],EducationalQualificationprrofArray:[]})
     const[inputData,setinputData]=useState({Degree:'',University:'',GraduationYear:'',})
    const[showall,setshowall]=useState(false)
    
    

    

    const handleCountryChange=(event,value,type,index)=>{
      const updatedQualification = [...row.qualification];
      
      if(type==='country'){
        if(value){
          dispatch(GetuniversitiesByCountryCode(value.value))
          setshowall(true)
        }
      }else if(type=='university'){
        if(value){
          // setinputData({
          //   ...inputData,
          //   University: value ? value.UniversityName : '',
          // });
          updatedQualification[index] = {
            ...updatedQualification[index],
            University: value.UniversityName, // Update University name
        };
        setrow({ ...row, qualification: updatedQualification });
          dispatch(GetDegreesByUniversityId(value.Id))
        }
      }else{
        updatedQualification[index] = {
          ...updatedQualification[index],
          Degree: value.DegreeName, // Update Degree name
      };
      setrow({ ...row, qualification: updatedQualification })
        // setinputData({
        //   ...inputData,
        //   Degree: value ? value.DegreeName : '',
        // });
      }
    }

    const handleInpuChange= (e,index)=>{
      
      
      const updatedQualification = [...row.qualification];
      const updatedProof=[...row.EducationalQualificationprrofArray]
      if (!updatedProof[index]) {
        updatedProof[index] = []; // Initialize the array if it doesn't exist
    }
      const{name,value,files}=e.target
      if(Dockycdetails){
        if(name=='CerficateImage'){
          formdata.append('certificate',files ? files[0]:null)
          dispatch(PostAdminUploadEducationDetails(Dockycdetails,formdata))
        }
        else{
          // setinputData({...inputData,[name]:value})
        }
      }
      else{
        if(name=='CerficateImage'){
          // formdata.append('certificate',files ? files[0]:null)

          
          updatedProof[index].push(files[0])
          setrow({...row,EducationalQualificationprrofArray:updatedProof})
          
        }
        else{
          
          updatedQualification[index]={
            ...updatedQualification[index],
            GraduationYear:value
          }
          setrow({ ...row, qualification: updatedQualification })
        }
      }
    }

    const clickAddbtn=()=>{
      const updatedQualification=[...row.qualification]
      updatedQualification.push({Degree:'',University:'',GraduationYear:'',})
      setrow({...row,qualification:updatedQualification})
    }
    
    const clickdltbtn=(index)=>{
      const updatedQualification=[...row.qualification]
      const updatedProof=[...row.EducationalQualificationprrofArray]
      if(index==0){
        updatedQualification.push({Degree:'',University:'',GraduationYear:'',})
        setrow({...row,qualification:updatedQualification,EducationalQualificationprrofArray:[]})
      }
      else{
        updatedQualification.pop(index)
        updatedProof.pop(index)
        setrow({...row,qualification:updatedQualification,EducationalQualificationprrofArray:updatedProof})
      }
    }

    const submitForm=()=>{
       const isEmptyField =Object.values(inputData).some(item => item === '')
      if(Dockycdetails){
        if(isEmptyField){
          dispatch(seterror('Please fill in all feilds'))
          alert('Please fill in all feilds')
        }else{
          const updatedData={
            EducationalQualifications:[`${inputData.University},${inputData.Degree},${inputData.GraduationYear}`]
          }
          dispatch(PatchAdminUpdateEducationDetails(Dockycdetails,updatedData))
          dispatch(setemptyerror())
          // setinputData({Degree:'',University:'',GraduationYear:''})
          setshowall(false)
        }
      }
      else{
        // if(isEmptyField){
        //   dispatch(seterror('Please fill in all feilds'))
        //   alert('Please fill in all feilds')
        // }else{
          row.EducationalQualificationprrofArray.forEach((filesArray, index) => {
            filesArray.forEach(file => {
              formdata.append(`Proofs`, file); // Adjust key based on your API's expectations
            });
          });
          // const updatedData={
          //   EducationalQualifications:[`${inputData.University},${inputData.Degree},${inputData.GraduationYear}`]
          // }
          dispatch(PatchUpdateEducationDetails(row.qualification))
          dispatch(PatchUpdateEducationProofs(formdata))
          dispatch(setemptyerror())
          // setinputData({Degree:'',University:'',GraduationYear:''})
          setrow({qualification:[{Degree:'',University:'',GraduationYear:'',}],EducationalQualificationprrofArray:[]})
          setshowall(false)
        // }
      }
    }

    
  return (
    <div>
      {row && row.qualification.map((item,index)=>(
     <div style={{height:'400px'}}>
     <div className='admitform_main'>
        <div className='subadmitform'>
            <label>Country</label>
            <Autocomplete
              options={options}
              getOptionLabel={(option) => option.label}
              // value={options.find(option => option.label === inputData.Country) || null}
              onChange={(e,value)=>handleCountryChange(e,value,'country',index)}
              renderInput={(params) => (
                  <CustomTextField {...params} name="Country"/>
              )}
            />
            {/* <input type='text' required name='Country' value={inputData.Country} onChange={handleInpuChange}/> */}
        </div>
        <div className='subadmitform'>
        {showall &&(
          <>
             <label>University</label>
             <Autocomplete
              options={universities ? universities :[]}
              getOptionLabel={(option) => option.UniversityName}
              // value={options.find(option => option.UniversityName === inputData.Country) || null}
              onChange={(e,value)=>handleCountryChange(e,value,'university',index)}
              renderInput={(params) => (
                  <CustomTextField {...params} name="Country"/>
              )}
            />
          </>
          )}
        </div>
        </div>
              
      {showall &&(
      <div className='admitform_main'>
      <div className='subadmitform'>
            <label>Graduated Year</label>
            <input type='number' required name='GraduationYear' value={ row && row.qualification[index].GraduationYear} onChange={(e)=>handleInpuChange(e,index)}/>
        </div>
        <div className='subadmitform'>
            <label>Degree</label>
            <Autocomplete
              options={degrees ? degrees :[]}
              getOptionLabel={(option) => option.DegreeName}
              onChange={(e,value)=>handleCountryChange(e,value,'',index)}
              renderInput={(params) => (
                  <CustomTextField {...params} name="Country"/>
              )}
            />
            {/* <input type='text' required name='Degree' value={inputData.Degree} onChange={handleInpuChange}/> */}
        </div>
      </div>
      )}
      <div className='admitform_main'>
        <div className='subadmitform'>
             <label>Cerficate Image</label>
            <input type='file' required name='CerficateImage'  onChange={(e)=>handleInpuChange(e,index)}/>
        </div>
        {showall &&(
          <>
          <div className='subadmitform'>
              <label>Add Education</label>
              <Button  variant='contained' onClick={clickAddbtn} style={{maxWidth:'3rem'}} endIcon={<IoIosAdd/>}>ADD</Button>
          </div>
          <div className='subadmitform'>
              <label>Delete Education</label>
              <Button  variant='contained' color='error' onClick={(e)=>clickdltbtn(index)} style={{maxWidth:'6rem'}} endIcon={<MdDeleteOutline/>}>delete</Button>
          </div>
          </>
        
        )}
      </div>
     </div>
      ))}
      <div className='d-flex justify-content-end'>
        <div className='d-flex'>
            <Button onClick={submitForm}>submit</Button>
            <Button onClick={()=>dispatch(setCheklistStatus(true))}>cancel</Button>
        </div>
      </div>
    </div>
  )
}

export default KycEducation
