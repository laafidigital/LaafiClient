import { createSlice } from "@reduxjs/toolkit";

const initialState={
 patientservicestatus:false,
 patientselectedservices:[],
}
export const BookconsultationSlice=createSlice({
    name:'bookconsultation',
    initialState,
    reducers:{
        setpatientservicestatus:(state,action)=>{
           
            state.patientservicestatus=action.payload
        },
        setpatientselectedservices:(state,action)=>{
            state.patientselectedservices=[...state.patientselectedservices,action.payload]
        },
        removepatientselectedservices:(state,action)=>{
            state.patientselectedservices=state.patientselectedservices.filter(item=>item.Id !==action.payload)
        },
        setemptypatientservices:(state)=>{
            state.patientselectedservices=[]
        }
    }
})
export const {setpatientservicestatus,removepatientselectedservices,setpatientselectedservices,setemptypatientservices}=BookconsultationSlice.actions
export default BookconsultationSlice.reducer