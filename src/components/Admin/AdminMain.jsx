import React, { useState } from 'react'
import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard'
import Home from '../Home'
import LoginPage from '../LoginPage'
import All from './Dashboard/All'
import Profile from './Profile/Profile'
import Editprofile from './Profile/Editprofile'
import Pharmacy from './Pharmacy/Pharmacy'
import Purchase from './Pharmacy/Purchase'
import Sales from './Pharmacy/Sales'
import Expired from './Pharmacy/Expired'
import Inventory from './Pharmacy/Inventory'
import Salesviewall from './Pharmacy/Salesviewall'
import Addmedicine from './Pharmacy/Addmedicine'
import Addpatients from './Patients/Addpatients'
import Patientrecord from './Patients/Patientrecord'
import Addusers from './Patients/Addusers'
import Results from './Lab/Results'
import UpdateResult from './Lab/UpdateResult'
import PublishResult from './Lab/PublishResult'
import Addservices from './Lab/Addservices'
import AddveiwAll from './Lab/AddveiwAll'
import Addpackages from './Lab/Addpackages'
import PrintResult from './Lab/PrintResult'
import AddDeparment from './Department/AddDeparment'
import AddDoctor from './Doctor/AddDoctor'
import DoctorHome from '../DoctorFrame/DoctorHome'
import DocMypatients from '../DoctorFrame/DocMypatients'
import DocDiagnosis from '../DoctorFrame/DocDiagnosis'
import Signup from '../Signup'
import PatientFrameHome from '../PatientFrame/PatientFrameHome'
import PatientBooking from '../PatientFrame/PatientBooking'
import LabHome from '../LabFrame/LabHome'
import PharmacyHome from '../PharmacyFrame/PharmacyHome'
import ReceptionHome from '../ReceptionFrame/ReceptionHome'
import Viewdetails from './Pharmacy/Viewdetails'
import Addfloor_room from './Addfloor/Addfloor_room'
import Myschedule from '../PatientFrame/Myschedule'
import Discharge from './Managepatient/Discharge'
import Monitorpatient from './Patients/Monitorpatient'
import AdminDashboard from './AdminDashboard'
import Doctordashboard from '../DoctorFrame/Doctordashboard'
import Consultedpatients from '../DoctorFrame/Consultedpatients'
import PatientDashboard from '../PatientFrame/PatientDashboard'
import Adminresultchart from './Charts/Adminresultchart'
import AdminDashChart from './Charts/AdminDashChart'
import AvailableDoctor from './Doctor/AvailableDoctor'
import AddPharmacyPatients from './Pharmacy/AddPharmacyPatients'
import PharmacyDashboard from '../PharmacyFrame/PharmacyDashboard'
import PharmacyDetails from '../PharmacyFrame/PharmacyDetails'
import ReceptionDashboard from '../ReceptionFrame/ReceptionDashboard'
import LabDashboard from '../LabFrame/LabDashboard'
import AssignRole from './Patients/AssignRole'
import Loading from '../Loading'
import NurseHome from '../NurseFrame/NurseHome'
import NurseNavpad from '../NurseFrame/NurseNavpad'
import NurseDasboard from '../NurseFrame/Nursedashboard'
import NurseMypatients from '../NurseFrame/NurseMypatient'
import NurseInpatient  from '../NurseFrame/NurseInpatient'
import DocINpatients from '../DoctorFrame/DocINpatients'
import Pychomatric from './Dashboard/Pychomatric'
import Errorhandling from './Errorhandling'
import AddArticle from '../DoctorFrame/AddArticle'
import AddTemplate from './Doctor/AddTemplate'
import RequestDonation from './BloodBank/RequestDonation'
import BloodDonation from './BloodBank/BloodDonation'
import SignalR from '../DoctorFrame/SignalR'
import Vedioconference from '../DoctorFrame/VedioConference'
import Createroom from '../DoctorFrame/VedioCreateRoom'
import VedioCreateRoom from '../DoctorFrame/VedioCreateRoom'
import Mycalender from '../DoctorFrame/Mycalender'
import Invoice from './Invoices/Invoice'
import Printinvoice from './Invoices/Printinvoice'
import Labinvoice from './Invoices/Labinvoice'
import Searchinvoices from './Invoices/Searchinvoices'
import InvoiceParent from './Invoices/InvoiceParent'
import Addservicegroup from './Lab/Addservicegroup'
import Addspecimen from './Lab/Addspecimen'
import PatientLabBooking from '../PatientFrame/PatientLabBooking'
import LandingIndex from '../../LandingPage/LandingIndex'
import Privacy from '../../LandingPage/Body/Privacy'
import Documentation from '../../LandingPage/Body/Documentation'
import Terms from '../../LandingPage/Body/Terms'
import Support from '../../LandingPage/Body/Support'
import VerifyEmail from '../Email/VerifyEmail'
import EmailPin from '../Email/EmailPin'
import EmailSignup from '../Email/EmailSignup'
import Pricing from '../../LandingPage/Pricing'
import Refund from '../../LandingPage/Refund'
import NurseAddArticle from '../NurseFrame/NurseAddArticle'

const AdminMain = () => {
  return (
    <div>
  <BrowserRouter>
      <Routes>
            <Route path='/' element={<LandingIndex/>}></Route>
            <Route path='privacy' element={<Privacy/>}></Route>
            <Route path='documentation' element={<Documentation/>}></Route>
            <Route path='termsofuse' element={<Terms/>}></Route>
            <Route path='support' element={<Support/>}></Route>
            <Route path='pricing' element={<Pricing/>}></Route>
            <Route path='refund' element={<Refund/>}></Route>
            <Route path='login' element={<LoginPage/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/verifyemail' element={<VerifyEmail/>}></Route>
            <Route path='/emailpin' element={<EmailPin/>}></Route>
            <Route path='/emailsignup' element={<EmailSignup/>}></Route>
            <Route path="Home/" element={<Home/>}>
 {/* dashbordroutes */}
            <Route path='admindashboard' element={<AdminDashboard/>}/>
            <Route path='admindashboard/admindashchart/:id?' element={<AdminDashChart/>}/>
            <Route path='admindashboard/adminresultchart' element={<Adminresultchart/>}/>
            <Route path="admindashboard/dashboard/:id?" element={<Dashboard />} />
            <Route path="dashboard/all" element={<All/>} />
            <Route path="diagnosis/:id" element={<DocDiagnosis/>} /> 
            <Route path="admindashboard/pychomatric" element={<Pychomatric/>}/>
   {/* chartdashboard */}
            <Route path="patientdetailschart/dashboard/:id?" element={<Dashboard />} /> 
            <Route path="labdetailschart/dashboard/:id?" element={<Dashboard />} /> 

{/* manage inpatien */}
            <Route path='dischargepatient' element={<Discharge/>}></Route>
{/* Profileroutes */}
            <Route path="profile" element={<Profile/>} />
            <Route path="profile/editprofile" element={<Editprofile/>} />
{/* Pharmacyroutes */}
            <Route path="pharmacy" element={<Pharmacy/>} />
            <Route path="pharmacy/purchase" element={<Purchase/>} />
            <Route path="pharmacy/sales" element={<Sales/>} />
            <Route path="pharmacy/expired" element={<Expired/>} />
            <Route path="pharmacy/inventory" element={<Inventory/>} />
            <Route path="pharmacy/viewall" element={<Salesviewall/>} />
            <Route path="pharmacy/addmedicine/:id" element={<Addmedicine/>} />
            <Route path="viewdetails/:id" element={<Viewdetails/>} />
            <Route path='pharmacy/addpharmacypatients' element={<AddPharmacyPatients/>}/>
 {/* patientroutes */}
            <Route path='addpateints' element={<Addpatients/>}/>
            <Route path='patientrecord' element={<Patientrecord/>}/>
            <Route path='addusers'  element={<Addusers/>}/>
            <Route path='assignrole' element={<AssignRole/>}/>
            <Route path='monitor'  element={<Monitorpatient/>}/>
  {/* labroutes */}
            <Route path='labinvoice' element={<Labinvoice/>}/>
            <Route path='results' element={<Results/>}/>
            <Route path='results/updateresult' element={<UpdateResult/>}/>
            <Route path='results/publishresuit' element={<PublishResult/>}/>
            <Route path='results/printresult/:id' element={<PrintResult/>}/>
            {/* <Route path='services' element={<Services/>}/> */}
            <Route path='addservices' element={<Addservices/>}/>
            <Route path='services/addservicesviewall' element={<AddveiwAll/>}/>
            <Route path='addpackages' element={<Addpackages/>}/>
            <Route path='addservicegroup' element={<Addservicegroup/>}/>
            <Route path='addspecimen' element={<Addspecimen/>}/>

  {/*departemts  */}
            <Route path='addepartment' element={<AddDeparment/>}/>
  {/* doctors */}
            <Route path='adddoctor' element={<AddDoctor/>}/>
            <Route path='addfloor' element={<Addfloor_room/>}/>
            <Route path='admindashboard/availabledoctors' element={<AvailableDoctor/>}/>
            <Route path='addtemplate' element={<AddTemplate/>}/>
  {/*  blood bank*/}
            <Route path='admindashboard/requestdonation' element={<RequestDonation/>}/>
            <Route path='blooddonation' element={<BloodDonation/>}/>
  {/*invoices */}
            <Route path='invoicemain' element={<InvoiceParent/>}/>
            <Route path='invoicemain/invoice' element={<Invoice/>}/>
            <Route path='printinvoice/:invoiceno/:type' element={<Printinvoice/>}/>
            <Route path='invoicemain/searchinvoice' element={<Searchinvoices/>}/>

          </Route>



  {/* doctor frame */}
          <Route path="/doctor/" element={<DoctorHome/>}>
            <Route path='doctordashboard' element={<Doctordashboard/>}/>
            <Route path="doctordashboard/pychomatric" element={<Pychomatric/>}/>
            <Route path="doctordashboard/dashboard/:id?" element={<Dashboard />} />
            <Route path="dashboard/all" element={<All/>} />
            <Route path='addservices' element={<Addservices/>}/>
            <Route path="mypatients" element={<DocMypatients />} />
            <Route path="docinpatient" element={<DocINpatients/>} />
            <Route path='consultedpatients' element={<Consultedpatients/>}/>
            <Route path="diagnosis/:id" element={<DocDiagnosis/>} /> 
            <Route path="profile" element={<Profile/>} />
            <Route path="viewdetails/:id" element={<Viewdetails/>} />
            <Route path="profile/editprofile" element={<Editprofile/>} />
            <Route path='addarticle' element={<AddArticle/>}/>
            <Route path='doctordashboard/requestdonation' element={<RequestDonation/>}/>
            <Route path='vedioconfernce' element={<Vedioconference/>}/>
            <Route path='createroom'  element={<VedioCreateRoom/>}/>
            <Route path='mycalendar' element={<Mycalender/>}/>
          </Route>


  {/* Nurse frame */}
         <Route path='/nurse/' element={<NurseHome/>}>
           <Route path='nursedashboard' element={<NurseDasboard/>}/>
           <Route path="nursedashboard/dashboard" element={<Dashboard />} />
           <Route path="nursedashboard/pychomatric" element={<Pychomatric/>}/>
           <Route path='nursenavpad' element={<NurseNavpad/>}/>
           <Route path='addservices' element={<Addservices/>}/>
           <Route path="profile" element={<Profile/>} />
           <Route path='nursemypatient' element={<NurseMypatients/>}/>
           <Route path='nurseinpatient' element={<NurseInpatient/>}/>
           <Route path='requestdonation' element={<RequestDonation/>}/>
           <Route path='blooddonation' element={<BloodDonation/>}/>
            <Route path='addarticle' element={<NurseAddArticle/>}/>
         </Route> 

  {/* patientFrame */}
            <Route path="/patient/" element={<PatientFrameHome/>}>
              <Route path='patientdashboard' element={<PatientDashboard/>}/>
              <Route path="patientbooking/:id?" element={<PatientBooking />} />
              <Route path="patientdashboard/dashboard/:id?" element={<Dashboard />} />
              <Route path='patientdashboard/availabledoctors' element={<AvailableDoctor/>}/>
              <Route path="dashboard/all" element={<All/>} />
              <Route path='myschedule' element={<Myschedule/>}/>
              <Route path='addservices' element={<Addservices/>}/>
              {/* <Route path="mypatients/diagnosis/:id" element={<DocDiagnosis/>} /> */}
              <Route path="profile" element={<Profile/>} />
              <Route path="profile/editprofile" element={<Editprofile/>} />
              <Route path='patientdashboard/requestdonation' element={<RequestDonation/>}/>
              <Route path='vedioconfernce' element={<Vedioconference/>}/>
              <Route path='booklab' element={<PatientLabBooking/>}/>
            </Route>

  {/* labframe */}
            <Route path="/labhome/" element={<LabHome/>}>
              <Route path='results' element={<Results/>}/>
              <Route path='labdashboard' element={<LabDashboard/>}/>
              <Route path="labdashboard/dashboard/:id?" element={<Dashboard />} />
              <Route path="dashboard/all" element={<All/>} />
              <Route path='results/updateresult' element={<UpdateResult/>}/>
              <Route path='results/publishresuit' element={<PublishResult/>}/>
              <Route path='results/printresult/:id' element={<PrintResult/>}/>
              <Route path='addservices' element={<Addservices/>}/>
              <Route path='services/addservicesviewall' element={<AddveiwAll/>}/>
              <Route path='addpackages' element={<Addpackages/>}/>
              <Route path="profile" element={<Profile/>} />
              <Route path="viewdetails/:id" element={<Viewdetails/>} />
              <Route path="profile/editprofile" element={<Editprofile/>} />
              <Route path='labdashboard/requestdonation' element={<RequestDonation/>}/>
              <Route path='addservicegroup' element={<Addservicegroup/>}/>
              <Route path='addspecimen' element={<Addspecimen/>}/>
            </Route>


  {/* pharmacy frame */}
            <Route path='/pharmacyhome/' element={<PharmacyHome/>}>
              <Route path="pharmacy" element={<Pharmacy/>} />
              <Route path='pharmacydashboard' element={<PharmacyDashboard/>}/>
              <Route path='pharmacydetails' element={<PharmacyDetails/>}/>
              <Route path="pharmacydashboard/dashboard/:id?" element={<Dashboard />} />
              <Route path="dashboard/all" element={<All/>} />
              <Route path='addservices' element={<Addservices/>}/>
              <Route path="pharmacy/purchase" element={<Purchase/>} />
              <Route path="pharmacy/sales" element={<Sales/>} />
              <Route path="pharmacy/expired" element={<Expired/>} />
              <Route path="pharmacy/inventory" element={<Inventory/>} />
              <Route path="pharmacy/viewall" element={<Salesviewall/>} />
              <Route path="pharmacy/addmedicine/:id" element={<Addmedicine/>} />
              <Route path='pharmacy/addpharmacypatients' element={<AddPharmacyPatients/>}/>
              <Route path="viewdetails/:id" element={<Viewdetails/>} />
              <Route path="profile" element={<Profile/>} />
              <Route path="profile/editprofile" element={<Editprofile/>} />
              <Route path='pharmacydashboard/requestdonation' element={<RequestDonation/>}/>
            </Route>

  {/* receptionframe */}
            <Route path='/receptionhome/' element={<ReceptionHome/>}>
              <Route path='receptiondashboard' element={<ReceptionDashboard/>}/>
              <Route path="receptiondashboard/dashboard" element={<Dashboard />} />
              <Route path="dashboard/all" element={<All/>} />
              <Route path='addservices' element={<Addservices/>}/>
              <Route path='addpateints' element={<Addpatients/>}/>
              <Route path='dischargepatient' element={<Discharge/>}></Route>
              <Route path='patientrecord' element={<Patientrecord/>}/>
              <Route path="viewdetails/:id" element={<Viewdetails/>} />
              <Route path='monitor'  element={<Monitorpatient/>}/>
              <Route path='addusers'  element={<Addusers/>}/>
              <Route path="profile" element={<Profile/>} />
              <Route path="profile/editprofile" element={<Editprofile/>} />
              <Route path='receptiondashboard/requestdonation' element={<RequestDonation/>}/>
            </Route>
         <Route path='*' element={<Errorhandling/>}/>
      </Routes>
      </BrowserRouter>
      <Loading/>
      {/* <Errorhandling/> */}
    </div>
  )
}

export default AdminMain