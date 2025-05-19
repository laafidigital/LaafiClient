import { createSlice } from "@reduxjs/toolkit";
import { FETCH_FAILURE17, FETCH_FAILURE26, FETCH_FAILURE28, FETCH_FAILURE29, FETCH_FAILURE32, FETCH_FAILURE33, FETCH_FAILURE38, FETCH_FAILURE39, FETCH_FAILURE42, FETCH_FAILURE70, FETCH_FAILURE75, FETCH_REQUEST17, FETCH_REQUEST26, FETCH_REQUEST28, FETCH_REQUEST29, FETCH_REQUEST32, FETCH_REQUEST33, FETCH_REQUEST38, FETCH_REQUEST39, FETCH_REQUEST42, FETCH_REQUEST70, FETCH_REQUEST75, FETCH_SUCCESS17, FETCH_SUCCESS26, FETCH_SUCCESS28, FETCH_SUCCESS29, FETCH_SUCCESS32, FETCH_SUCCESS33, FETCH_SUCCESS38, FETCH_SUCCESS39, FETCH_SUCCESS42, FETCH_SUCCESS70, FETCH_SUCCESS75, POST_FAILURE10, POST_REQUEST10, POST_SUCCESS10 } from "./Actions";
import { toast } from "react-toastify";

const initialState={
    consultationarray:[
        {mrnno:1,eno:1,token:1,name:'jhon',number:9988776655,otp:'1122',relation:'father',department:'neurology',email:'jhon@gmail.com',addfloordata: {consultdate: '2023-07-22', floor: '0', room: 'g1', bed: 'b1', bedprice: '5000'},address:'itpl ',gender:'male',age:'45',allergy:'skin rash',doctor:'prabas',services:['CT scan','ferritin'],price:'2000',type:'in_patient',status:0,date:'2023-07-22',labstatus:0},
        {mrnno:2,eno:2,token:2,name:'preem',number:9898775657,otp:'2222',relation:'myself',department:'neurology',email:'prem@gmail.com',addfloordata:{consultdate: '2023-07-22', floor: '0', room: 'g1', bed: 'b2', bedprice: '5000'},address:'channsandra ',gender:'male',age:'35',allergy:'face swelling',doctor:'prabas',services:['CT scan'],price:'1500',type:'in_patient',status:0,date:'2023-07-22',labstatus:0},
        {mrnno:3,eno:3,token:3,name:'priya',number:9847766558,otp:'3572',relation:'mother',department:'radiology',email:'priya@gmail.com',addfloordata: {consultdate: '2023-08-22', floor: '0', room: 'g2', bed: 'b1', bedprice: '5000'},address:'itpl ',gender:'female',age:'25',allergy:'eczema',doctor:'rohan',services:['ferritin'],price:'1500',type:'in_patient',status:0,date:'2023-08-22',labstatus:0,doctordetails:{bp: "190",cheif_complaints: "kidney stone",family_history:"good", final_diagnosis:"good",hpi: "20",medicine: ['aspirin', 'dolo', 'paracetamol'], mrn:3,past_history: "heart surgery",patient_name: "jhon",pulse:"98", r_rate:"98",services:['CT scan', 'ferritin'],systemic_exam: "good",temp:"32",medicindata:[
          {medicinename: 'paracetamol', medicine_day: 'OD', medicine_time: 'afternoon', medicine_time_food: 'After food', no_of_days: '7',total_med:7},     
          {medicinename: 'dolo', medicine_day: 'BID', medicine_time: 'afternoon-night', medicine_time_food: 'After food', no_of_days: '14',total_med:28},
          {medicinename: 'aspirin', medicine_day: 'BID', medicine_time: 'afternoon-night', medicine_time_food: 'After food', no_of_days: '14',total_med:28},
        ]}},
        {mrnno:4,eno:4,token:4,name:'riyas',number:6847766558,otp:'4574',relation:'grandfather',department:'neurology',email:'riyas@gmail.com',addfloordata: {consultdate: '', floor: '', room: '', bed: '', bedprice: ''},address:'hsrlayout ',gender:'male',age:'26',allergy:'body swelling',doctor:'prabas',services:['CT scan'],price:'1000',type:'out_patient',status:0,date:'2023-08-22',labstatus:0},
        {mrnno:5,eno:5,token:5,name:'mohan',number:6284577786,otp:'3776',relation:'myself',department:'radiology',email:'mohan@gmail.com',addfloordata: {consultdate: '', floor: '', room: '', bed: '', bedprice: ''},address:'majestic ',gender:'male',age:'65',allergy:'skin rash',doctor:'rohan',services:['positron emission tomography (PET)'],price:'2000',type:'out_patient',status:0,date:'2023-09-22',labstatus:0,doctordetails:{bp: "180",cheif_complaints: "liver",family_history:"good", final_diagnosis:'good',hpi: "123q",medicine: ['dolo', 'paracetamol'], mrn:3,past_history: "mental issue",patient_name: "jhon",pulse:"98", r_rate:"44",services:['CT scan', 'ferritin'],systemic_exam: "good",temp:"32",medicindata:[
          {medicinename: 'paracetamol', medicine_day: 'OD', medicine_time: 'afternoon', medicine_time_food: 'After food', no_of_days: '7',total_med:7},     
          {medicinename: 'dolo', medicine_day: 'BID', medicine_time: 'afternoon-night', medicine_time_food: 'After food', no_of_days: '14',total_med:28}
        ]}},
        {mrnno:6,eno:6,token:6,name:'jayash',number:8284577776,otp:'3776',relation:'myself',department:'radiology',email:'mohan@gmail.com',addfloordata: {consultdate: '', floor: '', room: '', bed: '', bedprice: ''},address:'majestic ',gender:'male',age:'65',allergy:'skin rash',doctor:'rohan',services:['positron emission tomography (PET)'],price:'2000',type:'out_patient',status:0,date:'2023-09-22',labstatus:0,doctordetails:{bp: "90",cheif_complaints: "liver",family_history:"good", final_diagnosis:'good',hpi: "123q",medicine: ['aspirin', 'dolo', 'paracetamol'], mrn:3,past_history: "mental issue",patient_name: "jhon",pulse:"98", r_rate:"44",services:['CT scan', 'ferritin'],systemic_exam: "good",temp:"32",medicindata:[
          {medicinename: 'paracetamol', medicine_day: 'OD', medicine_time: 'afternoon', medicine_time_food: 'After food', no_of_days: '7',total_med:7},     
          {medicinename: 'dolo', medicine_day: 'BID', medicine_time: 'afternoon-night', medicine_time_food: 'After food', no_of_days: '14',total_med:28},
          {medicinename: 'aspirin', medicine_day: 'BID', medicine_time: 'afternoon-night', medicine_time_food: 'After food', no_of_days: '14',total_med:28},
        ]},labdetails:[{servicename: 'positron emission tomography (PET)', min_val: '7', max_val: '9', actual: '33', observation: 'normal'}]},
        {mrnno:7,eno:7,token:7,name:'rahul',number:9284577796,otp:'3776',relation:'myself',department:'radiology',email:'mohan@gmail.com',addfloordata: {consultdate: '', floor: '', room: '', bed: '', bedprice: ''},address:'majestic ',gender:'male',age:'65',allergy:'skin rash',doctor:'rohan',services:['positron emission tomography (PET)'],price:'2000',type:'out_patient',status:0,date:'2023-10-5',labstatus:0,doctordetails:{bp: "120",cheif_complaints: "liver",family_history:"good", final_diagnosis:'good',hpi: "123q",medicine: [ 'paracetamol'], mrn:3,past_history: "mental issue",patient_name: "jhon",pulse:"98", r_rate:"44",services:['CT scan', 'ferritin'],systemic_exam: "good",temp:"32",medicindata:[
          {medicinename: 'paracetamol', medicine_day: 'OD', medicine_time: 'afternoon', medicine_time_food: 'After food', no_of_days: '7',total_med:7},     
        ]},labdetails:[{servicename: 'positron emission tomography (PET)', min_val: '7', max_val: '4', actual: '43', observation: 'normal'}]},
   ],
    addiputdataToarray:[
        {mrnno:1,eno:1,token:1,name:'jhon',number:9988776655,otp:'1122',relation:'father',department:'neurology',email:'jhon@gmail.com',address:'itpl ',gender:'male',age:'45',allergy:'skin rash',doctor:'prabas',services:['CT scan','ferritin'],price:'2000',type:'out_patient',status:0,date:'2023-09-22',labstatus:0},
        {mrnno:2,eno:2,token:2,name:'preem',number:9898775657,otp:'2222',relation:'myself',department:'neurology',email:'prem@gmail.com',address:'channsandra ',gender:'male',age:'35',allergy:'face swelling',doctor:'prabas',services:['CT scan'],price:'1500',type:'out_patient',status:0,date:'2023-09-22',labstatus:0},
        {mrnno:3,eno:5,token:5,name:'priya',number:6284577778,otp:'3776',relation:'myself',department:'radiology',email:'priya@gmail.com',address:'majestic ',gender:'female',age:'65',allergy:'skin rash',doctor:'rohan',services:['positron emission tomography (PET)'],price:'2000',type:'out_patient',status:0,date:'2023-09-22',labstatus:0},
        {mrnno:4,eno:4,token:4,name:'riyas',number:6847766558,otp:'4574',relation:'grandfather',department:'neurology',email:'riyas@gmail.com',address:'hsrlayout ',gender:'male',age:'26',allergy:'body swelling',doctor:'prabas',services:['CT scan',],price:'1000',type:'out_patient',status:0,date:'2023-09-22',labstatus:0},
        {mrnno:5,eno:5,token:5,name:'mohan',number:6284577786,otp:'3776',relation:'myself',department:'radiology',email:'mohan@gmail.com',address:'majestic ',gender:'male',age:'65',allergy:'skin rash',doctor:'rohan',services:['positron emission tomography (PET)'],price:'2000',type:'out_patient',status:0,date:'2023-09-22',labstatus:0},
        {mrnno:6,eno:6,token:6,name:'jayash',number:8284577776,otp:'3776',relation:'myself',department:'radiology',email:'mohan@gmail.com',address:'majestic ',gender:'male',age:'65',allergy:'skin rash',doctor:'rohan',services:['positron emission tomography (PET)'],price:'2000',type:'in_patient',status:0,date:'2023-09-22',labstatus:0,doctordetails:{bp: "90",cheif_complaints: "liver",family_history:"good", final_diagnosis:'good',hpi: "123q",medicine: ['aspirin', 'Dolo', 'paracetamol'], mrn:3,past_history: "mental issue",patient_name: "jhon",pulse:"98", r_rate:"44",services:['CT scan', 'ferritin'],systemic_exam: "good",temp:"32"}},
        {mrnno:7,eno:7,token:7,name:'rahul',number:9284577796,otp:'3776',relation:'myself',department:'radiology',email:'mohan@gmail.com',address:'majestic ',gender:'male',age:'65',allergy:'skin rash',doctor:'rohan',services:['positron emission tomography (PET)'],price:'2000',type:'in_patient',status:0,date:'2023-09-22',labstatus:0,doctordetails:{bp: "120",cheif_complaints: "liver",family_history:"good", final_diagnosis:'good',hpi: "123q",medicine: ['aspirin', 'Dolo', 'paracetamol'], mrn:3,past_history: "mental issue",patient_name: "jhon",pulse:"98", r_rate:"44",services:['CT scan', 'ferritin'],systemic_exam: "good",temp:"32"}},
    ],
  registerdpatients:[],  
  consultationPostResult:[],
  consultation:[],
  consultationById:[],
  consultationByMrn:[],
  todaysPatient:[],
  todaysPatientCount:[],
  UserDataById:null,
  servicesandpackagesbyconsultid:null,
  patientsWithServices:[],
  patientconsultationDialog:false,
  errors:null     
}


export const AddpatientSlice=createSlice({
    name:'addpatient',  
    initialState,
    reducers:{
      setemptyuserdatabyid:(state)=>{
        state.UserDataById=null
      },
      setemptyregisterdpatients:(state)=>{state.registerdpatients=null},
      setemptypostconsultation:(state)=>{state.consultationPostResult=null},
      setpatientconsultationdialog:(state,action)=>{state.patientconsultationDialog=action.payload}
    },
    extraReducers:(builder)=>{
      builder
      .addCase(POST_REQUEST10,(state)=>{
        state.errors=null
      })
      .addCase(POST_SUCCESS10,(state,action)=>{
        toast('Successfully Added To Consultation')
        state.errors=null
        state.consultationPostResult=action.payload
      })
      .addCase(POST_FAILURE10,(state,action)=>{
        state.errors=action.payload
      })


      .addCase(FETCH_REQUEST17,(state)=>{
        state.errors=null
      })
      .addCase(FETCH_SUCCESS17,(state,action)=>{
        state.consultation=action.payload
        state.errors=null
      })
      .addCase(FETCH_FAILURE17,(state,action)=>{
        state.errors=action.payload
      })


      .addCase(FETCH_REQUEST26,(state)=>{})
      .addCase(FETCH_SUCCESS26,(state,action)=>{
        state.consultationByMrn=action.payload
      })
      .addCase(FETCH_FAILURE26,(state,action)=>{
        state.errors=action.payload
      })


      .addCase(FETCH_REQUEST28,(state)=>{})
      .addCase(FETCH_SUCCESS28,(state,action)=>{
        state.todaysPatient=action.payload
      })
      .addCase(FETCH_FAILURE28,(state,action)=>{
        state.errors=action.payload
      })


      .addCase(FETCH_REQUEST29,(state)=>{})
      .addCase(FETCH_SUCCESS29,(state,action)=>{
        state.todaysPatientCount=action.payload
      })
      .addCase(FETCH_FAILURE29,(state,action)=>{
        state.errors=action.payload
      })


      .addCase(FETCH_REQUEST70,(state)=>{})
      .addCase(FETCH_SUCCESS70,(state,action)=>{
        state.consultationById=action.payload
      })
      .addCase(FETCH_FAILURE70,(state,action)=>{
        state.errors=action.payload
      })

      
      .addCase(FETCH_REQUEST33,(state)=>{})
      .addCase(FETCH_SUCCESS33,(state,action)=>{
        state.UserDataById=action.payload
      })
      .addCase(FETCH_FAILURE33,(state,action)=>{
      
        state.errors=action.payload
      })


      .addCase(FETCH_REQUEST38,(state)=>{})
      .addCase(FETCH_SUCCESS38,(state,action)=>{
        state.servicesandpackagesbyconsultid=action.payload
      })
      .addCase(FETCH_FAILURE38,(state,action)=>{
        state.errors=action.payload
      })


      .addCase(FETCH_REQUEST39,(state)=>{})
      .addCase(FETCH_SUCCESS39,(state,action)=>{
        state.patientsWithServices=action.payload
      })
      .addCase(FETCH_FAILURE39,(state,action)=>{
        state.errors=action.payload
      })


      .addCase(FETCH_REQUEST42,(state)=>{})
      .addCase(FETCH_SUCCESS42,(state,action)=>{
        state.registerdpatients=action.payload
      })
      .addCase(FETCH_FAILURE42,(state,action)=>{
     
        state.errors=action.payload
      })

      
      

    }
})
export const {setaddpatientInput ,setError,setInputdataArray,resetInput,incrementMRN, incrementENO, incrementToken,refreshToken,setconsultationarray,setemptyuserdatabyid,setemptyregisterdpatients,setemptypostconsultation,setpatientconsultationdialog}=AddpatientSlice.actions

export default AddpatientSlice.reducer