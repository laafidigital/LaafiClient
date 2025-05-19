import React from 'react'
import { createSlice } from "@reduxjs/toolkit";
import { POST_FAILURE19, POST_REQUEST19, POST_SUCCESS19 } from "./Actions";

const initialState={
    ClaudeAiresult:[],
    error:null
}
export const OpenClaudeAISlice=createSlice({
    name:'OpenClaudeAISlice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(POST_REQUEST19,(state)=>{})
        .addCase(POST_SUCCESS19,(state,action)=>{
            state.ClaudeAiresult=action.payload;
        })
        .addCase(POST_FAILURE19,(state,action)=>{
            state.error=action.payload
        })
    }
})

export default OpenClaudeAISlice.reducer