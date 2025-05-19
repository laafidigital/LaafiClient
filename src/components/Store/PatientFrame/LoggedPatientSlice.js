import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loggedpatientdata:[]
}

export const LoggedPatientSlice=createSlice({
    name:'loggedpatientdata',
    initialState,
    reducers:{
        setLoggedPatient:(state,action)=>{
           
            state.loggedpatientdata.push(action.payload)
        }
    }
})
export const {setLoggedPatient}=LoggedPatientSlice.actions
export default LoggedPatientSlice.reducer