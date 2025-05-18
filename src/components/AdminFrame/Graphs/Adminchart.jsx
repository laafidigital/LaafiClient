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
const data = [
    { Month: 1, Count: 0, DailyAvg: 0, revenue: 0 },
    { Month: 2, Count: 0, DailyAvg: 0, revenue: 0 },
    { Month: 3, Count: 0, DailyAvg: 0, revenue: 0 },
    { Month: 4, Count: 0, DailyAvg: 0, revenue: 0 },
    { Month: 5, Count: 0, DailyAvg: 0, revenue: 0 },
    { Month: 6, Count: 0, DailyAvg: 0, revenue: 0 },
    { Month: 7, Count: 0, DailyAvg: 0, revenue: 0 },
    { Month: 8, Count: 0, DailyAvg: 0, revenue: 0 },
    { Month: 9, Count: 0, DailyAvg: 0, revenue: 0 },
    { Month: 10, Count: 0, DailyAvg: 0, revenue: 0 },
    { Month: 11, Count: 6, DailyAvg: 0.2, revenue: 0 },
    { Month: 12, Count: 0, DailyAvg: 0, revenue: 0 },
  ];
  
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

const Adminchart=()=>{
    return(
        <div style={{ display: "flex", justifyContent: "space-around", padding: "20px" }}>
        {/* Patient Footfall Bar Chart */}
        <div style={{ width: "45%" }}>
          <h3>Patient Footfall (Month)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis
                dataKey="Month"
                tickFormatter={(month) => months[month - 1]}
                label={{ value: "Months", position: "insideBottom", offset: -5 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Count" fill="#8884d8" name="Footfall Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
  
        {/* Revenue Pie Chart */}
        <div style={{ width: "45%" }}>
          <h3>Revenue (Month)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="revenue"
                nameKey="Month"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#82ca9d"
                label={(entry) => months[entry.Month - 1]}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
    } 

export default Adminchart;