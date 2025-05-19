import { createSlice } from "@reduxjs/toolkit";


const initialState={
    profiledata:[],
}

export const profileslice=createSlice({
    name:'profileslice',
    initialState,
    reducers:{
      
    },
})

// export const {setprofiledata}=profileslice.actions
export default profileslice.reducer