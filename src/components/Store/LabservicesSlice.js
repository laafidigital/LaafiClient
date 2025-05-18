import { createSlice } from "@reduxjs/toolkit";

 let labdetails=[
    [1,'Absolute Eiosnophil Count',400,50],
    [2,'Anti Thyroperoxides Antibody',400,],
    [3,'ASLO',600],
    [4,'Basophil',400],
    [5,'Blood Urea',400],
    [6,'Tyroid',800],
    [7,'Sugar test',400],
    ]

const initialState={
    labdetails:labdetails,
}

export const LabservisesSlice=createSlice({
    name:'doctorslice',
    initialState,
    reducers:{
       
        

    }

})
export default LabservisesSlice.reducer