import { createSlice } from "@reduxjs/toolkit";

const initialState={
    errors:null
}

export const ErrorSlice=createSlice({
    name:'error',
    initialState,
    reducers:{
        setError:(state,action)=>{
            state.errors=action.payload
        },
        resetError:(state,action)=>{
            state.errors=null
        }
    }
})

export const {setError,resetError}=ErrorSlice.actions
export default ErrorSlice.reducer