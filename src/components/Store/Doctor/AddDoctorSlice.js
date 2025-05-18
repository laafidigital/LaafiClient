import { createSlice } from "@reduxjs/toolkit";
import { FETCH_FAILURE16, FETCH_FAILURE21, FETCH_FAILURE41, FETCH_FAILURE44, FETCH_FAILURE55, FETCH_FAILURE78, FETCH_FAILURE8, FETCH_FAILURE86, FETCH_FAILURE9, FETCH_REQUEST16, FETCH_REQUEST21, FETCH_REQUEST41, FETCH_REQUEST44, FETCH_REQUEST55, FETCH_REQUEST78, FETCH_REQUEST8, FETCH_REQUEST85, FETCH_REQUEST86, FETCH_REQUEST9, FETCH_SUCCESS16, FETCH_SUCCESS21, FETCH_SUCCESS41, FETCH_SUCCESS44, FETCH_SUCCESS55, FETCH_SUCCESS78, FETCH_SUCCESS8, FETCH_SUCCESS86, FETCH_SUCCESS9, POST_FAILURE23, POST_REQUEST23, POST_SUCCESS23 } from "../Actions";
import { setLoading } from '../LoadingSlice';
const initialState={
    doctorArray:[
        {docid: 1,doctor_name:'prabas',doctordepartment:'neurology',fee:'500',from_day:'Monday',to_day:'Friday', from_time: new Date(2023, 9, 16, 12, 0), to_time: new Date(2023, 9, 16, 15, 0),consultation_time:'30',from_day:'monday',to_day:'wednesday',
                hoursArray:[
                {formattedHour: '12:00', status: 0, Id: 0},
                {formattedHour: '12:30', status: 0, Id: 1},
                {formattedHour: '13:00', status: 0, Id: 2},
                {formattedHour: '13:30', status: 0, Id: 3},
                {formattedHour: '14:00', status: 0, Id: 4},
                {formattedHour: '14:30', status: 0, Id: 5},
                {formattedHour: '15:00', status: 0, Id: 6}]},
        {docid: 2,doctor_name:'rohan',doctordepartment:'neurology',fee:'400',from_time: new Date(2023, 9, 16, 12, 0), to_time: new Date(2023, 9, 16, 14, 0),consultation_time:'30',from_day:'Monday',to_day:'Thursday',
                hoursArray:[
                {formattedHour: '12:00', status: 0, Id: 0},
                {formattedHour: '12:30', status: 0, Id: 1},
                {formattedHour: '13:00', status: 0, Id: 2},
                {formattedHour: '13:30', status: 0, Id: 3},
                {formattedHour: '14:00', status: 0, Id: 4},]},
        { docid: 3,doctor_name:'jhon',doctordepartment:'oncology',fee:'450',from_time: new Date(2023, 9, 16, 12, 0), to_time: new Date(2023, 9, 16, 16, 0),consultation_time:'30',from_day:'Tuesday',to_day:'Friday',
                hoursArray:[
                {formattedHour: '12:00', status: 0, Id: 0},
                {formattedHour: '12:30', status: 0, Id: 1},
                {formattedHour: '13:00', status: 0, Id: 2},
                {formattedHour: '13:30', status: 0, Id: 3},
                {formattedHour: '14:00', status: 0, Id: 4},
                {formattedHour: '14:30', status: 0, Id: 5},
                {formattedHour: '15:00', status: 0, Id: 6},
                {formattedHour: '15:30', status: 0, Id: 5},
                {formattedHour: '16:00', status: 0, Id: 6}]},
        { docid: 4,doctor_name:'malik',doctordepartment:'neurology',fee:'500',from_time: new Date(2023, 9, 16, 12, 0), to_time: new Date(2023, 9, 16, 16, 0),consultation_time:'30',from_day:'Monday',to_day:'Wednesday',
                    hoursArray:[
                    {formattedHour: '12:00', status: 0, Id: 0},
                    {formattedHour: '12:30', status: 0, Id: 1},
                    {formattedHour: '13:00', status: 0, Id: 2},
                    {formattedHour: '13:30', status: 0, Id: 3},
                    {formattedHour: '14:00', status: 0, Id: 4},
                    {formattedHour: '14:30', status: 0, Id: 5},
                    {formattedHour: '15:00', status: 0, Id: 6},
                    {formattedHour: '15:30', status: 0, Id: 5},
                    {formattedHour: '16:00', status: 0, Id: 6}]},
        {docid: 5,doctor_name:'das',doctordepartment:'oncology',fee:'600',from_time: new Date(2023, 9, 16, 10, 0), to_time: new Date(2023, 9, 16, 14, 0),consultation_time:'45',from_day:'Wednesday',to_day:'Sunday',
            hoursArray:[ 
                {formattedHour: '10:00', status: 0, Id: 0},
                {formattedHour: '10:45', status: 0, Id: 1},
                {formattedHour: '11:00', status: 0, Id: 2},
                {formattedHour: '11:45', status: 0, Id: 3},
                {formattedHour: '12:00', status: 0, Id: 4},
                {formattedHour: '12:45', status: 0, Id: 5},
                {formattedHour: '13:00', status: 0, Id: 6},
                {formattedHour: '13:45', status: 0, Id: 7},
                {formattedHour: '14:00', status: 0, Id: 8}]},
        {docid: 6,doctor_name:'siraj',doctordepartment:'neurology',fee:'500',from_time: new Date(2023, 9, 16, 11, 0), to_time: new Date(2023, 9, 16, 14, 0),consultation_time:'15',from_day:'Thursday',to_day:'Saturday',
            hoursArray:[ 
                {formattedHour: '11:00', status: 0, Id: 0}, 
                {formattedHour: '11:15', status: 0, Id: 1},
                {formattedHour: '11:30', status: 0, Id: 2},
                {formattedHour: '11:45', status: 0, Id: 3},
                {formattedHour: '12:00', status: 0, Id: 4},
                {formattedHour: '12:15', status: 0, Id: 5},
                {formattedHour: '12:30', status: 0, Id: 6},
                {formattedHour: '12:45', status: 0, Id: 7},
                {formattedHour: '13:00', status: 0, Id: 8},
                {formattedHour: '13:15', status: 0, Id: 9},
                {formattedHour: '13:30', status: 0, Id: 10},
                {formattedHour: '13:45', status: 0, Id: 11},
                {formattedHour: '14:00', status: 0, Id: 12}]},
        {docid: 7,doctor_name:'sri vidya',doctordepartment:'general',fee:'200', from_time: new Date(2023, 9, 16, 16, 0), to_time: new Date(2023, 9, 16, 18, 0),consultation_time:'30',from_day:'Monday',to_day:'Wednesday',
              hoursArray:[
                {formattedHour: '16:00', status: 0, Id: 0},
                {formattedHour: '16:30', status: 0, Id: 1},
                {formattedHour: '17:00', status: 0, Id: 2},
                {formattedHour: '17:30', status: 0, Id: 3},
                {formattedHour: '18:00', status: 0, Id: 4},]},
               ],

        doctors:null,
        doctorsById:[],
        doctorSchedulebyId:{consultTiming: "",docID:"",docName:"",dow: "",fee: 0,id: 0,u:{address:"",deptID:0,deptName:"",email:"",fee:0,id:"",normalizedEmail:"",normalizedUserName:"",phoneNumber: "",relation:"",userName:""}},
        doctoronlybyid:[],
        registerddoctor:[],
        timeSlotsbydocId:[],
        postdoctorresponse:[],
        doctorbyday:null,
        loading:false,
        error:null,
        doctorbyname:null,
        scheduleDialoge:false,
        addscheduleDialoge:false,
        doctorSlotFortheWeek:null
}
export const Adddoctorslice=createSlice({
    name:'adddoctor',
    initialState,
    reducers:{
        setDoctorArray:(state,action)=>{
           
            const existingIndex=state.doctorArray.findIndex((item)=>item.docid===action.payload.docid)
            if (existingIndex !== -1) {
                // Remove the object with 'status === 0'
                state.doctorArray.splice(existingIndex, 1);
                state.doctorArray.splice(existingIndex, 0, action.payload);
              }
              else{
                  const updatedarrayid=action.payload
                  updatedarrayid.docid=state.doctorArray.length+1
                  state.doctorArray.push(updatedarrayid)
              }
        },
        setemptyregisterdoctor:(state,action)=>{state.registerddoctor=action.payload},
        setemptydoctorbyname:(state)=>{state.doctorbyname=null},
        setemptydoctorschedulebydocid:(state)=>{state.doctors=null},
        setscheduleDialoge:(state,action)=>{state.scheduleDialoge=action.payload},
        setaddscheduleDialoge:(state,action)=>{state.addscheduleDialoge=action.payload}
    },
    extraReducers:(builder)=>{
        builder

        .addCase(FETCH_REQUEST8,(state,action)=>{
            state.loading=true
            state.error=null
        })
        .addCase(FETCH_SUCCESS8,(state,action)=>{
            state.loading=false
            state.doctors=action.payload
        })
        .addCase(FETCH_FAILURE8,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })


        .addCase(FETCH_REQUEST9,(state,action)=>{
            state.loading=true
            state.error=null
        })
        .addCase(FETCH_SUCCESS9,(state,action)=>{
            state.loading=false
            state.doctorsById=action.payload
        })
        .addCase(FETCH_FAILURE9,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })


        .addCase(FETCH_REQUEST16,(state,action)=>{
            state.loading=true
            state.error=null
        })
        .addCase(FETCH_SUCCESS16,(state,action)=>{
            state.loading=false
            state.doctorSchedulebyId=action.payload
        })
        .addCase(FETCH_FAILURE16,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })


        .addCase(FETCH_REQUEST21,(state,action)=>{
            state.loading=true
            state.error=null
        })
        .addCase(FETCH_SUCCESS21,(state,action)=>{
            state.loading=false
            state.doctoronlybyid=action.payload
        })
        .addCase(FETCH_FAILURE21,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        

        .addCase(FETCH_REQUEST41,(state,action)=>{
            state.loading=true
            state.error=null
        })
        .addCase(FETCH_SUCCESS41,(state,action)=>{
            state.loading=false
            state.registerddoctor=action.payload
        })
        .addCase(FETCH_FAILURE41,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })


        .addCase(FETCH_REQUEST44,(state,action)=>{
            state.loading=true
            state.error=null
        })
        .addCase(FETCH_SUCCESS44,(state,action)=>{
            state.loading=false
            state.timeSlotsbydocId=action.payload
        })
        .addCase(FETCH_FAILURE44,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })


        .addCase(POST_REQUEST23,(state,action)=>{
            state.loading=true
            state.error=null
        })
        .addCase(POST_SUCCESS23,(state,action)=>{
            state.loading=false
            state.postdoctorresponse=action.payload
        })
        .addCase(POST_FAILURE23,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })


        .addCase(FETCH_REQUEST55,(state)=>{state.error=null })
        .addCase(FETCH_SUCCESS55,(state,action)=>{state.doctorbyday=action.payload})
        .addCase(FETCH_FAILURE55,(state,action)=>{state.error=action.payload })

        .addCase(FETCH_REQUEST78,(state)=>{state.error=null })
        .addCase(FETCH_SUCCESS78,(state,action)=>{state.doctorbyname=action.payload})
        .addCase(FETCH_FAILURE78,(state,action)=>{state.error=action.payload })

        .addCase(FETCH_REQUEST86,(state)=>{state.error=null })
        .addCase(FETCH_SUCCESS86,(state,action)=>{state.doctorSlotFortheWeek=action.payload})
        .addCase(FETCH_FAILURE86,(state,action)=>{state.error=action.payload })
    }
})
export const {setInputDoctor,setresetdefault,setDoctorArray,setemptyregisterdoctor,setemptydoctorbyname,setemptydoctorschedulebydocid,setscheduleDialoge,setaddscheduleDialoge}=Adddoctorslice.actions
export default Adddoctorslice.reducer