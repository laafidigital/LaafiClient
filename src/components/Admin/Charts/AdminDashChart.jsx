import * as React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, ComposedChart,Pie,PieChart,Cell} from 'recharts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import { GetBloodbankInventoryView, GetDailyConsultationCount, GetDailyLabcount, GetDailypackagecount, GetInvoiceSummury, GetMonthLabcount, GetMonthviseData, GetMontlyPackagecount, GetPackages, GetServicesById, GetinvoiceSummurybymonth } from '../../Store/Actions';
import { GetDepartmentData } from '../../Store/ApiReducers/Auth';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ShowChartTwoToneIcon from '@mui/icons-material/ShowChartTwoTone';
import { StyledSelect } from '../../../Styles/Select';


const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const COLORS = ['#FFB6C1', '#87CEFA', '#90EE90', '#FF69B4', '#FFA07A', '#20B2AA', '#778899', '#B0E0E6'];

const AdminDashChart = () => {
  
    const dispatch=useDispatch()
    const id=useParams()
    const Id=(id.id)
   
    const navigate=useNavigate()
    const pathname=useLocation().pathname

    const date=new Date()
    const year=date.getFullYear()

    const CustomBar = (props) => {
      const { x, y, width, height, index } = props;
      return <rect x={x} y={y} width={width} height={height} fill={COLORS[index % COLORS.length]} />;
    };
    
    const consultationArray=useSelector((state)=>state.Addpatentdetails.consultationarray)
    const Dashpatientdetails=useSelector((state)=>state.Dashboard.patientdetails)
    const Dashlabdetails=useSelector((state)=>state.Dashboard.labdetails)
    const Dashpharmacy=useSelector((state)=>state.Dashboard.pharmacydetails)
    const monthViseDetails=useSelector((state)=>state.Dashboard.monthData)
    const dailyconsultationcount=useSelector((state)=>state.Dashboard.dailyconsultation)
    const dailyLabcount=useSelector((state)=>state.Dashboard.dailylab)
    const dailyLabservices=useSelector((state)=>state.Dashboard.dailylabservices)
    const montlypackage=useSelector((state)=>state.Dashboard.montlypackage)
    const dailypackage=useSelector((state)=>state.Dashboard.dailypackage)
    const departments=useSelector((state)=>state.Adddepartment.departmentArray)
    const getservices=useSelector((state)=>state.Addservices.servicesbyid)
    const getpackages=useSelector((state)=>state.Addpackages.getpackages)
    const invoicesmontly=useSelector((state)=>state.Invoice.invoicemontlysummury)
    const invoicesummury=useSelector((state)=>state.Invoice.invoiceSummury)
    const bloodbankinventoryview=useSelector((state)=>state.Bloodbank.bloodbankinventoryview)




    const [data,setdata]=useState()
    const [monthdetails,setmonthdetails]=useState()
    const [selectedDate,setselectedDate]=useState(year)
    const [Month,setMonth]=useState()
    const [type,settype]=useState('')
    const [daywise,setdaywise]=useState(false)
    const [isconsultation,setisconsultation]=useState(false)
    const [ispie,setispie]=useState(false)
    const [pieTotalrevenue,setpietotalrevenue]=useState([])
    const [service,setservice]=useState('')
    const [pkg,setpkg]=useState('')
    const [ispackage,setispackage]=useState(false)
    const [isinvoice,setisinvoice]=useState(false)
    const [isbloodbank,setisbloodbank]=useState(false)
   

    useEffect(()=>{
      if(Id==='consultation'){
        !daywise ?  dispatch(GetMonthviseData(type,selectedDate)) : dispatch(GetDailyConsultationCount(selectedDate,Month,type))
        setisconsultation(true)
      }
      else if(Id==='service'){
        dispatch(GetDepartmentData(''))
        !daywise ? dispatch(GetMonthLabcount(type,service,selectedDate)) : dispatch(GetDailyLabcount(type,service,selectedDate,Month))
      }
      else if(Id==='invoicesummury'){
        !daywise ? dispatch(GetInvoiceSummury(selectedDate)) : dispatch(GetinvoiceSummurybymonth('Consultation',selectedDate))
        setisinvoice(true)
      }
      else if(Id==='bloodbank'){
        dispatch(GetBloodbankInventoryView())
        setisbloodbank(true)
      }
      else{
        dispatch(GetPackages())
        !daywise ? dispatch(GetMontlyPackagecount(type,pkg,selectedDate)) : dispatch(GetDailypackagecount(type,pkg,selectedDate,Month))
         setispackage(true)
      }
    },[type,selectedDate,Month,Id,isconsultation,ispackage,service,pkg])
        
 
    useEffect(()=>{
      if(Id==="consultation"){
        setmonthdetails(Dashpatientdetails)
      }
      else if(Id==="service"){
        setmonthdetails(Dashlabdetails)
        dispatch(GetMonthviseData(Id))
      }
      else if(Id===3){
      }
      else if(Id===4){
        setmonthdetails(Dashpharmacy)
      }
    },[Dashpatientdetails,Dashlabdetails,Dashpharmacy,Id])


   useEffect(()=>{
    if(isconsultation){
    if (!daywise) {
      if(monthViseDetails && monthViseDetails.length>0){
        const newdata = monthViseDetails.map((item) => ({
          month: MONTH_NAMES[item.Month - 1],
          value: item.Count,
          avg:item.DailyAvg,
          total:item.revenue
        }))
        setdata(newdata)
      }
      else{
        setdata(null)
      }
    } else {
      if(dailyconsultationcount && dailyconsultationcount.length>0){
        const newdata =dailyconsultationcount.map((item) => {
          const date = new Date(item.Date);
          return {
            month: date.getDate(), 
            value: item.Count,
            avg :item.Avg
          };
        });
        setdata(newdata)
      }
      else{
        setdata(null)
      }
    }
    }
    else if(ispackage){
      if (!daywise) {
        if(montlypackage && montlypackage.length>0){
          const newdata =montlypackage && montlypackage.map((item) => ({
            month: MONTH_NAMES[item.Month - 1],
            value: item.TotalLabs,
            total: item.TotalRevenue + item.UnrealizedRevenue,
            totalRevenue:item.TotalRevenue,
            unrealizedRevenue:item.UnrealizedRevenue
          }));
          setdata(newdata)
        }
        else{
          setdata(null)
        }
      } else {
        if(dailypackage && dailypackage.length>0){
          const newdata =dailypackage && dailypackage.map((item) => {
            const date = new Date(item.Date);
            return {
              month: date.getDate(), 
              value: item.TotalLabs,
              avg :item.Avg
            };
          });
          setdata(newdata)
        }
        else{
          setdata(null)
        }
      }
    }
    else if(isinvoice){
      if (!daywise) {
        if(invoicesummury && invoicesummury.length>0){
          const newdata =invoicesummury && invoicesummury.map((item) => ({
            month: item.InvoiceName,
            value: item.TotalCount,
            total: item.TotalInvoiceAmount
          }));
          setdata(newdata)
        }
        else{
          setdata(null)
        }
      } 
      else {
        if(invoicesmontly && invoicesmontly.length>0){
          const newdata =invoicesmontly && invoicesmontly.map((item) => ({
            month: MONTH_NAMES[item.Month - 1],
            value: item.TotalCount,
            total: item.TotalInvoiceAmount
          }));
          setdata(newdata)
        }
        else{
          setdata(null)
        }
      }
    }
    else if(isbloodbank){
      if(bloodbankinventoryview && bloodbankinventoryview.result.length>0){
        const newdata =bloodbankinventoryview && bloodbankinventoryview.result.map((item) => ({
          month: item.BloodType,
          value: item.AvailableUnits,
        }));
        setdata(newdata)
      }
      else{
        setdata(null)
      }
    }
    else{
      if (!daywise) {
        if(dailyLabcount && dailyLabcount.length>0){
          const newdata =dailyLabcount && dailyLabcount.map((item) => ({
            month: MONTH_NAMES[item.Month - 1],
            value: item.TotalLabs,
            total: item.TotalRevenue + item.UnrealizedRevenue,
            totalRevenue:item.TotalRevenue,
            unrealizedRevenue:item.UnrealizedRevenue
          }));
          setdata(newdata)
        }
        else{
          setdata(null)
        }
      } else {
        if(dailyLabservices && dailyLabservices.length>0){
          const newdata =dailyLabservices && dailyLabservices.map((item) => {
            const date = new Date(item.Date);
            return {
              month: date.getDate(), 
              value: item.TotalLabs,
              avg :item.Avg
            };
          });
          setdata(newdata)
        }
        else{
          setdata(null)
        }
      }
    }
   },[isconsultation,monthViseDetails,dailyLabcount,dailyLabservices,dailyconsultationcount,montlypackage,dailypackage,daywise,ispackage,isinvoice,invoicesmontly,invoicesummury,isbloodbank,bloodbankinventoryview])

   

       const clickBack=()=>{
        switch(true){
          case pathname.includes('/Home'):
          navigate('../admindashboard');
          break;
          case pathname.includes('/doctor'):
          navigate('../doctordashboard');
          break
        }
      }

    const DateChange=(date)=>{
      const newdate=new Date(date)
      const year=newdate.getFullYear()
      setselectedDate(year)
    }

   

    const handleMonthClick = (selectedMonth) => {
     
      const monthMap = {'Jan': 1,'Feb': 2, 'Mar': 3,'Apr': 4,'May': 5, 'Jun': 6,'Jul': 7,'Aug': 8,'Sep': 9,'Oct': 10,'Nov': 11,'Dec': 12};
      const monthnumber=monthMap[selectedMonth]
      setMonth(monthnumber)
     
      if(Id==='consultation'){
        dispatch(GetDailyConsultationCount(selectedDate,monthnumber,type))
        setdaywise(true)
      }
      else if(Id==='service'){
        dispatch(GetDailyLabcount(type,'',selectedDate,monthnumber))
        setdaywise(true)
      }
      else if(Id==='invoicesummury'){
        dispatch(GetinvoiceSummurybymonth(selectedMonth,selectedDate))
        setdaywise(true)
      }
      else{
        dispatch(GetDailypackagecount(type,pkg,selectedDate,monthnumber))
        setdaywise(true)
      }
      };

      const handlepieclick=(newdata)=>{
        setpietotalrevenue([newdata])
        setispie(!ispie)
      }

   


 



  return (
    <div className='Dashboard_maindiv'>
          <div className='chart_main'>
          <div className='d-flex justify-content-end pt-2'>
            <Button startIcon={<ArrowBackIcon/>}  onClick={clickBack} variant='outlined' color='inherit' className='m-2'>Back</Button>
          </div>
              {!isbloodbank &&(
              <div className='d-flex justify-content-between'>
              <div style={{marginLeft:'78px'}}>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker
                   views={['year']}
                   label="Select year"
                    orientation="landscape"
                    onChange={DateChange}
                  />
              </LocalizationProvider>
              </div>
              {!isconsultation && (
                <div className='chartsubdiv'>
                  {ispackage ?(
                    <div class="d-flex mt-2">
                    {/* <label className='doclabel'>Select Package</label> */}
                    <div style={{marginLeft:'26px'}} >
                    <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label" className='listitem-dropdown'> Package</InputLabel>
                            <Select
                              labelId="demo-multiple-checkbox-label"
                              id="demo-multiple-checkbox"
                              name='deptID'
                              style={{width:'120px',marginLeft:'10px'}}
                              onChange={(e)=>{
                                setpkg(e.target.value)
                              }}
                            
                            >
                          {getpackages.map((pkg,index)=>(
                              <MenuItem  value={pkg.Id} key={index}>
                                  {pkg.Name}
                              </MenuItem>
                          ))} 
                           </Select>
                      </FormControl>
                    </div>
                </div>
                  ):(
                    <>
                    <div class="d-flex mt-2">
                        {/* <label className='doclabel'>Select Department</label> */}
                        <div style={{marginLeft:'26px'}} >
                        {/* <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label" className='listitem-dropdown'> Department</InputLabel>
                                <Select
                                  labelId="demo-multiple-checkbox-label"
                                  id="demo-multiple-checkbox"
                                  name='deptID'
                                  style={{width:'120px',marginLeft:'10px'}}
                                  onChange={(e)=>{
                                    e.target.value==4 ? dispatch(GetServicesById('')) : dispatch(GetServicesById(e.target.value))
                                  }}
                                
                                >
                              {departments.map((dep,index)=>(
                                  <MenuItem  value={dep.Id} key={index}>
                                      {dep.Name}
                                  </MenuItem>
                              ))} 
                               </Select>
                            </FormControl> */}
                        </div>
                    </div>
                  {getservices && getservices.length>0 &&(
                    <div class="d-flex mt-2">
                        <div style={{marginLeft:'26px'}} >
                        <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label" className='listitem-dropdown'> Services</InputLabel>
                                <Select
                                  labelId="demo-multiple-checkbox-label"
                                  id="demo-multiple-checkbox"
                                  name='deptID'
                                  style={{width:'120px',marginLeft:'10px'}}
                                  onChange={(e)=>{
                                    setservice(e.target.value)
                                  }}
                                >
                              {getservices.map((serv,index)=>(
                                  <MenuItem  value={serv.Id} key={index}>
                                      {serv.ServiceName}
                                  </MenuItem>
                              ))} 
                               </Select>
                               </FormControl>
                        </div>
                    </div>
                  )}
                    </>
                  )}
                  
                </div>
              )}
              {daywise &&(
              <Button variant='contained' color='primary' endIcon={<ShowChartTwoToneIcon/>} 
                onClick={()=>{
                  setdaywise(false)
                  setispie(false)
                  }}>
                Month</Button>
              )}
              {!isinvoice &&(
              //   <ButtonGroup variant="contained" size="small" color="primary" aria-label="Medium-sized button group">
              //   <Button onClick={()=>settype('in_patient')}>in patients</Button>
              //   <Button onClick={()=>settype('out_patient')}>out patients</Button>
              //   <Button onClick={()=>{
              //     settype('')
              //     setservice('')
              //     setpkg('')
              //     }}>All</Button>
              // </ButtonGroup>
              <></>
              )}
            </div>
              )}
            {data && data.length > 0 && !isbloodbank &&(
              <>
              <h4 className='d-flex justify-content-center pt-4'>REVENUE GRAPH</h4>
              <div className="chart_sub2">
              <ResponsiveContainer width="100%" height={440}>
                  <PieChart>
                    {!ispie &&(
                    <>
                  <Pie
                    data={data}
                    dataKey="total"
                    nameKey="month"
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={180}
                    fill="#8884d8"
                    label
                    onClick={(event) => {
                      const selectedMonth = event.month;
                    
                      handlepieclick(event.payload.payload);
                    }}
                  >
                     {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                  </Pie>
                    </>
                    )}
                  {ispie &&(
                    <>
                    <Pie
                     data={pieTotalrevenue}
                     dataKey={pieTotalrevenue[0].totalRevenue ? "totalRevenue" : "total"}
                     nameKey="month"
                     cx="50%"
                     cy="50%"
                     innerRadius={80}
                     outerRadius={180}
                     fill="#4D70E1"
                     label
                     onClick={() => setispie(false)}
                     >

                    </Pie>
                    <Pie
                     data={pieTotalrevenue}
                     dataKey="unrealizedRevenue"
                     nameKey="month"
                     cx="50%"
                     cy="50%"
                     innerRadius={80}
                     outerRadius={120}
                     fill="#E4BABA"
                     label
                     onClick={() => setispie(false)}
                     >
                    </Pie>
                    </>
                  )}
                  </PieChart>
              </ResponsiveContainer>
              {!isconsultation && (
                <div className='chartsubdiv'>
                  {/* <div>
                     <div className='d-flex'>
                      <button className='colorbtn' style={{backgroundColor:'#4D70E1'}}></button>
                       <p className='pl-2 mb-0'>With invoices </p>
                      </div>
                      <div className='d-flex'>
                        <button className='colorbtn' style={{backgroundColor:'#E4BABA'}}></button>
                          <p className='pl-2  mb-0'>Without invoices</p>
                      </div>
                  </div> */}
                  </div>
                  )}
                  {/* {ispackage ?(
                    <div class="d-flex mt-2">
                   
                    <div style={{marginLeft:'26px'}} >
                    <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label" className='listitem-dropdown'> Package</InputLabel>
                            <Select
                              labelId="demo-multiple-checkbox-label"
                              id="demo-multiple-checkbox"
                              name='deptID'
                              style={{width:'120px',marginLeft:'10px'}}
                              onChange={(e)=>{
                                setpkg(e.target.value)
                              }}
                            
                            >
                          {getpackages.map((pkg,index)=>(
                              <MenuItem  value={pkg.Id} key={index}>
                                  {pkg.Name}
                              </MenuItem>
                          ))} 
                           </Select>
                      </FormControl>
                    </div>
                </div>
                  ):(
                    <>
                    <div class="d-flex mt-2">
                        
                        <div style={{marginLeft:'26px'}} >
                        <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label" className='listitem-dropdown'> Department</InputLabel>
                                <Select
                                  labelId="demo-multiple-checkbox-label"
                                  id="demo-multiple-checkbox"
                                  name='deptID'
                                  style={{width:'120px',marginLeft:'10px'}}
                                  onChange={(e)=>{
                                    e.target.value==4 ? dispatch(GetServicesById('')) : dispatch(GetServicesById(e.target.value))
                                  }}
                                
                                >
                              {departments.map((dep,index)=>(
                                  <MenuItem  value={dep.Id} key={index}>
                                      {dep.Name}
                                  </MenuItem>
                              ))} 
                               </Select>
                            </FormControl>
                        </div>
                    </div>
                  {getservices && getservices.length>0 &&(
                    <div class="d-flex mt-2">
                        <div style={{marginLeft:'26px'}} >
                        <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label" className='listitem-dropdown'> Services</InputLabel>
                                <Select
                                  labelId="demo-multiple-checkbox-label"
                                  id="demo-multiple-checkbox"
                                  name='deptID'
                                  style={{width:'120px',marginLeft:'10px'}}
                                  onChange={(e)=>{
                                    setservice(e.target.value)
                                  }}
                                >
                              {getservices.map((serv,index)=>(
                                  <MenuItem  value={serv.Id} key={index}>
                                      {serv.ServiceName}
                                  </MenuItem>
                              ))} 
                               </Select>
                               </FormControl>
                        </div>
                    </div>
                  )}
                    </>
                  )}
                  
                </div>
              )} */}
            </div>
              </>
            )}
             <hr></hr>
             <div>

             <h4 className='d-flex justify-content-center'>
                {!daywise ? (
                  ispackage ? (
                    'MONTHLY PACKAGE'
                  ) : isconsultation ? (
                    'MONTHLY PATIENTS'
                  ) : (
                    'MONTHLY SERVICES'
                  )
                ) : (
                  ispackage ?(
                    'DAILY PACKAGES'
                  ):isconsultation ?(
                    'DAILY PATIENTS'
                  ):(
                    'DAILY SERVICES'
                  )
                )}
              </h4>
              <div className="chart_sub1">
              <ResponsiveContainer width="100%" height={440}>
              <ComposedChart
                  data={data}
                  margin={{ top: 20, right: 30, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="value"
                    shape={(props) => <CustomBar {...props} />}
                    onClick={(event) => {
                     
                      handlepieclick(event.payload)
                      const selectedMonth = event.month;
                      handleMonthClick(selectedMonth);
                    }}
                  />
                  <Line type="monotone" dataKey={'avg'} stroke="#ff7300" />
                  </ComposedChart>
              </ResponsiveContainer>
            </div>
             </div>

        </div>
  </div>
  )
}

export default AdminDashChart