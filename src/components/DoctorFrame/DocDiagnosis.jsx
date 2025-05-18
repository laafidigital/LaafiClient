import { Autocomplete, Button, IconButton, Table, TableContainer, TableHead } from '@mui/material'
import { useEffect, useState } from 'react';
import React from 'react'
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import { FormControl } from '@mui/base/FormControl';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { GoCrossReference } from "react-icons/go";
import { StyledTableCell,StyledTableRow } from '../../Styles/Table';
import EditIcon from '@mui/icons-material/Edit';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Link from '@mui/material/Link';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { GetClaudeAiResponse,GetAiResponse, GetConsultation, GetDocShecduleById, GetPackages, GetPharmacyPurchase, GetServices, GetTemplateByDepId, GetdoctorsonlybydepId, PostMedicineMaster, PostPriscription, PostUpdateConsultaion, fetchOpenAIResponse, GetConsultationById, PostAdditionalInput, GetuserDataById, PostDoctorconsultation, GetMedicinMaster, GetTimeSlotsBydocid, PostConsultation, GetTodaysPatient, GetServiceGroups, GetServicesByGroupId } from '../Store/Actions';
import { GetDepartmentData } from '../Store/ApiReducers/Auth';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { ToastContainer } from 'react-toastify';
import { jwtDecode } from "jwt-decode";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { GiArtificialIntelligence } from "react-icons/gi";
import { GiArtificialHive } from "react-icons/gi";
import { SiArtifacthub } from "react-icons/si";
import { setdocselectedservices, setdocservicestatus, setemptypostdoctorconstationresult, setispreviewdialoge, setselectedservices } from '../Store/DoctorFrame/DiagnosisSlice';
import Preveiw from '../Admin/Reusablecomponents/Preveiw';
import Servicebygroupid from '../Admin/Reusablecomponents/Servicebygroupid';
import { StyledTextField } from '../../Styles/TextFeild';
import { Getdoctorbydepid } from '../Store/ApiReducers/Auth';
import { GetFindByDepartmentId } from '../Store/ApiReducers/Templates';
import Templatedisplay from '../Admin/Doctor/Template/Templatedisplay';
import VedioCreateRoom from './VedioCreateRoom';


const StyledSelect = styled(Select)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'black', // Set the border color to white
    },
    '&:hover fieldset': {
      borderColor: 'black', // Set the border color to white on hover
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


const DocDiagnosis = () => {

  const navigate=useNavigate();
  const dispatch=useDispatch();

  const Token=localStorage.getItem("accessToken");

  const inputdata=useSelector((state)=>state.DiagnosePatient.diagnosisinputdata);
  const labdetails=useSelector(state=>state.Addservices.addServicesArray);
  const purchasedata=useSelector((state)=>state.purchase.purchaseArray);
  const diagnosiedpatient=useSelector((state)=>state.DiagnosePatient.diagnosepatient);
  const openAiresult=useSelector((state)=>state.OpenAI.apiresult);
  // const pharmacypurchase=useSelector((state)=>state.purchase.pharmacypurchase);
  const servicedata=useSelector((state)=>state.Addservices.serviceresult);
  const packageArray=useSelector((state)=>state.Addpackages.getpackages);
  const medicinemasterpost=useSelector((state)=>state.Medicinemaster.postresult);
  const getdepartment=useSelector((state)=>state.Adddepartment.departmentArray);
  const getdoctorById=useSelector((state)=>state.Adddoctor.doctorsById);
  const Airesponse=useSelector((state)=>state.OpenAI.Airesult);
  const AiClauderesponse=useSelector((state)=>state.ClaudeAI.ClaudeAiresult);
  const todaysPatient=useSelector((state)=>state.Addpatentdetails.todaysPatient);
  const docschedule=useSelector((state)=>state.Adddoctor.doctorSchedulebyId);
  const Aisuggustion=useSelector((state)=>state.DiagnosePatient.docFileAi)
  const consultationById=useSelector((state)=>state.Addpatentdetails.consultationById)
  const userDatabyid=useSelector((state)=>state.Addpatentdetails.UserDataById)
  const medicinemaster=useSelector((state)=>state.Medicinemaster.medicineMater)
  var templateData=useSelector((state)=>state.Template.templatedataBydepId);
  const getdoctorbydepid=useSelector((state)=>state.Adddoctor.doctoronlybyid)
  const timesSlotes=useSelector((state)=>state.Adddoctor.timeSlotsbydocId)
  const notimeslotavailable=useSelector((state)=>state.Adddoctor.error)
  const previewstatus=useSelector((state)=>state.DiagnosePatient.ispreviewdialoge)
  const postdoctorconsultationresult=useSelector((state)=>state.DiagnosePatient.Postdoctorconsultationresult)
  const getservicegroup=useSelector((state)=>state.Addservices.servicegroups)
  const selectedservices=useSelector((state)=>state.DiagnosePatient.docselectedservices)
  const getservicesbygroupid=useSelector((state)=>state.Addservices.servicesbygroupid)
  const docservicestatus=useSelector((state)=>state.DiagnosePatient.docservicestatus)
  const templatebydepartment=useSelector((state)=>state.Template.findbydepartmentid)
  
  
  
  const consultId=useParams()
  const consultID = consultId.id;
  
  const [expanded, setExpanded] =useState(false);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const [isCheckBox,setIscheckbox]=useState(false);
  const [chatOpen,setchatOpen]=useState(false);
  const [chatOpen1,setchatOpen1]=useState(false);
  const [searchQuery, setSearchQuery] = useState({searchval:''});
  const [consultid,setconsultid]=useState();
  const [filterMedicine,setfiltermedicine]=useState(purchasedata);
  const [islistopen,setlistopen]=useState(false);
  const [secondDialog,setseconddialog]=useState(false);
  const [thirdDialog,setthirdDialog]=useState(false);
  const [medicinedetails,setmedicinedetails]=useState();
  const [priscribedmedicines,setpriscribedmedicine]=useState([])
  const [updatedmedicinedata,setupdatedmedicedata]=useState([])
  const [forthDialog,setforthDialog]=useState(false);
  const [fifthDialoge,setfifthDialoge]=useState(false);
  const [isod,setisod]=useState(false);
  const [isbid,setisbid]=useState(false);
  const [istid,setistid]=useState(false);
  const [genericDialog,setgenericDialog]=useState(false);
  const [viewMedicineDialog,setviewMedicineDialoge]=useState(false);
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [openAiResponse, setOpenAiResponse] = useState('');
  const [filterdPatient,setfilteredPatient]=useState();
  const [autocompleteVal,setautocomplteval]=useState();
  const [referDialoge,setreferDialoge]=useState(false);
  const [followupDialoge,setfollowupDialoge]=useState(false);
  const [istempData,setistempData]=useState(false);
  const [isdocschedule,setisdocschedule]=useState(false);
  const [isAiOpen,setaiopen]=useState(false)
  const [viewBP,setViewBP]=useState(false)
  const [chatOpen2,setchatOpen2]=useState(false)
  const [chatopen2Val,setchatopen2val]=useState()
  const [AddiInputData,setAddiInputData]=useState({TemplateId: null,SpecialityInfos:[]})
  const [inputData,setinputData]=useState({chiefComplaint:'',hpi:'',pastHistory:'',familyHistory:'',Occupation:'',systemicExamination:'',finalDiagnosis:'',Allergies:'',
                                            pulse:'',temp:'',respRate:'',si02:'',systolic:'',diastolic:'',weight:'',medicine:[],packages:[],services:[],servicegroup:[],
                                            deptID:'',docID:'',followUpDate:'',referralDocID:'',referralDeptID:'',referDate:'',referdoctime:'',folloupdocTime:''
                                            });
  const [image,setImage] = useState('');
  const [previewdetails,setpreviewdetails]=useState()
  const [selectedcheckbox,setselectedcheckbox]=useState({chiefComplaint:false,hpi:false,pastHistory:false,familyHistory:false,systemicExamination:false,Occupation:false})
  const [aiselectdialoge,setaiselecdialoge]=useState(false)
  const [selectedaifeilds,setselectedaifields]=useState([])
  const [doctorid,setdoctorid]=useState()
  const [templatedata,settemplatedata]=useState(null)
 
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add 1 to month because it's zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;


 useEffect(()=>{
  dispatch(GetTodaysPatient(''))
  dispatch(GetMedicinMaster())
  dispatch(GetServices());
  dispatch(GetPackages());
  dispatch(GetServiceGroups(''))
  dispatch(GetConsultationById(consultID))
 },[]) 


 useEffect(()=>{
  if(Token!==null && !istempData){
    const decodedToken = jwtDecode(Token);
    
    const Id=decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    
    setdoctorid(Id)
    const deptID=decodedToken["DepartmentId"]
    
    dispatch(GetFindByDepartmentId(deptID))
    setistempData(true);
  } 
  if(!isdocschedule && docschedule){
    setisdocschedule(true);
  }
 
  if(inputData && inputData.systemicExamination.length>4){
    setIscheckbox(true)
  }
  else{
    setIscheckbox(false)
    
  }
 },[chatOpen,inputData,isCheckBox,Token,docschedule,chatOpen1]);


  useEffect(()=>{
    if(consultationById){
      setinputData((prev) => ({
        ...prev,
        chiefComplaint: consultationById.ChiefComplaint ? consultationById.ChiefComplaint :'',
        pastHistory:consultationById.PastHistory ? consultationById.PastHistory :'N/A' ,
        services: consultationById.Services ? consultationById.Services.split(',').map(Id => parseInt(Id)) : [],
        packages: consultationById.Packages ? consultationById.Packages.split(',').map(Id=>parseInt(Id)):[],
        servicegroup:consultationById.ServiceGroups ? consultationById.ServiceGroups.split(',').map(Id=>parseInt(Id)) : []
      }))
      if(consultationById.Chart){
        setinputData((prev)=>({
          ...prev,
          pulse:consultationById.Chart.Pulse,
          temp:consultationById.Chart.Temperature,
          si02:consultationById.Chart.OxygenSaturation,
          respRate:consultationById.Chart.RespiratoryRate,
          systolic:consultationById.Chart.Systolic,
          diastolic:consultationById.Chart.Diastolic,
          weight:consultationById.Chart.Weight,
        }))
      }
      if(consultationById.Services){
        const serviceIds = consultationById.Services.split(',').map(Id => parseInt(Id))
        serviceIds.forEach(services=>(
          dispatch(setdocselectedservices(services))
        ))
      }
    }
  },[consultationById])


  useEffect(()=>{
    if( medicinemasterpost && medicinemasterpost.length > 0 ){
      setmedicinedetails((prev)=>({
        ...prev,
        medicine_id:medicinemasterpost ? medicinemasterpost.id:null
      }))
    }
    if(postdoctorconsultationresult){
      setinputData({chiefComplaint:'',hpi:'',pastHistory:'',familyHistory:'',Occupation:'',systemicExamination:'',finalDiagnosis:'',Allergies:'',
          pulse:'',temp:'',respRate:'',si02:'',systolic:'',diastolic:'',weight:'',medicine:[],packages:[],services:[],servicegroup:[], deptID:'',docID:'',})
      setpriscribedmedicine([]) 
      dispatch(setemptypostdoctorconstationresult())
    }
  },[medicinemasterpost,postdoctorconsultationresult])

  const handleinputChange=(e)=>{
    
    const {name,value}=e.target
    setinputData((prev)=>({
      ...prev,
      [name]:value
     }))

    if(name==='generic'){
      setmedicinedetails((prevdata)=>({
        ...prevdata,
      [name]:value,
      }))
    }
    if(name==='deptID'){
      if(value===4){
        dispatch(Getdoctorbydepid(''))
      }
      else{
        dispatch(Getdoctorbydepid(value))
      }
    }
    if(name==="referralDeptID"){
      if(value===4){
        dispatch(Getdoctorbydepid(''))
      }
      else{
        dispatch(Getdoctorbydepid(value))
      }
    }
  }

  const handleDateChange = (date) => {
        
    const selectedDate = new Date(date);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const hours = String(selectedDate.getHours()).padStart(2, '0');
    const minutes = String(selectedDate.getMinutes()).padStart(2, '0');
    const seconds = String(selectedDate.getSeconds()).padStart(2, '0');
    const milliseconds = String(selectedDate.getMilliseconds()).padStart(3, '0');
    const formattedselectedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
    

      setinputData((prev)=>({
        ...prev,
        referDate:formattedselectedDate
      }))
      dispatch(GetTimeSlotsBydocid(formattedselectedDate,inputData.referralDocID))
    
  };

  const handleAdditionalInput=(e,tempId)=>{
    const {name,value,type}=e.target
    if(type=='text'){
         setchatopen2val(value)
    }
    
    const newData = AddiInputData.filter(item => item.TemplateId !== tempId);
    setAddiInputData([
      ...newData,
      {TemplateId: tempId, Value: value }
    ]);
  }

  const submitAdditionalinput=(e)=>{
    e.preventDefault()
    dispatch(PostAdditionalInput(AddiInputData))
    setAddiInputData([])
  }

  const handleAiCheckbox=(e,item)=>{
    const{name,checked}=e.target
    if(name=='selectfeild'){
      if(checked){
        setselectedaifields([...selectedaifeilds,item])
      }
      else{
        setselectedaifields(prev => prev.filter(inner => inner !== item));
      }
    }else{
      if(checked){
        setaiselecdialoge(true)
      //   const updatedcheckbox={...selectedcheckbox}
      //   for (const key of Object.keys(selectedcheckbox)) {
      //     if (inputData[key]) {
      //       updatedcheckbox[key] = true;
      //     }
      // }
      // setselectedcheckbox(updatedcheckbox)
      }else{
        setselectedaifields([])
      }
    }
  }

  const submitAirequest=()=>{
    const selectedValues = selectedaifeilds
    .filter((key) => inputData[key])  
    .map((key) => `${key}: '${inputData[key]}'`)
    .join(', ');
    
    if(chatOpen){
      setchatOpen(false)
    }
    else{
      setchatOpen(true)
      dispatch(GetAiResponse(`provide diagnosis for${selectedValues}`))
      setaiselecdialoge(false)
    }
  }

  const ClickEnableAi=()=>{
    if(chatOpen){
      setchatOpen(false)
    }
    else{
      setchatOpen(true)
      dispatch(GetAiResponse(inputData.systemicExamination))
    }
  }

  const ClickEnableAi2=()=>{
   setchatOpen2(prev=>!prev)
   if(!chatOpen2){
    dispatch(GetAiResponse(chatopen2Val))
   }
  }

  const ClickEnableClaudeAi=(e)=>{
   e.preventDefault();
    if(chatOpen){
      setchatOpen1(false)
    }
    else{
      setchatOpen1(true)
      dispatch(GetClaudeAiResponse(image));
    }
  }


  const clickserviceItem=(item)=>{
    const isChecked=inputData.servicegroup && inputData.servicegroup.some(items=>items===item)
    if(isChecked){
    const updatedService=inputData.servicegroup.filter((items)=>items !==item)
      setinputData((prev)=>({
            ...prev,
            servicegroup:updatedService
        }))
      }
      else{
        setinputData((prev)=>({
          ...prev,
          servicegroup:[...prev.servicegroup,item]
        }))
        dispatch(setdocservicestatus(true))
        dispatch(GetServicesByGroupId(item))
      }
    }


    const clickPackageItem=(item)=>{
          const isChecked=inputData.packages && inputData.packages.some(items=>items===item)
          if(isChecked){
            const updatedPackages=inputData.packages.filter((inneritem)=>inneritem !== item)
            setinputData((prev)=>({
              ...prev,
              packages:updatedPackages
            }))
          }
          else{
            setinputData((prev)=>({
              ...prev,
              packages:[...prev.packages,item]
            }))
          }
    }


    const sendBtn = () => {
      setmedicinedetails((prevdata) => ({
        ...prevdata,
        medicine_name: inputData.itemName, // Make sure this is the correct property name
        medicine_id: 0,
        generic: '' // Initialize generic as empty string
      }));
      setgenericDialog(true);
    };

  const genericSubmit=()=>{
    if(medicinedetails.medicine_name && medicinedetails.generic){
     
    }
    setlistopen(true)
  }

  const clickReferBtn=()=>{
    setreferDialoge(true)
    dispatch(GetDepartmentData())
  }

  const onClickTime=(time,type)=>{
    if(type==='referaltime'){
      setinputData((prev)=>({
        ...prev,
        referdoctime:time
      }))
      // setreferDialoge(false)
    }
    else{
      setinputData((prev)=>({
        ...prev,
        folloupdocTime:time
      }))
      // setfollowupDialoge(false)
    }
  }
  
  const submitreferdoc=()=>{
    if(inputData.referdoctime){
      const referaddconsultation={
        MRN:consultationById.MRN,
        DoctorId:inputData.referralDocID,
        // ReferralDepartmentId:inputData.referralDeptID,
        // relation:filterdPatient[0].patient.relation,
        Gender:consultationById.Gender,
        Allergy:consultationById.Allergy,
        ConsultationDate:inputData.referDate,
        ConsultationTime:inputData.referdoctime,
        Type:consultationById.Type,
      }
      dispatch(PostConsultation(referaddconsultation))
      radioclose()
    }
    else if(inputData.folloupdocTime){
      const followupconsultation={
        MRN:consultationById.MRN,
        DoctorId:consultationById.DoctorId,
        // deptID:filterdPatient[0].deptID,
        // relation:filterdPatient[0].patient.relation,
        Gender:consultationById.Gender,
        Allergy:consultationById.Allergy,
        ConsultationDate:inputData.followUpDate,
        ConsultationTime:inputData.folloupdocTime,
        Type:consultationById.Type
      }
      dispatch(PostConsultation(followupconsultation))
      radioclose()
    }
  }

  const clickfollowUp=()=>{
    setfollowupDialoge(true)
  }

  const followDialogedate=(date)=>{
    
    const dayjsDate = dayjs(date.$d);
    const formattedDate = dayjsDate.format('YYYY-MM-DD');
    
    setinputData((prev)=>({
      ...prev,
      followUpDate:formattedDate
    }))
    dispatch(GetTimeSlotsBydocid(formattedDate,doctorid))
  }
  
  
 
  const radioclose=()=>{
   setlistopen(false)
   setseconddialog(false)
   setthirdDialog(false)
   setforthDialog(false)
   setisod(false)
   setisbid(false)
   setistid(false)
   setgenericDialog(false)
   setmedicinedetails(null)
   setviewMedicineDialoge(false)
   setreferDialoge(false)
   setfifthDialoge(false)
   setfollowupDialoge(false)
 }

 const autoChangeInput=(e,value)=>{
  
  if(value !==null){
   setmedicinedetails((prevdata)=>({
     ...prevdata,
     medicine_id:value.Id,
     medicine_name:value.Name,
   }))
    setinputData((prev)=>({
     ...prev,
     itemName:value.Name
    }))
    setlistopen(true)
  }
}

 const handleradiovalue=(e)=>{
  const {name,value}=e.target
  if(value==='OD'){
    setseconddialog(true)
    setisod(true)
    setmedicinedetails((prevdata)=>({
      ...prevdata,
      medicine_day:value
    }))
  }
  else if(value==='BID'){
    setseconddialog(true)
    setisbid(true)
    setmedicinedetails((prevdata)=>({
      ...prevdata,
      medicine_day:value
    }))
  }
  else if(value==='TID'){
    setseconddialog(true)
    setistid(true)
    setmedicinedetails((prevdata)=>({
      ...prevdata,
      medicine_day:value
    }))
  }
  else if(value==='ON' || value=='OM'){
    // setseconddialog(true)
    setthirdDialog(true)
    setistid(true)
    setmedicinedetails((prevdata)=>({
      ...prevdata,
      medicine_day:value
    }))
  }
 }


//  medicine_time second dialoge

const handleseconddialog=(e)=>{
  
  const {name,value}=e.target
  setmedicinedetails((prevdata)=>({
    ...prevdata,
    medicine_time:value
  }))
  setthirdDialog(true)
}


//  medicine_time third dialoge
const handlethirddialoge=(e)=>{
  const {name,value}=e.target
  setmedicinedetails((prevdata)=>({
    ...prevdata,
    medicine_time_food:value ? value :null
  }))
  setforthDialog(true)
}

// no of days dialogue
const handleforthdialoge=(e)=>{
  const {name,value}=e.target
  const noofMedInday=medicinedetails.medicine_day
  if(noofMedInday==='OD' ||noofMedInday==='ON'||noofMedInday==="OM"){
    let total=1*parseInt(value)
    
    setmedicinedetails((prevdata)=>({
      ...prevdata,
      no_of_days:value ? parseInt(value) : null,
      total_med:total
    }))
  }
  else if(noofMedInday==='BID'){
    let total=2*parseInt(value)
    
    setmedicinedetails((prevdata)=>({
      ...prevdata,
      no_of_days:value ? parseInt(value) : null,
      total_med:total
    }))
  }
  else if(noofMedInday==='TID'){
    let total=3*parseInt(value)
    
    setmedicinedetails((prevdata)=>({
      ...prevdata,
      no_of_days:value ? parseInt(value) : null,
      total_med:total
    }))
  }
  else{
    
    setmedicinedetails((prevdata)=>({
      ...prevdata,
      no_of_days:value ? parseInt(value) : null
    }))
  }
 
}

// handle fifthdialoge
const fifthDialogeSdate=(date)=>{
  const currentdate=new Date()
  const formatedCurrentDate=dayjs(currentdate).format('YYYY-MM-DDTHH:mm:ss')
  
  const formattedDate = dayjs(date).format('YYYY-MM-DDTHH:mm:ss');
  findEndDate(formattedDate)
  setmedicinedetails((prev)=>({
    ...prev,
    sd:formattedDate ? formattedDate :null,
    prescriptedOn:formatedCurrentDate ? formatedCurrentDate :null
  }))
}

const findEndDate=(formattedDate)=>{
  const days=medicinedetails.no_of_days
  const endDate = dayjs(formattedDate).add(days, 'day').format('YYYY-MM-DDTHH:mm:ss');
  setmedicinedetails((prev)=>({
    ...prev,
    ed:endDate ? endDate : null
  }))
}

const handleFileChange = (e)=>{
  const file = e.target.files[0]; 
  
  setImage(file);

  const formData = new FormData();
  
  formData.append("img", file); 

  dispatch(GetClaudeAiResponse(formData));
};

const deleteMedicine=(index)=>{
  setpriscribedmedicine(prevMedicines =>
    prevMedicines.filter((_, i) => i !== index)
  );
}

const submitlastdialog=(e)=>{
  e.preventDefault()
  const medicinedata={
    consultID:consultID,
    medicinename:medicinedetails.medicine_name||medicinedetails.generic,
    mrn:consultationById.MRN,
    medID:medicinedetails.medicine_id,
    dosage:medicinedetails.medicine_day ? medicinedetails.medicine_day:null,
    when_to_take:medicinedetails.medicine_time ? medicinedetails.medicine_time : null,
    before_after:medicinedetails.medicine_time_food ? medicinedetails.medicine_time_food :null,
    no_of_days:medicinedetails.no_of_days ? medicinedetails.no_of_days : null,
    sd:medicinedetails.sd ? medicinedetails.sd : null,
    ed:medicinedetails.ed ? medicinedetails.ed :null,
    prescriptedOn:medicinedetails.prescriptedOn ? medicinedetails.prescriptedOn :null,
    totalPrescribed:medicinedetails.total_med ? medicinedetails.total_med :null
  }
  
  setpriscribedmedicine(prevMedicines => [...prevMedicines, medicinedata]);

  const updatedmedicinewithoutMedicineName={
    
    MedicationId:medicinedetails.medicine_id,
    MedicineName:medicinedetails.medicine_name||medicinedetails.generic,
    Dosage:medicinedetails.medicine_day,
    WhenToTake:medicinedetails.medicine_time,
    BeforeAfter:medicinedetails.medicine_time_food,
    NumberOfDays:medicinedetails.no_of_days,
    StartDate:medicinedetails.sd,
    EndDate:medicinedetails.ed,
    PrescribedOn:medicinedetails.prescriptedOn,
    TotalPrescribed:medicinedetails.total_med,
  }
  setupdatedmedicedata(prvdata=>[...prvdata,updatedmedicinewithoutMedicineName])
  // dispatch(PostPriscription(medicinedata))
  radioclose()
} 

  const submitForm=(e)=>{
    e.preventDefault()
    // const isDone =filterdPatient[0]
    const serviceIds=selectedservices.map(item=>item).join(',')
    const packageIds=inputData.packages.map(item=>item).join(',')

    const diagnosisData={
      ConsultationDetails:{
        ChiefComplaint:inputData.chiefComplaint ? inputData.chiefComplaint : null,
        SystemicExamination:inputData.systemicExamination ? inputData.systemicExamination : null,
        FinalDiagnosis:inputData.finalDiagnosis ? inputData.finalDiagnosis: null,
        HPI:inputData.hpi ? inputData.hpi :null,
        Services:serviceIds ? serviceIds:null,
        Packages:packageIds ? packageIds:null,
        Allergy:inputData.Allergies ? inputData.Allergies : null
      },
      Chart:{
        RecordedDateTime:formattedDate,
        Pulse:inputData.pulse ? parseInt(inputData.pulse):0,
        Temperature:inputData.temp ? parseInt(inputData.temp):0,
        Weight:inputData.weight ? parseInt(inputData.weight):0,
        Systolic:inputData.systolic ? parseInt(inputData.systolic):0,
        Diastolic:inputData.diastolic ? parseInt(inputData.diastolic):0,
        RespiratoryRate:inputData.respRate ? parseInt(inputData.respRate):0,
        OxygenSaturation:inputData.si02 ? parseInt(inputData.si02):0,
        Notes:null
      },
      PatientHistory:{
        // PastHistory:inputData.pastHistory,
        FamilyHistory:inputData.familyHistory,
        Occupation:inputData.Occupation,
      },
      Prescription:updatedmedicinedata.length>0 ? updatedmedicinedata : null,
      AdditionalInfo:AddiInputData.TemplateId ? AddiInputData : null
    }
    
    dispatch(setispreviewdialoge(true))
    setpreviewdetails(diagnosisData)
    
  }
  
  return (
    <div className='diagnosis_maindiv'>
          <div className={`${chatOpen ? ' chatdiv ease-in' : ''}`}>
          {chatOpen &&(
            <>
              <IconButton
              onClick={()=>setchatOpen(false)}
              >
                <CloseIcon style={{color:'white'}}/>
              </IconButton>
              <h3 className='ai_h4'>AI suggestion</h3>
                <p className='p-3'>{Airesponse && Airesponse}
                  {AiClauderesponse && AiClauderesponse}
                </p>
            </>
          )}
        </div>   
    
     <div className={`${chatOpen2 ? ' chatdiv ease-in' : ''}`}>
          
          {chatOpen2 &&(
            <>
              <IconButton
              onClick={()=>setchatOpen2(false)}
              >
                <CloseIcon style={{color:'white'}}/>
              </IconButton>
              <h3 className='ai_h4'>AI suggestion</h3>
                <p className='p-3'>{Airesponse && Airesponse}
                  {AiClauderesponse && AiClauderesponse}
                </p>
            
            </>
          )}
    </div>   

    <div>
      <ToastContainer/>
      {/* <Button variant='contained' className='m-2' sx={ { borderRadius: 28,height:30 } } onClick={()=>navigate('../mypatients')} >back</Button> */}
      <div className='diagnose_page'>
        {consultationById && consultationById.Type=='online'&&(
          <VedioCreateRoom data={consultationById}/>
        )}
      <form onSubmit={submitForm} id='form'>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <CheckCircleOutlineIcon style={{width:'50px',height:'38px',color:inputData.finalDiagnosis ?'green':'grey'}}/>
          <h3>History of present illness</h3>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            
        <div className='diagnosis_main p-2 mt-4'>
            
            <div className='row'>
             <div className='col  mt-3'>
              <div className='d-flex ml-3'>
                <h6 className=' pt-2 diagnosishead'>Patient Name:</h6>
                    <TextField
                      id="patientname"
                      variant="filled"
                      className='diagnostextfeild'
                      name='patientname'
                      value={consultationById.PatientName}
                    />              
                 
              </div>
             </div>
             <div className='col  mt-3'>
              <div className='d-flex '>
                <h6 className=' pt-2 diagnosishead'>Cheif Complaints: </h6>
                    <StyledTextField
                    id="chiefComplaint"
                    variant="filled"
                    className='diagnostextfeild'
                    name='chiefComplaint'
                    value={inputData.chiefComplaint}
                    onChange={handleinputChange}
                    />
                 {openAiResponse && (
                <div>
                  <h3>OpenAI Response:</h3>
                  <p>{openAiResponse}</p>
                </div>
              )}
              </div>
             </div> 
             </div>

             <div className='row'>
             <div className='col  mt-3'>
                <div className='d-flex ml-3'>
                  <h6 className=' pt-2 diagnosishead'>Allergies </h6>
                  <TextField                
                    id="hpi"
                    variant="filled"
                    className='diagnostextfeild'
                    name='hpi'
                    value={ consultationById && consultationById.Allergy ? consultationById.Allergy :"N/A" }
                  />
                </div>
             </div>
             <div className='col  mt-3'>
                <div className='d-flex'>
                  <h6 className=' pt-2 diagnosishead'>Add New Allergies:</h6>
                  <StyledTextField                
                    id="pastHistory"
                    variant="filled"
                    className='diagnostextfeild'
                    name='Allergies'
                    value={inputData.Allergies}
                    onChange={handleinputChange}
                  />
                </div>
             </div>
             </div>

             <div className='row'>
             <div className='col  mt-3'>
                <div className='d-flex ml-3'>
                  <h6 className=' pt-2 diagnosishead'>HPI: </h6>
                  <StyledTextField                
                    id="hpi"
                    variant="filled"
                    className='diagnostextfeild'
                    name='hpi'
                    value={inputdata.hpi}
                    onChange={handleinputChange}
                  />
                </div>
             </div>
             <div className='col  mt-3'>
                <div className='d-flex'>
                  <h6 className=' pt-2 diagnosishead'>Past History:</h6>
                  <TextField                
                    id="pastHistory"
                    variant="filled"
                    className='diagnostextfeild'
                    name='pastHistory'
                    value={inputData.pastHistory}
                    // onChange={handleinputChange}
                  />
                </div>
             </div>
             </div>
             <div className='row'>
             <div className='col   mt-3'>
              <div className='d-flex ml-3'>
                <h6 className=' pt-2 diagnosishead'>Family History:</h6>
                <StyledTextField                
                  id="familyHistory"
                  variant="filled"
                  className='diagnostextfeild'
                  name='familyHistory'
                  value={inputData.familyHistory}
                  onChange={handleinputChange}
                />
              </div>
             </div>
             <div className='col  mt-3'>
              <div className='d-flex'>
                <h6 className=' pt-2 diagnosishead'>Occupation:</h6>
                <StyledTextField                
                  id="Occupation"
                  variant="filled"
                  className='diagnostextfeild'
                  name='Occupation'
                  value={inputData.Occupation}
                  onChange={handleinputChange}
                />
              </div>
             </div>
             </div>
             <div className='row'>
              <div className='col mt-4'>
                <div className='d-flex ml-3'>
                  <h6 className=' pt-2 diagnosishead'>Systemic Examination :</h6>
                  <StyledTextField                 
                    id="systemicExamination"
                    variant="filled"
                    className='diagnostextfeild'
                    name='systemicExamination'
                    value={inputdata.systemicExamination}
                    onChange={handleinputChange}
                  />  
                
                </div>
              </div>
              <div className='col d-flex'>
                <h6 className='pt-5'>GetAiResponse</h6>
                <SiArtifacthub style={{height:'25px',width:'25px', color:'#6298f1', marginLeft:'10px',marginTop:'44px'}}/>
                <Checkbox
                  style={{marginTop:'37px'}}
                  name='aischeckbox'
                  onChange={handleAiCheckbox}
                />
              </div>
              </div>

             <div className='row'>
              <div className='col'></div>
                        
             <div className='col mt-4'>
                <div className='d-flex'>           
                <h6 className=' pt-2 diagnosishead'>Final Diagnosis :</h6>
                  <StyledTextField                 
                    id="finalDiagnosis"
                    variant="filled"
                    className='diagnostextfeild'
                    name='finalDiagnosis'
                    value={inputdata.finalDiagnosis}
                    onChange={handleinputChange}
                />     
                </div>
             </div>
             </div>

             <div className='row'>
               {/* {isCheckBox &&(
               <div className='d-flex pl-5 col'>
                 <p className='pt-4'> Enable AI suggestion</p>
                  <Checkbox
                   checked={chatOpen}
                   onClick={ClickEnableAi}
                  />            
                </div>
                  )} */}
             </div>
          
             <div className='row' >
              <div className='col ml-2 mt-3'>
                <div className='d-flex'>
                <h6 className=' pt-2'>Add Services :</h6>
                <FormControl sx={{ m: 1, width: 400 }}>
                                <StyledSelect
                                labelId="demo-multiple-checkbox-label"
                                id="addservices"
                                name='addservices'
                                value={inputData.servicegroup}
                                
                                multiple
                                renderValue={(selected) => {
                                  
                                  const selectedServices = getservicegroup.filter(item => selected.map(inneritem => inneritem && inneritem).includes(item && item.Id));
                                  
                                  return selectedServices.map(service =>service.Name).join(', ');
                                 }}
                                style={{width:'300px',marginLeft:'9px',height:'40px'}}
                                MenuProps={{
                                  PaperProps: {
                                      style: {
                                          maxHeight: '200px', // Set the maximum height of the menu
                                      },
                                  },
                              }}
                                >
                                {getservicegroup && getservicegroup.map((name,index) => (
                                  <MenuItem key={index} value={name.Id} className='menuitems'>
                                    <ListItemText primary={name.Name}
                                      onClick={() => {clickserviceItem(name.Id)}}
                                    />
                                  </MenuItem>
                              ))}
                                </StyledSelect>
                </FormControl>
                </div>
                
              </div>   
              <div className='col ml-2 mt-3'>
                <div className='d-flex'>
                <h6 className=' pt-2'>Add Packages :</h6>
                <FormControl sx={{ m: 1, width: 400 }}>
                                <StyledSelect
                                labelId="demo-multiple-checkbox-label"
                                id="addpackages"
                                name='addpackages'
                                value={inputData.packages}
                                
                                multiple
                                renderValue={(selected) => {
                                  
                                  const selectedpackages = packageArray.filter(item => selected.map(inneritem => inneritem).includes(item && item.Id));
                                  
                                  return selectedpackages.map(item => item.Name).join(', ');
                                 }}
                                style={{width:'300px',marginLeft:'5px',height:'40px'}}
                                MenuProps={{
                                  PaperProps: {
                                      style: {
                                          maxHeight: '200px', // Set the maximum height of the menu
                                      },
                                  },
                              }}
                                >
                                {packageArray.map((item,index) => (
                                  <MenuItem key={index} value={item.Id} className='menuitems'>
                                  <Checkbox 
                                  onClick={()=>clickPackageItem(item.Id)}
                                  checked={inputData.packages && inputData.packages.some(items=>items===item.Id)} 
                                  />
                                  <ListItemText primary={item.Name}  />
                                  </MenuItem>
                              ))}
                                </StyledSelect>
                </FormControl>
                </div>
                
              </div>   
             <div className='  mt-2 d-flex justify-content-between' style={{width:'100%'}}>
              <div className='d-flex ml-3 '>
                <h6 className=' pt-2'>Add Medicines :</h6>
                <FormControl sx={{ m: 1, width: 400 }}>                                                                   
                            <div className='d-flex'> 
                                 <IconButton onClick={()=>setviewMedicineDialoge(true)}><EditIcon style={{color:'black'}}/></IconButton>
                                 <Autocomplete
                                    disablePortal
                                    name="itemName"
                                    options={medicinemaster}
                                    getOptionLabel={(option) => (option ? option.Name : '')}
                                    onChange={(e, value) => {  autoChangeInput(e, value) }}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => (
                                    <div className='d-flex'>
                                      <TextField
                                        type='text'
                                        name="itemName"
                                        value={inputData.itemName}
                                        onChange={handleinputChange}
                                        {...params}
                                         label="Medicine"
                                      />
                                    {!medicinemaster.some(option => option.Name === inputData.itemName) && (
                                      <>
                                           <Button variant='contained'  style={{width:'50px',height:'35px' ,marginLeft:'10px', marginTop:'10px'}} onClick={sendBtn}>add+</Button>
                                      </>
                                     )}
                                  </div>
                                   )}
                                  />
                           </div>
                           {priscribedmedicines.length > 0 && (
      <div className='selected-medicines-container' style={{ marginLeft: '120px', marginTop: '10px' }}>
        <h6>Selected Medicines:</h6>
        <div className='selected-medicines-list'>
          {priscribedmedicines.map((medicine, index) => (
            <div key={index} className='selected-medicine-item'>
              <span>{medicine.medicinename}</span>
              <IconButton 
                size="small" 
                style={{ color: 'red', marginLeft: '5px' }}
                onClick={() => deleteMedicine(index)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          ))}
        </div>
      </div>
    )}
                     </FormControl>
              </div>
                {/* <div className='d-flex justify-content-between' style={{width:'350px'}}>
                  <div className='flex-direction-column'>
                    <Button 
                      variant='outlined' 
                      sx={ {height:33, marginTop:0}}
                      endIcon={<GoCrossReference/>} 
                      onClick={clickReferBtn}>
                      Refer to
                    </Button>
                    <Button 
                      variant='outlined' 
                      sx={ {height:33, marginTop:0,marginLeft:2}}
                      onClick={clickfollowUp}
                      endIcon={<GoCrossReference/>} 
                      >
                      follow up
                    </Button>
              
                  </div>
                </div> */}
             </div>
             </div>
            
        </div>     
        
          </Typography>
        </AccordionDetails>
      </Accordion>



<Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
<AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <CheckCircleOutlineIcon style={{width:'50px',height:'38px', color:inputData.pulse ? 'green' : 'grey'}}/>
          <h3>Nursing station</h3>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <div className='row  mt-4'>
               <h6 className='col pt-2'>General Examination:</h6>
               <div className='col'>
                <div className='d-flex'>
                  <StyledTextField               
                    placeholder='PULSE'
                    id="pulse"
                    variant="filled"
                    name='pulse'
                    value={inputData.pulse}
                    onChange={handleinputChange}
                  />
               <p className='pt-3 pl-2'>B/M</p>
                </div>
              </div>
              <div className='col'>
                  <>
                  <div className='d-flex'>
                    <StyledTextField               
                      placeholder='SYSTOLIC'
                      id="systolic"
                      variant="filled"
                      name='systolic'
                      value={inputData.systolic}
                      onChange={handleinputChange}
                    />
                    <p className='pt-3 pl-2'>mmHg</p>
                  </div>
                   <div className='d-flex'>
                   <StyledTextField               
                     placeholder='DIASTOLIC'
                     id="diastolic"
                     variant="filled"
                     name='diastolic'
                     value={inputData.diastolic}
                     onChange={handleinputChange}
                   />
                   <p className='pt-3 pl-2'>mmHg</p>
                 </div>
                  </>
                {/* )} */}
              </div>
              <div className='col'>
                <div className='d-flex'>
                  <StyledTextField                
                    placeholder='R-RATE'
                    id="respRate"
                    variant="filled"
                    name='respRate'
                    value={inputData.respRate}
                    onChange={handleinputChange}
                  />
                   <p className='pt-3 pl-2'>B/M</p>
                </div>
              </div>
             
              
             </div>
              <div className='row mt-2' style={{marginLeft:'10rem',width:'fit-content'}}>
                <div className='col'>
                  <div className='d-flex'>
                  <StyledTextField                
                    placeholder='TEMPERATURE'
                    id="temp"
                    variant="filled"
                    name='temp'
                    value={inputData.temp}
                    onChange={handleinputChange}
                  />
                   <p className='pt-3 pl-2'>C</p>
                  </div>
                </div>  
                <div className='col'>
                  <div className='d-flex'>
                    <StyledTextField                
                      placeholder='WEIGHT'
                      id="weight"
                      variant="filled"
                      name='weight'
                      value={inputData.weight}
                      onChange={handleinputChange}
                    />
                    <p className='pt-3 pl-2'>KG</p>
                  </div>
                </div>  
                <div className='col'>
                  <div className='d-flex'>
                    <StyledTextField                
                        placeholder='SIO2'
                        id="sio2"
                        variant="filled"
                        name='si02'
                        value={inputData.si02}
                        onChange={handleinputChange}
                    />
                    <p className='pt-3 pl-2'>%</p>
                  </div>
                </div>
              </div>           
             
             </Typography>
             </AccordionDetails>
</Accordion>


{templatebydepartment && templatebydepartment.length>0 &&(
  <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="panel1-content"
    id="panel1-header"
  >
    <CheckCircleOutlineIcon style={{width:'50px',height:'38px',color:'grey'}}/>
    <h3>Additional Speciality Inputs</h3>
  </AccordionSummary>
  <AccordionDetails>
    <Typography>
      <div className='additionanlInputBtnDiv'>
      {templatebydepartment.map((item)=>(
        <button type='button' onClick={()=>
          {
          settemplatedata(item)
          setAddiInputData({...AddiInputData,TemplateId:item.Id,SpecialityInfos:[]})
          }}>
            {item.Name}</button>
      ))}
      </div>
      <Templatedisplay templatedata={templatedata}  AddiInputData={AddiInputData} setAddiInputData={setAddiInputData}/>
{/* {templateData && (
        <div className='row'>
        {templateData.map((item,index) =>(
        <div className='d-flex mt-4'>
          <div className='d-flex ml-3'>
            <h6 className=' pt-2 diagnosishead'> {item.FieldName}</h6>
            {(() => {
      switch (item.FieldType) {
        case 'text':
          return (
            <div className='d-flex flex-column'>
            <TextField                 
              id={`text-field-${index}`}
              variant="filled"
              className='diagnostextfeild'
              name={`text-field-${index}`}
              onChange={(e)=>{handleAdditionalInput(e,item.Id)}}
            />
            {item.AI &&(
              <div>
              <div className='d-flex pl-5 col'>
              <p className='pt-4'>Enable AI suggestion</p>
              <Checkbox
                checked={chatOpen2}
                onChange={ClickEnableAi2} // Better to use onChange for handling changes
              />
            </div>
              </div>
            )}
            </div>
            
          );
        case 'checkbox':
          const selectoptions=item.Option.split(",")
          return (
            <Select
              id={`checkbox-field-${index}`}
              variant="filled"
              className='diagnostextfeild'
              name={`checkbox-field-${index}`}
              onChange={(e)=>{handleAdditionalInput(e,item.Id)}}
              // options={item.options} // Replace checkboxOptions with your options
              // You need to define your options array here
            >
              {selectoptions.map((innerItem)=>(
              <MenuItem>{innerItem}</MenuItem>
              ))}
              </Select>
          );
        case 'radio':
          const radioOptions=item.Options.split(",")
          return (
            <div>
            {radioOptions.map((option, idx) => (
              <div className='d-flex'>
              <label key={idx}>
                <input
                  type="radio"
                  name={`radio-field-${index}`}
                  value={option}
                  onChange={(e)=>{handleAdditionalInput(e,item.Id)}}
                />
                {option}
              </label>
              </div>
            ))}
          </div>
          );
        default:
          return null;
      }
    })()}
          
          </div>
        </div>           
        ))
      }
      </div>
       )} */}
       {/* <div className='d-flex justify-content-center mt-3'>
         <Button variant='contained' style={{backgroundColor:'black'}} onClick={submitAdditionalinput}>Submit</Button>
       </div> */}
       </Typography>
       </AccordionDetails>
</Accordion>
)}

<Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="panel1-content"
    id="panel1-header"
    ><h3>Image interpretation with AI</h3>
  </AccordionSummary>
  <AccordionDetails>
     <Typography>
          <TableContainer component={Paper} className='tablecontainer_main' >
                          <Table sx={{ minWidth: 200 }}>
                            <TableHead>
                               <StyledTableCell align='center'>
                              {/* next phase needed */}

                              {/* <div className='col d-flex'>
                                  <h6 className='pt-5'>GetAiResponse</h6>
                                  <SiArtifacthub style={{height:'25px',width:'25px', color:'#6298f1', marginLeft:'10px',marginTop:'44px'}}/>
                                  <Checkbox
                                    style={{marginTop:'37px',color:'white'}}
                                    name='aischeckbox'
                                    onChange={handleAiCheckbox}
                                  />
                                </div> */}
                               </StyledTableCell>
                               <StyledTableCell align='center'> 
                                     Upload X-ray/CTC image<br/>
                                    <input type="file" onChange={handleFileChange}/> 
                                    <Button 
                                      onClick={()=>{setaiopen(true)}} 
                                      variant='contained' 
                                      style={{backgroundColor:'black'}}>View suggestion</Button>
                               </StyledTableCell>
                            </TableHead>
                          </Table>  
          </TableContainer>
      </Typography>
   </AccordionDetails>
</Accordion>
{/* <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}> */}

<Accordion  onChange={handleChange('panel5')}>
    <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
        >
        <Button variant='contained' sx={ {height:33,marginRight:7.5,marginTop:3,backgroundColor:'black'} }  type='submit' >preview</Button>
    </AccordionSummary>
</Accordion>

</form>

{/* ai suggestion */}
                    <Dialog open={aiselectdialoge}>
                    <DialogContent>
                    {Object.keys(selectedcheckbox)
                      // .filter((item) => selectedcheckbox[item]) // Only include selected checkboxes
                      .map((item) => (
                        <MenuItem key={item}>
                          <Checkbox
                            name='selectfeild'
                            checked={selectedaifeilds.includes(item)}
                            onChange={(e) => handleAiCheckbox(e, item)}
                            disabled={inputData[item] === ''}
                          />
                          <ListItemText primary={item} />
                        </MenuItem>
                      ))}
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={submitAirequest}>submit</Button>
                        <Button onClick={()=>setaiselecdialoge(false)}>Close</Button>
                      </DialogActions>
                    </Dialog>

                    <Dialog open={isAiOpen}>
                      <DialogContent>
                        {Aisuggustion && (
                          <h5>{Aisuggustion}</h5>
                        )}
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={()=>setaiopen(false)}>Close</Button>
                      </DialogActions>
                    </Dialog>


                        {priscribedmedicines.length > 0 && (
                    <Dialog open={viewMedicineDialog}>
                      <DialogContent>
                        <TableContainer component={Paper} className='tablecontainer_main' >
                          <Table sx={{ minWidth: 200 }}>
                            <TableHead>
                               <StyledTableCell align='center'>MEDICINE NAME</StyledTableCell>
                               <StyledTableCell align='center'>HOW MANY TIMES/DAY</StyledTableCell>
                               <StyledTableCell align='center'>WHEN TO TAKE</StyledTableCell>
                               <StyledTableCell align='center'>BEFORE FOOD/AFTER FOOD</StyledTableCell>
                               <StyledTableCell align='center'>TOTAL DAYS</StyledTableCell>
                               <StyledTableCell align='center'>ACTION</StyledTableCell>
                            </TableHead>
                            {priscribedmedicines.map((item,index)=>(
                            <StyledTableRow>
                            <StyledTableCell align='center'>{item.medicinename}</StyledTableCell>
                            <StyledTableCell align='center'>{item.dosage}</StyledTableCell>
                            <StyledTableCell align='center'>{item.when_to_take}</StyledTableCell>
                            <StyledTableCell align='center'>{item.before_after}</StyledTableCell>
                            <StyledTableCell align='center'>{item.no_of_days}</StyledTableCell>
                            <StyledTableCell align='center'>
                              <IconButton style={{color:'red'}} onClick={()=>{deleteMedicine(index)}}><DeleteIcon/></IconButton>
                            </StyledTableCell>
                            </StyledTableRow>
                            ))}
                          </Table>
                        </TableContainer>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={()=>radioclose()}>close</Button>
                      </DialogActions>
                   </Dialog>
                      )}

{/* add medicine to medicine master */}
                   <Dialog open={genericDialog}>
                     <DialogContent>
                      <div className='d-flex'>
                        <label>Generic Name</label>
                        <input type='text' name='generic' className='form-control' style={{borderWidth: '1px', borderColor: 'black'}} onChange={handleinputChange}/>
                      </div>
                     </DialogContent>
                        <DialogActions>
                          <div>
                            <Button onClick={radioclose}>close</Button>
                            <Button onClick={genericSubmit}>Submit</Button>
                          </div>
                        </DialogActions>
                   </Dialog>
{/* refer a doctor or department */}
                   <Dialog open={referDialoge}>
                     <DialogContent>
                      {inputData.referralDocID && !inputData.referDate ? (
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <StaticDatePicker
                              orientation="landscape"
                              disablePast
                              // value={selectedDate} 
                              onChange={handleDateChange} 
                            />
                        </LocalizationProvider>
                        </div>
                      ):inputData.referDate ?(
                        notimeslotavailable ?(
                          <div><h4>No time slots available</h4></div>
                        ):(
                          <div className='d-flex justify-content-between'>
                          {timesSlotes.map((formattedHour, index) => {
                              const isTimeBooked=formattedHour.Status===false
                              return(
                                <Button
                                key={index}
                                variant='rounded'
                                style={{
                                  backgroundColor: isTimeBooked ? 'red' : 'green',
                                  marginLeft: '10px',
                                  color: 'white',
                                  marginTop: '4px',
                                  cursor: isTimeBooked ? 'not-allowed' : 'pointer',
                                }}
                                disabled={isTimeBooked}
                                onClick={() => {onClickTime(formattedHour.TimeSlot,'referaltime')}}
                              >
                                {formattedHour.TimeSlot}
                              </Button>
                              )
                          })}
                        </div>
                        )
                      ):(
                        <div>
                        <div className='d-flex' style={{ flexDirection: 'column' }}>
                          <label >Select Department:</label>
                          <StyledSelect 
                            style={{width:'300px',marginLeft:'9px',height:'40px'}}
                            name='referralDeptID'
                            value={inputData.referralDeptID}
                            onChange={handleinputChange}
                          >
                         {getdepartment && getdepartment.map((item)=>(
                          <MenuItem value={item.Id}>
                             <ListItemText primary={item.Name}></ListItemText>
                          </MenuItem>
                         ))}
                         </StyledSelect>
                        </div>

                         {inputData.referralDeptID &&(
                          <div className='d-flex mt-4 ' style={{ flexDirection: 'column' }}>
                          <label >Select Doctor:</label>
                          <StyledSelect
                            style={{width:'300px',marginLeft:'9px',height:'40px'}}
                            name='referralDocID'
                            onChange={handleinputChange}
                            value={inputData.referralDocID}
                          >
                            {getdoctorbydepid && getdoctorbydepid.map((item)=>(
                            <MenuItem value={item.Id}>
                              <ListItemText primary={item.Name}></ListItemText>
                            </MenuItem>
                            ))}
                            
                          </StyledSelect>
                          </div>
                          
                         )}
                      </div>
                      )}
                     </DialogContent>
                        <DialogActions>
                          <div>
                            <Button onClick={()=>
                              {setinputData((prev)=>
                                ({...prev,referralDeptID:null,referralDocID:null,referDate:null}))
                                radioclose()
                              }}>
                                close</Button>
                            <Button disabled={!inputData.referralDocID} onClick={submitreferdoc}>submit</Button>
                          </div>
                        </DialogActions>
                   </Dialog>
{/*add follow up   */}

                  <Dialog open={followupDialoge}>
                    {!inputData.followUpDate ? (
                      <>
                        <DialogTitle style={{ color: 'black' }}>Follow up date</DialogTitle>
                        <DialogContent>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              orientation="landscape"
                              disablePast
                              onChange={followDialogedate}
                            />
                          </LocalizationProvider>
                        </DialogContent>
                      </>
                    ) : notimeslotavailable ? (
                      <div><h4>No time slots available</h4></div>
                    ) : (
                      <div className='d-flex justify-content-between'>
                        {timesSlotes.map((formattedHour, index) => {
                          const isTimeBooked = formattedHour.Status === false;
                          return (
                            <Button
                              key={index}
                              variant='rounded'
                              style={{
                                backgroundColor: isTimeBooked ? 'red' : 'green',
                                marginLeft: '10px',
                                color: 'white',
                                marginTop: '4px',
                                cursor: isTimeBooked ? 'not-allowed' : 'pointer',
                              }}
                              disabled={isTimeBooked}
                              onClick={() => { onClickTime(formattedHour.TimeSlot, 'followuptime') }}
                            >
                              {formattedHour.TimeSlot}
                            </Button>
                          );
                        })}
                      </div>
                    )}
                     <DialogActions>
                          <div>
                            <Button onClick={()=>
                              {setinputData((prev)=>
                                ({...prev,followUpDate:null,folloupdocTime:null}))
                                radioclose()
                              }}>
                                close
                              </Button>
                              <Button disabled={!inputData.folloupdocTime} onClick={submitreferdoc}>submit</Button>
                          </div>
                        </DialogActions>
                  </Dialog>


 {/*adding medicine details */}
                    <Dialog open={islistopen}>
                         <DialogTitle style={{ color: 'black', fontFamily: 'times new roman' }}> Select Time</DialogTitle>
                            <DialogContent>
                                <FormControl>
                                    {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
                                    <RadioGroup
                                      aria-labelledby="demo-radio-buttons-group-label"
                                      // defaultValue="female"
                                      name="medicine_day"
                                      onChange={handleradiovalue}
                                    >
                                      <FormControlLabel value="OD" control={<Radio />} label="OD (ONCE A DAY)"/>
                                      <FormControlLabel value="BID" control={<Radio />} label="BID (TWICE A DAY)" />
                                      <FormControlLabel value="TID" control={<Radio />} label="TID (THRICE A DAY)" />
                                    </RadioGroup>
                                </FormControl>
                            <DialogActions><Button onClick={radioclose}>close</Button></DialogActions>
                            </DialogContent>
                       </Dialog>

                       <Dialog open={secondDialog}>
                         <DialogTitle style={{ color: 'black', fontFamily: 'times new roman' }}> Select Time</DialogTitle>
                            <DialogContent>
                                <FormControl>
                                    {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
                                    <RadioGroup
                                      aria-labelledby="demo-radio-buttons-group-label"
                                      // defaultValue="female"
                                      name="medicine_time"
                                      onChange={handleseconddialog}
                                    >
                                      {
                                          isod && isod!==null  ? (
                                            <div>
                                              <FormControlLabel value="morning" control={<Radio />} label='Morning'/>
                                              <FormControlLabel value="afternoon" control={<Radio />} label="Afternoon" />
                                              <FormControlLabel value="night" control={<Radio />} label="Night" />
                                            </div>
                                          ) : isbid && isbid !==null? (
                                            <div>
                                             <FormControlLabel value="morning-afternoon" control={<Radio />} label='Morning-Afternoon'/>
                                             <FormControlLabel value="morning-night" control={<Radio />} label='Morning-night'/>
                                             <FormControlLabel value="morning-night" control={<Radio />} label='Afternoon-night'/>
                                            </div>
                                          ) : istid && istid!==null? (
                                            /* Default content if neither isod nor bid is true */
                                            <div>
                                               <FormControlLabel value="morning-afternoon-night" control={<Radio />} label='Morning-Afternoon-Night'/>
                                            </div>
                                          ): (
                                            /* Default content if neither isod nor bid is true */
                                            <div>
                                               {/* <FormControlLabel value="morning-afternoon-night" control={<Radio />} label='Morning-Afternoon-Night'/> */}
                                            </div>
                                          )
                                        }
                                    </RadioGroup>
                                    <hr></hr>
                                      <h5 className='d-flex justify-content-center'>Before/After food</h5>
                                    <RadioGroup
                                      aria-labelledby="demo-radio-buttons-group-label"
                                      // defaultValue="female"
                                      name="medicine_time_food"
                                      onChange={handlethirddialoge}
                                    >
                                      <FormControlLabel value="Before Food" control={<Radio />} label='Before Food'/>
                                      <FormControlLabel value="After food" control={<Radio />} label="After Food" />
                                    </RadioGroup>
                                   <hr></hr>
                                    <h5 className='d-flex justify-content-center'>No of days</h5>
                                    <RadioGroup
                                      aria-labelledby="demo-radio-buttons-group-label"
                                      name="no_of_days"
                                      onChange={handleforthdialoge}
                                    >
                                      <FormControlLabel value="7" control={<Radio />} label='7 Days'/>
                                      <FormControlLabel value="14" control={<Radio />} label="14 Days" />
                                      <FormControlLabel value="21" control={<Radio />} label="21 Days" />
                                      <input type='text' placeholder='days' className='form-control' name='no_of_days' onChange={handleforthdialoge}/>

                                    </RadioGroup>
                                    
                                </FormControl>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={radioclose}>close</Button>
                              <Button onClick={()=>{setfifthDialoge(true)}}>OK</Button>
                            </DialogActions>
                       </Dialog>

                      
                         <Dialog open={fifthDialoge} >
                          <DialogTitle style={{color:'black'}}>Medicine Start Date</DialogTitle>
                          <DialogContent>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    orientation="landscape"
                                    disablePast
                                    onChange={fifthDialogeSdate}
                                  />
                            </LocalizationProvider>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={submitlastdialog}>Submit</Button>
                          </DialogActions>
                        </Dialog>   

                        {previewstatus &&(
                          <Preveiw 
                            data={previewdetails}
                            patientdetails={consultationById}
                            medicine={priscribedmedicines}
                            template={AddiInputData}
                            consultid={consultID}
                          />
                        )}   

                        {docservicestatus &&(
                          <Servicebygroupid data={getservicesbygroupid}/>
                        )}              
      </div>
    </div>
    </div>
  )
}

export default DocDiagnosis