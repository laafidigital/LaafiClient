import React, { useRef, useState ,useEffect} from 'react'
import { FormControl } from '@mui/base/FormControl';
import ListItemText from '@mui/material/ListItemText';
import { StyledSelect } from '../../../Styles/Select';
import { StyledTableCell,StyledTableRow } from '../../../Styles/Table';
import Checkbox from '@mui/material/Checkbox';
import { IconButton, ListItemButton, Select, Typography } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useSelector } from 'react-redux';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { GetAddedFloors, GetBedByRoomId, GetConsultation, GetDocShecduleById, GetFloor, GetHospitalInfrastructure, GetPackages, GetRooms, GetServiceGroups, GetServices, GetServicesByGroupId, GetServicesById, GetServicesByServiceids, GetTimeSlotsBydocid, GetTimeSlotsByid, GetUser, Getdoctorsonly, GetdoctorsonlybydepId, PostAdmitPatient, PostBed, PostBookLabPackage, PostBookLabServices, PostConsultation, PostConsultationServicesAndPackages, PutBed, PutBedData, SignupData } from '../../Store/Actions';
import { GetDepartmentData } from '../../Store/ApiReducers/Auth';
import { toast, ToastContainer } from 'react-toastify';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Box from '@mui/material/Box';
import { setemptypostconsultation, setemptyregisterdpatients } from '../../Store/AddpatientSlice';
import Servicebygroupid from '../Reusablecomponents/Servicebygroupid';
import { setemptyselectedservices, setservicegroupstatus } from '../../Store/AddservicesSlice';
import { setemptyregisterdoctor } from '../../Store/Doctor/AddDoctorSlice';
import { setemptychecusernamesignupexist, setregisteredpatientresponse } from '../../Store/SignupSlice';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { GetCheckExistingUsername, Getdoctorbydepid, GetRegisterdDoctors, GetRegisterdPatients, PatchUpdatePatientDob, SignupDataPatient } from '../../Store/ApiReducers/Auth';
import Slotbooking from '../../PatientFrame/Slotbooking';
import { GetDoctorSlotsForTheWeek } from '../../Store/ApiReducers/DoctorSchedules';
import PhoneInput from 'react-phone-input-2';
import { UpdateAdminPersonalDetails } from '../../Store/ApiReducers/Auth';



const Addpatients = () => {
  
    const dispatch=useDispatch()
    const formdata=new FormData()
    const currentDateTime = new Date().toLocaleString();

//api 
    const consultation=useSelector((state)=>state.Addpatentdetails.consultation)
    const getusers=useSelector((state)=>state.Addpatentdetails.registerdpatients)
    const postconsultationResult=useSelector((state)=>state.Addpatentdetails.consultationPostResult)
    const postresult=useSelector((state)=>state.signup.signupresult)
    const getdepartment=useSelector((state)=>state.Adddepartment.departmentArray)
    const getdoctorbydepid=useSelector((state)=>state.Adddoctor.doctoronlybyid)
    const getservices=useSelector((state)=>state.Addservices.servicesbyid)
    const getpackages=useSelector((state)=>state.Addpackages.getpackages)
    const floorarray=useSelector((state)=>state.Addfloor.floorresult)
    const allfloorsandrooms=useSelector((state)=>state.Addfloor.roomresult)
    const bedbyroomidresult=useSelector((state)=>state.Addfloor.bedbyidresult)
    const Existusername=useSelector((state)=>state.signup.checkusernameExist)
    const postpatinetregistraionRes=useSelector((state)=>state.signup.registeredpatientresponse)
    const timesSlotes=useSelector((state)=>state.Adddoctor.timeSlotsbydocId)
    const Notimeslotavailable=useSelector((state)=>state.Adddoctor.error)
    const getregdoctors=useSelector((state)=>state.Adddoctor.registerddoctor)
    const errors=useSelector((state)=>state.Addpatentdetails.error)
    const getservicegroup=useSelector((state)=>state.Addservices.servicegroups)
    const getservicesbygroupid=useSelector((state)=>state.Addservices.servicesbygroupid)
    const selectedservices=useSelector((state)=>state.Addservices.selectedservices)
    const servicegroupstatus=useSelector((state)=>state.Addservices.servicegroupstatus)
    const services=useSelector((state)=>state.Addservices.servicesbyserviceids)
    
    
    const[inputFeilddata,setinputFeilddata]=useState({mrn:'',userName:'', username:'',email:'',password:'',phoneNumber:'',services:[],packages:[],group:[],address:'',dob:'', age:'',type:'out_patient',relation:'myself',gender:'male',price:0,formattedservices:'',formattedpackages:'',})
    const [validateInput,setvalidateInput]=useState()                                           
    const [viewAll,setviewAll]=useState(false)   
    const [isValueSet, setIsValueSet] = useState(false); 
    const [priceDetails,setPriceDetails]=useState()
    const [selectedData,setselectedData]=useState(null)
    const [signupStatus,setsignupStatus]=useState(false)
    const [visibile,setvisibility]=useState(false)
    const [usernameError,setusernameError]=useState({username:''})
    const [imagefile,setimagefile]=useState()
    const [isadmitdata,setisadmitdata]=useState(false)
    const [inpatientaviewall,setinpatientaviewall]=useState(false)
    const [isservicegruop,setisservicegroup]=useState(false)

    const prevPriceDetails = useRef(null);

  
    //date format

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add 1 to month because it's zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    
    
    
    // states of room selection
    const [open, setOpen] = React.useState(false);
    const [displayAllData, setDisplayAllData] = useState(true);
    const [filteredData, setFilteredData] = useState();
    const [doccalender,setdoccalender]=useState(false)
    const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [floordialog,setfloordialog]=useState(false)
    const [subFloor,setSubfloor]=useState(false)
    const [room,setRoom]=useState(false)
    const [bed,setBed]=useState(false)
    const [advanceopen,setadvanceopen]=useState(false)
    const [hoveredBedPrice, setHoveredBedPrice] = useState(null);
    const [dobdialoge,setdobdialoge]=useState(false)
    const [showDobPicker, setShowDobPicker] = useState(false);
    const [selectedDob, setselectedDob] = useState();
    
    useEffect(()=>{
      dispatch(GetDepartmentData())
      dispatch(GetServices())
      dispatch(GetPackages())
      dispatch(GetFloor())
      dispatch(GetServiceGroups(''))
     
      if(postconsultationResult){
        dispatch(setemptyregisterdpatients())
        dispatch(setemptypostconsultation())
      }
    },[dispatch,postresult,postconsultationResult])

 
    useEffect(() => {
      if(inputFeilddata.userName  && inputFeilddata.phoneNumber &&inputFeilddata.phoneNumber.length==10 && !inputFeilddata.password) {
        let newPassword = generatePassword();
        setinputFeilddata((prev) => ({ ...prev, password: newPassword }));
      }
      if(priceDetails && prevPriceDetails.current !== priceDetails) {
        const grandTotal = getTotalPrice();
   
        setinputFeilddata((prev) => ({
          ...prev,
          price: grandTotal
        }));
        prevPriceDetails.current = priceDetails; 
      } 
    },[inputFeilddata,getusers,priceDetails]);

    useEffect(() => {
      if (postpatinetregistraionRes?.Id) {
        setinputFeilddata(prevData => ({
          ...prevData,
          mrn: postpatinetregistraionRes.Id
        }));
        setdobdialoge(true);
      }
    }, [postpatinetregistraionRes]);
    
    useEffect(()=>{
      {Existusername ===true ? setusernameError({username:'username already existing'}) :setusernameError({username:''})}
      if(getregdoctors){
        setPriceDetails((prev)=>({
          ...prev,
          price:getregdoctors.Fee ? getregdoctors.Fee : 0
        }))
      }
      if(selectedservices){
         let total=0
         selectedservices.forEach((service)=>{
         total += service ? parseFloat(service.price):0
      })
      setPriceDetails((prev)=>({
        ...prev,
        servicesum:total
      }))
      }
  },[Existusername,getregdoctors,selectedservices])



    const handleinputchange=(e)=>{
      const {name,value}=e.target

      if(selectedData){
        // if(name=='deptID'){
        //   if(value===4){
        //     dispatch(Getdoctorbydepid(''))
        //     dispatch(GetServicesById(''))
        //   }
        //   else{
        //     dispatch(Getdoctorbydepid(value))
        //     dispatch(GetServicesById(value))
        //   }
        //   setselectedData((prev)=>({
        //     ...prev,
        //     [name]:value
        //    }))
        // }
        if(name==='advancePaid'){
          setselectedData((prev)=>({
            ...prev,
            [name]:parseInt(value)
          }))
         }
        if(name=='type'){
          if (value==='in_patient'){
           dispatch(GetHospitalInfrastructure())
           setfloordialog(true)
           setselectedData((prev)=>({
             ...prev,
             type:value
           }))
          }
         }
        // if(name==='docID'){
        //   dispatch(GetRegisterdDoctors(value))
        //    setselectedData((prev)=>({
        //     ...prev,
        //     [name]:value
        //    }))
        //   // setdoccalender(true)
        //   dispatch(GetDoctorSlotsForTheWeek(value)).then((res)=>{
        //     setIsSecondDialogOpen(true)
        //   }).catch((err)=>{
        //     setIsSecondDialogOpen(false)
        //   })
        // }
        if(name==='group'){
          const selectedservicegroup=e.target.value
          const lastId=selectedservicegroup[selectedservicegroup.length-1]
          dispatch(GetServicesByGroupId(lastId))
          dispatch(setservicegroupstatus(true))
          setselectedData({...selectedData,group:value})
          setisservicegroup(true)
        }
        if(name ==='services'){
          const selectedServices = e.target.value
    
  
          setselectedData((prev)=>({
             ...prev,
            services:value
          }))
  
          const formattedservices = selectedServices.join(',');
  
          setselectedData((prev)=>({
            ...prev,
          formattedservices
         }))
  
          if(selectedServices){
            let totalPrice=0
          
            selectedServices.forEach((service) => {
              const serviceData = getservices.find((item) => item.Id === service);
              const servicePrice = serviceData ? parseFloat(serviceData.Price) : 0;
              totalPrice += servicePrice;
            }); 
            setPriceDetails((prev)=>({
              ...prev,
              servicesum:totalPrice
            }))
          }
         }
        if(name==='packages'){
            let selectedpackages=e.target.value
            let totalAmount=0
            setselectedData((prev)=>({
              ...prev,
            packages:value
          }))
  
          const formattedpackages = selectedpackages.join(', ');
  
          setselectedData((prev)=>({
            ...prev,
           formattedpackages
         }))

           if(selectedpackages){
            selectedpackages.forEach((packages)=>{
              const pakageData=getpackages.find((item)=>item.Id===packages)
           
              const packagePrice = pakageData ? parseFloat(pakageData.Price) : 0;
              totalAmount+=packagePrice
            })
            setPriceDetails((prv)=>({
              ...prv,
              packageprice:totalAmount})
              )
           }
         }

         if(name==='physiciandepartment'){
           value===4 ? dispatch(Getdoctorbydepid('')) : dispatch(Getdoctorbydepid(value))
         }

         setselectedData((prev)=>({
          ...prev,
          [name]:value
        }))
      }

      else{
        if(name==='mrn'){
          const filterbyphone=getusers.filter((item)=>{
            if(item && item.phoneNumber){
            return(
              item.phoneNumber.includes(value)
            )
            }
          })
      
          setFilteredData(filterbyphone)
          setDisplayAllData(false);
        }   
        if(name==='image'){
            setimagefile(e.target.files[0]) 
        }
        if(name === 'userName'){
          if(value.length>=2){
            dispatch(GetRegisterdPatients(value))
          }
          if(value.length==0){
            dispatch(setemptyregisterdpatients())
          }
        }
        if(name==='username'){
          if(value.length<=0){
            setusernameError({username:''})
          }
          else if(value.length<4){
            setusernameError({username:'minimum 4 character ir required'})
          }
          else{
            setusernameError({username:''}) 
            const username=value.trim().includes(" ") ? value.trim().replace(/\s+/g, '_') : value.trim()
            dispatch(GetCheckExistingUsername(username,'Patient'))
          }
        }
        if(name==='phoneNumber'){
          if(value.length<=0){
            setusernameError({username:''})
          }
          else if(value.length>8){
            dispatch(GetCheckExistingUsername(value,'Patient','signup'))
            // setusernameError({username:'minimum 4 character ir required'})
          }
          else if(value.length<8){
            dispatch(setemptychecusernamesignupexist())
          }
         
          setDisplayAllData(false);
        }
        if(name==='docID'){
          dispatch(GetRegisterdDoctors(value))
          dispatch(GetDoctorSlotsForTheWeek(value)).then((res)=>{
            setIsSecondDialogOpen(true)
          }).catch((err)=>{
            setIsSecondDialogOpen(false)
          })
          // setdoccalender(true)
        }
        if(name=='deptID'){
          if(value===4){
            dispatch(Getdoctorbydepid(''))
            dispatch(GetServicesById(''))
          }
          else{
            dispatch(Getdoctorbydepid(value))
            dispatch(GetServicesById(''))
          } 
        }
        if(name=='type'){
          if (value==='in_patient'){
           dispatch(GetHospitalInfrastructure())
           setfloordialog(true)
           setinputFeilddata((prev)=>({
             ...prev,
             type:value
           }))
          }
         }
        if(name==='advancePaid'){
          setinputFeilddata((prev)=>({
            ...prev,
            [name]:parseInt(value)
          }))
         }
         if(name==='group'){
          dispatch(GetServicesByGroupId(value))
          dispatch(setservicegroupstatus(true))
          setinputFeilddata({...inputFeilddata,group:value})
          setisservicegroup(true)
        }
        if(name ==='services'){
          const selectedServices = e.target.value
       
  
          setinputFeilddata((prev)=>({
             ...prev,
            services:[value]
          }))
  
          const formattedservices =selectedServices.join(', ');
  
          setinputFeilddata((prev)=>({
            ...prev,
           formattedservices:formattedservices
         }))
  
          if(selectedServices){
            let totalPrice=0
            
            selectedServices.forEach((service) => {
              const serviceData = getservices.find((item) => item.Id === service);
              const servicePrice = serviceData ? parseFloat(serviceData.Price) : 0;
              totalPrice += servicePrice;
            });
  
            setPriceDetails((prev)=>({
              ...prev,
              servicesum:totalPrice
            }))
          }
         }
        if(name==='packages'){
            let selectedpackages=e.target.value
            let totalAmount=0
            setinputFeilddata((prev)=>({
              ...prev,
            packages:value
          }))
  
          const formattedpackages = selectedpackages.join(', ');
  
          setinputFeilddata((prev)=>({
            ...prev,
            formattedpackages:formattedpackages
         }))
  
           if(selectedpackages){
            selectedpackages.forEach((packages)=>{
              const pakageData=getpackages.find((item)=>item.Id===packages)
            
              const packagePrice = pakageData ? parseFloat(pakageData.Price) : 0;
              totalAmount+=packagePrice
            })
            setPriceDetails((prv)=>({
              ...prv,
              packageprice:totalAmount})
              )
           }
         }
          setinputFeilddata((prev)=>({
            ...prev,
            [name]:value
          }))
           
      }
    }
    const handleDoctorSelection = async (value) => {
            try {
              const personalDetails = {
                Name: inputFeilddata.userName||selectedData.userName,
                Phone: inputFeilddata.phoneNumber||selectedData.phoneNumber,
                Email: inputFeilddata.email||selectedData.email,
                Address: inputFeilddata.address
              };
              
              await dispatch(UpdateAdminPersonalDetails(personalDetails,inputFeilddata.mrn||selectedData.mrn));
              handledepchange(value, 'doctor');
            } catch (error) {
            }
          }

    const handledepchange=(value,type)=>{
     
      
      if (type=='department'){
        if(value.Id===4){
          dispatch(Getdoctorbydepid(''))
          dispatch(GetServicesById(''))
        }
        else{
          dispatch(GetServicesById(value.Id))
          dispatch(Getdoctorbydepid(value.Id))
        }
        if(selectedData){
          setselectedData((prev)=>({
            ...prev,
            deptID:value.Id,
            DepartmentName:value.Name
          }))
        }
        else{
          setinputFeilddata((prev)=>({
            ...prev,
            deptID:value.Id,
            DepartmentName:value.Name
          }))
        }
      }
      else{
          // setdoccalender(true)
          dispatch(GetRegisterdDoctors(value.Id))
          dispatch(GetDoctorSlotsForTheWeek(value.Id)).then((res)=>{
            setIsSecondDialogOpen(true)
          }).catch((err)=>{
  
          })
          if(selectedData){
            setselectedData((prev)=>({
              ...prev,
              docID:value.Id,
              DoctorName:value.Name
            }))
          }else{
            setinputFeilddata((prev)=>({
              ...prev,
              docID:value.Id,
              DoctorName:value.Name
            }))
          }
        
      }   
    }
    const handlePhoneChange=(value,country)=>{
      const countrycode=country.dialCode
      const phoneNumberOnly=value.slice(countrycode.length)
      if(value.length<=0){
        setusernameError({username:''})
      }
      else if(value.length>8){
        dispatch(GetCheckExistingUsername(`${countrycode}-${phoneNumberOnly}`,'Patient','signup'))
        // setusernameError({username:'minimum 4 character ir required'})
      }
      else if(value.length<8){
        dispatch(setemptychecusernamesignupexist())
      }
      setinputFeilddata((prev)=>({
        ...prev,
        phoneNumber:`${countrycode}-${phoneNumberOnly}`
      }))
    }

    const generatePassword = () => {

      let { userName, phoneNumber } = inputFeilddata;
    
      let capitalLetter = userName.charAt(0).toUpperCase();

      let smallLetter = userName.charAt(1).toLowerCase();
    
      let number = phoneNumber.match(/\d+/)[0];
    
      let symbol ='@' 
    
      let password = `${capitalLetter}${smallLetter}${number}${symbol}`;

      while (password.length < 8) {
        password += 'pass'
      }
      return password;
    };  

  const validateForm=()=>{
     const errors={userName:'',dob:'',email:'',address:'',phoneNumber:'',deptID:'',age:'',anyone:''}
       if(selectedData){
        errors.userName = '';
        errors.email = '';
        errors.address = '';
        errors.phoneNumber = '';
        if(!selectedData.docID && !selectedservices.length && !selectedData.packages.length){
          errors.anyone='!Sorry Cant Add To Consultation You Need To Either Consult a Doctor Nor Add Services Or Packages'
        }
        setvalidateInput(errors)
      }
      else{
        if (!inputFeilddata.userName) {
          errors.userName='Name Is Required'
        }
        if (!inputFeilddata.email) {
          errors.email='Email Is Required'
        }
        // if (!inputFeilddata.dob) {
        //   errors.dob='dob Is Required'
        // }
        else if (!/^\S+@\S+\.\S+$/.test(inputFeilddata.email)) {
          errors.email='Invalid Email'
          }
        if (!inputFeilddata.phoneNumber) {
          errors.phoneNumber='Phone Number Is Required'
        }
        // else if (inputFeilddata.phoneNumber.length !== 10) {
        //   errors.phoneNumber='Invalid Phone Number'
        // }
        if(!inputFeilddata.address){
          errors.address='Address is required'
        }
        if(!inputFeilddata.docID && !selectedservices.length && !inputFeilddata.packages.length && viewAll){
          errors.anyone='!Sorry Cant Add To Consultation You Need To Either Consult a Doctor Nor Add Services Or Packages'
        }
        setvalidateInput(errors)
      }

   };
          
//  sendicon function
    const handleSendIconClick=(row)=>{
      if( row.Dob==null){
        setdobdialoge(true)
      }
      setviewAll(true)
      setselectedData({
        mrn:row.MRN,
        userName:row.Name,
        phoneNumber:`${row.PhoneNumber}`,
        email:row.Email,
        address:row.Address,
        relation:row.Relation,
        services:[],
        group:[],
        packages:[],
        type:'out_patient',
        gender:'male',
        dob:row.Dob,
        price:0,
      })
     setsignupStatus(true)
    }

   

//  dialogeboxfunctions
    const handleClickOpen = () => {
        setOpen(true);
        if(selectedservices && selectedservices.length>0){
          const ids=selectedservices.map(item=>item.Id).join(',')
       
          dispatch(GetServicesByServiceids(ids))
        }
      };
    const handleClose = () => {
        setOpen(false);
      };
  


// floor details
      const handleDateChangeFloor=(date)=>{

        setSubfloor(true)
        setisadmitdata(true)

        const selectedDate = new Date(date);
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); 
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const formattedselectedDate = `${year}-${month}-${day}`;
      

        if(selectedData){
          setselectedData((prev)=>({
            ...prev,
          checkindate:formattedselectedDate
          }))
        }
        else{
          setinputFeilddata((prev)=>({
            ...prev,
            checkindate:formattedselectedDate
          }))
        }
      }



      const onclickRoom=(roomno)=>{
        dispatch(GetBedByRoomId(roomno))
        setBed(true)
        setRoom(false)
      }
     
      const handlebedClick=(bedgroup)=>{
        setadvanceopen(true)
      
        if(selectedData){
          setselectedData((prev)=>({
            ...prev,
            roomno:bedgroup.room_Id,
            bedid:parseInt(bedgroup.id),
            bedno:bedgroup.bed_no
           }))
           handleCloseSecondDialog()
        }
        else{
          setinputFeilddata((prev)=>({
           ...prev,
           roomno:bedgroup.room_Id,
           bedid:parseInt(bedgroup.id),
           bedno:bedgroup.bed_no
          }))
          handleCloseSecondDialog()
        }
      }

      const handleAdvanceClick=()=>{
        setadvanceopen(false)
        if(selectedData){
          setselectedData((prev)=>({
            ...prev,
            advancePaid:null
          }))
        }
      }   


     const handleSubmitAdvace=()=>{
      if(selectedData){
        const updateddata={
          MRN:selectedData.mrn,
          AdmittedDate:selectedData.checkindate,
          AdmissionReason:selectedData.admissionReason,
          AdmissionType:selectedData.admissionType ? selectedData.admissionType :null,
          PrimaryDiagnosis:selectedData.primaryDiagnosis ? selectedData.primaryDiagnosis : null,
          AttendingPhysicianId:selectedData.attendingPhysicianId ? selectedData.attendingPhysicianId :null,
          BedNo:selectedData.bedid ? selectedData.bedid :null,
          // billingInfo:selectedData.billingInfo ? selectedData.billingInfo :null,
          CurrentStatus:'Active',
          SpecialNeeds:selectedData.specialNeeds ? selectedData.specialNeeds :null,
          Notes:selectedData.notes ? selectedData.notes :null
        }
        dispatch(PostAdmitPatient(updateddata))
        setsignupStatus(false)
        setviewAll(false)
        setselectedData({mrn:'',userName:'', email:'', password:'', phoneNumber:'', services:[], packages:[],address:'', age:'',type:'out_patient',relation:'myself', gender:'male', formattedservices:'',formattedpackages:'',price:0})
      }
      else{
        const updateddata={
          MRN:inputFeilddata.mrn,
          AdmittedDate:inputFeilddata.checkindate,
          AdmissionReason:inputFeilddata.inputFeilddata,
          AdmissionType:inputFeilddata.admissionType ? inputFeilddata.admissionType :null,
          PrimaryDiagnosis:inputFeilddata.primaryDiagnosis ? inputFeilddata.primaryDiagnosis : null,
          AttendingPhysicianId:inputFeilddata.attendingPhysicianId ? inputFeilddata.attendingPhysicianId :null,
          BedNo:inputFeilddata.bedid ? inputFeilddata.bedid :null,
          // insuranceProvider:inputFeilddata.insuranceProvider ? inputFeilddata.insuranceProvider :null,
          // policyNumber:inputFeilddata.policyNumber ? inputFeilddata.policyNumber :null,
          // billingInfo:inputFeilddata.billingInfo ? inputFeilddata.billingInfo :null,
          CurrentStatus:'Active',
          SpecialNeeds:inputFeilddata.specialNeeds ? inputFeilddata.specialNeeds :null,
          Notes:inputFeilddata.notes ? inputFeilddata.notes :null
        }
        dispatch(PostAdmitPatient(updateddata))
        setsignupStatus(false)
        setviewAll(false)
        setinputFeilddata({mrn:'',userName:'', email:'', password:'', phoneNumber:'', services:[], packages:[],group:[], address:'', age:'',type:'out_patient',relation:'myself', gender:'male', formattedservices:'',formattedpackages:'',price:0})

      }
      setadvanceopen(false)
     } 
      

      const handleMouseenter=(bedprice)=>{
      
        setvisibility(true)
        setHoveredBedPrice(bedprice)
      }

      const handleCloseSecondDialog = () => {
        setIsSecondDialogOpen(false);
        setdoccalender(false)
        setSubfloor(false)
        setfloordialog(false)
        setRoom(false)
        setBed(false)
        // setadvanceopen(false)
      };


// doctor appointment

      const handleDateChange = (date) => {
        
        const selectedDate = new Date(date);
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); 
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const formattedselectedDate = `${year}-${month}-${day}`;
      

        if(selectedData){
          setselectedData((prev)=>({
            ...prev,
            consultationDate:formattedselectedDate
          }))
          setIsSecondDialogOpen(true)
          dispatch(GetTimeSlotsBydocid(formattedselectedDate,selectedData.docID))
        }
        else{
          setinputFeilddata((prev)=>({
            ...prev,
            consultationDate:formattedselectedDate
          }))
          setIsSecondDialogOpen(true)
          dispatch(GetTimeSlotsBydocid(formattedselectedDate,inputFeilddata.docID))
        }
      };


      const handleCloseDialog = () => {
        setdoccalender(false);
        setfloordialog(false)
      };


      const onClickTime=(time)=>{
      

        if(selectedData){
          setselectedData((prev)=>({
            ...prev,
            consultTime:time
          }))
        }
        else{
          setinputFeilddata((prev)=>({
            ...prev,
            consultTime:time
          }))
        }
        
      }


 

  const getTotalPrice = () => {
        let totalPrice = 0;
        if (priceDetails) {
          Object.keys(priceDetails).forEach((key) => {
            totalPrice += parseFloat(priceDetails[key]) ;
          });
        }
        return totalPrice; 
  };

  const uparrowClick=()=>{
    setsignupStatus(false)
    setviewAll(false)
    setselectedData(null)
    setinputFeilddata({mrn:'',userName:'', email:'', password:'', phoneNumber:'', services:[], packages:[],group:[], address:'', age:'',type:'out_patient',relation:'myself', gender:'male', formattedservices:'',formattedpackages:'',price:0})
  }
 
  const admitformsubmit=(e)=>{
   e.preventDefault()
   setisadmitdata(false)
  }

  const handleSlotChange=(slot)=>{
    if(selectedData){
       setselectedData((prev)=>({
        ...prev,
        consultationDate: slot.consultationDate || prev.consultationDate,
        consultTime: slot.consultTime || prev.consultTime,  
       }))
       if(slot.consultTime){
        setIsSecondDialogOpen(false)
      }
    }
    else{
      setinputFeilddata((prev) => ({
        ...prev,
        consultationDate: slot.consultationDate || prev.consultationDate,
        consultTime: slot.consultTime || prev.consultTime,  
      }));
      if(slot.consultTime){
        setIsSecondDialogOpen(false)
      }
    }
  }

  const formSubmit=(e)=>{
        e.preventDefault()
        setDisplayAllData(true);
     

        const requiredSignupFields = ['phoneNumber','userName',];
        const emptyAllRequired=requiredSignupFields.every(field => validateInput[field] === '');
        const allErrorsEmpty = Object.values(validateInput).every(error => error === "");

        const phoneNumberWithCode = inputFeilddata.phoneNumber;

  // Validate the phone number format
  // if (!phoneNumberWithCode.includes('-')) {
  //   console.error('Invalid phone number format');
  //   return;
  // }

  // Split the phone number into country code and phone number
  const [countryCode, phoneNumber] = phoneNumberWithCode.split('-');

        
        

        if((emptyAllRequired && !signupStatus) && (Existusername && Existusername.IsNewUser)){
          formdata.append('Name',inputFeilddata.userName)
          formdata.append('PhoneNumber',inputFeilddata.phoneNumber)
          formdata.append('CountryCode',countryCode)
          setviewAll(true)
          dispatch(SignupDataPatient(formdata))
          setsignupStatus(true)
          dispatch(setemptychecusernamesignupexist())
        }
        else if(allErrorsEmpty && selectedData && signupStatus){
          const updatedSelectdData={
            DoctorName:selectedData.DoctorName ? selectedData.DoctorName:null,
            PatientName:selectedData.userName ? selectedData.userName :null,
            DepartmentName:selectedData.DepartmentName ?selectedData.DepartmentName  :null,
            MRN:selectedData.mrn,
            DoctorId:selectedData.docID ? selectedData.docID:null,
            Gender:selectedData.gender,
            Allergy:selectedData.allergy ? selectedData.allergy:null,
            ConsultationDate:selectedData.consultationDate==null?formattedDate:selectedData.consultationDate,
            ConsultationTime:selectedData.consultTime ? selectedData.consultTime:null,
            Services:selectedservices && selectedservices.length>0 ? selectedservices.map(service => service.Id).join(','):null,
            Packages:selectedData.formattedpackages ? selectedData.formattedpackages:null,
            Type:selectedData.type,
            Fee:priceDetails.price ? priceDetails.price:0,
            Dob:selectedData.dob ?selectedData.dob:selectedDob,
            DepartmentId:selectedData.deptID
          }
        
            if(selectedData.docID){
              dispatch(PostConsultation(updatedSelectdData))
            }
            else{
              if(selectedservices && selectedservices.length>0){
                dispatch(PostBookLabServices( selectedservices.map(service => service.Id).join(','),selectedData.mrn))
              }
              else if(selectedData.formattedpackages){
                dispatch(PostBookLabPackage(selectedData.formattedpackages,selectedData.mrn))
              }
              else{
                toast('Nither book consultation nor book services')
              }
            }
            setsignupStatus(false)
            setviewAll(false)
            setselectedData(null)
            setselectedData(null)
            setinputFeilddata({mrn:'',userName:'',username:'',dob:'', email:'', password:'', phoneNumber:'', services:[], packages:[],group:[], address:'', age:'',type:'out_patient',relation:'myself', gender:'male', formattedservices:'',formattedpackages:'',price:0})
            setPriceDetails(null)
            dispatch(setemptyselectedservices())
            dispatch(setemptyregisterdoctor(null))
        }
        else if(allErrorsEmpty && signupStatus){
          const updatedConsultationData={
            DoctorName:inputFeilddata.DoctorName ? inputFeilddata.DoctorName:null,
            PatientName:inputFeilddata.userName ? inputFeilddata.userName :null,
            DepartmentName:inputFeilddata.DepartmentName ?inputFeilddata.DepartmentName  :null,
            MRN:inputFeilddata.mrn,
            DoctorId:inputFeilddata.docID ? inputFeilddata.docID:null ,
            Gender:inputFeilddata.gender,
            Allergy:inputFeilddata.allergy ? inputFeilddata.allergy:null,
            ConsultationDate:inputFeilddata.consultationDate==null?formattedDate:inputFeilddata.consultationDate,
            ConsultationTime:inputFeilddata.consultTime ? inputFeilddata.consultTime:null ,
            Services:selectedservices && selectedservices.length>0 ?selectedservices.map(service => service.Id).join(','):null,
            Packages:inputFeilddata.formattedpackages ? inputFeilddata.formattedpackages:null,
            Type:inputFeilddata.type,
            Fee:priceDetails.price ? priceDetails.price:0,
            Dob:selectedDob,
            DepartmentId:inputFeilddata.deptID
          }
         
            if(inputFeilddata.docID){
              // dispatch(PostConsultation(updatedConsultationData))
            }
            else{
              if(selectedservices && selectedservices.length>0){
                dispatch(PostBookLabServices( selectedservices.map(service => service.Id).join(','),selectedData.mrn))
              }
              else if(inputFeilddata.formattedpackages){
                dispatch(PostBookLabPackage(inputFeilddata.formattedpackages,inputFeilddata.mrn))
              }
              else{
                toast('Nither book consultation nor book services')
              }
            }
            dispatch(PostConsultation(updatedConsultationData))
            setsignupStatus(false)
            setviewAll(false)
            setselectedData(null)
            setinputFeilddata({mrn:'',userName:'', email:'', password:'', phoneNumber:'', services:[], packages:[],group:[], address:'', age:'',type:'out_patient',relation:'myself', gender:'male', formattedservices:'',formattedpackages:'',price:0})
            setPriceDetails(null)
            dispatch(setemptyselectedservices())
            dispatch(setemptyregisterdoctor(null))
            setregisteredpatientresponse(null)
        }
  }
      
  const handleDobChange = (date) => {
    const dayjsDate = dayjs(date.$d);
    const formattedDate = dayjsDate.format('YYYY-MM-DD');
    setselectedDob(formattedDate);
    
    if (selectedData) {
      setselectedData(prev => ({
        ...prev,
        dob: formattedDate
      }));
    } else {
      setinputFeilddata(prev => ({
        ...prev,
        dob: formattedDate
      }));
    }
    
    // Update the patient's DOB in the backend
    if (postpatinetregistraionRes?.Id) {
      dispatch(PatchUpdatePatientDob(postpatinetregistraionRes.Id, formattedDate));
    } else if (selectedData?.mrn) {
      dispatch(PatchUpdatePatientDob(selectedData.mrn, formattedDate));
    }
    
    setShowDobPicker(false);
  };
   
  return (
    <div>
        <div className='servicemaindiv'>
            <h4 className='headnames'>ADD PATIENTS</h4>
            <ToastContainer/>
            {validateInput &&(<div style={{backgroundColor:'white',borderRadius:'10px',width:'52pc'}}><h5>{validateInput.anyone}</h5></div>)}
            <div className='d-flex' style={{justifyContent:getusers && getusers.length>0 ?'space-around' :'center' }}>
              <form onSubmit={formSubmit}> 
            <FormControl >
                <div className='addpatient_sub1'>
                  {viewAll &&(
                     <div class="mb-3 row"    >
                        <label  class="col-sm-2 col-form-label" >MRN</label>
                        <div style={{marginLeft:'14px',width:'287px'}}>
                           <input type="text"  class="form-control" name="mrn" value={selectedData ? selectedData.mrn : inputFeilddata ?  inputFeilddata.mrn :''} onChange={handleinputchange}/>
                        </div>
                        <IconButton style={{color:'white'}} onClick={uparrowClick}>
                          <ArrowUpwardIcon />
                        </IconButton>
                    </div>
                  )}
                 
                    <div class="mb-3 row">
                        <label  class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                        <input type="text" class="form-control" name="userName" value={selectedData ? selectedData.userName:inputFeilddata.userName} onChange={handleinputchange}/>
                        </div>
                        {validateInput &&(<div className='error-message_addpatient'>{validateInput.userName}</div>)}
                    </div>
                    
                    <div class="mb-3 row d-flex">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Phone</label>
                        <div class="col-sm-10">
                          
                          {/* {selectedData && selectedData.phoneNumber ? (<input type="number"  class="form-control" name='phoneNumber' value={selectedData ? selectedData.phoneNumber:inputFeilddata.phoneNumber}/>) */}
                          
                          <PhoneInput
                            inputStyle={{height:'45px',borderRadius:'10px'}}
                            containerStyle={{borderRadius:'10px'}}
                            country={'in'}
                            value={selectedData ? selectedData.phoneNumber:inputFeilddata.phoneNumber}
                            onChange={(value,country)=>handlePhoneChange(value,country)}
                          />
                         
                        </div>
                        {validateInput &&(<div className='error-message_addpatient'>{validateInput.phoneNumber}</div>)}
                        {usernameError &&(<div className='error-message_addpatient'>{usernameError.username}</div>)}
                    </div>
                    <div class="mb-2  d-flex" style={{marginLeft:'-33px'}}>
                      
                            {viewAll &&(
                              <>
                           <label for="inputPassword" class="col-sm-2 col-form-label">Department</label>
                           <FormControl sx={{ m: 1, width: 400 }}>
                                <StyledSelect
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                name='deptID'
                                value={inputFeilddata.deptID}
                                onChange={(event) => {
                                  const selectedName = event.target.value; // Get the selected department name
                                  const selectedDep = getdepartment.find(dep => dep.Id === selectedName); // Find the full dep object
                                  handledepchange(selectedDep,'department'); // Pass the full dep object to the handler
                              }}
                                className="departmentfeild "
                                >
                              {getdepartment.map((dep,index)=>(
                                  <MenuItem  value={dep.Id} key={index} className='menuitemfeild'>
                                      {dep.Name}
                                  </MenuItem>
                              ))} 
                               </StyledSelect>
                         </FormControl>
                              </>
                            )}
                    </div>
                    <div className='d-flex justify-content-around'>
                    {validateInput &&(<div className='error-message_addpatient'>{validateInput.relation}</div>)}
                    </div>
                    {viewAll &&(
                    <>
                    <div class="mb-2 row">
                        <label  class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                        <input type="Email"  class="form-control" name='email' value={selectedData ? selectedData.email:inputFeilddata.email} onChange={handleinputchange} />
                        </div>
                        {validateInput &&(<div className='error-message_addpatient'>{validateInput.email}</div>)}

                    </div>
                    <div class="mb-2 row">
                        <label  class="col-sm-2 col-form-label">Address</label>
                        <div class="col-sm-10">
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="1" name='address' value={selectedData ? selectedData.address:inputFeilddata.address} onChange={handleinputchange}></textarea>
                        </div>
                        {validateInput &&(<div className='error-message_addpatient'>{validateInput.address}</div>)}
                    </div>
                    </>
                    )}
                    {viewAll &&(
                      <>

                    <div className='d-flex justify-content-around ' style={{marginLeft:'70px'}}>
                         <select class="form-select form-select-lg mb-3" aria-label="Default select example" style={{borderRadius:'5px',border:'none'}} name='gender' value={selectedData ? selectedData.gender:inputFeilddata.gender} onChange={handleinputchange} placeholder='gender'>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select>
                        <div>
                        </div>
                        <select class="form-select form-select-lg mb-3" aria-label="Default select example" style={{borderRadius:'5px',border:'none'}} name='type' value={selectedData ? selectedData.patientType : inputFeilddata.type} onChange={handleinputchange}>
                            <option value="out_patient">Out patient</option>
                            <option value="in_patient">In patient</option>
                            {/* <option value="online">Online</option> */}
                        </select>
                    </div>
                    <div class="mb-3 row">
    <label class="col-sm-2 col-form-label">Date of Birth</label>
    <div class="col-sm-10">
      {showDobPicker ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={selectedDob ? dayjs(selectedDob) : null}
            onChange={handleDobChange}
            sx={{ width: '100%' }}
          />
        </LocalizationProvider>
      ) : (
        <input 
          type="text" 
          class="form-control" 
          value={selectedData ? selectedData.dob : inputFeilddata.dob} 
          onClick={() => setShowDobPicker(true)}
          readOnly
        />
      )}
    </div>
  </div>

                    <div className='d-flex'  >
                        {validateInput &&(<div className='error-message'  style={{width:'20px',marginLeft:'100px'}}>{validateInput.age}</div>)}
                    </div>
                    <div class="mb-3 row">
                        <label  class="col-sm-2 col-form-label">Allergy</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control" name='allergy' value={inputFeilddata.allergy ? inputFeilddata.allergy:null} onChange={handleinputchange} />
                        </div>
                    </div>
                    <div class="mb-3 row">
                      
                        <label  class="col-sm-2 col-form-label">Doctor</label>
                        <div class="col-sm-10">
                        <FormControl sx={{ m: 1, width: 400 }}>
                                <StyledSelect
                                name='docID'
                                value={inputFeilddata.docID}
                                onChange={(event) => {
                                  const selectedName = event.target.value;
                                  const selectedDoc = getdoctorbydepid.find(doc => doc.Id === selectedName);
                                  handleDoctorSelection(selectedDoc, 'doctor');
                                }}
                               
                              

                                style={{width:'300px',marginLeft:'5px',height:'40px'}}
                                >
                                  {getdoctorbydepid!== null
                                    ? getdoctorbydepid.map((item, index) => (
                                        <MenuItem value={item.Id} key={index}>
                                          {item.Name}
                                        </MenuItem>
                                      ))
                                    : <div>Select The Department First</div>
                                      }
                               </StyledSelect>
                        </FormControl>
                        </div>
                      
                        {/* <div className='error-message_addpatient'>{errors.doctor}</div> */}
                    </div>
                    <div className='row mb-3'>
                              <label for="staticEmail" class="col-sm-2 col-form-label">Service Group</label>
                              <div class="col-sm-10">
                              <FormControl sx={{ m: 1, width: 400 }}>
                                      <StyledSelect
                                      labelId="demo-multiple-checkbox-label"
                                      id="demo-multiple-checkbox"
                                      name='group'
                                      value={selectedData ? selectedData.group :inputFeilddata.group}
                                      onChange={handleinputchange}
                                      multiple
                                      renderValue={(selected) => {
                                        const selectedServices=getservicegroup.filter((item)=>selected.includes(item.Id))
                                        return selectedServices.map(service => service.Name).join(', ');
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
                                      {getservicegroup && getservicegroup.map((item,index) => (
                                        <MenuItem key={index} value={item.Id} className='menuitems'>
                                        {/* <Checkbox 
                                        checked={viewAll ? selectedData.group.indexOf(item.Id) > -1: inputFeilddata.services? inputFeilddata.services.indexOf(item.Id) > -1:null} 
                                        /> */}
                                        <ListItemText primary={item.Name} />
                                        </MenuItem>
                                    ))}
                                      </StyledSelect>
                              </FormControl>
                              </div>
                              
                          </div>
                        
                    <div className='row mb-3'>
                              <label  class="col-sm-2 col-form-label">Packages</label>
                              <div class="col-sm-10 d-flex">
                              <FormControl sx={{ m: 1, width: 400 }}>
                                      <StyledSelect
                                      labelId="demo-multiple-checkbox-label"
                                      // id="demo-multiple-checkbox"
                                      name='packages'
                                      value={selectedData ? selectedData.packages :inputFeilddata.packages}
                                      onChange={handleinputchange}
                                      multiple
                                      renderValue={(selected) => {
                                        const selectedpackages=getpackages.filter((item)=>selected.includes(item.Id))
                                        return selectedpackages.map(items => items.Name).join(', ');
                                      }}
                                      style={{width:'300px',marginLeft:'5px',height:'40px'}}
                                      MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: '200px',
                                            },
                                        },
                                    }}
                                      >
                                    {getpackages && getpackages.map((item, index) => (
                                            item.Status === true && (
                                              <MenuItem key={index} value={item.Id} className='menuitems'>
                                                <Checkbox
                                                  checked={
                                                    selectedData
                                                      ? selectedData.packages.indexOf(item.Id) > -1
                                                      : inputFeilddata.packages
                                                      ? inputFeilddata.packages.indexOf(item.Id) > -1
                                                      : null
                                                  }
                                                />
                                                <ListItemText primary={item.Name} />
                                              </MenuItem>
                                            )
                                          ))}
                                      </StyledSelect>
                              </FormControl>
                              <IconButton onClick={handleClickOpen}><EditIcon style={{color:'white'}}/></IconButton>
                              </div>
                          </div>
                       
                    <div className='d-flex' style={{marginRight:'50px'}}>
                        <label for="staticEmail" class="col-sm-2 col-form-label mr-3"> Amount</label>
                          <CurrencyRupeeIcon style={{height:'20px',marginTop:'10px'}}/>
                        <div  style={{width:'150px'}}>
                          <input type="number" readonly class="form-control" id="staticEmail" style={{width:'140px', backgroundColor:'#B8B8B8'}} name='price' value={inputFeilddata.price}  onChange={handleinputchange}/>
                        </div>
                    </div> 
                      </>
                    )}
                    <div className='d-flex justify-content-end'>
                      <Button variant="contained" style={{backgroundColor:'black'}} type='submit' onClick={validateForm}>submit</Button>
                    </div>
                </div>
            </FormControl>
            </form>
            <FormControl style={{paddingLeft:'40px'}}>

            <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
               {getusers && getusers.length>0 &&(
                    <TableContainer component={Paper} className='tablecontainer_main'>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">ACTION</StyledTableCell>
                        <StyledTableCell align="center">NAME</StyledTableCell>
                        <StyledTableCell align="center">PHONE</StyledTableCell>
                        {/* <StyledTableCell align="center">EMAIL</StyledTableCell> */}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                      {getusers.map((row,index)=>(
                    <StyledTableRow key={index}>
                        <StyledTableCell align="center" >
                            <IconButton onClick={() => handleSendIconClick(row,index)}>
                                <AddIcon color="primary" />
                             </IconButton>
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.Name}</StyledTableCell>
                        <StyledTableCell align="center">{row.PhoneNumber}</StyledTableCell>
                        {/* <StyledTableCell align="center">{row.Email}</StyledTableCell> */}
                     </StyledTableRow>
                      ))}
                    </TableBody>
                    </Table>
                    </TableContainer>
               )}
                   
     {/* floardialogebox */}
                        <Dialog open={floordialog}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <Box sx={{ '.css-1e6y48t-MuiButtonBase-root-MuiButton-root': { display: 'none' } }}>
                                <StaticDatePicker
                                    orientation="landscape"
                                      value={selectedDate} // Set the selected date
                                    onChange={handleDateChangeFloor} // Handle date changes
                                  />
                              </Box>
                            </LocalizationProvider>
                            <DialogActions>
                        <Button onClick={()=>{setfloordialog(false) ; selectedData ? setselectedData((prev)=>({ ...prev, checkindate:null})) :setinputFeilddata((prev)=>({ ...prev,checkindate:null }))}}>
                             cancel</Button>
                            </DialogActions>
                        </Dialog>

                        <Dialog open={subFloor} fullWidth maxWidth="md">
                          {isadmitdata ?(
                           <div>
                             <DialogTitle style={{color:'black',fontFamily:'times new roman'}}>Admission form</DialogTitle>
                              <form onSubmit={admitformsubmit}>
                            <DialogContent>
                                <div className='admitform_main'>
                                  <div className='subadmitform'>
                                    <label>Admission reason</label>
                                    <input type='text' required name='admissionReason' value={selectedData ? selectedData.admissionReason :inputFeilddata.admissionReason} onChange={handleinputchange}/>
                                  </div>
                                  <div className='subadmitform'>
                                    <label>Admission type</label>
                                    <Select
                                     style={{height:'38px'}}
                                     name='admissionType'
                                     value={selectedData ? selectedData.admissionType :inputFeilddata.admissionType}
                                     onChange={handleinputchange}
                                    >
                                      <MenuItem value='Scheduled'>Scheduled</MenuItem>
                                      <MenuItem value='Transfer'>Transfer</MenuItem>
                                      <MenuItem value='Emergency'>Emergency</MenuItem>
                                    </Select>
                                  </div>
                                </div>
                                {/* <div className='admitform_main'>
                                  <div className='subadmitform'>
                                    <label>Insurance provider</label>
                                    <input type='text' name='insuranceProvider' value={selectedData ? selectedData.insuranceProvider :inputFeilddata.insuranceProvider} onChange={handleinputchange}/>
                                  </div>
                                  <div className='subadmitform'>
                                    <label>Policy number</label>
                                    <input type='text' name='policyNumber' value={selectedData ? selectedData.policyNumber :inputFeilddata.policyNumber} onChange={handleinputchange}/>
                                  </div>
                                </div> */}
                                <div className='admitform_main'>
                                  <div className='subadmitform'>
                                    <label>Primary diagnosis</label>
                                    <input type='text' name='primaryDiagnosis' value={selectedData ? selectedData.primaryDiagnosis :inputFeilddata.primaryDiagnosis} onChange={handleinputchange}/>
                                  </div>
                                  <div className='subadmitform'>
                                    <label>Select Department</label>
                                    <Select
                                     style={{height:'38px'}}
                                     name='physiciandepartment'
                                     onChange={handleinputchange}
                                     value={selectedData ? selectedData.physiciandepartment :inputFeilddata.physiciandepartment}
                                    >
                                    {getdepartment.map((dep,index)=>(
                                    <MenuItem  value={dep.Id} key={index} className='menuitemfeild'>
                                      {dep.Name}
                                    </MenuItem>
                                    ))} 
                                    </Select>
                                  </div>
                                  <div className='subadmitform'>
                                    <label>Attending physician</label>
                                    <Select
                                     style={{height:'38px'}}
                                     name='attendingPhysicianId'
                                     value={selectedData ? selectedData.attendingPhysicianId :inputFeilddata.attendingPhysicianId}
                                     onChange={handleinputchange}
                                    >
                                       {getdoctorbydepid!== null
                                    ? getdoctorbydepid.map((item, index) => (
                                        <MenuItem value={item.Id} key={index}>
                                          {item.Name}
                                        </MenuItem>
                                      ))
                                    : <div>Select The Department First</div>
                                      }
                                    </Select>
                                  </div>
                                </div>
                              
                                <div className='admitform_main'>
                                  {/* <div className='subadmitform'>
                                    <label>Billing info</label>
                                    <input type='text' name='billingInfo' value={selectedData ? selectedData.billingInfo :inputFeilddata.billingInfo} onChange={handleinputchange}/>
                                  </div> */}
                                  <div className='subadmitform'>
                                    <label>Special needs</label>
                                    <input type='text' name='specialNeeds' value={selectedData ? selectedData.specialNeeds :inputFeilddata.specialNeeds} onChange={handleinputchange}/>
                                  </div>
                                  <div className='subadmitform'>
                                    <label>Notes</label>
                                    <input type='text' name='notes' value={selectedData ? selectedData.notes :inputFeilddata.notes} onChange={handleinputchange}/>
                                  </div>
                                </div>
                            </DialogContent>
                            <DialogActions>
                              <Button type='submit'>submit</Button>
                              <Button onClick={()=>setSubfloor(false)}>cancel</Button>
                            </DialogActions>
                            </form>
                           </div>
                          ):(
                            <div>
                            <DialogTitle style={{color:'black',fontFamily:'times new roman'}}> Select Your Floor</DialogTitle>
                            <DialogContent>
                              <div className='floorDialoge '>
                              <div className='colorbtndiv'>
                                    <div className='d-flex'>
                                       <button className='colorbtn' style={{backgroundColor:'red'}}></button>
                                       <p className='pl-2 mb-0'>Fully Occupied</p>
                                    </div>
                                    <div className='d-flex'>
                                       <button className='colorbtn' style={{backgroundColor:'yellow'}}></button>
                                       <p className='pl-2  mb-0'>Partially Occupied</p>
                                    </div>
                                    <div className='d-flex'>
                                       <button className='colorbtn' style={{backgroundColor:'green'}}></button>
                                       <p className='pl-2 '>Fully Available</p>
                                    </div>
                                </div> 
                              <div className='d-flex justify-content-between'>
                                  <h5 className='pl-4'>Floor</h5>
                                  <h5 className='pr-5'>Rooms</h5>
                                </div>
                              { Object.entries(allfloorsandrooms).map(([key,value])=>{
                                      //  {const filterRoom = allfloorsandrooms.filter((inner) => inner.floorName === value.id)
                                        return(
                                           <div className='row'>
                                                <div className='col ml-1'>
                                                    <Button variant='rounded' style={{backgroundColor:'green',marginLeft:'10px',color:'white',marginTop:'5px'}} >{key}</Button>
                                                 </div>
                                                <div className='col roomdiv'>
                                                  <div className='d-flex'>
                                                    {value.map((inneritem)=>{
                                                  
                                                       const isFilled=inneritem.TotalBeds==inneritem.OccupiedBeds
                                                       const ispartiallyfilled=inneritem.TotalBeds > inneritem.OccupiedBeds && inneritem.OccupiedBeds !==0
                                                      let roomButtonColor = isFilled ? 'red' : (ispartiallyfilled ? 'yellow' : 'green'); 
                                                      return(
                                                      <Button
                                                      variant='rounded'
                                                      style={{ backgroundColor:roomButtonColor, marginLeft: '10px', color:'white', marginTop: '5px' }}
                                                      className='floorbtn'
                                                      onClick={() => onclickRoom(inneritem.RoomId)}
                                                      disabled={isFilled}
                                                      >
                                                      {inneritem.RoomName}
                                                      </Button>
                                                      )
                                                     })}
                                                
                                                  </div>
                                                </div>
                                            </div>
                                                  )
                                          })
                                        }
                             </div> 
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={()=>setSubfloor(false)}>cancel</Button>
                            </DialogActions>
                            </div>
                          )}
                         </Dialog>

                        {bedbyroomidresult  && (
                         <Dialog open={bed} onClose={handleCloseSecondDialog}>
                            <DialogTitle style={{ color: 'black', fontFamily: 'times new roman' }}>Select Your Bed</DialogTitle>
                                <DialogContent>
                                    {bedbyroomidresult.beds && bedbyroomidresult.beds.map((bedGroup, index) => {
                                     
                                        const vacancyBed=consultation.filter((item)=>item.bedNo===bedGroup.id)
                                        const btncolor=bedGroup.admitId== null?'green':'red'
                                              return(
                                                <div key={index} >
                                                        <Button 
                                                          variant='contained' 
                                                          disabled={bedGroup.status==true} 
                                                          onMouseOver={()=>handleMouseenter(bedbyroomidresult.price)} 
                                                          onMouseLeave={()=>{handleMouseenter(bedGroup.null)
                                                                            setvisibility(false) }} 
                                                          style={{ backgroundColor:btncolor,
                                                          marginLeft: '25px', color: 'white',marginTop:'5px',borderRadius:'50px',
                                                           }} 
                                                          onClick={()=>{if(bedGroup.admitId==null){handlebedClick(bedGroup)}}}
                                                         >
                                                          {bedGroup.bed_no} 
                                                         </Button>
                                                  </div>
                                              )
                                               })}
                                              <p style={{ paddingTop:'10px',visibility:visibile ? 'visible' : 'hidden'}}> Bed Price: {hoveredBedPrice}</p>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={()=>{setBed(false)}}>cancel</Button>
                              </DialogActions>
                          </Dialog>
                        )}

                        <Dialog open={advanceopen}>
                            <DialogTitle style={{ color: 'black', fontFamily: 'times new roman' }}>Pay The Advance</DialogTitle>
                              <DialogContent>
                                <div>
                                  <input type="number" class="form-control" name='advancePaid' value={inputFeilddata.advancePaid}  onChange={handleinputchange}/>
                                </div>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleAdvanceClick}>cancel</Button>
                                <Button onClick={handleSubmitAdvace}>submit</Button>
                              </DialogActions>
                         </Dialog>
 
{/* doctorshedule dialbox */}
                        <div className='d-flex'>
                        {/* <Dialog open={doccalender} onClose={handleCloseDialog}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <StaticDatePicker
                              orientation="landscape"
                              disablePast
                              value={selectedDate} // Set the selected date
                              onChange={handleDateChange} // Handle date changes
                            />
                        </LocalizationProvider>
                        </Dialog> */}
                        
                        <Dialog open={isSecondDialogOpen} onClose={handleCloseSecondDialog}>
                          <DialogTitle style={{ color: 'black', fontFamily: 'times new roman' }}> Select Your Time</DialogTitle>
                          <DialogContent>
                            <Slotbooking onsloteChange={handleSlotChange}/>
                      
                        </DialogContent>
                        </Dialog>
                  </div>
            </div>
            </FormControl>    
            </div>
          
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title" color={'inherit'} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  Lab Services
                  <div>{currentDateTime}</div>
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                {/* (selectedData && selectedData.services.length > 0) || (inputFeilddata && inputFeilddata.services.length > 0) */}
                { services && services.length>0 && (
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 500 }} aria-label="customized table">
                          <TableHead>
                            <TableRow>
                              <StyledTableCell align="center">Services</StyledTableCell>
                              <StyledTableCell align="center">Price</StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {services.map((serviceId) => {
                                return (
                                  <StyledTableRow key={serviceId}>
                                    <StyledTableCell align="center">
                                      <div>{serviceId.ServiceName}</div>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      <div>{serviceId.Price}</div>
                                    </StyledTableCell>
                                  </StyledTableRow>
                                );
                              })
                            }
                               </TableBody>
                              </Table>
                            </TableContainer>
                          )}
              
              
              { (selectedData && selectedData.docID) || (inputFeilddata && inputFeilddata.docID) ? (
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 500 }} aria-label="customized table">
                          <TableHead>
                            <TableRow>
                              <StyledTableCell align="center">Doctor</StyledTableCell>
                              <StyledTableCell align="center">Price</StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <StyledTableRow>
                              {selectedData ? (
                                getdoctorbydepid
                                  .filter((item) => item.Id === selectedData.docID)
                                  .map((inneritem) => (
                                    <React.Fragment key={inneritem.docID}>
                                      <StyledTableCell align="center">
                                        <div>{inneritem && inneritem.UserName}</div>
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        <div>{inneritem && inneritem.Fee}</div>
                                      </StyledTableCell>
                                    </React.Fragment>
                                  ))
                              ) : (
                                getdoctorbydepid
                                  .filter((item) => item.docID === inputFeilddata.docID)
                                  .map((inneritem) => (
                                    <React.Fragment key={inneritem.name}>
                                      <StyledTableCell align="center">
                                        <div>{inneritem && inneritem.docName}</div>
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        <div>{inneritem && inneritem.fee}</div>
                                      </StyledTableCell>
                                    </React.Fragment>
                                  ))
                              )}
                            </StyledTableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    ) : null }

                { (selectedData && selectedData.packages && selectedData.packages.length>0) || (inputFeilddata && inputFeilddata.packages && inputFeilddata.packages.length > 0) ? (
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center">Packages</StyledTableCell>
                          <StyledTableCell align="center">Price</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedData ? (
                          selectedData.packages.map((packageId) => {
                            const filterPackages = getpackages.filter((inneritem) => inneritem.Id === packageId);
                            return (
                              <StyledTableRow key={packageId}>
                                <StyledTableCell align="center">{filterPackages[0].Name}</StyledTableCell>
                                <StyledTableCell align="center">{filterPackages[0].Price}</StyledTableCell>
                              </StyledTableRow>
                            );
                          })
                        ) : (
                          inputFeilddata.packages.map((packageId) => {
                            const filterPackages = getpackages.filter((inneritem) => inneritem.Id === packageId);
                            return (
                              <StyledTableRow key={packageId}>
                                <StyledTableCell align="center">{filterPackages[0].Name}</StyledTableCell>
                                <StyledTableCell align="center">{filterPackages[0].Price}</StyledTableCell>
                              </StyledTableRow>
                            );
                          })
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : null }
            
          </DialogContentText>
        </DialogContent>
        <DialogActions className='d-flex justify-content-between pl-4 pr-4'>
          <Button onClick={handleClose} autoFocus>
           close
          </Button>
        </DialogActions>
      </Dialog>

      
        {servicegroupstatus &&(
         <Servicebygroupid data={getservicesbygroupid}/>
        )}
      
        </div>
    </div>
  )
}

export default Addpatients