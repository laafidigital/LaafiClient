import { createSlice } from "@reduxjs/toolkit";
import { POST_FAILURE15, POST_REQUEST15, POST_SUCCESS15 } from "./Actions";

const initialState={
    postresult:[],
    priscriptiondata:[]
}

export const PrescriptionSlice=createSlice({
    name:'priscription',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(POST_REQUEST15,(state)=>{})
        .addCase(POST_SUCCESS15,(state,action)=>{
            state.postresult=action.payload
        })
        .addCase(POST_FAILURE15,(state)=>{})
    }
})

export default PrescriptionSlice.reducer