import { configureStore} from '@reduxjs/toolkit';
import  {thunk}  from 'redux-thunk';
import purchaseresucer from './PurchaseSlice';
import Expirereducer from './ExpiredSlice';
import LabserviceReducer from './LabservicesSlice';
import LoginReducer from './LoginSlice';
import Addpatientreducer from './AddpatientSlice';
import AdduserReducer from './AddusersSlice';
import EditprofileReducer from './EditProfileSlice';
import AddservicesReducer from './AddservicesSlice';
import AddpackageReducer from './AddpackageSlice';
import ResultReducer from './ResultSlice';
import AdddepatmentReducer from './Department/AddDepartmentSlice';
import AddDoctorReducer from './Doctor/AddDoctorSlice';
import DiagnosisReducer from './DoctorFrame/DiagnosisSlice';
import SignupReducer from './SignupSlice';
import LoggedpatientReducer from './PatientFrame/LoggedPatientSlice';
import AddfloorReducer from './AddfloorSlice';
import ProfileReducer from "./ProfileSlice";
import newPatientReducer from './NewPatientSlice';
import PharmacydetailsReducer from './PharmacydetailsSlice';
import LoadingReducer from './LoadingSlice';
import MonitoringReducer from './Monitoring';
import SearchNavReducer from './NurseFrame/SearchNavSlice';
import MedicinemasterReducer from './MedicineMasterSlice';
import PrescriptionReducer from './PrescriptionSlice';
import ErrorReducer from './ErrorSlice';
import DashboardReducer from './DashboardSlice';
import TemplateReducer from './AddTemplate';
import BloodbankReducer from './BloodBankSlice'
import VedioconferenceReducer from './DoctorFrame/Vedioconference'
import InvoiceReducer from './InvoicesSlice'
import AssignRoleReducer from './AssignRoleSlice';
import OpenAiReducer from './OpenAiSlice';
import OpenClaudeAISlice from './OpenClaudeAISlice';
import PatientconsultationReducer from './PatientFrame/Bookconsultation'
import KycDetailsReducer from './DoctorFrame/KycDetailSlice'



export default configureStore({
    reducer: {
        signup:SignupReducer,
        // purchase section
        purchase:purchaseresucer,
        expired:Expirereducer,
        labsevicesdetails:LabserviceReducer,
        logindetails:LoginReducer,
        Addpatentdetails:Addpatientreducer,
        Addusers:AdduserReducer,
        Editprofile:EditprofileReducer,
        Addservices:AddservicesReducer,
        Addpackages:AddpackageReducer,
        Results:ResultReducer,
        Addfloor:AddfloorReducer,
        Profiledata:ProfileReducer,
        newPatient:newPatientReducer,
        PharmacyDetails:PharmacydetailsReducer,
        MonitorPatient:MonitoringReducer,
        Medicinemaster:MedicinemasterReducer,
        Prescription:PrescriptionReducer,
        Errorhandle:ErrorReducer,
        Dashboard:DashboardReducer,
        Template:TemplateReducer,
        Bloodbank:BloodbankReducer,
        Invoice:InvoiceReducer,
        // departments
        Adddepartment:AdddepatmentReducer,
        //doctors
        Adddoctor:AddDoctorReducer,

        //doctorframe
        DiagnosePatient:DiagnosisReducer,
        Vedioconference:VedioconferenceReducer,
        KycDetails:KycDetailsReducer,
        // patientframe
        Loggedpatient:LoggedpatientReducer,
        Assignrole:AssignRoleReducer,
        loading:LoadingReducer, 
        OpenAI:OpenAiReducer,
        ClaudeAI:OpenClaudeAISlice,
        Bookconsultation:PatientconsultationReducer,

        //nurseframe
        SearchNurse:SearchNavReducer,


    },
    
    middleware:[thunk]
});

