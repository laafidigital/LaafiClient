import { createSlice } from "@reduxjs/toolkit";
import { DELETE_FAILURE, DELETE_REQUEST, DELETE_SUCCESS, FETCH_FAILURE6, FETCH_REQUEST6, FETCH_SUCCESS6, POST_FAILURE5, POST_REQUEST5, POST_SUCCESS5 } from "../Actions";
import { toast } from "react-toastify";

const initialState={
    inputdeparray:[
        {department_name:'oncology',department_discription:'department of cancer'},
        {department_name:'neurology',department_discription:'department of nerves'},
        {department_name:'general',department_discription:'general department'}
    ],
    deleteresult:null,
    postresult:null,
    departmentArray:[],
    loading:false,
    error:null
}
export const Adddepartmentslice=createSlice({
 name:'adddepartment',
 initialState,
 reducers:{
    setinputdeparray:(state,action)=>{
        state.inputdeparray.push(action.payload)
    },
    setemptydeletedepartmentresult:(state,action)=>{
        state.deleteresult=null
    },
    setemptydepartmentpostresult:(state,action)=>{
       state.postresult=null
    }
 },
 extraReducers:(builders)=>{
    builders
    .addCase(POST_REQUEST5,(state)=>{
        state.loading=true
        state.error=null
    })
    .addCase(POST_SUCCESS5,(state,action)=>{
        toast('Succesfully Added Department')
        state.loading=false
        state.postresult=action.payload
        state.error=null
    })
    .addCase(POST_FAILURE5,(state,action)=>{
        state.loading=false
        state.error=action.payload
    })
    .addCase(FETCH_REQUEST6,(state)=>{
        state.loading=true
        state.error=null
    })
    .addCase(FETCH_SUCCESS6,(state,action)=>{
        state.loading=false
        state.error=null
        state.departmentArray=action.payload
    })
    .addCase(FETCH_FAILURE6,(state,action)=>{
        state.loading=false
        state.error=action.payload
    })
    .addCase(DELETE_REQUEST,(state,action)=>{
        state.loading=true
        state.error=null
    })
    .addCase(DELETE_SUCCESS,(state,action)=>{
        state.loading=false
        state.deleteresult=action.payload
        state.error=null
    })
    .addCase(DELETE_FAILURE,(state,action)=>{
        state.loading=false
        state.error=action.payload
    })
 }
})
export const{setinputdepdata, setinputdeparray,resetinput,setemptydeletedepartmentresult,setemptydepartmentpostresult}=Adddepartmentslice.actions
export default Adddepartmentslice.reducer