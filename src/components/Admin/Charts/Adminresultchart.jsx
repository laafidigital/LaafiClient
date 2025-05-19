import * as React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, BarPlot } from '@mui/x-charts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const xLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];



const Adminresultchart = () => {
    const navigate=useNavigate()
    const pathname=useLocation().pathname
    
    const consultationArray=useSelector((state)=>state.Addpatentdetails.consultationarray)

    const [monthresultdetails,setmonthresultdetails]=useState({jan:0,feb:0,mar:0,apr:0,may:0,jun:0,jul:0,aug:0,sep:0,oct:0,nov:0,dec:0})
   
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
    const currentYear = currentDate.getFullYear();

    useEffect(()=>{
        const counts = {
            Jan: 0,
            Feb: 0,
            Mar: 0,
            Apr: 0,
            May: 0,
            Jun: 0,
            Jul: 0,
            Aug: 0,
            Sep: 0,
            Oct: 0,
            Nov: 0,
            Dec: 0,
          };
        const filteredConsultations = consultationArray.filter((item) => {
            const consultationDate = new Date(item.date);
         
            return (
             
              consultationDate.getFullYear() === currentYear
            );
          });
          const filteredresultdetails=filteredConsultations.filter((item)=>item.services.length > 0)
       
          filteredresultdetails.forEach((item) => {
            const consultationDate = new Date(item.date);
            const month = consultationDate.toLocaleString('default', { month: 'short' });
            counts[month] += 1;
          });
          setmonthresultdetails(counts)
       },[consultationArray])

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

      const handleMonthClick = (selectedMonth) => {
        
      
        const monthIndex = xLabels.findIndex((month) => month === selectedMonth);
        const monthNumber = monthIndex + 1; // Months are zero-based, so add 1
      
      
        navigate(`../labdetailschart/dashboard/${monthNumber}`)
      };

        const data=xLabels.map((month)=>({month ,value:monthresultdetails[month]}))
       

  return (
     <div className='Dashboard_maindiv'>
          <div className='d-flex justify-content-end pt-2'>
              <Button startIcon={<ArrowBackIcon/>}  onClick={clickBack} variant='outlined' color='inherit' className='m-2'>Back</Button>
          </div>
          <div className='chart_main'>
            <div className='chart_sub1'>
            <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, bottom: 5 }}
            >
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="value"
                fill="#8884d8"
                onClick={(event) => {
                  const selectedMonth = event.month;
                
                  handleMonthClick(selectedMonth);
                }}
              />
            </BarChart>
          </ResponsiveContainer>
            </div>
          </div>
  </div>
  )
}

export default Adminresultchart