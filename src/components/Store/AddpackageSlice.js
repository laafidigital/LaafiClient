import { createSlice } from "@reduxjs/toolkit";
import { FETCH_FAILURE10, FETCH_FAILURE11, FETCH_FAILURE69, FETCH_REQUEST10, FETCH_REQUEST11, FETCH_REQUEST69, FETCH_SUCCESS10, FETCH_SUCCESS11, FETCH_SUCCESS69, POST_FAILURE8, POST_FAILURE9, POST_REQUEST8, POST_REQUEST9, POST_SUCCESS8, POST_SUCCESS9, PUT_FAILURE, PUT_FAILURE6, PUT_REQUEST, PUT_REQUEST6, PUT_SUCCESS, PUT_SUCCESS6 } from "./Actions";
import { toast } from "react-toastify";
import { act } from "@testing-library/react";

const initialState={
loading:false,
error:null,
getpackages:[],
getpackagesbyid:[],
selectedserviceforpackage:[],
packagestatus:false,
putresultpackagestatus:null,
packagebypackageids:null,
booklabselectedpackages:[],
}

export const AddpackageSlice=createSlice({
  name:'addpackage',
  initialState,
  reducers:{
    setpackagestatus:(state,action)=>{state.packagestatus=action.payload},

    setselectedservicesforpackages:(state,action)=>{
        state.selectedserviceforpackage=[...state.selectedserviceforpackage,action.payload]
    },
    removeselectedservicefrompacakge:(state,action)=>{
        state.selectedserviceforpackage=state.selectedserviceforpackage.filter(item=>item !==action.payload)
    },
    emptyselectedserviceforpackage:(state,action)=>{state.selectedserviceforpackage=[]},

    emptyputpackagestatus:(state,action)=>{state.putresultpackagestatus=null},

    setbooklabselectectedPackages:(state,action)=>{
        state.booklabselectedpackages=[...state.booklabselectedpackages,action.payload]
    },
    removebooklabselectedpackages:(state,action)=>{
        state.booklabselectedpackages=state.booklabselectedpackages.filter(item=>item!==action.payload)
    },
    setemptybooklabselectedpackages:(state)=>{state.booklabselectedpackages=[]}
  },
  extraReducers:(builder)=>{
    builder
    .addCase(POST_REQUEST8,(state,action)=>{
        state.error=null
    })
    .addCase(POST_SUCCESS8,(state,action)=>{
        state.error=null
        toast('Successfully Added New Package')
        state.postresult=action.payload
    })
    .addCase(POST_FAILURE8,(state,action)=>{
        state.error=action.payload
    })


    .addCase(FETCH_REQUEST10,(state,action)=>{
        state.error=null
    })
    .addCase(FETCH_SUCCESS10,(state,action)=>{
        state.error=null
        state.getpackages=action.payload
    })
    .addCase(FETCH_FAILURE10,(state,action)=>{
        state.error=action.payload
    })


    .addCase(POST_REQUEST9,(state,action)=>{
        state.error=null
    })
    .addCase(POST_SUCCESS9,(state,action)=>{
        state.error=null
        state.putresult=action.payload
    })
    .addCase(POST_FAILURE9,(state,action)=>{
        state.error=action.payload
    })


    .addCase(FETCH_REQUEST11,(state,action)=>{
        state.loading=true
        state.error=null
    })
    .addCase(FETCH_SUCCESS11,(state,action)=>{
        state.error=null
        state.getpackagesbyid=action.payload
    })
    .addCase(FETCH_FAILURE11,(state,action)=>{
        state.error=action.payload
    })

    .addCase(PUT_REQUEST6,(state,action)=>{})
    .addCase(PUT_SUCCESS6,(state,action)=>{
        state.putresultpackagestatus=action.payload
    })
    .addCase(PUT_FAILURE6,(state,action)=>{
        state.error=action.payload
    })

    .addCase(FETCH_REQUEST69,(state,action)=>{
        state.loading=true
        state.error=null
    })
    .addCase(FETCH_SUCCESS69,(state,action)=>{
        state.error=null
        state.packagebypackageids=action.payload
    })
    .addCase(FETCH_FAILURE69,(state,action)=>{
        state.error=action.payload
    })

  }

})
export const {setpackagestatus,setselectedservicesforpackages,removeselectedservicefrompacakge,emptyselectedserviceforpackage,emptyputpackagestatus,setbooklabselectectedPackages,removebooklabselectedpackages,setemptybooklabselectedpackages}=AddpackageSlice.actions
export default AddpackageSlice.reducer
