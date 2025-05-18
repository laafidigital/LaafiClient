import { createSlice } from "@reduxjs/toolkit";
import UpdateResult from "../Admin/Lab/UpdateResult";
import { FETCH_FAILURE18, FETCH_FAILURE19, FETCH_FAILURE30, FETCH_FAILURE34, FETCH_FAILURE40, FETCH_REQUEST19, FETCH_REQUEST30, FETCH_REQUEST34, FETCH_REQUEST40, FETCH_SUCCESS19, FETCH_SUCCESS30, FETCH_SUCCESS34, FETCH_SUCCESS40, POST_FAILURE11, POST_REQUEST11, POST_SUCCESS11 } from "./Actions";
import { toast } from "react-toastify";

const initialState={
    updateResult:[],
    postresult:[],
    resultdata:[],
    todaysLabresult:[],
    patientServiceByCid:[],
    incompleteServices:[],
    error:null
}

export const Resultslice=createSlice({
  name:'resultslice',
  initialState,
  reducers:{
    setresetpostresult:(state,action)=>{
      state.postresult=[]
    }
    
  },
  extraReducers:(builder)=>{
    builder
    .addCase(POST_REQUEST11,(state,action)=>{})
    .addCase(POST_SUCCESS11,(state,action)=>{
      toast('successfully updated the result')
      state.postresult.push(action.payload)
    })
    .addCase(POST_FAILURE11,(state,action)=>{
      state.error=action.payload
    })

    .addCase(FETCH_REQUEST19)
    .addCase(FETCH_SUCCESS19,(state,action)=>{
      state.resultdata=action.payload
    })
    .addCase(FETCH_FAILURE19,(state,action)=>{
      state.error=action.payload
    })

    .addCase(FETCH_REQUEST30)
    .addCase(FETCH_SUCCESS30,(state,action)=>{
      state.todaysLabresult=action.payload
    })
    .addCase(FETCH_FAILURE30,(state,action)=>{
      state.error=action.payload
    })

    .addCase(FETCH_REQUEST34)
    .addCase(FETCH_SUCCESS34,(state,action)=>{
      state.patientServiceByCid=action.payload
    })
    .addCase(FETCH_FAILURE34,(state,action)=>{
      state.error=action.payload
    })

    .addCase(FETCH_REQUEST40,(state,action)=>{})
    .addCase(FETCH_SUCCESS40,(state,action)=>{
      state.incompleteServices=action.payload
    })
    .addCase(FETCH_FAILURE40,(state,action)=>{
      state.error=action.payload
    })

  }
})
export const {setUpdateresult,setresetpostresult}=Resultslice.actions
export default Resultslice.reducer

