import { createSlice } from "@reduxjs/toolkit";

const initialState={
    monitorPatients:[
        {name:'raju',mrn:'11ugjbjw67236587',phone:9983541223,bp:'90/60mmHg',sugar:'100 mg/dL',temp:'37 C',weight:'60kg',pulse:'63bpm',respirationrate:'12 b/m',oxygen:' 95%'},
        {name:'das',mrn:'123214jhbiuhbilubh',phone:9987541223,bp:'95/60mmHg',sugar:'90 mg/dL',temp:'42 C',weight:'80kg',pulse:'80bpm',respirationrate:'16 b/m',oxygen:' 90%'},
        {name:'navya',mrn:'43534534tdfgdfgd',phone:9987741255,bp:'180/80mmHg',sugar:'170 mg/dL',temp:'38 C',weight:'40kg',pulse:'65bpm',respirationrate:'13 b/m',oxygen:' 96%'},
        {name:'malavika',mrn:'43534534tdfgdfgd',phone:9987741255,bp:'180/80mmHg',sugar:'175 mg/dL',temp:'36 C',weight:'60kg',pulse:'65bpm',respirationrate:'12 b/m',oxygen:' 97%'},
        {name:'sinan',mrn:'1243werwedfwewrew',phone:9689701255,bp:'90/80mmHg',sugar:'170 mg/dL',temp:'37 C',weight:'70kg',pulse:'75bpm',respirationrate:'14b/m',oxygen:' 95%'},
        {name:'shibin',mrn:'43534534tdfgdfgd',phone:9987741255,bp:'95/80mmHg',sugar:'170 mg/dL',temp:'38 C',weight:'40kg',pulse:'65bpm',respirationrate:'13 b/m',oxygen:' 96%'},
],
}


export const MonitoringSlice=createSlice({
  name:'monitor',
  initialState,
  reducers:{

  }
})

export default MonitoringSlice.reducer