import { createSlice } from "@reduxjs/toolkit";
import { FETCH_FAILURE56, FETCH_FAILURE57, FETCH_FAILURE59, FETCH_FAILURE60, FETCH_FAILURE61, FETCH_FAILURE62, FETCH_FAILURE63, FETCH_FAILURE64, FETCH_REQUEST56, FETCH_REQUEST57, FETCH_REQUEST59, FETCH_REQUEST60, FETCH_REQUEST61, FETCH_REQUEST62, FETCH_REQUEST63, FETCH_REQUEST64, FETCH_SUCCESS56, FETCH_SUCCESS57, FETCH_SUCCESS59, FETCH_SUCCESS60, FETCH_SUCCESS61, FETCH_SUCCESS62, FETCH_SUCCESS63, FETCH_SUCCESS64, POST_FAILURE30, POST_FAILURE31, POST_FAILURE34, POST_REQUEST30, POST_REQUEST31, POST_REQUEST34, POST_SUCCESS30, POST_SUCCESS31, POST_SUCCESS34 } from "./Actions";

const initialState={
 invoiceSummury:null,
 invoicemontlysummury:null,
 invoicedetails:null,
 paymentpostresult:null,
 invoicedetailsbyinvoiceno:null,
 patienttransaction:null,
 pateintswithlabtransaction:null,
 postgenerateinvoiceresult:null,
 patienttransactionbyinvoiceno:null,
 postcanceltransaction:null,
 invoicesbypatientname:null,
}

export const InvoiceSlice=createSlice({
    name:'invoice',
    initialState,
    reducers:{
        setemptypaymentpostresult:(state)=>{
            state.paymentpostresult=null
        },
        setemptypostgenerateinvoiceresult:(state)=>{
            state.postgenerateinvoiceresult=null
        },
        setemptyinvoicesbyname:(state)=>{
            state.invoicesbypatientname=null
        },
        setemptypostcanceltransaction:(state)=>{
            state.postcanceltransaction=null
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(FETCH_REQUEST56,(state)=>{})
        .addCase(FETCH_SUCCESS56,(state,action)=>{ state.invoicemontlysummury=action.payload})
        .addCase(FETCH_FAILURE56,(state)=>{})

        .addCase(FETCH_REQUEST57,(state)=>{})
        .addCase(FETCH_SUCCESS57,(state,action)=>{state.invoiceSummury=action.payload})
        .addCase(FETCH_FAILURE57,(state)=>{})

        .addCase(FETCH_REQUEST59,(state)=>{})
        .addCase(FETCH_SUCCESS59,(state,action)=>{state.invoicedetails=action.payload})
        .addCase(FETCH_FAILURE59,(state)=>{})

        .addCase(POST_REQUEST30,(state)=>{})
        .addCase(POST_SUCCESS30,(state,action)=>{state.paymentpostresult=action.payload})
        .addCase(POST_FAILURE30,(state)=>{})

        .addCase(POST_REQUEST31,(state)=>{})
        .addCase(POST_SUCCESS31,(state,action)=>{state.postgenerateinvoiceresult=action.payload})
        .addCase(POST_FAILURE31,(state)=>{})

        .addCase(POST_REQUEST34,(state)=>{})
        .addCase(POST_SUCCESS34,(state,action)=>{state.postcanceltransaction=action.payload})
        .addCase(POST_FAILURE34,(state)=>{})

        .addCase(FETCH_REQUEST60,(state)=>{})
        .addCase(FETCH_SUCCESS60,(state,action)=>{state.patienttransaction=action.payload})
        .addCase(FETCH_FAILURE60,(state)=>{})

        .addCase(FETCH_REQUEST61,(state)=>{})
        .addCase(FETCH_SUCCESS61,(state,action)=>{state.invoicedetailsbyinvoiceno=action.payload})
        .addCase(FETCH_FAILURE61,(state)=>{})

        .addCase(FETCH_REQUEST62,(state)=>{})
        .addCase(FETCH_SUCCESS62,(state,action)=>{state.pateintswithlabtransaction=action.payload})
        .addCase(FETCH_FAILURE62,(state)=>{})

        .addCase(FETCH_REQUEST63,(state)=>{})
        .addCase(FETCH_SUCCESS63,(state,action)=>{state.patienttransactionbyinvoiceno=action.payload})
        .addCase(FETCH_FAILURE63,(state)=>{})

        .addCase(FETCH_REQUEST64,(state)=>{})
        .addCase(FETCH_SUCCESS64,(state,action)=>{state.invoicesbypatientname=action.payload})
        .addCase(FETCH_FAILURE64,(state)=>{})
    }

})
export const{setemptypaymentpostresult,setemptypostgenerateinvoiceresult,setemptyinvoicesbyname,setemptypostcanceltransaction}=InvoiceSlice.actions
export default InvoiceSlice.reducer