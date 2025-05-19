import { createSlice } from "@reduxjs/toolkit";
import { FETCH_FAILURE47, FETCH_REQUEST47, FETCH_SUCCESS47 } from "../Actions";

const initialState={
  onlinepatients:[],
  error:null
}

export const VedioconferenceSlice=createSlice({
    name:'vedioconference',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(FETCH_REQUEST47,(state)=>{})
        .addCase(FETCH_SUCCESS47,(state,action)=>{
          state.onlinepatients=action.payload
        })
        .addCase(FETCH_FAILURE47,(state,action)=>{
          state.error=action.payload
        })
    }
})

export default VedioconferenceSlice.reducer

