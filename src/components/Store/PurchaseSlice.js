import { createSlice } from "@reduxjs/toolkit";
import { FETCH_FAILURE18, FETCH_FAILURE7, FETCH_REQUEST18, FETCH_REQUEST7, FETCH_SUCCESS18, FETCH_SUCCESS7, POST_FAILURE7, POST_REQUEST7, POST_SUCCESS7 } from "./Actions";
import { toast } from "react-toastify";

const initialState={
    showAdditionalField: (false),
    item_no:5,
    minday:{
      min_day:0
    },
    purchaseArray:[ 
      {
        itemNo:1,
        category: 'tablet',
        items: 'paracetamol',
        nooftablet_bottles: 1000,
        tax: 12,
        date: '2023-11-25', 
        barcode:5232,
        discription:'',
        costpertable_bottle:5,
        MRPone:8,
      }, 
      {
        itemNo:2,
        category: 'tablet',
        items: 'dolo',
        nooftablet_bottles: 1500,
        tax: 10,
        date: '2023-11-25', 
        barcode:5345,
        discription:'',
        costpertable_bottle:10,
        MRPone:12,
      }, 
      {
        itemNo:3,
        category: 'tablet',
        items: 'aspirin',
        nooftablet_bottles: 500,
        tax: 2,
        date: '2023-11-25', 
        barcode:2556,
        discription:'',
        costpertable_bottle:40,
        MRPone:50,
      },
      {
        itemNo:4,
        category: 'tablet',
        items: 'amlodipine',
        nooftablet_bottles: 2000,
        tax: 12,
        date: '2023-11-25', 
        barcode:1275,
        discription:'',
        costpertable_bottle:20,
        MRPone:30,
      },  ],
      loading:false,
      error:null,
      medicineMaster:[],
      postPurcahseresult:[],
      pharmacypurchase:[],
}


export const purchaseSlice=createSlice({
    name:'purchaseslice',
    initialState,
    reducers: {
        setShowAdditionalField: (state, action) => {
          state.showAdditionalField = action.payload;
        },
        setTopurchaseArray:(state,action)=>{
         
          state.purchaseArray.push(action.payload)
        },
        setitemno:(state,action)=>{
         
         state.item_no +=1
        },
        setMinday:(state,action)=>{
       
          state.minday.min_day=action.payload
        },
      },
      extraReducers:(builder)=>{
        builder
        .addCase(POST_REQUEST7,(state)=>{
          state.loading=true
          state.error=null
        })
        .addCase(POST_SUCCESS7,(state,action)=>{
          state.loading=false
          toast('Purchased Successfully')
          state.postPurcahseresult=action.payload
          state.error=null
        })
        .addCase(POST_FAILURE7,(state,action)=>{
          state.loading=false
          state.error=action.payload
        })
        .addCase(FETCH_REQUEST7,(state)=>{
          state.loading=true
          state.error=null
        })
        .addCase(FETCH_SUCCESS7,(state,action)=>{
          state.loading=false
          state.medicineMaster=action.payload
          state.error=null
        })
        .addCase(FETCH_FAILURE7,(state,action)=>{
          state.loading=false
          state.error=action.payload
        })
        .addCase(FETCH_REQUEST18,(state,action)=>{
          state.error=null
        })
        .addCase(FETCH_SUCCESS18,(state,action)=>{
          state.pharmacypurchase=action.payload
          state.error=null
        })
        .addCase(FETCH_FAILURE18,(state,action)=>{
          state.error=action.payload
        })
      }
})

export const {setShowAdditionalField,setTopurchaseArray,setMinday,setitemno}=purchaseSlice.actions
export default purchaseSlice.reducer