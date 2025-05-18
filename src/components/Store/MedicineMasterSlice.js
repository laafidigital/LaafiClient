import { createSlice } from "@reduxjs/toolkit";
import { FETCH_FAILURE45, FETCH_FAILURE7, FETCH_REQUEST45, FETCH_REQUEST7, FETCH_SUCCESS45, FETCH_SUCCESS7, POST_FAILURE13, POST_REQUEST13, POST_SUCCESS13 } from "./Actions";

const initialState={
    postresult:[],
    medicineMater:[],
    error:null
}

export const medicinemasterslice=createSlice({
    name:'medicinemaster',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(POST_REQUEST13,(state)=>{
            state.error=null
        })
        .addCase(POST_SUCCESS13,(state,action)=>{
         
            state.error=null
            state.postresult=action.payload
        })
        .addCase(POST_FAILURE13,(state,action)=>{
            state.error=action.payload
        })


        .addCase(FETCH_REQUEST7,(state)=>{
            state.error=null
        })
        .addCase(FETCH_SUCCESS7,(state,action)=>{
            state.error=null
            state.medicineMater=action.payload
        })
        .addCase(FETCH_FAILURE7,(state,action)=>{
            state.error=action.payload
        })
    }
})

export default medicinemasterslice.reducer