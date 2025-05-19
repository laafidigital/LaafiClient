import { createSlice } from "@reduxjs/toolkit";

const initialState=[
    [1,'0CLOPILET A 150MG', 	'TABLETS',110,'4/8/2020',0,2.98,4.97,0,255,200,55 ],
    [2,'	100 ML NORMAL SALINE', 	'Fluids',10,'5/8/2019',0,3.98,5.97,0,150,100,50] ,
    [3,'	AB PHYLINE', 	'TABLETS',10,'5/6/2021',0,4.00,6.00,0,160,150,10 ],
    [4,'0CLOPILET A 150MG', 	'TABLETS',110,'4/8/2020',0,2.98,4.97,0,255,200,55 ],
    [5,'	100 ML NORMAL SALINE', 	'Fluids',10,'5/8/2019',0,3.98,5.97,0,150,100,50 ],
    [6,'	AB PHYLINE', 	'TABLETS',10,'5/6/2021',0,4.00,6.00,0,160,150,10 ], 
     
  ]


export const ExpiredSlice=createSlice({
    name:'expired',
    initialState,
    reducers:{

    }

})
export default ExpiredSlice.reducer