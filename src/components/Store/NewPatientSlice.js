import { createSlice } from "@reduxjs/toolkit";

const initialState={
     newPatientArray:[]
}

export const NewPatientSlice=createSlice({
    name:'newpatientslice',
    initialState,
    reducers:{
       setPatientArray:(state,action)=>{
        
        state.newPatientArray.push(action.payload)
       }
    }
})

export const {setPatientArray}=NewPatientSlice.actions
export default NewPatientSlice.reducer