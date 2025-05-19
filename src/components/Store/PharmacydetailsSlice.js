import { createSlice } from "@reduxjs/toolkit";
const initialState={
    PharmacyData:[]
}

export const PharmacyDetailsSLice=createSlice({
    name:'pharmacyDetailsSlice',
    initialState,
    reducers:{
        setPharmacyData:(state,action)=>{
          
            state.PharmacyData.push(action.payload)
        }
    }
})

export const {setPharmacyData}=PharmacyDetailsSLice.actions
export default PharmacyDetailsSLice.reducer
 