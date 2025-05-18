import React,{useState,useEffect} from "react";
import { MdPerson } from "react-icons/md";
import { IoSearch } from 'react-icons/io5'
import Settings from '../../assets/Settings.svg'
import rating from '../../assets/rating.svg'
import doctorimg from '../../assets/doctor.jpeg'
import axios from 'axios';
import auth from '../../components/Store/ApiReducers/Auth'
import { useDispatch, useSelector } from 'react-redux'
import {GetAllDoctors} from '../Store/Actions'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, ComposedChart,Pie,PieChart,Cell} from 'recharts';
import {fetchAppointments} from '../Store/Actions'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { GetBloodbankInventoryView, GetDailyConsultationCount, GetDailyLabcount, GetDailypackagecount, GetInvoiceSummury, GetMonthLabcount, GetMonthviseData, GetMontlyPackagecount, GetPackages, GetServicesById, GetinvoiceSummurybymonth } from '../Store/Actions';

const AdminDash = () =>{
  const dispatch=useDispatch()
  const sasstoken=localStorage.getItem('sasstoken')
  const [data, setData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  const [counts, setCounts] = useState({
    PatientCount: 0,
    DoctorCount: 0,
  });
  const { doctors} = useSelector((state) => state.doctorsState);
  const { appointments } = useSelector(
    (state) => state.appointment
  );
  const[sassToken,setsassToken]=useState()
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 6;
  const [currentPageAppointments, setCurrentPageAppointments] = useState(1);
  const appointmentsPerPage = 6;
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
  const totalPages = Math.ceil(doctors.length / doctorsPerPage);
  const indexOfLastAppointment = currentPageAppointments * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
  const totalPagesAppointments = Math.ceil(appointments.length / appointmentsPerPage);
  const fetchUserCounts = async () => {
    try {
      const response = await axios.get('https://authapis.azurewebsites.net/api/Auth/GetUserCount');
      if (response.status === 200) {
        setCounts({
          PatientCount: response.data.PatientCount,
          DoctorCount: response.data.DoctorCount,
        });
      } else {
        console.error('Failed to fetch user counts:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user counts:', error);
    }
  };

  useEffect(() => {
    fetchUserCounts();
    dispatch(GetAllDoctors());
    dispatch(fetchAppointments());
    footfall();
  }, [dispatch]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); 
  const handleOpenDialog = (doctor) => {
    setSelectedDoctor(doctor);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedDoctor(null);
  };
  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const settingsData = [
    {
      title: "Services & Health Packages",
      iconKeywords: "cog, edit, gear, preferences",
    },
    {
      title: "Templates",
      iconKeywords: "cog, edit, gear, preferences",
    },
  ];

  const getYearOptions = (startYear) => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index);
  };
  const startYear = 2000; 
  const yearOptions = getYearOptions(startYear);
  const currentYear = new Date().getFullYear(); 
  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    
  };  
  
const footfall= async()=>{
  axios
  .get("https://lafidev.azurewebsites.net/api/Dashboards/MonthlyConsultationCount?year=2024")
  .then((response) => {
    const rawData = response.data;

    const formattedData = rawData.map((item) => ({
      month: new Date(2024, item.Month - 1).toLocaleString("default", {
        month: "short",
      }),
      count: item.Count,
    }));

    setData(formattedData);

    const formattedRevenue = rawData.map((item) => ({
      monthLabel: new Date(2024, item.Month - 1).toLocaleString("default", {
        month: "short",
      }),
      monthlyRevenue: item.revenue,
    }));

    setRevenueData(formattedRevenue);
  })
  .catch((error) => console.error("Error fetching data:", error));
}
  
    return(
        <div >
            <div className="firstdiv">
            <div className="footfall">
        <div className="frame-428">
          <div className="text-with-select">
            <div className="patient-footfall">Patient Footfall (Month)</div>
            <select
        className="year-select"
        defaultValue={currentYear} 
        onChange={handleYearChange}
      >
        {yearOptions.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
          </div>
        </div>
        <select className="type-select" >
              <option value="Consultations">Consultations</option>
              <option value="Labs">Labs</option>
              <option value="Packages">Packages</option>
            </select>
        <div className="frame-426">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" label={{ value: "Month", position: "insideBottom", dy: 10 }} />
                <YAxis label={{ value: "Count", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#008080" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p>Loading data...</p>
          )}
        </div>
      </div>

      <div className="footfall">
        <div className="frame-428">
          <div className="text-with-select">
            <div className="patient-footfall">Revenue (Month)</div>
            <select className="year-select" onChange={handleYearChange}>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
      </select>
          </div>
        </div>
        <select className="type-select" >
              <option value="Consultations">Consultations</option>
              <option value="Labs">Labs</option>
              <option value="Packages">Packages</option>
            </select>
        <div className="frame-426">
          {revenueData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={revenueData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="monthLabel" label={{ value: "Month", position: "insideBottom", dy: 10 }} />
                <YAxis label={{ value: "Revenue", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="monthlyRevenue" fill="#008080" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p>Loading revenue data...</p>
          )}
        </div>
      
                </div>
                <div class="countdiv">
                  <div class="inner-content">
                    <div class="card-container">
                      <div class="cards">{counts.PatientCount} Patients treated</div>
                      <div class="cards">$15000 this month</div>
                      <div class="cards">200 consultations today</div>
                      <div class="cards">{counts.DoctorCount} Active Doctors</div>
                    </div>
                    <div class="advertisement">Ad Space</div>
                  </div>
                </div>

            </div>

          <div className="seconddiv">
              <div className="ourdoctors">
                  <div className="header">
                    <h1>Our Doctors</h1>
                  </div>
                  <div className="content2_first_div_container">
                    <input
                      type="text"
                      className="content2_first_div_main"
                      placeholder="Search For Patient Records"
                      name="search"
                    />
                    <div>
                      <IoSearch />
                    </div>
                  </div>
                  <div className="doctor-container">
                    {currentDoctors.map((doctor) => (
                      <button key={doctor.id} className="doctor-card" onClick={() => handleOpenDialog(doctor)}>
                        <div
                          className="doctor-image"
                          style={{
                            backgroundImage: `url(${doctor.ProfilePic || doctorimg})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        ></div>        
                        <div className="doctor-info">
                          <div className="status">
                            <div
                              className="status-indicator"
                              style={{
                                background: doctor.status === 'Available' ? '#34C759' : '#FF3B30',
                              }}
                            ></div>
                            <p className="doctor-name" >{doctor.Name}</p>
                          </div>
                          {/* <p className="specialty">{doctor.PhoneNumber}</p> */}
                          <div className="rating">
                            {[...Array(5)].map((_, i) => (
                              <div key={i} className="star">
                                <img src={rating}></img>
                              </div>
                            ))}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div> 


                     <div className="todayappointments">
                        <div className="header">
                          <h1>Today’s Appointments</h1>
                        </div>
                        <div className="content2_first_div_container">
                          <input
                            type="text"
                            className="content2_first_div_main"
                            placeholder="Search For Patient Records"
                            name="search"
                          />
                          <div>
                            <IoSearch />
                          </div>
                        </div>
                        <div className="appointment-container">
                          {currentAppointments.map((patient, index) => (
                            <button
                              key={index}
                              className="appointment-card2"
                              onClick={() => handlePatientClick(patient)}
                            >
                              <div className="appointment-image"></div>
                              <div className="appointment-details">
                                <div className="patient-name">{patient.PatientName}</div>
                                <div className="doctor-department">DR.{patient.DoctorName}</div>
                                <div className="patient-details">
                                  {patient.Age}y, {patient.Gender}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                        <div className="pagination">
                          {Array.from({ length: totalPagesAppointments }, (_, index) => (
                            <button
                              key={index}
                              className={`page-button ${
                                currentPageAppointments === index + 1 ? 'active' : ''
                              }`}
                              onClick={() => setCurrentPageAppointments(index + 1)}
                            >
                              {index + 1}
                            </button>
                          ))}
                        </div>
                      
                      </div>   

                    <div className="settings">
                    <div className="header">
                    <h1>Settings</h1>
                    </div>

                    <div className="settings-container">
                        {settingsData.map((setting, index) => (
                          <div key={index} className="settings-card">
                          
                            <div className="settings-title">{setting.title}</div>
                            <div className="settings-icon">
                              <div className="icon-placeholder">
                                <img src={Settings}></img>
                              </div>
                            </div>
                          </div>
                        ))}
                        </div>
                      </div>       
          </div>     
          <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Doctor Details</DialogTitle>
        <DialogContent>
          {selectedDoctor && (
            <div>
              <p><strong>Name:</strong> {selectedDoctor.Name}</p>
              <p><strong>Gender:</strong> {selectedDoctor.Gender}</p>
              <p><strong>Phone Number:</strong> {selectedDoctor.PhoneNumber}</p>
              <p><strong>Email:</strong> {selectedDoctor.Email}</p>
              <p><strong>Consultation Fee:</strong> {selectedDoctor.Fee}</p>

            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
          <Dialog
            open={modalVisible}
            onClose={handleCloseModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle className="patient-name">{selectedPatient?.PatientName} </DialogTitle>
            <DialogContent>
              <p>Patient Name: {selectedPatient?.PatientName}</p>
              <p>Patient Age: {selectedPatient?.Age}</p>
              <p>Patient Gender: {selectedPatient?.Gender}</p>
              <p>MRN: {selectedPatient?.MRN}</p>
            </DialogContent>
            <DialogContent>
              <p>Doctor Name: {selectedPatient?.DoctorName}</p>
              <p>Department: {selectedPatient?.DepartmentName}</p>
              <p>Payment Status: {selectedPatient?.PaymentStatus}</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal}>Close</Button>
            </DialogActions>
          </Dialog>
    </div>
    )
}

export default AdminDash

