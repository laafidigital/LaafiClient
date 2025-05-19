
import axios from 'axios'
import { toast } from 'react-toastify'
import { setLoading } from './LoadingSlice'
import { setError } from './ErrorSlice'
import Unauthorized from '../Admin/Unauthorized'
import { useNavigate } from 'react-router-dom'

// const baseUrl='http://greathealth.netsrishti.org/api/'
// const baseUrl='https://laafiprod.azurewebsites.net/api/'
// 'https://lafiuat.azurewebsites.net/api/'
// const baseUrl='https://lafiuat.azurewebsites.net/api/'
const baseUrl='https://laafi.in/dev/api/'
// const baseUrl='https://laafi.azurewebsites.net/api/'

// for external logins
const external='https://authapis.azurewebsites.net/api/'
//for image purpose url
export const baseimageUrl='https://laafi.in/dev/'

const depturl='https://laafi.in/auth/api/'

//POST OPERATIONS

//post logindata
export const POST_REQUEST='POST_REQUEST'
export const POST_SUCCESS='POST_SUCCESS'
export const POST_FAILURE='POST_FAILURE'
//post signupdata
export const POST_REQUEST2='POST_REQUEST2'
export const POST_SUCCESS2='POST_SUCCESS2'
export const POST_FAILURE2='POST_FAILURE2'
//post assignrole
export const POST_REQUEST3='POST_REQUEST3'
export const POST_SUCCESS3='POST_SUCCESS3'
export const POST_FAILURE3='POST_FAILURE3'
//post servicesdata
export const POST_REQUEST4='POST_REQUEST4'
export const POST_SUCCESS4='POST_SUCCESS4'
export const POST_FAILURE4='POST_FAILURE4'
//post department
export const POST_REQUEST5='POST_REQUEST5'
export const POST_SUCCESS5='POST_SUCCESS5'
export const POST_FAILURE5='POST_FAILURE5'
//post floordata
export const POST_REQUEST6='POST_REQUEST6'
export const POST_SUCCESS6='POST_SUCCESS6'
export const POST_FAILURE6='POST_FAILURE6'
//post pharmacypurchasedata
export const POST_REQUEST7='POST_REQUEST7'
export const POST_SUCCESS7='POST_SUCCESS7'
export const POST_FAILURE7='POST_FAILURE7'
//post packagedata
export const POST_REQUEST8='POST_REQUEST8'
export const POST_SUCCESS8='POST_SUCCESS8'
export const POST_FAILURE8='POST_FAILURE8'
//update pakages
export const POST_REQUEST9='POST_REQUEST9'
export const POST_SUCCESS9='POST_SUCCESS9'
export const POST_FAILURE9='POST_FAILURE9'
//post consultation
export const POST_REQUEST10='POST_REQUEST10'
export const POST_SUCCESS10='POST_SUCCESS10'
export const POST_FAILURE10='POST_FAILURE10'
//post patientservices
export const POST_REQUEST11='POST_REQUEST11'
export const POST_SUCCESS11='POST_SUCCESS11'
export const POST_FAILURE11='POST_FAILURE11'
// update consultation
export const POST_REQUEST12='POST_REQUEST12'
export const POST_SUCCESS12='POST_SUCCESS12'
export const POST_FAILURE12='POST_FAILURE12'
//post medicineMaster
export const POST_REQUEST13='POST_REQUEST13'
export const POST_SUCCESS13='POST_SUCCESS13'
export const POST_FAILURE13='POST_FAILURE13'
//post pcychomatricdata
export const POST_REQUEST14='POST_REQUEST14'
export const POST_SUCCESS14='POST_SUCCESS14'
export const POST_FAILURE14='POST_FAILURE14'
//post priscription
export const POST_REQUEST15='POST_REQUEST15'
export const POST_SUCCESS15='POST_SUCCESS15'
export const POST_FAILURE15='POST_FAILURE15'
//Post bed status=true
export const POST_REQUEST16='POST_REQUEST16'
export const POST_SUCCESS16='POST_SUCCESS16'
export const POST_FAILURE16='POST_FAILURE16'
//post templatedata
export const POST_REQUEST17='POST_REQUEST17'
export const POST_SUCCESS17='POST_SUCCESS17'
export const POST_FAILURE17='POST_FAILURE17'
//post complete template data
export const POST_REQUEST18='POST_REQUEST18'
export const POST_SUCCESS18='POST_SUCCESS18'
export const POST_FAILURE18='POST_FAILURE18'
//post imageai
export const POST_REQUEST19='POST_REQUEST19'
export const POST_SUCCESS19='POST_SUCCESS19'
export const POST_FAILURE19='POST_FAILURE19'
//post additionalinput data
export const POST_REQUEST20='POST_REQUEST20'
export const POST_SUCCESS20='POST_SUCCESS20'
export const POST_FAILURE20='POST_FAILURE20'
//post blood bank data
export const POST_REQUEST21='POST_REQUEST21'
export const POST_SUCCESS21='POST_SUCCESS21'
export const POST_FAILURE21='POST_FAILURE21'
//post consultationservice and package
export const POST_REQUEST22='POST_REQUEST22'
export const POST_SUCCESS22='POST_SUCCESS22'
export const POST_FAILURE22='POST_FAILURE22'
// signup doctor
export const POST_REQUEST23='POST_REQUEST23'
export const POST_SUCCESS23='POST_SUCCESS23'
export const POST_FAILURE23='POST_FAILURE23'
// signup patients
export const POST_REQUEST24='POST_REQUEST24'
export const POST_SUCCESS24='POST_SUCCESS24'
export const POST_FAILURE24='POST_FAILURE24'
// editdoctorshecdule
export const POST_REQUEST25='POST_REQUEST25'
export const POST_SUCCESS25='POST_SUCCESS25'
export const POST_FAILURE25='POST_FAILURE25'
// post doctorconsultaion
export const POST_REQUEST26='POST_REQUEST26'
export const POST_SUCCESS26='POST_SUCCESS26'
export const POST_FAILURE26='POST_FAILURE26'
// post update doctor fees
export const POST_REQUEST27='POST_REQUEST27'
export const POST_SUCCESS27='POST_SUCCESS27'
export const POST_FAILURE27='POST_FAILURE27'
// post add floor
export const POST_REQUEST28='POST_REQUEST28'
export const POST_SUCCESS28='POST_SUCCESS28'
export const POST_FAILURE28='POST_FAILURE28'
//post admit data 
export const POST_REQUEST29='POST_REQUEST29'
export const POST_SUCCESS29='POST_SUCCESS29'
export const POST_FAILURE29='POST_FAILURE29'
//post invoice payment
export const POST_REQUEST30='POST_REQUEST30'
export const POST_SUCCESS30='POST_SUCCESS30'
export const POST_FAILURE30='POST_FAILURE30'
// post generate invoice
export const POST_REQUEST31='POST_REQUEST31'
export const POST_SUCCESS31='POST_SUCCESS31'
export const POST_FAILURE31='POST_FAILURE31'
// post service group
export const POST_REQUEST32='POST_REQUEST32'
export const POST_SUCCESS32='POST_SUCCESS32'
export const POST_FAILURE32='POST_FAILURE32'
// post specimen
export const POST_REQUEST33='POST_REQUEST33'
export const POST_SUCCESS33='POST_SUCCESS33'
export const POST_FAILURE33='POST_FAILURE33'
// cancel transaction
export const POST_REQUEST34='POST_REQUEST34'
export const POST_SUCCESS34='POST_SUCCESS34'
export const POST_FAILURE34='POST_FAILURE34'
//post profile in kyc update
export const POST_REQUEST35='POST_REQUEST35'
export const POST_SUCCESS35='POST_SUCCESS35'
export const POST_FAILURE35='POST_FAILURE35'
//post nurse update
export const POST_REQUEST36='POST_REQUEST36'
export const POST_SUCCESS36='POST_SUCCESS36'
export const POST_FAILURE36='POST_FAILURE36'
//post update eduation certificate
export const POST_REQUEST37='POST_REQUEST37'
export const POST_SUCCESS37='POST_SUCCESS37'
export const POST_FAILURE37='POST_FAILURE37'
//post uploadidproof 
export const POST_REQUEST38='POST_REQUEST38'
export const POST_SUCCESS38='POST_SUCCESS38'
export const POST_FAILURE38='POST_FAILURE38'
//post registration certificate
export const POST_REQUEST39='POST_REQUEST39'
export const POST_SUCCESS39='POST_SUCCESS39'
export const POST_FAILURE39='POST_FAILURE39'
//post admin upload profile picture
export const POST_REQUEST40='POST_REQUEST40'
export const POST_SUCCESS40='POST_SUCCESS40'
export const POST_FAILURE40='POST_FAILURE40'
//post admin upload education certificate
export const POST_REQUEST41='POST_REQUEST41'
export const POST_SUCCESS41='POST_SUCCESS41'
export const POST_FAILURE41='POST_FAILURE41'
//post admin upload idproof document
export const POST_REQUEST42='POST_REQUEST42'
export const POST_SUCCESS42='POST_SUCCESS42'
export const POST_FAILURE42='POST_FAILURE42'
//post specialization upload certificate
export const POST_REQUEST43='POST_REQUEST43'
export const POST_SUCCESS43='POST_SUCCESS43'
export const POST_FAILURE43='POST_FAILURE43'
//book lab by patients
export const POST_REQUEST44='POST_REQUEST44'
export const POST_SUCCESS44='POST_SUCCESS44'
export const POST_FAILURE44='POST_FAILURE44'
//book package by patient
export const POST_REQUEST45='POST_REQUEST45'
export const POST_SUCCESS45='POST_SUCCESS45'
export const POST_FAILURE45='POST_FAILURE45'
//post doctor by token
export const POST_REQUEST46='POST_REQUEST46'
export const POST_SUCCESS46='POST_SUCCESS46'
export const POST_FAILURE46='POST_FAILURE46'
//post external login
export const POST_REQUEST47='POST_REQUEST47'
export const POST_SUCCESS47='POST_SUCCESS47'
export const POST_FAILURE47='POST_FAILURE47'
//post externallogin validate googletoken
export const POST_REQUEST48='POST_REQUEST48'
export const POST_SUCCESS48='POST_SUCCESS48'
export const POST_FAILURE48='POST_FAILURE48'
//post externalLoginCallback
export const POST_REQUEST49='POST_REQUEST49'
export const POST_SUCCESS49='POST_SUCCESS49'
export const POST_FAILURE49='POST_FAILURE49'
// post otpLogin
export const POST_REQUEST50='POST_REQUEST50'
export const POST_SUCCESS50='POST_SUCCESS50'
export const POST_FAILURE50='POST_FAILURE50'
// post resetmpin
export const POST_REQUEST51='POST_REQUEST51'
export const POST_SUCCESS51='POST_SUCCESS51'
export const POST_FAILURE51='POST_FAILURE51'
// post template micro
export const POST_REQUEST52='POST_REQUEST52'
export const POST_SUCCESS52='POST_SUCCESS52'
export const POST_FAILURE52='POST_FAILURE52'
//post create meeting
export const POST_REQUEST53='POST_REQUEST53'
export const POST_SUCCESS53='POST_SUCCESS53'
export const POST_FAILURE53='POST_FAILURE53'




//GET OPERATIONS

//get getusers(assignrole)
export const FETCH_REQUEST='FETCH_REQUEST'
export const FETCH_SUCCESS='FETCH_SUCCESS'
export const FETCH_FAILURE='FETCH_FAILURE'
//get getroles(assignrole)
export const FETCH_REQUEST2='FETCH_REQUEST2'
export const FETCH_SUCCESS2='FETCH_SUCCESS2'
export const FETCH_FAILURE2='FETCH_FAILURE2'
//get getuserbyid
export const FETCH_REQUEST3='FETCH_REQUEST3'
export const FETCH_SUCCESS3='FETCH_SUCCESS3'
export const FETCH_FAILURE3='FETCH_FAILURE3'
//get rolebyid
export const FETCH_REQUEST4='FETCH_REQUEST4'
export const FETCH_SUCCESS4='FETCH_SUCCESS4'
export const FETCH_FAILURE4='FETCH_FAILURE4'
//get services
export const FETCH_REQUEST5='FETCH_REQUEST5'
export const FETCH_SUCCESS5='FETCH_SUCCESS5'
export const FETCH_FAILURE5='FETCH_FAILURE5'
//get departmentdata
export const FETCH_REQUEST6='FETCH_REQUEST6'
export const FETCH_SUCCESS6='FETCH_SUCCESS6'
export const FETCH_FAILURE6='FETCH_FAILURE6'
// get medicinemaster
export const FETCH_REQUEST7='FETCH_REQUEST7'
export const FETCH_SUCCESS7='FETCH_SUCCESS7'
export const FETCH_FAILURE7='FETCH_FAILURE7'
//get doctorsonly
export const FETCH_REQUEST8='FETCH_REQUEST8'
export const FETCH_SUCCESS8='FETCH_SUCCESS8'
export const FETCH_FAILURE8='FETCH_FAILURE8'
//get doctorbydepid
export const FETCH_REQUEST9='FETCH_REQUEST9'
export const FETCH_SUCCESS9='FETCH_SUCCESS9'
export const FETCH_FAILURE9='FETCH_FAILURE9'
//get packagedata
export const FETCH_REQUEST10='FETCH_REQUEST10'
export const FETCH_SUCCESS10='FETCH_SUCCESS10'
export const FETCH_FAILURE10='FETCH_FAILURE10'
//get packagewithId
export const FETCH_REQUEST11='FETCH_REQUEST11'
export const FETCH_SUCCESS11='FETCH_SUCCESS11'
export const FETCH_FAILURE11='FETCH_FAILURE11'
//get services By depId
export const FETCH_REQUEST12='FETCH_REQUEST12'
export const FETCH_SUCCESS12='FETCH_SUCCESS12'
export const FETCH_FAILURE12='FETCH_FAILURE12'
//get floor
export const FETCH_REQUEST13='FETCH_REQUEST13'
export const FETCH_SUCCESS13='FETCH_SUCCESS13'
export const FETCH_FAILURE13='FETCH_FAILURE13'
//get Rooms
export const FETCH_REQUEST14='FETCH_REQUEST14'
export const FETCH_SUCCESS14='FETCH_SUCCESS14'
export const FETCH_FAILURE14='FETCH_FAILURE14'
//get brd by roomid
export const FETCH_REQUEST15='FETCH_REQUEST15'
export const FETCH_SUCCESS15='FETCH_SUCCESS15'
export const FETCH_FAILURE15='FETCH_FAILURE15'
//get doctorshedule by id
export const FETCH_REQUEST16='FETCH_REQUEST16'
export const FETCH_SUCCESS16='FETCH_SUCCESS16'
export const FETCH_FAILURE16='FETCH_FAILURE16'
//get consultation
export const FETCH_REQUEST17='FETCH_REQUEST17'
export const FETCH_SUCCESS17='FETCH_SUCCESS17'
export const FETCH_FAILURE17='FETCH_FAILURE17'
//get pharmacy purchasedata
export const FETCH_REQUEST18='FETCH_REQUEST18'
export const FETCH_SUCCESS18='FETCH_SUCCESS18'
export const FETCH_FAILURE18='FETCH_FAILURE18'
// get pateintServices
export const FETCH_REQUEST19='FETCH_REQUEST19'
export const FETCH_SUCCESS19='FETCH_SUCCESS19'
export const FETCH_FAILURE19='FETCH_FAILURE19'
//OPEN AI 
export const FETCH_REQUEST20='FETCH_REQUEST20'
export const FETCH_SUCCESS20='FETCH_SUCCESS20'
export const FETCH_FAILURE20='FETCH_FAILURE20'
// get doctor by depid
export const FETCH_REQUEST21='FETCH_REQUEST21'
export const FETCH_SUCCESS21='FETCH_SUCCESS21'
export const FETCH_FAILURE21='FETCH_FAILURE21'
// get patientdetails YTD ,MTD, AVR
export const FETCH_REQUEST22='FETCH_REQUEST22'
export const FETCH_SUCCESS22='FETCH_SUCCESS22'
export const FETCH_FAILURE22='FETCH_FAILURE22'
// get labdetails  YTD ,MTD, AVR
export const FETCH_REQUEST23='FETCH_REQUEST23'
export const FETCH_SUCCESS23='FETCH_SUCCESS23'
export const FETCH_FAILURE23='FETCH_FAILURE23'
// get pharmacy YTD ,MTD,AVR
export const FETCH_REQUEST24='FETCH_REQUEST24'
export const FETCH_SUCCESS24='FETCH_SUCCESS24'
export const FETCH_FAILURE24='FETCH_FAILURE24'
//chatGpt integration
export const FETCH_REQUEST25='FETCH_REQUEST25'
export const FETCH_SUCCESS25='FETCH_SUCCESS25'
export const FETCH_FAILURE25='FETCH_FAILURE25'
// get patientconsultion based on mrn
export const FETCH_REQUEST26='FETCH_REQUEST26'
export const FETCH_SUCCESS26='FETCH_SUCCESS26'
export const FETCH_FAILURE26='FETCH_FAILURE26'
// get monthvise admin card details
export const FETCH_REQUEST27='FETCH_REQUEST27'
export const FETCH_SUCCESS27='FETCH_SUCCESS27'
export const FETCH_FAILURE27='FETCH_FAILURE27'
// get todays patients
export const FETCH_REQUEST28='FETCH_REQUEST28'
export const FETCH_SUCCESS28='FETCH_SUCCESS28'
export const FETCH_FAILURE28='FETCH_FAILURE28'
// todays patientcount
export const FETCH_REQUEST29='FETCH_REQUEST29'
export const FETCH_SUCCESS29='FETCH_SUCCESS29'
export const FETCH_FAILURE29='FETCH_FAILURE29'
// todays lab result
export const FETCH_REQUEST30='FETCH_REQUEST30'
export const FETCH_SUCCESS30='FETCH_SUCCESS30'
export const FETCH_FAILURE30='FETCH_FAILURE30'
// tamplate by department id
export const FETCH_REQUEST31='FETCH_REQUEST31'
export const FETCH_SUCCESS31='FETCH_SUCCESS31'
export const FETCH_FAILURE31='FETCH_FAILURE31'
//consultation by id 
export const FETCH_REQUEST32='FETCH_REQUEST32'
export const FETCH_SUCCESS32='FETCH_SUCCESS32'
export const FETCH_FAILURE32='FETCH_FAILURE32'
//get userdata by id 
export const FETCH_REQUEST33='FETCH_REQUEST33'
export const FETCH_SUCCESS33='FETCH_SUCCESS33'
export const FETCH_FAILURE33='FETCH_FAILURE33'
//patientservice by conultId
export const FETCH_REQUEST34='FETCH_REQUEST34'
export const FETCH_SUCCESS34='FETCH_SUCCESS34'
export const FETCH_FAILURE34='FETCH_FAILURE34'
//get bloodbank 
export const FETCH_REQUEST35='FETCH_REQUEST35'
export const FETCH_SUCCESS35='FETCH_SUCCESS35'
export const FETCH_FAILURE35='FETCH_FAILURE35'
// get bloodbank by status
export const FETCH_REQUEST36='FETCH_REQUEST36'
export const FETCH_SUCCESS36='FETCH_SUCCESS36'
export const FETCH_FAILURE36='FETCH_FAILURE36'
// check existing user
export const FETCH_REQUEST37='FETCH_REQUEST37'
export const FETCH_SUCCESS37='FETCH_SUCCESS37'
export const FETCH_FAILURE37='FETCH_FAILURE37'
//get services and packages by consultId
export const FETCH_REQUEST38='FETCH_REQUEST38'
export const FETCH_SUCCESS38='FETCH_SUCCESS38'
export const FETCH_FAILURE38='FETCH_FAILURE38'
// get patients with services or packages 
export const FETCH_REQUEST39='FETCH_REQUEST39'
export const FETCH_SUCCESS39='FETCH_SUCCESS39'
export const FETCH_FAILURE39='FETCH_FAILURE39'
//get incomplete services in results
export const FETCH_REQUEST40='FETCH_REQUEST40'
export const FETCH_SUCCESS40='FETCH_SUCCESS40'
export const FETCH_FAILURE40='FETCH_FAILURE40'
//get registerd doctors only
export const FETCH_REQUEST41='FETCH_REQUEST41'
export const FETCH_SUCCESS41='FETCH_SUCCESS41'
export const FETCH_FAILURE41='FETCH_FAILURE41'
//get registerd patients
export const FETCH_REQUEST42='FETCH_REQUEST42'
export const FETCH_SUCCESS42='FETCH_SUCCESS42'
export const FETCH_FAILURE42='FETCH_FAILURE42'
//get doctorschedules by id and date
export const FETCH_REQUEST43='FETCH_REQUEST43'
export const FETCH_SUCCESS43='FETCH_SUCCESS43'
export const FETCH_FAILURE43='FETCH_FAILURE43'
//get doctorslots by doc id and date
export const FETCH_REQUEST44='FETCH_REQUEST44'
export const FETCH_SUCCESS44='FETCH_SUCCESS44'
export const FETCH_FAILURE44='FETCH_FAILURE44'
// get added floor
export const FETCH_REQUEST45='FETCH_REQUEST45'
export const FETCH_SUCCESS45='FETCH_SUCCESS45'
export const FETCH_FAILURE45='FETCH_FAILURE45'
// get rooms by floor id
export const FETCH_REQUEST46='FETCH_REQUEST46'
export const FETCH_SUCCESS46='FETCH_SUCCESS46'
export const FETCH_FAILURE46='FETCH_FAILURE46'
// get online patients
export const FETCH_REQUEST47='FETCH_REQUEST47'
export const FETCH_SUCCESS47='FETCH_SUCCESS47'
export const FETCH_FAILURE47='FETCH_FAILURE47'
//get dailyconsultation count
export const FETCH_REQUEST48='FETCH_REQUEST48'
export const FETCH_SUCCESS48='FETCH_SUCCESS48'
export const FETCH_FAILURE48='FETCH_FAILURE48'
// get daily service count
export const FETCH_REQUEST49='FETCH_REQUEST49'
export const FETCH_SUCCESS49='FETCH_SUCCESS49'
export const FETCH_FAILURE49='FETCH_FAILURE49'
//daily labcount
export const FETCH_REQUEST50='FETCH_REQUEST50'
export const FETCH_SUCCESS50='FETCH_SUCCESS50'
export const FETCH_FAILURE50='FETCH_FAILURE50'
//daily package count
export const FETCH_REQUEST51='FETCH_REQUEST51'
export const FETCH_SUCCESS51='FETCH_SUCCESS51'
export const FETCH_FAILURE51='FETCH_FAILURE51'
//daily package count
export const FETCH_REQUEST52='FETCH_REQUEST52'
export const FETCH_SUCCESS52='FETCH_SUCCESS52'
export const FETCH_FAILURE52='FETCH_FAILURE52'
//get packagedb
export const FETCH_REQUEST53='FETCH_REQUEST53'
export const FETCH_SUCCESS53='FETCH_SUCCESS53'
export const FETCH_FAILURE53='FETCH_FAILURE53'
//get patient details from roomid
export const FETCH_REQUEST54='FETCH_REQUEST54'
export const FETCH_SUCCESS54='FETCH_SUCCESS54'
export const FETCH_FAILURE54='FETCH_FAILURE54'
//doc schedule of the day
export const FETCH_REQUEST55='FETCH_REQUEST55'
export const FETCH_SUCCESS55='FETCH_SUCCESS55'
export const FETCH_FAILURE55='FETCH_FAILURE55'
//get invoicesummury monthly
export const FETCH_REQUEST56='FETCH_REQUEST56'
export const FETCH_SUCCESS56='FETCH_SUCCESS56'
export const FETCH_FAILURE56='FETCH_FAILURE56'
// get invoicesummury
export const FETCH_REQUEST57='FETCH_REQUEST57'
export const FETCH_SUCCESS57='FETCH_SUCCESS57'
export const FETCH_FAILURE57='FETCH_FAILURE57'
//get bloodbank inventory view
export const FETCH_REQUEST58='FETCH_REQUEST58'
export const FETCH_SUCCESS58='FETCH_SUCCESS58'
export const FETCH_FAILURE58='FETCH_FAILURE58'
// get invoice data
export const FETCH_REQUEST59='FETCH_REQUEST59'
export const FETCH_SUCCESS59='FETCH_SUCCESS59'
export const FETCH_FAILURE59='FETCH_FAILURE59'
// get patient transaction by mrn
export const FETCH_REQUEST60='FETCH_REQUEST60'
export const FETCH_SUCCESS60='FETCH_SUCCESS60'
export const FETCH_FAILURE60='FETCH_FAILURE60'
// get invoice by InvoiceNo
export const FETCH_REQUEST61='FETCH_REQUEST61'
export const FETCH_SUCCESS61='FETCH_SUCCESS61'
export const FETCH_FAILURE61='FETCH_FAILURE61'
//get patient with lab transaction
export const FETCH_REQUEST62='FETCH_REQUEST62'
export const FETCH_SUCCESS62='FETCH_SUCCESS62'
export const FETCH_FAILURE62='FETCH_FAILURE62'
//get transaction by invoice no
export const FETCH_REQUEST63='FETCH_REQUEST63'
export const FETCH_SUCCESS63='FETCH_SUCCESS63'
export const FETCH_FAILURE63='FETCH_FAILURE63'
//search invoices by name
export const FETCH_REQUEST64='FETCH_REQUEST64'
export const FETCH_SUCCESS64='FETCH_SUCCESS64'
export const FETCH_FAILURE64='FETCH_FAILURE64'
//get service group
export const FETCH_REQUEST65='FETCH_REQUEST65'
export const FETCH_SUCCESS65='FETCH_SUCCESS65'
export const FETCH_FAILURE65='FETCH_FAILURE65'
//get specimen
export const FETCH_REQUEST66='FETCH_REQUEST66'
export const FETCH_SUCCESS66='FETCH_SUCCESS66'
export const FETCH_FAILURE66='FETCH_FAILURE66'
//get services by group id 
export const FETCH_REQUEST67='FETCH_REQUEST67'
export const FETCH_SUCCESS67='FETCH_SUCCESS67'
export const FETCH_FAILURE67='FETCH_FAILURE67'
//get servicedetails from ids
export const FETCH_REQUEST68='FETCH_REQUEST68'
export const FETCH_SUCCESS68='FETCH_SUCCESS68'
export const FETCH_FAILURE68='FETCH_FAILURE68'
//get packagedetails from ids
export const FETCH_REQUEST69='FETCH_REQUEST69'
export const FETCH_SUCCESS69='FETCH_SUCCESS69'
export const FETCH_FAILURE69='FETCH_FAILURE69'
//get consutation details by id
export const FETCH_REQUEST70='FETCH_REQUEST70'
export const FETCH_SUCCESS70='FETCH_SUCCESS70'
export const FETCH_FAILURE70='FETCH_FAILURE70'
//get outpatient report
export const FETCH_REQUEST71='FETCH_REQUEST71'
export const FETCH_SUCCESS71='FETCH_SUCCESS71'
export const FETCH_FAILURE71='FETCH_FAILURE71'
//get degree 
export const FETCH_REQUEST72='FETCH_REQUEST72'
export const FETCH_SUCCESS72='FETCH_SUCCESS72'
export const FETCH_FAILURE72='FETCH_FAILURE72'
//get all contries
export const FETCH_REQUEST73='FETCH_REQUEST73'
export const FETCH_SUCCESS73='FETCH_SUCCESS73'
export const FETCH_FAILURE73='FETCH_FAILURE73'
// get cities 
export const FETCH_REQUEST74='FETCH_REQUEST74'
export const FETCH_SUCCESS74='FETCH_SUCCESS74'
export const FETCH_FAILURE74='FETCH_FAILURE74'
//get consulted patienst
export const FETCH_REQUEST75='FETCH_REQUEST75'
export const FETCH_SUCCESS75='FETCH_SUCCESS75'
export const FETCH_FAILURE75='FETCH_FAILURE75'
//get staff by name
export const FETCH_REQUEST76='FETCH_REQUEST76'
export const FETCH_SUCCESS76='FETCH_SUCCESS76'
export const FETCH_FAILURE76='FETCH_FAILURE76'
//get doctors with pending kys
export const FETCH_REQUEST77='FETCH_REQUEST77'
export const FETCH_SUCCESS77='FETCH_SUCCESS77'
export const FETCH_FAILURE77='FETCH_FAILURE77'
// get doctors by name
export const FETCH_REQUEST78='FETCH_REQUEST78'
export const FETCH_SUCCESS78='FETCH_SUCCESS78'
export const FETCH_FAILURE78='FETCH_FAILURE78'
//generate sasToken
export const FETCH_REQUEST79='FETCH_REQUEST79'
export const FETCH_SUCCESS79='FETCH_SUCCESS79'
export const FETCH_FAILURE79='FETCH_FAILURE79'
// get degress by universities ids
export const FETCH_REQUEST80='FETCH_REQUEST80'
export const FETCH_SUCCESS80='FETCH_SUCCESS80'
export const FETCH_FAILURE80='FETCH_FAILURE80'
// get specilization
export const FETCH_REQUEST81='FETCH_REQUEST81'
export const FETCH_SUCCESS81='FETCH_SUCCESS81'
export const FETCH_FAILURE81='FETCH_FAILURE81'
//get issuing authority
export const FETCH_REQUEST82='FETCH_REQUEST82'
export const FETCH_SUCCESS82='FETCH_SUCCESS82'
export const FETCH_FAILURE82='FETCH_FAILURE82'
//get refreshkycstatus
export const FETCH_REQUEST83='FETCH_REQUEST83'
export const FETCH_SUCCESS83='FETCH_SUCCESS83'
export const FETCH_FAILURE83='FETCH_FAILURE83'
//get calendar details
export const FETCH_REQUEST84='FETCH_REQUEST84'
export const FETCH_SUCCESS84='FETCH_SUCCESS84'
export const FETCH_FAILURE84='FETCH_FAILURE84'

//getCheckExistuser new api
//get calendar details
export const FETCH_REQUEST85='FETCH_REQUEST85'
export const FETCH_SUCCESS85='FETCH_SUCCESS85'
export const FETCH_FAILURE85='FETCH_FAILURE85'

// get doctor slot for the week
export const FETCH_REQUEST86='FETCH_REQUEST86'
export const FETCH_SUCCESS86='FETCH_SUCCESS86'
export const FETCH_FAILURE86='FETCH_FAILURE86'

//get template
export const FETCH_REQUEST87='FETCH_REQUEST87'
export const FETCH_SUCCESS87='FETCH_SUCCESS87'
export const FETCH_FAILURE87='FETCH_FAILURE87'
//check existing email
export const FETCH_REQUEST88='FETCH_REQUEST88'
export const FETCH_SUCCESS88='FETCH_SUCCESS88'
export const FETCH_FAILURE88='FETCH_FAILURE88'
//zoom call back
export const FETCH_REQUEST89='FETCH_REQUEST89'
export const FETCH_SUCCESS89='FETCH_SUCCESS89'
export const FETCH_FAILURE89='FETCH_FAILURE89'
//getzoom token by doctor id
export const FETCH_REQUEST90='FETCH_REQUEST90'
export const FETCH_SUCCESS90='FETCH_SUCCESS90'
export const FETCH_FAILURE90='FETCH_FAILURE90'
//Generate meeting signature
export const FETCH_REQUEST91='FETCH_REQUEST91'
export const FETCH_SUCCESS91='FETCH_SUCCESS91'
export const FETCH_FAILURE91='FETCH_FAILURE91'



//  PUT OPERATIONS

//put package enable/disable
export const PUT_REQUEST='PUT_REQUEST'
export const PUT_SUCCESS='PUT_SUCCESS'
export const PUT_FAILURE='PUT_FAILURE'
// consultation update with vital signs
export const PUT_REQUEST1='PUT_REQUEST1'
export const PUT_SUCCESS1='PUT_SUCCESS1'
export const PUT_FAILURE1='PUT_FAILURE1'
//put bed 
export const PUT_REQUEST2='PUT_REQUEST2'
export const PUT_SUCCESS2='PUT_SUCCESS2'
export const PUT_FAILURE2='PUT_FAILURE2'
//
export const PUT_REQUEST3='PUT_REQUEST3'
export const PUT_SUCCESS3='PUT_SUCCESS3'
export const PUT_FAILURE3='PUT_FAILURE3'
// update patientservices
export const PUT_REQUEST4='PUT_REQUEST4'
export const PUT_SUCCESS4='PUT_SUCCESS4'
export const PUT_FAILURE4='PUT_FAILURE4'
// template switchupdate
export const PUT_REQUEST5='PUT_REQUEST5'
export const PUT_SUCCESS5='PUT_SUCCESS5'
export const PUT_FAILURE5='PUT_FAILURE5'
//update package status
export const PUT_REQUEST6='PUT_REQUEST6'
export const PUT_SUCCESS6='PUT_SUCCESS6'
export const PUT_FAILURE6='PUT_FAILURE6'
//update template micro
export const PUT_REQUEST7='PUT_REQUEST7'
export const PUT_SUCCESS7='PUT_SUCCESS7'
export const PUT_FAILURE7='PUT_FAILURE7'

//DELETE OPERATIONS

//delete department
export const DELETE_REQUEST='DELETE_REQUEST'
export const DELETE_SUCCESS='DELETE_SUCCESS'
export const DELETE_FAILURE='DELETE_FAILURE'
//delete service
export const DELETE_REQUEST2='DELETE_REQUEST2'
export const DELETE_SUCCESS2='DELETE_SUCCESS2'
export const DELETE_FAILURE2='DELETE_FAILURE2'
//delete templatedata
export const DELETE_REQUEST3='DELETE_REQUEST3'
export const DELETE_SUCCESS3='DELETE_SUCCESS3'
export const DELETE_FAILURE3='DELETE_FAILURE3'
//delete template from micro
export const DELETE_REQUEST4='DELETE_REQUEST4'
export const DELETE_SUCCESS4='DELETE_SUCCESS4'
export const DELETE_FAILURE4='DELETE_FAILURE4'

//PATCH OPERATION

export const PATCH_REQUEST1='PATCH_REQUEST1'
export const PATCH_SUCCESS1='PATCH_SUCCESS1'
export const PATCH_FAILURE1='PATCH_FAILURE1'

export const PATCH_REQUEST2='PATCH_REQUEST2'
export const PATCH_SUCCESS2='PATCH_SUCCESS2'
export const PATCH_FAILURE2='PATCH_FAILURE2'
// accept pending kyc
export const PATCH_REQUEST3='PATCH_REQUEST3'
export const PATCH_SUCCESS3='PATCH_SUCCESS3'
export const PATCH_FAILURE3='PATCH_FAILURE3'
//rehject pending kyc
export const PATCH_REQUEST4='PATCH_REQUEST4'
export const PATCH_SUCCESS4='PATCH_SUCCESS4'
export const PATCH_FAILURE4='PATCH_FAILURE4'
//update education details by doctor
export const PATCH_REQUEST5='PATCH_REQUEST5'
export const PATCH_SUCCESS5='PATCH_SUCCESS5'
export const PATCH_FAILURE5='PATCH_FAILURE5'
// update registration details
export const PATCH_REQUEST6='PATCH_REQUEST6'
export const PATCH_SUCCESS6='PATCH_SUCCESS6'
export const PATCH_FAILURE6='PATCH_FAILURE6'
//update kyc to pending
export const PATCH_REQUEST7='PATCH_REQUEST7'
export const PATCH_SUCCESS7='PATCH_SUCCESS7'
export const PATCH_FAILURE7='PATCH_FAILURE7'
//Admin upload profile details
export const PATCH_REQUEST8='PATCH_REQUEST8'
export const PATCH_SUCCESS8='PATCH_SUCCESS8'
export const PATCH_FAILURE8='PATCH_FAILURE8'
//Admin upload education details
export const PATCH_REQUEST9='PATCH_REQUEST9'
export const PATCH_SUCCESS9='PATCH_SUCCESS9'
export const PATCH_FAILURE9='PATCH_FAILURE9'
//admin upload idproof
export const PATCH_REQUEST10='PATCH_REQUEST10'
export const PATCH_SUCCESS10='PATCH_SUCCESS10'
export const PATCH_FAILURE10='PATCH_FAILURE10'
//admin upload registration details
export const PATCH_REQUEST11='PATCH_REQUEST11'
export const PATCH_SUCCESS11='PATCH_SUCCESS11'
export const PATCH_FAILURE11='PATCH_FAILURE11'
//add patient dob
export const PATCH_REQUEST12='PATCH_REQUEST12'
export const PATCH_SUCCESS12='PATCH_SUCCESS12'
export const PATCH_FAILURE12='PATCH_FAILURE12'
//add setpin
export const PATCH_REQUEST13='PATCH_REQUEST13'
export const PATCH_SUCCESS13='PATCH_SUCCESS13'
export const PATCH_FAILURE13='PATCH_FAILURE13'
//update bank details
export const PATCH_REQUEST14='PATCH_REQUEST14'
export const PATCH_SUCCESS14='PATCH_SUCCESS14'
export const PATCH_FAILURE14='PATCH_FAILURE14'
// update educationid proof
export const PATCH_REQUEST15='PATCH_REQUEST15'
export const PATCH_SUCCESS15='PATCH_SUCCESS15'
export const PATCH_FAILURE15='PATCH_FAILURE15'
//update specilization certificates
export const PATCH_REQUEST16='PATCH_REQUEST16'
export const PATCH_SUCCESS16='PATCH_SUCCESS16'
export const PATCH_FAILURE16='PATCH_FAILURE16'




//POST OPERATIONS

export const PostRequest=()=>({type:POST_REQUEST})
export const PostSuccess=(data)=>({type:POST_SUCCESS,payload:data})
export const PostFailure=(err)=>({ type:POST_FAILURE, payload:err})

export const PostRequest2=()=>({type:POST_REQUEST2})
export const PostSuccess2=(data)=>({type:POST_SUCCESS2,payload:data})
export const PostFailure2=(err)=>({ type:POST_FAILURE2, payload:err})

export const PostRequest3=()=>({type:POST_REQUEST3})
export const PostSuccess3=(data)=>({type:POST_SUCCESS3,payload:data})
export const PostFailure3=(err)=>({type:POST_FAILURE3,payload:err})

export const PostRequest4=()=>({type:POST_REQUEST4})
export const PostSuccess4=(data)=>({type:POST_SUCCESS4,payload:data})
export const PostFailure4=(err)=>({type:POST_FAILURE4,payload:err})

export const PostRequest5=()=>({type:POST_REQUEST5})
export const PostSuccess5=(data)=>({type:POST_SUCCESS5,payload:data})
export const PostFailure5=(err)=>({type:POST_FAILURE5,payload:err})

export const PostRequest6=()=>({type:POST_REQUEST6})
export const PostSuccess6=(data)=>({type:POST_SUCCESS6,payload:data})
export const PostFailure6=(err)=>({type:POST_FAILURE6,payload:err})

export const PostRequest7=()=>({type:POST_REQUEST7})
export const PostSuccess7=(data)=>({type:POST_SUCCESS7,payload:data})
export const PostFailure7=(err)=>({type:POST_FAILURE7,payload:err})

export const PostRequest8=()=>({type:POST_REQUEST8})
export const PostSuccess8=(data)=>({type:POST_SUCCESS8,payload:data})
export const PostFailure8=(err)=>({type:POST_FAILURE8,payload:err})

export const PostRequest9=()=>({type:POST_REQUEST9})
export const PostSuccess9=(data)=>({type:POST_SUCCESS9,payload:data})
export const PostFailure9=(err)=>({type:POST_FAILURE9,payload:err})

export const PostRequest10=()=>({type:POST_REQUEST10})
export const PostSuccess10=(data)=>({type:POST_SUCCESS10,payload:data})
export const PostFailure10=(err)=>({type:POST_FAILURE10,payload:err})

export const PostRequest11=()=>({type:POST_REQUEST11})
export const PostSuccess11=(data)=>({type:POST_SUCCESS11,payload:data})
export const PostFailure11=(err)=>({type:POST_FAILURE11,payload:err})

export const PostRequest12=()=>({type:POST_REQUEST12})
export const PostSuccess12=(data)=>({type:POST_SUCCESS12,payload:data})
export const PostFailure12=(err)=>({type:POST_FAILURE12,payload:err})

export const PostRequest13=()=>({type:POST_REQUEST13})
export const PostSuccess13=(data)=>({type:POST_SUCCESS13,payload:data})
export const PostFailure13=(err)=>({type:POST_FAILURE13,payload:err})

export const PostRequest14=()=>({type:POST_REQUEST14})
export const PostSuccess14=(data)=>({type:POST_SUCCESS14,payload:data})
export const PostFailure14=(err)=>({type:POST_FAILURE14,payload:err})

export const PostRequest15=()=>({type:POST_REQUEST15})
export const PostSuccess15=(data)=>({type:POST_SUCCESS15,payload:data})
export const PostFailure15=(err)=>({type:POST_FAILURE15,payload:err})

export const PostRequest16=()=>({type:POST_REQUEST16})
export const PostSuccess16=(data)=>({type:POST_SUCCESS16,payload:data})
export const PostFailure16=(err)=>({type:POST_FAILURE16,payload:err})

export const PostRequest17=()=>({type:POST_REQUEST17})
export const PostSuccess17=(data)=>({type:POST_SUCCESS17,payload:data})
export const PostFailure17=(err)=>({type:POST_FAILURE17,payload:err})

export const PostRequest18=()=>({type:POST_REQUEST18})
export const PostSuccess18=(data)=>({type:POST_SUCCESS18,payload:data})
export const PostFailure18=(err)=>({type:POST_FAILURE18,payload:err})

// ClaudeImagesAPI
export const PostRequest19=()=>({type:POST_REQUEST19})
export const PostSuccess19=(data)=>({type:POST_SUCCESS19,payload:data})
export const PostFailure19=(err)=>({type:POST_FAILURE19,payload:err})

export const PostRequest20=()=>({type:POST_REQUEST20})
export const PostSuccess20=(data)=>({type:POST_SUCCESS20,payload:data})
export const PostFailure20=(err)=>({type:POST_FAILURE20,payload:err})

export const PostRequest21=()=>({type:POST_REQUEST21})
export const PostSuccess21=(data)=>({type:POST_SUCCESS21,payload:data})
export const PostFailure21=(err)=>({type:POST_FAILURE21,payload:err})

export const PostRequest22=()=>({type:POST_REQUEST22})
export const PostSuccess22=(data)=>({type:POST_SUCCESS22,payload:data})
export const PostFailure22=(err)=>({type:POST_FAILURE22,payload:err})

export const PostRequest23=()=>({type:POST_REQUEST23})
export const PostSuccess23=(data)=>({type:POST_SUCCESS23,payload:data})
export const PostFailure23=(err)=>({type:POST_FAILURE23,payload:err})

export const PostRequest24=()=>({type:POST_REQUEST24})
export const PostSuccess24=(data)=>({type:POST_SUCCESS24,payload:data})
export const PostFailure24=(err)=>({type:POST_FAILURE24,payload:err})

export const PostRequest25=()=>({type:POST_REQUEST25})
export const PostSuccess25=(data)=>({type:POST_SUCCESS25,payload:data})
export const PostFailure25=(err)=>({type:POST_FAILURE25,payload:err})

export const PostRequest26=()=>({type:POST_REQUEST26})
export const PostSuccess26=(data)=>({type:POST_SUCCESS26,payload:data})
export const PostFailure26=(err)=>({type:POST_FAILURE26,payload:err})

export const PostRequest27=()=>({type:POST_REQUEST27})
export const PostSuccess27=(data)=>({type:POST_SUCCESS27,payload:data})
export const PostFailure27=(err)=>({type:POST_FAILURE27,payload:err})

export const PostRequest28=()=>({type:POST_REQUEST28})
export const PostSuccess28=(data)=>({type:POST_SUCCESS28,payload:data})
export const PostFailure28=(err)=>({type:POST_FAILURE28,payload:err})

export const PostRequest29=()=>({type:POST_REQUEST29})
export const PostSuccess29=(data)=>({type:POST_SUCCESS29,payload:data})
export const PostFailure29=(err)=>({type:POST_FAILURE29,payload:err})

export const PostRequest30=()=>({type:POST_REQUEST30})
export const PostSuccess30=(data)=>({type:POST_SUCCESS30,payload:data})
export const PostFailure30=(err)=>({type:POST_FAILURE30,payload:err})

export const PostRequest31=()=>({type:POST_REQUEST31})
export const PostSuccess31=(data)=>({type:POST_SUCCESS31,payload:data})
export const PostFailure31=(err)=>({type:POST_FAILURE31,payload:err})

export const PostRequest32=()=>({type:POST_REQUEST32})
export const PostSuccess32=(data)=>({type:POST_SUCCESS32,payload:data})
export const PostFailure32=(err)=>({type:POST_FAILURE32,payload:err})

export const PostRequest33=()=>({type:POST_REQUEST33})
export const PostSuccess33=(data)=>({type:POST_SUCCESS33,payload:data})
export const PostFailure33=(err)=>({type:POST_FAILURE33,payload:err})

export const PostRequest34=()=>({type:POST_REQUEST34})
export const PostSuccess34=(data)=>({type:POST_SUCCESS34,payload:data})
export const PostFailure34=(err)=>({type:POST_FAILURE34,payload:err})

export const PostRequest35=()=>({type:POST_REQUEST35})
export const PostSuccess35=(data)=>({type:POST_SUCCESS35,payload:data})
export const PostFailure35=(err)=>({type:POST_FAILURE35,payload:err})

export const PostRequest36=()=>({type:POST_REQUEST36})
export const PostSuccess36=(data)=>({type:POST_SUCCESS36,payload:data})
export const PostFailure36=(err)=>({type:POST_FAILURE36,payload:err})

export const PostRequest37=()=>({type:POST_REQUEST37})
export const PostSuccess37=(data)=>({type:POST_SUCCESS37,payload:data})
export const PostFailure37=(err)=>({type:POST_FAILURE37,payload:err})

export const PostRequest38=()=>({type:POST_REQUEST38})
export const PostSuccess38=(data)=>({type:POST_SUCCESS38,payload:data})
export const PostFailure38=(err)=>({type:POST_FAILURE38,payload:err})

export const PostRequest39=()=>({type:POST_REQUEST39})
export const PostSuccess39=(data)=>({type:POST_SUCCESS39,payload:data})
export const PostFailure39=(err)=>({type:POST_FAILURE39,payload:err})

export const PostRequest40=()=>({type:POST_REQUEST40})
export const PostSuccess40=(data)=>({type:POST_SUCCESS40,payload:data})
export const PostFailure40=(err)=>({type:POST_FAILURE40,payload:err})

export const PostRequest41=()=>({type:POST_REQUEST41})
export const PostSuccess41=(data)=>({type:POST_SUCCESS41,payload:data})
export const PostFailure41=(err)=>({type:POST_FAILURE41,payload:err})

export const PostRequest42=()=>({type:POST_REQUEST42})
export const PostSuccess42=(data)=>({type:POST_SUCCESS42,payload:data})
export const PostFailure42=(err)=>({type:POST_FAILURE42,payload:err})

export const PostRequest43=()=>({type:POST_REQUEST43})
export const PostSuccess43=(data)=>({type:POST_SUCCESS43,payload:data})
export const PostFailure43=(err)=>({type:POST_FAILURE43,payload:err})

export const PostRequest44=()=>({type:POST_REQUEST44})
export const PostSuccess44=(data)=>({type:POST_SUCCESS44,payload:data})
export const PostFailure44=(err)=>({type:POST_FAILURE44,payload:err})

export const PostRequest45=()=>({type:POST_REQUEST45})
export const PostSuccess45=(data)=>({type:POST_SUCCESS45,payload:data})
export const PostFailure45=(err)=>({type:POST_FAILURE45,payload:err})

export const PostRequest46=()=>({type:POST_REQUEST46})
export const PostSuccess46=(data)=>({type:POST_SUCCESS46,payload:data})
export const PostFailure46=(err)=>({type:POST_FAILURE46,payload:err})

export const PostRequest47=()=>({type:POST_REQUEST47})
export const PostSuccess47=(data)=>({type:POST_SUCCESS47,payload:data})
export const PostFailure47=(err)=>({type:POST_FAILURE47,payload:err})

export const PostRequest48=()=>({type:POST_REQUEST48})
export const PostSuccess48=(data)=>({type:POST_SUCCESS48,payload:data})
export const PostFailure48=(err)=>({type:POST_FAILURE48,payload:err})

export const PostRequest49=()=>({type:POST_REQUEST49})
export const PostSuccess49=(data)=>({type:POST_SUCCESS49,payload:data})
export const PostFailure49=(err)=>({type:POST_FAILURE49,payload:err})

export const PostRequest50=()=>({type:POST_REQUEST50})
export const PostSuccess50=(data)=>({type:POST_SUCCESS50,payload:data})
export const PostFailure50=(err)=>({type:POST_FAILURE50,payload:err})

export const PostRequest51=()=>({type:POST_REQUEST51})
export const PostSuccess51=(data)=>({type:POST_SUCCESS51,payload:data})
export const PostFailure51=(err)=>({type:POST_FAILURE51,payload:err})

export const PostRequest52=()=>({type:POST_REQUEST52})
export const PostSuccess52=(data)=>({type:POST_SUCCESS52,payload:data})
export const PostFailure52=(err)=>({type:POST_FAILURE52,payload:err})

export const PostRequest53=()=>({type:POST_REQUEST53})
export const PostSuccess53=(data)=>({type:POST_SUCCESS53,payload:data})
export const PostFailure53=(err)=>({type:POST_FAILURE53,payload:err})




//GET OPERATIONS

export const FetchRequest=()=>({type:FETCH_REQUEST})
export const FetchSuccess=(data)=>({type:FETCH_SUCCESS,payload:data})
export const FetchFailure=(err)=>({type:FETCH_FAILURE,payload:err})

export const FetchRequest2=()=>({type:FETCH_REQUEST2})
export const FetchSuccess2=(data)=>({type:FETCH_SUCCESS2,payload:data})
export const FetchFailure2=(err)=>({type:FETCH_FAILURE2,payload:err})

export const FetchRequest3=()=>({type:FETCH_REQUEST3})
export const FetchSuccess3=(data)=>({type:FETCH_SUCCESS3,payload:data})
export const FetchFailure3=(err)=>({type:FETCH_FAILURE3,payload:err})

export const FetchRequest4=()=>({type:FETCH_REQUEST4})
export const FetchSuccess4=(data)=>({type:FETCH_SUCCESS4,payload:data})
export const FetchFailure4=(err)=>({type:FETCH_FAILURE4,payload:err})

export const FetchRequest5=()=>({type:FETCH_REQUEST5})
export const FetchSuccess5=(data)=>({type:FETCH_SUCCESS5,payload:data})
export const FetchFailure5=(err)=>({type:FETCH_FAILURE5,payload:err})

export const FetchRequest6=()=>({type:FETCH_REQUEST6})
export const FetchSuccess6=(data)=>({type:FETCH_SUCCESS6,payload:data})
export const FetchFailure6=(err)=>({type:FETCH_FAILURE6,payload:err})

export const FetchRequest7=()=>({type:FETCH_REQUEST7})
export const FetchSuccess7=(data)=>({type:FETCH_SUCCESS7,payload:data})
export const FetchFailure7=(err)=>({type:FETCH_FAILURE7,payload:err})

export const FetchRequest8=()=>({type:FETCH_REQUEST8})
export const FetchSuccess8=(data)=>({type:FETCH_SUCCESS8,payload:data})
export const FetchFailure8=(err)=>({type:FETCH_FAILURE8,payload:err})

export const FetchRequest9=()=>({type:FETCH_REQUEST9})
export const FetchSuccess9=(data)=>({type:FETCH_SUCCESS9,payload:data})
export const FetchFailure9=(err)=>({type:FETCH_FAILURE9,payload:err})

export const FetchRequest10=()=>({type:FETCH_REQUEST10})
export const FetchSuccess10=(data)=>({type:FETCH_SUCCESS10,payload:data})
export const FetchFailure10=(err)=>({type:FETCH_FAILURE10,payload:err})

export const FetchRequest11=()=>({type:FETCH_REQUEST11})
export const FetchSuccess11=(data)=>({type:FETCH_SUCCESS11,payload:data})
export const FetchFailure11=(err)=>({type:FETCH_FAILURE11,payload:err})

export const FetchRequest12=()=>({type:FETCH_REQUEST12})
export const FetchSuccess12=(data)=>({type:FETCH_SUCCESS12,payload:data})
export const FetchFailure12=(err)=>({type:FETCH_FAILURE12,payload:err})

export const FetchRequest13=()=>({type:FETCH_REQUEST13})
export const FetchSuccess13=(data)=>({type:FETCH_SUCCESS13,payload:data})
export const FetchFailure13=(err)=>({type:FETCH_FAILURE13,payload:err})

export const FetchRequest14=()=>({type:FETCH_REQUEST14})
export const FetchSuccess14=(data)=>({type:FETCH_SUCCESS14,payload:data})
export const FetchFailure14=(err)=>({type:FETCH_FAILURE14,payload:err})

export const FetchRequest15=()=>({type:FETCH_REQUEST15})
export const FetchSuccess15=(data)=>({type:FETCH_SUCCESS15,payload:data})
export const FetchFailure15=(err)=>({type:FETCH_FAILURE15,payload:err})

export const FetchRequest16=()=>({type:FETCH_REQUEST16})
export const FetchSuccess16=(data)=>({type:FETCH_SUCCESS16,payload:data})
export const FetchFailure16=(err)=>({type:FETCH_FAILURE16,payload:err})

export const FetchRequest17=()=>({type:FETCH_REQUEST17})
export const FetchSuccess17=(data)=>({type:FETCH_SUCCESS17,payload:data})
export const FetchFailure17=(err)=>({type:FETCH_FAILURE17,payload:err})

export const FetchRequest18=()=>({type:FETCH_REQUEST18})
export const FetchSuccess18=(data)=>({type:FETCH_SUCCESS18,payload:data})
export const FetchFailure18=(err)=>({type:FETCH_FAILURE18,payload:err})


export const FetchRequest19=()=>({type:FETCH_REQUEST19})
export const FetchSuccess19=(data)=>({type:FETCH_SUCCESS19,payload:data})
export const FetchFailure19=(err)=>({type:FETCH_FAILURE19,payload:err})

export const FetchRequest20=()=>({type:FETCH_REQUEST20})
export const FetchSuccess20=(data)=>({type:FETCH_SUCCESS20,payload:data})
export const FetchFailure20=(err)=>({type:FETCH_FAILURE20,payload:err})

export const FetchRequest21=()=>({type:FETCH_REQUEST21})
export const FetchSuccess21=(data)=>({type:FETCH_SUCCESS21,payload:data})
export const FetchFailure21=(err)=>({type:FETCH_FAILURE21,payload:err})

export const FetchRequest22=()=>({type:FETCH_REQUEST22})
export const FetchSuccess22=(data)=>({type:FETCH_SUCCESS22,payload:data})
export const FetchFailure22=(err)=>({type:FETCH_FAILURE22,payload:err})

export const FetchRequest23=()=>({type:FETCH_REQUEST23})
export const FetchSuccess23=(data)=>({type:FETCH_SUCCESS23,payload:data})
export const FetchFailure23=(err)=>({type:FETCH_FAILURE23,payload:err})

export const FetchRequest24=()=>({type:FETCH_REQUEST24})
export const FetchSuccess24=(data)=>({type:FETCH_SUCCESS24,payload:data})
export const FetchFailure24=(err)=>({type:FETCH_FAILURE24,payload:err})

export const FetchRequest25=()=>({type:FETCH_REQUEST25})
export const FetchSuccess25=(data)=>({type:FETCH_SUCCESS25,payload:data})
export const FetchFailure25=(err)=>({type:FETCH_FAILURE25,payload:err})

export const FetchRequest26=()=>({type:FETCH_REQUEST26})
export const FetchSuccess26=(data)=>({type:FETCH_SUCCESS26,payload:data})
export const FetchFailure26=(err)=>({type:FETCH_FAILURE26,payload:err})

export const FetchRequest27=()=>({type:FETCH_REQUEST27})
export const FetchSuccess27=(data)=>({type:FETCH_SUCCESS27,payload:data})
export const FetchFailure27=(err)=>({type:FETCH_FAILURE27,payload:err})

export const FetchRequest28=()=>({type:FETCH_REQUEST28})
export const FetchSuccess28=(data)=>({type:FETCH_SUCCESS28,payload:data})
export const FetchFailure28=(err)=>({type:FETCH_FAILURE28,payload:err})

export const FetchRequest29=()=>({type:FETCH_REQUEST29})
export const FetchSuccess29=(data)=>({type:FETCH_SUCCESS29,payload:data})
export const FetchFailure29=(err)=>({type:FETCH_FAILURE29,payload:err})

export const FetchRequest30=()=>({type:FETCH_REQUEST30})
export const FetchSuccess30=(data)=>({type:FETCH_SUCCESS30,payload:data})
export const FetchFailure30=(err)=>({type:FETCH_FAILURE30,payload:err})

export const FetchRequest31=()=>({type:FETCH_REQUEST31})
export const FetchSuccess31=(data)=>({type:FETCH_SUCCESS31,payload:data})
export const FetchFailure31=(err)=>({type:FETCH_FAILURE31,payload:err})

export const FetchRequest32=()=>({type:FETCH_REQUEST32})
export const FetchSuccess32=(data)=>({type:FETCH_SUCCESS32,payload:data})
export const FetchFailure32=(err)=>({type:FETCH_FAILURE32,payload:err})

export const FetchRequest33=()=>({type:FETCH_REQUEST33})
export const FetchSuccess33=(data)=>({type:FETCH_SUCCESS33,payload:data})
export const FetchFailure33=(err)=>({type:FETCH_FAILURE33,payload:err})

export const FetchRequest34=()=>({type:FETCH_REQUEST34})
export const FetchSuccess34=(data)=>({type:FETCH_SUCCESS34,payload:data})
export const FetchFailure34=(err)=>({type:FETCH_FAILURE34,payload:err})

export const FetchRequest35=()=>({type:FETCH_REQUEST35})
export const FetchSuccess35=(data)=>({type:FETCH_SUCCESS35,payload:data})
export const FetchFailure35=(err)=>({type:FETCH_FAILURE35,payload:err})

export const FetchRequest36=()=>({type:FETCH_REQUEST36})
export const FetchSuccess36=(data)=>({type:FETCH_SUCCESS36,payload:data})
export const FetchFailure36=(err)=>({type:FETCH_FAILURE36,payload:err})

export const FetchRequest37=()=>({type:FETCH_REQUEST37})
export const FetchSuccess37=(data,context)=>({type:FETCH_SUCCESS37,payload:{data,context}})
export const FetchFailure37=(err)=>({type:FETCH_FAILURE37,payload:err})

export const FetchRequest38=()=>({type:FETCH_REQUEST38})
export const FetchSuccess38=(data)=>({type:FETCH_SUCCESS38,payload:data})
export const FetchFailure38=(err)=>({type:FETCH_FAILURE38,payload:err})

export const FetchRequest39=()=>({type:FETCH_REQUEST39})
export const FetchSuccess39=(data)=>({type:FETCH_SUCCESS39,payload:data})
export const FetchFailure39=(err)=>({type:FETCH_FAILURE39,payload:err})

export const FetchRequest40=()=>({type:FETCH_REQUEST40})
export const FetchSuccess40=(data)=>({type:FETCH_SUCCESS40,payload:data})
export const FetchFailure40=(err)=>({type:FETCH_FAILURE40,payload:err})

export const FetchRequest41=()=>({type:FETCH_REQUEST41})
export const FetchSuccess41=(data)=>({type:FETCH_SUCCESS41,payload:data})
export const FetchFailure41=(err)=>({type:FETCH_FAILURE41,payload:err})

export const FetchRequest42=()=>({type:FETCH_REQUEST42})
export const FetchSuccess42=(data)=>({type:FETCH_SUCCESS42,payload:data})
export const FetchFailure42=(err)=>({type:FETCH_FAILURE42,payload:err})

export const FetchRequest43=()=>({type:FETCH_REQUEST43})
export const FetchSuccess43=(data)=>({type:FETCH_SUCCESS43,payload:data})
export const FetchFailure43=(err)=>({type:FETCH_FAILURE43,payload:err})

export const FetchRequest44=()=>({type:FETCH_REQUEST44})
export const FetchSuccess44=(data)=>({type:FETCH_SUCCESS44,payload:data})
export const FetchFailure44=(err)=>({type:FETCH_FAILURE44,payload:err.message})

export const FetchRequest45=()=>({type:FETCH_REQUEST45})
export const FetchSuccess45=(data)=>({type:FETCH_SUCCESS45,payload:data})
export const FetchFailure45=(err)=>({type:FETCH_FAILURE45,payload:err})

export const FetchRequest46=()=>({type:FETCH_REQUEST46})
export const FetchSuccess46=(data)=>({type:FETCH_SUCCESS46,payload:data})
export const FetchFailure46=(err)=>({type:FETCH_FAILURE46,payload:err})

export const FetchRequest47=()=>({type:FETCH_REQUEST47})
export const FetchSuccess47=(data)=>({type:FETCH_SUCCESS47,payload:data})
export const FetchFailure47=(err)=>({type:FETCH_FAILURE47,payload:err})

export const FetchRequest48=()=>({type:FETCH_REQUEST48})
export const FetchSuccess48=(data)=>({type:FETCH_SUCCESS48,payload:data})
export const FetchFailure48=(err)=>({type:FETCH_FAILURE48,payload:err})

export const FetchRequest49=()=>({type:FETCH_REQUEST49})
export const FetchSuccess49=(data)=>({type:FETCH_SUCCESS49,payload:data})
export const FetchFailure49=(err)=>({type:FETCH_FAILURE49,payload:err})

export const FetchRequest50=()=>({type:FETCH_REQUEST50})
export const FetchSuccess50=(data)=>({type:FETCH_SUCCESS50,payload:data})
export const FetchFailure50=(err)=>({type:FETCH_FAILURE50,payload:err})

export const FetchRequest51=()=>({type:FETCH_REQUEST51})
export const FetchSuccess51=(data)=>({type:FETCH_SUCCESS51,payload:data})
export const FetchFailure51=(err)=>({type:FETCH_FAILURE51,payload:err})

export const FetchRequest52=()=>({type:FETCH_REQUEST52})
export const FetchSuccess52=(data)=>({type:FETCH_SUCCESS52,payload:data})
export const FetchFailure52=(err)=>({type:FETCH_FAILURE52,payload:err})

export const FetchRequest53=()=>({type:FETCH_REQUEST53})
export const FetchSuccess53=(data)=>({type:FETCH_SUCCESS53,payload:data})
export const FetchFailure53=(err)=>({type:FETCH_FAILURE53,payload:err})

export const FetchRequest54=()=>({type:FETCH_REQUEST54})
export const FetchSuccess54=(data)=>({type:FETCH_SUCCESS54,payload:data})
export const FetchFailure54=(err)=>({type:FETCH_FAILURE54,payload:err})

export const FetchRequest55=()=>({type:FETCH_REQUEST55})
export const FetchSuccess55=(data)=>({type:FETCH_SUCCESS55,payload:data})
export const FetchFailure55=(err)=>({type:FETCH_FAILURE55,payload:err})

export const FetchRequest56=()=>({type:FETCH_REQUEST56})
export const FetchSuccess56=(data)=>({type:FETCH_SUCCESS56,payload:data})
export const FetchFailure56=(err)=>({type:FETCH_FAILURE56,payload:err})

export const FetchRequest57=()=>({type:FETCH_REQUEST57})
export const FetchSuccess57=(data)=>({type:FETCH_SUCCESS57,payload:data})
export const FetchFailure57=(err)=>({type:FETCH_FAILURE57,payload:err})

export const FetchRequest58=()=>({type:FETCH_REQUEST58})
export const FetchSuccess58=(data)=>({type:FETCH_SUCCESS58,payload:data})
export const FetchFailure58=(err)=>({type:FETCH_FAILURE58,payload:err})

export const FetchRequest59=()=>({type:FETCH_REQUEST59})
export const FetchSuccess59=(data)=>({type:FETCH_SUCCESS59,payload:data})
export const FetchFailure59=(err)=>({type:FETCH_FAILURE59,payload:err})

export const FetchRequest60=()=>({type:FETCH_REQUEST60})
export const FetchSuccess60=(data)=>({type:FETCH_SUCCESS60,payload:data})
export const FetchFailure60=(err)=>({type:FETCH_FAILURE60,payload:err})

export const FetchRequest61=()=>({type:FETCH_REQUEST61})
export const FetchSuccess61=(data)=>({type:FETCH_SUCCESS61,payload:data})
export const FetchFailure61=(err)=>({type:FETCH_FAILURE61,payload:err})

export const FetchRequest62=()=>({type:FETCH_REQUEST62})
export const FetchSuccess62=(data)=>({type:FETCH_SUCCESS62,payload:data})
export const FetchFailure62=(err)=>({type:FETCH_FAILURE62,payload:err})

export const FetchRequest63=()=>({type:FETCH_REQUEST63})
export const FetchSuccess63=(data)=>({type:FETCH_SUCCESS63,payload:data})
export const FetchFailure63=(err)=>({type:FETCH_FAILURE63,payload:err})

export const FetchRequest64=()=>({type:FETCH_REQUEST64})
export const FetchSuccess64=(data)=>({type:FETCH_SUCCESS64,payload:data})
export const FetchFailure64=(err)=>({type:FETCH_FAILURE64,payload:err})

export const FetchRequest65=()=>({type:FETCH_REQUEST65})
export const FetchSuccess65=(data)=>({type:FETCH_SUCCESS65,payload:data})
export const FetchFailure65=(err)=>({type:FETCH_FAILURE65,payload:err})

export const FetchRequest66=()=>({type:FETCH_REQUEST66})
export const FetchSuccess66=(data)=>({type:FETCH_SUCCESS66,payload:data})
export const FetchFailure66=(err)=>({type:FETCH_FAILURE66,payload:err})

export const FetchRequest67=()=>({type:FETCH_REQUEST67})
export const FetchSuccess67=(data)=>({type:FETCH_SUCCESS67,payload:data})
export const FetchFailure67=(err)=>({type:FETCH_FAILURE67,payload:err})

export const FetchRequest68=()=>({type:FETCH_REQUEST68})
export const FetchSuccess68=(data)=>({type:FETCH_SUCCESS68,payload:data})
export const FetchFailure68=(err)=>({type:FETCH_FAILURE68,payload:err})

export const FetchRequest69=()=>({type:FETCH_REQUEST69})
export const FetchSuccess69=(data)=>({type:FETCH_SUCCESS69,payload:data})
export const FetchFailure69=(err)=>({type:FETCH_FAILURE69,payload:err})

export const FetchRequest70=()=>({type:FETCH_REQUEST70})
export const FetchSuccess70=(data)=>({type:FETCH_SUCCESS70,payload:data})
export const FetchFailure70=(err)=>({type:FETCH_FAILURE70,payload:err})

export const FetchRequest71=()=>({type:FETCH_REQUEST71})
export const FetchSuccess71=(data)=>({type:FETCH_SUCCESS71,payload:data})
export const FetchFailure71=(err)=>({type:FETCH_FAILURE71,payload:err})

export const FetchRequest72=()=>({type:FETCH_REQUEST72})
export const FetchSuccess72=(data)=>({type:FETCH_SUCCESS72,payload:data})
export const FetchFailure72=(err)=>({type:FETCH_FAILURE72,payload:err})

export const FetchRequest73=()=>({type:FETCH_REQUEST73})
export const FetchSuccess73=(data)=>({type:FETCH_SUCCESS73,payload:data})
export const FetchFailure73=(err)=>({type:FETCH_FAILURE73,payload:err})

export const FetchRequest74=()=>({type:FETCH_REQUEST74})
export const FetchSuccess74=(data)=>({type:FETCH_SUCCESS74,payload:data})
export const FetchFailure74=(err)=>({type:FETCH_FAILURE74,payload:err})

export const FetchRequest75=()=>({type:FETCH_REQUEST75})
export const FetchSuccess75=(data)=>({type:FETCH_SUCCESS75,payload:data})
export const FetchFailure75=(err)=>({type:FETCH_FAILURE75,payload:err})

export const FetchRequest76=()=>({type:FETCH_REQUEST76})
export const FetchSuccess76=(data)=>({type:FETCH_SUCCESS76,payload:data})
export const FetchFailure76=(err)=>({type:FETCH_FAILURE76,payload:err})

export const FetchRequest77=()=>({type:FETCH_REQUEST77})
export const FetchSuccess77=(data)=>({type:FETCH_SUCCESS77,payload:data})
export const FetchFailure77=(err)=>({type:FETCH_FAILURE77,payload:err})

export const FetchRequest78=()=>({type:FETCH_REQUEST78})
export const FetchSuccess78=(data)=>({type:FETCH_SUCCESS78,payload:data})
export const FetchFailure78=(err)=>({type:FETCH_FAILURE78,payload:err})

export const FetchRequest79=()=>({type:FETCH_REQUEST79})
export const FetchSuccess79=(data)=>({type:FETCH_SUCCESS79,payload:data})
export const FetchFailure79=(err)=>({type:FETCH_FAILURE79,payload:err})

export const FetchRequest80=()=>({type:FETCH_REQUEST80})
export const FetchSuccess80=(data)=>({type:FETCH_SUCCESS80,payload:data})
export const FetchFailure80=(err)=>({type:FETCH_FAILURE80,payload:err})

export const FetchRequest81=()=>({type:FETCH_REQUEST81})
export const FetchSuccess81=(data)=>({type:FETCH_SUCCESS81,payload:data})
export const FetchFailure81=(err)=>({type:FETCH_FAILURE81,payload:err})

export const FetchRequest82=()=>({type:FETCH_REQUEST82})
export const FetchSuccess82=(data)=>({type:FETCH_SUCCESS82,payload:data})
export const FetchFailure82=(err)=>({type:FETCH_FAILURE82,payload:err})

export const FetchRequest83=()=>({type:FETCH_REQUEST83})
export const FetchSuccess83=(data)=>({type:FETCH_SUCCESS83,payload:data})
export const FetchFailure83=(err)=>({type:FETCH_FAILURE83,payload:err})

export const FetchRequest84=()=>({type:FETCH_REQUEST84})
export const FetchSuccess84=(data)=>({type:FETCH_SUCCESS84,payload:data})
export const FetchFailure84=(err)=>({type:FETCH_FAILURE84,payload:err})

export const FetchRequest85=()=>({type:FETCH_REQUEST85})
export const FetchSuccess85=(data)=>({type:FETCH_SUCCESS85,payload:data})
export const FetchFailure85=(err)=>({type:FETCH_FAILURE85,payload:err})

export const FetchRequest86=()=>({type:FETCH_REQUEST86})
export const FetchSuccess86=(data)=>({type:FETCH_SUCCESS86,payload:data})
export const FetchFailure86=(err)=>({type:FETCH_FAILURE86,payload:err})

export const FetchRequest87=()=>({type:FETCH_REQUEST87})
export const FetchSuccess87=(data)=>({type:FETCH_SUCCESS87,payload:data})
export const FetchFailure87=(err)=>({type:FETCH_FAILURE87,payload:err})

export const FetchRequest88=()=>({type:FETCH_REQUEST88})
export const FetchSuccess88=(data)=>({type:FETCH_SUCCESS88,payload:data})
export const FetchFailure88=(err)=>({type:FETCH_FAILURE88,payload:err})

export const FetchRequest89=()=>({type:FETCH_REQUEST89})
export const FetchSuccess89=(data)=>({type:FETCH_SUCCESS89,payload:data})
export const FetchFailure89=(err)=>({type:FETCH_FAILURE89,payload:err})

export const FetchRequest90=()=>({type:FETCH_REQUEST90})
export const FetchSuccess90=(data)=>({type:FETCH_SUCCESS90,payload:data})
export const FetchFailure90=(err)=>({type:FETCH_FAILURE90,payload:err})

export const FetchRequest91=()=>({type:FETCH_REQUEST91})
export const FetchSuccess91=(data)=>({type:FETCH_SUCCESS91,payload:data})
export const FetchFailure91=(err)=>({type:FETCH_FAILURE91,payload:err})

//PUT OPERATIONS

export const PutRequest=()=>({type:PUT_REQUEST})
export const PutSuccess=(data)=>({type:PUT_SUCCESS,payload:data})
export const PutFailure=(err)=>({type:PUT_FAILURE,payload:err})

export const PutRequest2=()=>({type:PUT_REQUEST2})
export const PutSuccess2=(data)=>({type:PUT_SUCCESS2,payload:data})
export const PutFailure2=(err)=>({type:PUT_FAILURE2,payload:err})

export const PutRequest3=()=>({type:PUT_REQUEST3})
export const PutSuccess3=(data)=>({type:PUT_SUCCESS3,payload:data})
export const PutFailure3=(err)=>({type:PUT_FAILURE3,payload:err})

export const PutRequest4=()=>({type:PUT_REQUEST4})
export const PutSuccess4=(data)=>({type:PUT_SUCCESS4,payload:data})
export const PutFailure4=(err)=>({type:PUT_FAILURE4,payload:err})

export const PutRequest5=()=>({type:PUT_REQUEST5})
export const PutSuccess5=(data)=>({type:PUT_SUCCESS5,payload:data})
export const PutFailure5=(err)=>({type:PUT_FAILURE5,payload:err})

export const PutRequest6=()=>({type:PUT_REQUEST6})
export const PutSuccess6=(data)=>({type:PUT_SUCCESS6,payload:data})
export const PutFailure6=(err)=>({type:PUT_FAILURE6,payload:err})

export const PutRequest7=()=>({type:PUT_REQUEST7})
export const PutSuccess7=(data)=>({type:PUT_SUCCESS7,payload:data})
export const PutFailure7=(err)=>({type:PUT_FAILURE7,payload:err})
//DELETE OPERATIONS

export const DeleteRequest=()=>({type:DELETE_REQUEST})
export const DeleteSuccess=(data)=>({type:DELETE_SUCCESS,payload:data})
export const DeleteFailure=(err)=>({type:DELETE_FAILURE,payload:err})

export const DeleteRequest2=()=>({type:DELETE_REQUEST2})
export const DeleteSuccess2=(data)=>({type:DELETE_SUCCESS2,payload:data})
export const DeleteFailure2=(err)=>({type:DELETE_FAILURE2,payload:err})

export const DeleteRequest3=()=>({type:DELETE_REQUEST3})
export const DeleteSuccess3=(data)=>({type:DELETE_SUCCESS3,payload:data})
export const DeleteFailure3=(err)=>({type:DELETE_FAILURE3,payload:err})

export const DeleteRequest4=()=>({type:DELETE_REQUEST4})
export const DeleteSuccess4=(data)=>({type:DELETE_SUCCESS4,payload:data})
export const DeleteFailure4=(err)=>({type:DELETE_FAILURE4,payload:err})

// PATCH OPERATION

export const PatchRequest1=()=>({type:PATCH_REQUEST1})
export const PatchSuccess1=(data)=>({type:PATCH_SUCCESS1,payload:data})
export const PatchFailure1=(err)=>({type:PATCH_FAILURE1,payload:err})

export const PatchRequest2=()=>({type:PATCH_REQUEST2})
export const PatchSuccess2=(data)=>({type:PATCH_SUCCESS2,payload:data})
export const PatchFailure2=(err)=>({type:PATCH_FAILURE2,payload:err})

export const PatchRequest3=()=>({type:PATCH_REQUEST3})
export const PatchSuccess3=(data)=>({type:PATCH_SUCCESS3,payload:data})
export const PatchFailure3=(err)=>({type:PATCH_FAILURE3,payload:err})

export const PatchRequest4=()=>({type:PATCH_REQUEST4})
export const PatchSuccess4=(data)=>({type:PATCH_SUCCESS4,payload:data})
export const PatchFailure4=(err)=>({type:PATCH_FAILURE4,payload:err})

export const PatchRequest5=()=>({type:PATCH_REQUEST5})
export const PatchSuccess5=(data)=>({type:PATCH_SUCCESS5,payload:data})
export const PatchFailure5=(err)=>({type:PATCH_FAILURE5,payload:err})

export const PatchRequest6=()=>({type:PATCH_REQUEST6})
export const PatchSuccess6=(data)=>({type:PATCH_SUCCESS6,payload:data})
export const PatchFailure6=(err)=>({type:PATCH_FAILURE6,payload:err})

export const PatchRequest7=()=>({type:PATCH_REQUEST7})
export const PatchSuccess7=(data)=>({type:PATCH_SUCCESS7,payload:data})
export const PatchFailure7=(err)=>({type:PATCH_FAILURE7,payload:err})

export const PatchRequest8=()=>({type:PATCH_REQUEST8})
export const PatchSuccess8=(data)=>({type:PATCH_SUCCESS8,payload:data})
export const PatchFailure8=(err)=>({type:PATCH_FAILURE8,payload:err})

export const PatchRequest9=()=>({type:PATCH_REQUEST9})
export const PatchSuccess9=(data)=>({type:PATCH_SUCCESS9,payload:data})
export const PatchFailure9=(err)=>({type:PATCH_FAILURE9,payload:err})

export const PatchRequest10=()=>({type:PATCH_REQUEST10})
export const PatchSuccess10=(data)=>({type:PATCH_SUCCESS10,payload:data})
export const PatchFailure10=(err)=>({type:PATCH_FAILURE10,payload:err})

export const PatchRequest11=()=>({type:PATCH_REQUEST11})
export const PatchSuccess11=(data)=>({type:PATCH_SUCCESS11,payload:data})
export const PatchFailure11=(err)=>({type:PATCH_FAILURE11,payload:err})

export const PatchRequest12=()=>({type:PATCH_REQUEST12})
export const PatchSuccess12=(data)=>({type:PATCH_SUCCESS12,payload:data})
export const PatchFailure12=(err)=>({type:PATCH_FAILURE12,payload:err})

export const PatchRequest13=()=>({type:PATCH_REQUEST13})
export const PatchSuccess13=(data)=>({type:PATCH_SUCCESS13,payload:data})
export const PatchFailure13=(err)=>({type:PATCH_FAILURE13,payload:err})

export const PatchRequest14=()=>({type:PATCH_REQUEST14})
export const PatchSuccess14=(data)=>({type:PATCH_SUCCESS14,payload:data})
export const PatchFailure14=(err)=>({type:PATCH_FAILURE14,payload:err})

export const PatchRequest15=()=>({type:PATCH_REQUEST15})
export const PatchSuccess15=(data)=>({type:PATCH_SUCCESS15,payload:data})
export const PatchFailure15=(err)=>({type:PATCH_FAILURE15,payload:err})

export const PatchRequest16=()=>({type:PATCH_REQUEST16})
export const PatchSuccess16=(data)=>({type:PATCH_SUCCESS16,payload:data})
export const PatchFailure16=(err)=>({type:PATCH_FAILURE16,payload:err})
//POST OPERATIONS







export const PostServicesData=(data)=>{
    return(dispatch)=>{
        dispatch(PostRequest4())
        dispatch(setLoading(true))
        axios.post(baseUrl+'Services/AddService',data)
        .then((response)=>{
       
            dispatch(setLoading(false))
            dispatch(PostSuccess4(response.data))
        })
        .catch((error)=>{
            dispatch(setLoading(false))
            dispatch(PostFailure4(error))
        })
    }
}


export const PostAddRoom=(id,data)=>{

    return(dispatch)=>{
        dispatch(PostRequest6())
        dispatch(setLoading(true))
        axios.post(baseUrl+`floors/AddRoom?floodId=${id}`,data)
        .then((response)=>{
            dispatch(PostSuccess6(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(PostFailure6(error))
            dispatch(setLoading(false))
        })
    }
}


export const PostPharmacyPurchaseData=(data)=>{
 
    return(dispatch)=>{
        dispatch(PostRequest7())
        dispatch(setLoading(true))
        axios.post(baseUrl+'PharmacyPurchases',data)
        .then((response)=>{
            dispatch(PostSuccess7(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(PostFailure7(error))
            dispatch(setLoading(false))
        })
    }
}

export const PostPackageData=(data)=>{
    return(dispatch)=>{
        dispatch(PostRequest8())
        dispatch(setLoading(true))
        axios.post(baseUrl+'Packages/AddPackage',data)
        .then((response)=>{
            dispatch(PostSuccess8(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(PostFailure8(error))
            dispatch(setLoading(false))
        })
    }
}

export const EnableDisablePackages=(data)=>{

    return(dispatch)=>{
        dispatch(PostRequest9())
        dispatch(setLoading(true))
        axios.post(baseUrl+'Packages/UpdatePackage',data)
        .then((response)=>{
         
            dispatch(PostSuccess9(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
           
            dispatch(PostFailure9(error))
            dispatch(setLoading(false))
        })
    }
}
export const PostConsultation = (data) => async (dispatch) => {
    try {
        dispatch(PostRequest10());
        dispatch(setLoading(true));
        const headers = Unauthorized.Actionsauthorized();
        const response = await axios.post(baseUrl+'Consultations/AddNewConsultation', data, {headers});
        dispatch(setLoading(false));
        dispatch(PostSuccess10(response.data));
        return response;
    } catch (error) {
        dispatch(setLoading(false));
        dispatch(PostFailure10(error));
        throw error;
    }
};

export const PostPatientTransaction=(data)=>{
 
    return(dispatch)=>{
        dispatch(PostRequest11())
        dispatch(setLoading(true))
        axios.post(baseUrl+'PatientTransactions/UpdateTransaction',data)
        .then((response)=>{
            dispatch(setLoading(false))
            dispatch(PostSuccess11(response.data))
        })
        .catch((error)=>{
            dispatch(setLoading(false))
            dispatch(PostFailure11(error))
        })
    }
}

export const PostUpdateConsultaion=(data)=>{

    return(dispatch)=>{
        dispatch(PostRequest12())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        axios.post(baseUrl+'Consultations/ConsultationUpdate',data,{headers})
        .then((response)=>{
            dispatch(setLoading(false))
            dispatch(PostSuccess12(response.data))
            toast('Successfully Updated')
        })
        .catch((error)=>{
            dispatch(setLoading(false))
            dispatch(PostFailure12(error))
        })
    }
}

export const PostMedicineMaster=(data)=>{

    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest13())
      
        axios.post(baseUrl+'MedicineMasters',data)
        .then((response)=>{
          
            dispatch(setLoading(false))
            dispatch(PostSuccess13(response.data))
        })
        .catch((error)=>{
            dispatch(setLoading(false))
            dispatch(PostFailure13(error))
        })
    }
}

export const PostPychomatric=(data)=>{
   
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest14())
      
        axios.post(baseUrl+'PsychometricEvaluations',data)
        .then((response)=>{
           
            dispatch(setLoading(false))
            dispatch(PostSuccess14(response.data))
        })
        .catch((error)=>{
            dispatch(setLoading(false))
            dispatch(PostFailure14(error))
        })
    }
}

export const PostPriscription=(data)=>{

    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest15())
        axios.post(baseUrl+'Prescriptions',data)
        .then((response)=>{
       
            dispatch(setLoading(false))
            dispatch(PostSuccess15(response.data))
            toast('Successfully Added Medicine')
        })
        .catch((error)=>{
            dispatch(setLoading(false))
            dispatch(PostFailure15(error))
        })
    }
}

export const PostBed=(data)=>{

    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest16())
        axios.post(baseUrl+'Beds',data)
        .then((response)=>{
         
            dispatch(setLoading(false))
            dispatch(PostSuccess16(response.data))
            toast('Successfully Allocated Bed')
        })
        .catch((error)=>{
            dispatch(setLoading(false))
            dispatch(PostFailure16(error))
        })
    }
}

export const PosTemplateData=(data)=>{
 
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest17())
        axios.post(baseUrl+'templateModels',data)
        .then((response)=>{
           
            dispatch(setLoading(false))
            dispatch(PostSuccess17(response.data))
            toast('Successfully Added Template')
        })
        .catch((error)=>{
            dispatch(setLoading(false))
            dispatch(PostFailure17(error))
        })
    }
}

export const PosTemplateList=(data)=>{
  
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest18())
        axios.post(baseUrl+'templateModels/PostTemplateList',data)
        .then((response)=>{
           
            dispatch(setLoading(false))
            dispatch(PostSuccess18(response.data))
            toast('Successfully Added Template')
        })
        .catch((error)=>{
            dispatch(setLoading(false))
            dispatch(PostFailure18(error))
        })
    }
}

export const GetClaudeAiResponse=(data)=>{
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest19())
        const headers=Unauthorized.Actionsauthorized()
        axios.post(baseUrl+'Consultations/ChatGPTSuggestionOnImage',data,{headers})
        .then((response)=>{
           
            dispatch(setLoading(false))
            dispatch(PostSuccess19(response.data))
            toast('Successfully Added Image')
        })
        .catch((error) => {
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //.error('Error in posting image:', errorMessage);
            dispatch(setLoading(false));
            dispatch(PostFailure19(error));
            toast(errorMessage);
        });
    }
}

export const PostAdditionalInput=(data)=>{
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest20())
        axios.post(baseUrl+'AdditionalInfoes/MultipleInfoPost',data)
        .then((response)=>{
          
            dispatch(setLoading(false))
            dispatch(PostSuccess20(response.data))
            toast('Successfully Added Template')
        })
        .catch((error) => {
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //console.error('Error in posting image:', errorMessage);
            dispatch(setLoading(false));
            dispatch(PostFailure20(error));
            toast(errorMessage);
        });
    }
}

export const PostBloodBankData=(data)=>{
  
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest21())
        axios.post(baseUrl+'BloodBanks',data)
        .then((response)=>{
       
            dispatch(setLoading(false))
            dispatch(PostSuccess21(response.data))
            toast('Successfully Registered')
        })
        .catch((error) => {
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //console.error('Error in posting image:', errorMessage);
            dispatch(setLoading(false));
            dispatch(PostFailure21(error));
            toast(errorMessage);
        });
    }
}


export const PostConsultationServicesAndPackages=(data)=>{

    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest22())
        axios.post(baseUrl+'PatientServices/AddConsultationWithServices',data)
        .then((response)=>{
         
            dispatch(setLoading(false))
            dispatch(PostSuccess22(response.data))
            toast('Successfully Added')
        })
        .catch((error) => {
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
           // console.error('Error in posting image:', errorMessage);
            dispatch(setLoading(false));
            dispatch(PostFailure22(error));
            toast(errorMessage);
        });
    }
}




export const PostDoctorconsultation = (data, id) => {
    return (dispatch) => {
      dispatch(setLoading(true));
      dispatch(PostRequest26());
      const headers = Unauthorized.Actionsauthorized();
      
      return axios.post(baseUrl + `Consultations/DoctorUpdates?ConsultationId=${id}`, data, {headers})
        .then((response) => {
          dispatch(setLoading(false));
          dispatch(PostSuccess26(response.data));
        //   toast.success('Successfully Added');
          return response.data; 
        })
        .catch((error) => {
          const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
          dispatch(setLoading(false));
          dispatch(PostFailure26(error));
          toast(errorMessage);
          throw error;
        });
    }
  }


export const PostUpdateDocFees=(id,fees)=>{

    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest27())
        axios.post(baseUrl+`Auth/UpdateDocFee?docId=${id}&fee=${fees}`)
        .then((response)=>{
          
            dispatch(setLoading(false))
            dispatch(PostSuccess27(response.data))
            toast('Fees updated')
        })
        .catch((error) => {
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //console.error('Error in posting image:', errorMessage);
            dispatch(setLoading(false));
            dispatch(PostFailure27(error));
            toast(errorMessage);
        });
    }
}

export const PostAddFloor=(data)=>{
  
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest28())
        axios.post(baseUrl+`floors/AddFloor?floorName=${data}`)
        .then((response)=>{
          
            dispatch(setLoading(false))
            dispatch(PostSuccess28(response.data))
            toast('Added new floor')
        })
        .catch((error) => {
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //console.error('Error in posting image:', errorMessage);
            dispatch(setLoading(false));
            dispatch(PostFailure28(error));
            toast(errorMessage);
        });
    }
}


export const PostAdmitPatient=(data)=>{
  
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest29())
        axios.post(baseUrl+'Admitted_patients/admitPatient',data)
        .then((response)=>{
       
            dispatch(setLoading(false))
            dispatch(PostSuccess29(response.data))
            toast('Admission successfull')
        })
        .catch((error) => {
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //console.error('Error in posting image:', errorMessage);
            dispatch(setLoading(false));
            dispatch(PostFailure29(error));
            toast(errorMessage);
        });
    }
}


export const PostPayinvoice=(data)=>{
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest30())
  
        return axios.patch(baseUrl+`Invoices/PayInvoice`,data)
        .then((response)=>{
         
            dispatch(setLoading(false))
            dispatch(PostSuccess30(response.data))
            toast.success('Paid successfully')
            return response.data
        })
        .catch((error) => {
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //console.error('Error in posting image:', errorMessage);
            dispatch(setLoading(false));
            dispatch(PostFailure30(error));
            toast(errorMessage);
            return error
        });
    }
}


export const PostGenerateInvoice=(data)=>{
  
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest31())
        axios.post(baseUrl+`Invoices/GenerateInvoice`,data)
        .then((response)=>{
            
            dispatch(setLoading(false))
            dispatch(PostSuccess31(response.data))
            toast('Successfully generated invoice ')
        })
        .catch((error) => {
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //console.error('Error in posting image:', errorMessage);
            dispatch(setLoading(false));
            dispatch(PostFailure31(error));
            toast(errorMessage);
        });
    }
}


export const PostServiceGroup=(data)=>{
   
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest32())
        axios.post(baseUrl+`ServiceGroup/AddGroup`,data)
        .then((response)=>{
         
            dispatch(setLoading(false))
            dispatch(PostSuccess32(response.data))
            toast('Successfully Added New Service Group')
        })
        .catch((error) => {
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //console.error('Error in posting image:', errorMessage);
            dispatch(setLoading(false));
            dispatch(PostFailure32(error));
            toast(errorMessage);
        });
    }
}


export const PostSpecimen=(data)=>{
   
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest33())
        axios.post(baseUrl+`Specimen/AddSpecimen`,data)
        .then((response)=>{
        
            dispatch(setLoading(false))
            dispatch(PostSuccess33(response.data))
            toast('Successfully Added New Specimen')
        })
        .catch((error) => {
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //console.error('Error in posting image:', errorMessage);
            dispatch(setLoading(false));
            dispatch(PostFailure33(error));
            toast(errorMessage);
        });
    }
}


export const CancelTransaction=(id)=>{
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest34())
        axios.post(baseUrl+`PatientTransactions/CancelTransaction?transactionId=${id}`)
        .then((response)=>{
          
            dispatch(setLoading(false))
            dispatch(PostSuccess34(response.data))
            toast('Successfully Cancel The Service')
        })
        .catch((error) => {
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //console.error('Error in posting image:', errorMessage);
            dispatch(setLoading(false));
            dispatch(PostFailure34(error));
            toast(errorMessage);
        });
    }
}


export const PostNurseUpdates=(Cid,Complaint,data)=>{
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest36())
        const headers=Unauthorized.Actionsauthorized()
        axios.post(baseUrl+`Consultations/NurseUpdates?consultationId=${Cid}&chiefComplaints=${Complaint}`,data,{headers})
        .then((response)=>{
    
            dispatch(setLoading(false))
            dispatch(PostSuccess36(response.data))
            toast('Successfully updated vital science')
        })
        .catch((error) => {
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
      
            dispatch(setLoading(false));
            dispatch(PostFailure36(error));
            toast(errorMessage);
        });
    }
}


export const PostBookLabServices=(services,mrn)=>{
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest44())
        axios.post(baseUrl+`LabDetails/BookLabServices?services=${services}&MRN=${mrn}`)
        .then((response)=>{
          
            dispatch(setLoading(false))
            dispatch(PostSuccess44(response.data))
            toast('Successfully Booked Services')
        })
        .catch((error) => {
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //console.error('Error in posting image:', errorMessage);
            dispatch(setLoading(false));
            dispatch(PostFailure44(error));
            toast('Please Select A Specialization');
        });
    }
}

export const PostBookLabPackage=(packages,mrn)=>{
    return(dispatch)=>{
        dispatch(setLoading(true))
        dispatch(PostRequest45())
        axios.post(baseUrl+`LabDetails/BookLabPackages?packages=${packages}&MRN=${mrn}`)
        .then((response)=>{
          
            dispatch(setLoading(false))
            dispatch(PostSuccess45(response.data))
            toast('Successfully Booked Package')
        })
        .catch((error) => {
            const errorMessage = error.response ? error.response.data.message || JSON.stringify(error.response.data) : error.message;
            //console.error('Error in posting image:', errorMessage);
            dispatch(setLoading(false));
            dispatch(PostFailure45(error));
            toast('Please Select A Specialization');
        });
    }
}



export const GetServices=()=>{
    return(dispatch)=>{
        dispatch(FetchRequest5())
        dispatch(setLoading(true))
        axios.get(baseUrl+'Services/GetAllAvailableServices')
        .then((response)=>{
            
            dispatch(FetchSuccess5(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure5(error))
            dispatch(setLoading(false))
        })
    }
}

// export const GetDepartmentData=()=>{
//     return(dispatch)=>{
//         dispatch(FetchRequest6())
//         dispatch(setLoading(true))
//         axios.get(baseUrl+'Departments')
//         .then((response)=>{
//             dispatch(setLoading(false))
//             dispatch(FetchSuccess6(response.data))
//         })
//         .catch((error)=>{
//             dispatch(setLoading(false))
//             dispatch(FetchFailure6(error))
//         })
//     }
// }

export const GetMedicinMaster=()=>{
    return(dispatch)=>{
        dispatch(FetchRequest7())
        dispatch(setLoading(true))
        axios.get(baseUrl+'MedicineMasters')
        .then((response)=>{
            dispatch(FetchSuccess7(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure7(error))
            dispatch(setLoading(false))
        })
    }
}


export const GetPackages=()=>{
    return(dispatch)=>{
        dispatch(FetchRequest10())
        dispatch(setLoading(true))
        axios.get(baseUrl+'Packages/GetAllPackages')
        .then((response)=>{
            dispatch(FetchSuccess10(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure10(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetPackagesWithId=(id)=>{
    return(dispatch)=>{
        dispatch(FetchRequest11())
        dispatch(setLoading(true))
        axios.get(baseUrl+`Packages/GetPackageWithServices/pkgID?pkgID=${id}`)
        .then((response)=>{
            dispatch(FetchSuccess11(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure11(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetServicesById=(id)=>{
    return(dispatch)=>{
        dispatch(FetchRequest12())
        dispatch(setLoading(true))
        axios.get(baseUrl+`Services/GetServicesByDepartmentId?departmentId=${id}`)
        .then((response)=>{
            dispatch(FetchSuccess12(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure12(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetFloor=()=>{
    return(dispatch)=>{
        dispatch(FetchRequest13())
        dispatch(setLoading(true))
        axios.get(baseUrl+`floors`)
        .then((response)=>{
            dispatch(FetchSuccess13(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure13(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetHospitalInfrastructure=()=>{
    return(dispatch)=>{
        dispatch(FetchRequest14())
        dispatch(setLoading(true))
        axios.get(baseUrl+'floors/ViewHospitalInfrastructure')
        .then((response)=>{
            dispatch(FetchSuccess14(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure14(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetBedByRoomId=(id)=>{
    return(dispatch)=>{
        dispatch(FetchRequest15())
        dispatch(setLoading(true))
        axios.get(baseUrl+`floors/getBedsByRoomId?roomId=${id}`)
        .then((response)=>{
            dispatch(FetchSuccess15(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure15(error))
            dispatch(setLoading(false))
        })
    }
}

// export const GetDocShecduleById=(id)=>{
//     return(dispatch)=>{
//         dispatch(FetchRequest16())
//         dispatch(setLoading(true))
//         axios.get(baseUrl+`DoctorSchedules/${id}`)
//         .then((response)=>{
//             dispatch(FetchSuccess16(response.data))
//             dispatch(setLoading(false))
//         })
//         .catch((error)=>{
//             dispatch(FetchFailure16(error))
//             dispatch(setLoading(false))
//         })
//     }
// }

// export const GetDocShecduleBydocIdandDate=(id)=>{
//     return(dispatch)=>{
//         dispatch(FetchRequest43())
//         dispatch(setLoading(true))
//         const headers=Unauthorized.Actionsauthorized()
//         axios.get(baseUrl+`DoctorSchedules/${id}`,{headers})
//         .then((response)=>{
//             dispatch(FetchSuccess43(response.data))
//             dispatch(setLoading(false))
//         })
//         .catch((error)=>{
//             dispatch(FetchFailure43(error))
//             dispatch(setLoading(false))
//         })
//     }
// }

export const GetConsultation=()=>{
    return(dispatch)=>{
        dispatch(FetchRequest17())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        axios.get(baseUrl+`Consultations/getConsultList`,{headers})
        .then((response)=>{
            
            dispatch(FetchSuccess17(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure17(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetPharmacyPurchase=()=>{
    return(dispatch)=>{
        dispatch(FetchRequest18())
        dispatch(setLoading(true))
        axios.get(baseUrl+`PharmacyPurchases`)
        .then((response)=>{
            dispatch(FetchSuccess18(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure18(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetPatientServices=()=>{
    return(dispatch)=>{
        dispatch(FetchRequest19())
        dispatch(setLoading(true))
        axios.get(baseUrl+`PatientServices`)
        .then((response)=>{
            dispatch(FetchSuccess19(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure19(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetDashboardPatientDetails=()=>{
    return(dispatch)=>{
        dispatch(FetchRequest22())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        axios.get(baseUrl+`Dashboards/PatientDB`,{headers})
        .then((response)=>{
            dispatch(FetchSuccess22(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure22(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetDashboardLabDetails=(id)=>{
    return(dispatch)=>{
        dispatch(FetchRequest23())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        axios.get(baseUrl+`Dashboards/LabDB${id?'?MRN='+id:''}`,{headers})
        .then((response)=>{
            dispatch(FetchSuccess23(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure23(error))
            dispatch(setLoading(false))
        })
    }
}
export const GetDashboardPharmacyDetails=(id)=>{
    return(dispatch)=>{
        dispatch(FetchRequest24())
        dispatch(setLoading(true))
        axios.get(baseUrl+`Dashboards/PharmaDB${id?'?MRN='+id:''}`)
        .then((response)=>{
           
            dispatch(FetchSuccess24(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure24(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetAiResponse=(data)=>{

    return(dispatch)=>{
        dispatch(FetchRequest25())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        axios.get(baseUrl+`Consultations/ChatGPTSuggestion?input=${data}`,{headers})
        .then((response)=>{
          
            dispatch(FetchSuccess25(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure25(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetPatientConsultation=(data,array)=>{
    
    return(dispatch)=>{
        dispatch(FetchRequest26())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        const queryString = `Consultations/Patient_consultations?MRN=${data}`;
        axios.get(baseUrl+`${queryString}`,{headers})
        .then((response)=>{
            
            dispatch(FetchSuccess26(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure26(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetMonthviseData=(type,year)=>{
    return(dispatch)=>{
        dispatch(FetchRequest27())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
       
        axios.get(baseUrl+`Dashboards/MonthlyConsultationCount?type=${type}&year=${year}`,{headers})
        .then((response)=>{
          
            dispatch(FetchSuccess27(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure27(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetTodaysPatient=(date,type)=>{
    return(dispatch)=>{
        dispatch(FetchRequest28())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        axios.get(baseUrl+`Consultations/PatientsToday?date=${date}&consultationType=${type}`,{headers})
        .then((response)=>{
           
            dispatch(FetchSuccess28(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure28(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetTodaysPatientCount=()=>{
    return(dispatch)=>{
        dispatch(FetchRequest29())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        axios.get(baseUrl+`Consultations/PatientCountToday`,{headers})
        .then((response)=>{
        
            dispatch(FetchSuccess29(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure29(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetTodaysLabreports=()=>{
    return(dispatch)=>{
        dispatch(FetchRequest30())
        dispatch(setLoading(true))
        axios.get(baseUrl+`PatientServices/LabResultsToday`)
        .then((response)=>{
         
            dispatch(FetchSuccess30(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure30(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetTemplateByDepId=(id)=>{
    return(dispatch)=>{
        dispatch(FetchRequest31())
        dispatch(setLoading(true))
        axios.get(baseUrl+`templateModels/GetTemplatesByDept?id=${id}`)
        .then((response)=>{
           
            dispatch(FetchSuccess31(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure31(error))
            dispatch(setLoading(false))
        })
    }
}


export const GetPatientServiceByConsultId=(id)=>{
   
    return(dispatch)=>{
        dispatch(FetchRequest34())
        dispatch(setLoading(true))
        axios.get(baseUrl+`PatientServices/PatientServicesByConsultID/${id}`)
        .then((response)=>{
           
            dispatch(FetchSuccess34(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure34(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetBloodDonaters=(id)=>{
   
    return(dispatch)=>{
        dispatch(FetchRequest35())
        dispatch(setLoading(true))
        axios.get(baseUrl+`BloodBanks`)
        .then((response)=>{
           
            dispatch(FetchSuccess35(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure35(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetBloodDonatersByStatus=(status)=>{
  
    return(dispatch)=>{
        dispatch(FetchRequest36())
        dispatch(setLoading(true))
        axios.get(baseUrl+`BloodBanks/BloodbanksBystatus?status=${status}`)
        .then((response)=>{
           
            dispatch(FetchSuccess36(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure36(error))
            dispatch(setLoading(false))
        })
    }
}


export const GetServicesAndPackagesByconsultID=(id)=>{
  
    return(dispatch)=>{
        dispatch(FetchRequest38())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        axios.get(baseUrl+`Consultations/GetConsultationobjs?id=${id}`,{headers})
        .then((response)=>{
          
            dispatch(FetchSuccess38(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure38(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetPatientsWithServices=()=>{
    return(dispatch)=>{
        dispatch(FetchRequest39())
        dispatch(setLoading(true))
        axios.get(baseUrl+`LabDetails/PatientsWithIncompelteServices`,)
        .then((response)=>{
         
            dispatch(FetchSuccess39(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure39(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetIncompleteServiceResult=(id,array)=>{

    return(dispatch)=>{
        dispatch(FetchRequest40())
        dispatch(setLoading(true))
        axios.get(baseUrl+`PatientTransactions/getIncomplete?consultid=${id}&${array.map(param => `includeParams=${param}`).join('&')}`)
        .then((response)=>{
           
            dispatch(FetchSuccess40(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(FetchFailure40(error))
            dispatch(setLoading(false))
        })
    }
}


export const GetTimeSlotsBydocid=(date,id)=>{
   
    return(dispatch)=>{
        dispatch(FetchRequest44())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        axios.get(baseUrl+`Consultations/GetSlotBookings?date=${date}&DoctorId=${id}`,{headers})
        .then((response)=>{
          
            dispatch(FetchSuccess44(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
         
            dispatch(FetchFailure44(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetAddedFloors=()=>{
    return(dispatch)=>{
        dispatch(FetchRequest45())
        dispatch(setLoading(true))
        axios.get(baseUrl+`floors/GetAllFloors`)
        .then((response)=>{
          
            dispatch(FetchSuccess45(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
           
            dispatch(FetchFailure45(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetRoomsByfloorId=(id)=>{
    return(dispatch)=>{
        dispatch(FetchRequest46())
      
        axios.get(baseUrl+`floors/GetRoomsByFloorId?floorId=${id}`)
        .then((response)=>{
           
            dispatch(FetchSuccess46(response.data))
         
        })
        .catch((error)=>{
          
            dispatch(FetchFailure46(error))
         
        })
    }
}



export const GetDailyConsultationCount=(year,month,type)=>{
    return(dispatch)=>{
        dispatch(FetchRequest48())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        axios.get(baseUrl+`Dashboards/DailyConsultationCount?year=${year}&month=${month}&type=${type}`,{headers})
        .then((response)=>{
           
            dispatch(FetchSuccess48(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
        
            dispatch(FetchFailure48(error))
            dispatch(setLoading(false))
        })
    }
}


export const GetMonthLabcount=(type,servid,date)=>{
    return(dispatch)=>{
        dispatch(FetchRequest49())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        axios.get(baseUrl+`Dashboards/MonthlyLabsCount?type=${type}&serviceId=${servid}&year=${date}`,{headers})
        .then((response)=>{
           
            dispatch(FetchSuccess49(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
        
            dispatch(FetchFailure49(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetDailyLabcount=(type,servid,date,month)=>{
    return(dispatch)=>{
        dispatch(FetchRequest50())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        axios.get(baseUrl+`Dashboards/DailyLabsCount?type=${type}&serviceId=${servid}&year=${date}&month=${month}`,{headers})
        .then((response)=>{
        
            dispatch(FetchSuccess50(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
         
            dispatch(FetchFailure50(error))
            dispatch(setLoading(false))
        })
    }
}


export const GetMontlyPackagecount=(type,pkgid,date)=>{
    return(dispatch)=>{
        dispatch(FetchRequest51())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        axios.get(baseUrl+`Dashboards/MonthlyLabPackageCount?type=${type}&packageId=${pkgid}&year=${date}`,{headers})
        .then((response)=>{
         
            dispatch(FetchSuccess51(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
        
            dispatch(FetchFailure51(error))
            dispatch(setLoading(false))
        })
    }
}




export const GetDailypackagecount=(type,pkgid,date,month)=>{
    return(dispatch)=>{
        dispatch(FetchRequest52())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        axios.get(baseUrl+`Dashboards/DailyLabPackageCount?year=${date}&month=${month}&type=${type}&PkgId=${pkgid}`,{headers})
        .then((response)=>{
          
            dispatch(FetchSuccess52(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
         
            dispatch(FetchFailure52(error))
            dispatch(setLoading(false))
        })
    }
}


export const GetpackageDB=()=>{
    return(dispatch)=>{
        dispatch(FetchRequest53())
        dispatch(setLoading(true))
        axios.get(baseUrl+`Dashboards/PackageDB`)
        .then((response)=>{
       
            dispatch(FetchSuccess53(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            
            dispatch(FetchFailure53(error))
            dispatch(setLoading(false))
        })
    }
}


export const GetpatientByroom=(id)=>{
    return(dispatch)=>{
        dispatch(FetchRequest54())
        dispatch(setLoading(true))
        axios.get(baseUrl+`Admitted_patients/GetPatientsInRoom?roomId=${id}`)
        .then((response)=>{
          
            dispatch(FetchSuccess54(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
           
            dispatch(FetchFailure54(error))
            dispatch(setLoading(false))
        })
    }
}



export const GetinvoiceSummurybymonth=(type,date)=>{
    return(dispatch)=>{
        dispatch(FetchRequest56())
        dispatch(setLoading(true))
        axios.get(baseUrl+`Dashboards/InvoiceSummaryByMonth?invoiceName=${type}&year=${date}`)
        .then((response)=>{
        
            dispatch(FetchSuccess56(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
         
            dispatch(FetchFailure56(error))
            dispatch(setLoading(false))
        })
    }
}


export const GetInvoiceSummury=(date)=>{
    return(dispatch)=>{
        dispatch(FetchRequest57())
        dispatch(setLoading(true))
        axios.get(baseUrl+`Dashboards/InvoiceSummary?year=${date}`)
        .then((response)=>{
        
            dispatch(FetchSuccess57(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
          
            dispatch(FetchFailure57(error))
            dispatch(setLoading(false))
        })
    }
}


export const GetBloodbankInventoryView=()=>{
    return(dispatch)=>{
        dispatch(FetchRequest58())
        dispatch(setLoading(true))
        axios.get(baseUrl+`BloodBankInventories/GetBloodBankInventoryView`)
        .then((response)=>{
           
            dispatch(FetchSuccess58(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
           
            dispatch(FetchFailure58(error))
            dispatch(setLoading(false))
        })
    }
}


export const GetInvoiceDetails=(mrn,invoiceName)=>{
    return(dispatch)=>{
        dispatch(FetchRequest59())
        dispatch(setLoading(true))
        axios.get(baseUrl+`Invoices/GetUnpaidInvoices?MRN=${mrn}&InvoiceName=${invoiceName}`)
        .then((response)=>{
           
            dispatch(FetchSuccess59(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
          
            dispatch(FetchFailure59(error))
            dispatch(setLoading(false))
        })
    }
}


export const GetLabTransactionbydate=(mrn,date)=>{

    return(dispatch)=>{
        dispatch(FetchRequest60())
        dispatch(setLoading(true))
        axios.get(baseUrl+`PatientTransactions/GetUnInvoicedLabTransactionsByDate?MRN=${mrn}&date=${date}`)
        .then((response)=>{
           
            dispatch(FetchSuccess60(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
          
            dispatch(FetchFailure60(error))
            dispatch(setLoading(false))
        })
    }
}


export const GetInvoiceDetailsByInvoiceNo=(invoiceNo)=>{
    return(dispatch)=>{
        dispatch(FetchRequest61())
        dispatch(setLoading(true))
       return axios.get(baseUrl+`Invoices/GetInvoice?InvoiceNo=${invoiceNo}`)
        .then((response)=>{
           
            dispatch(FetchSuccess61(response.data))
            dispatch(setLoading(false))
            return response.data
        })
        .catch((error)=>{
          
            dispatch(FetchFailure61(error))
            dispatch(setLoading(false))
            return error
        })
    }
}


export const GetPatientsWithLabTransaction=(date)=>{
    return(dispatch)=>{
        dispatch(FetchRequest62())
        dispatch(setLoading(true))
        axios.get(baseUrl+`PatientTransactions/GetPatientsWithLabTransactions?date=${date}`)
        .then((response)=>{
          
            dispatch(FetchSuccess62(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
          
            dispatch(FetchFailure62(error))
            dispatch(setLoading(false))
        })
    }
}


export const GetTransactionByInvoiceNo=(invoiceno)=>{
    return(dispatch)=>{
        dispatch(FetchRequest63())
        dispatch(setLoading(true))
        axios.get(baseUrl+`PatientTransactions/GetTransactionsByInvoiceNo?invoiceNo=${invoiceno}`)
        .then((response)=>{
            
            dispatch(FetchSuccess63(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
          
            dispatch(FetchFailure63(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetInvoicesByPatientName=(name)=>{

    return(dispatch)=>{
        dispatch(FetchRequest64())
        dispatch(setLoading(true))
        axios.get(baseUrl+`Invoices/GetInvoicesByPatientName?PatientName=${name}`)
        .then((response)=>{
       
            dispatch(FetchSuccess64(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
         
            dispatch(FetchFailure64(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetServiceGroups=(id)=>{
    return(dispatch)=>{
        dispatch(FetchRequest65())
        dispatch(setLoading(true))
        axios.get(baseUrl+`ServiceGroup/GetGroupById?Id=${id}`)
        .then((response)=>{
           
            dispatch(FetchSuccess65(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
           
            dispatch(FetchFailure65(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetSpecimen=(id)=>{
    return(dispatch)=>{
        dispatch(FetchRequest66())
        dispatch(setLoading(true))
        axios.get(baseUrl+`Specimen/GetAllSpecimen`)
        .then((response)=>{
          
            dispatch(FetchSuccess66(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
           
            dispatch(FetchFailure66(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetServicesByGroupId=(id)=>{
    return(dispatch)=>{
        dispatch(FetchRequest67())
        dispatch(setLoading(true))
        axios.get(baseUrl+`Services/GetServicesByGroupId?Id=${id}`)
        .then((response)=>{
         
            dispatch(FetchSuccess67(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
        
            dispatch(FetchFailure67(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetServicesByServiceids=(ids)=>{
 
    return(dispatch)=>{
        dispatch(FetchRequest68())
        dispatch(setLoading(true))
        axios.get(baseUrl+`Services/GetServicesByServiceIds?serviceIds=${ids}`)
        .then((response)=>{
          
            dispatch(FetchSuccess68(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
          
            dispatch(FetchFailure68(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetPackageByPackageids=(ids)=>{
    return(dispatch)=>{
        dispatch(FetchRequest69())
        dispatch(setLoading(true))
        axios.get(baseUrl+`Packages/GetPackagesByPackageIds?packageIds=${ids}`)
        .then((response)=>{
           
            dispatch(FetchSuccess69(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
         
            dispatch(FetchFailure69(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetConsultationById=(id)=>{
    return(dispatch)=>{
        dispatch(FetchRequest70())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        axios.get(baseUrl+`Consultations/GetConsultationById?Id=${id}`,{headers})
        .then((response)=>{
      
            dispatch(FetchSuccess70(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
         
            dispatch(FetchFailure70(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetOutPatientReport=(id)=>{
    return(dispatch)=>{
        dispatch(FetchRequest71())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        axios.get(baseUrl+`Reports/GetConsultationReport?consultationId=${id}`,{headers})
        .then((response)=>{
         
            dispatch(FetchSuccess71(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
          
            dispatch(FetchFailure71(error))
            dispatch(setLoading(false))
        })
    }
}


export const GetuniversitiesByCountryCode=(CountryCode)=>{
    return(dispatch)=>{
        dispatch(FetchRequest72())
        dispatch(setLoading(true))
        axios.get(baseUrl+`Degrees/GetUniversitiesByCountryCode?countryCode=${CountryCode}`)
        .then((response)=>{
            
            dispatch(FetchSuccess72(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
           
            dispatch(FetchFailure72(error))
            dispatch(setLoading(false))
        })
    }
}


export const GetAllCountries=()=>{
    return(dispatch)=>{
        dispatch(FetchRequest73())
        dispatch(setLoading(true))
        axios.get(baseUrl+`Degrees/GetAllCountries`)
        .then((response)=>{
          
            dispatch(FetchSuccess73(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
         
            dispatch(FetchFailure73(error))
            dispatch(setLoading(false))
        })
    }
}


export const GetCitiesByCountryCode=(CountryCode)=>{
    return(dispatch)=>{
        dispatch(FetchRequest74())
        dispatch(setLoading(true))
        axios.get(baseUrl+`Reports/GetOutPatientReport?consultationId=${CountryCode}`)
        .then((response)=>{
          
            dispatch(FetchSuccess74(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
           
            dispatch(FetchFailure74(error))
            dispatch(setLoading(false))
        })
    }
}


export const GetConsultedPatients=(type,date)=>{
    return(dispatch)=>{
        dispatch(FetchRequest75())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        axios.get(baseUrl+`Consultations/ConsultedPatients?type=${type}&date=${date}`,{headers})
        .then((response)=>{
          
            dispatch(FetchSuccess75(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
          
            dispatch(FetchFailure75(error))
            dispatch(setLoading(false))
        })
    }
}


export const GetDegreesByUniversityId=(id)=>{
    return(dispatch)=>{
        dispatch(FetchRequest80())
        dispatch(setLoading(true))
        
        axios.get(baseUrl+`Degrees/GetDegreesByUniversityId?universityId=${id}`)
        .then((response)=>{
   
            dispatch(FetchSuccess80(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
        
            dispatch(FetchFailure80(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetSpecilization=(id)=>{
    return(dispatch)=>{
        dispatch(FetchRequest81())
        dispatch(setLoading(true))
        axios.get(baseUrl+`Specializations/GetSpecializations?id=${id}`)
        .then((response)=>{
       
            dispatch(FetchSuccess81(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
         
            dispatch(FetchFailure81(error))
            dispatch(setLoading(false))
        })
    }
}

export const GetConsultaionListInDateRange=(startDate,endDate)=>{
    return(dispatch)=>{
        dispatch(FetchRequest84())
        dispatch(setLoading(true))
        const headers=Unauthorized.Actionsauthorized()
        return axios.get(baseUrl+`Consultations/ConsultationListInDateRange?startDate=${startDate}&endDate=${endDate}`,{headers})
        .then((response)=>{
          
            dispatch(FetchSuccess84(response.data))
            dispatch(setLoading(false))
            return response.data
        })
        .catch((error)=>{
          
            dispatch(FetchFailure84(error))
            dispatch(setLoading(false))
        })
    }
}









//PUT OPEARATIONS

export const PutBedData=(data,id)=>{
   
    return(dispatch)=>{
        dispatch(PutRequest2())
        dispatch(setLoading(true))
        axios.put(baseUrl+`Beds/${id}`,data)
        .then((response)=>{
          
            toast('Successfully Allocated Bed')
            dispatch(PutSuccess2(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(PutFailure2(error))
            dispatch(setLoading(false))
        })
    }
}

export const UpdateBloodBankData=(data)=>{
  
    return(dispatch)=>{
        dispatch(PutRequest3())
        dispatch(setLoading(true))
        axios.put(baseUrl+`BloodBanks`,data)
        .then((response)=>{
           
            toast('Successfully Updated')
            dispatch(PutSuccess3(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(PutFailure3(error))
            dispatch(setLoading(false))
        })
    }
}


export const UpdatePatientServices=(data)=>{
  
    return(dispatch)=>{
        dispatch(PutRequest4())
        dispatch(setLoading(true))
        axios.put(baseUrl+`PatientServices/UpdatePatientService`,data)
        .then((response)=>{
           
            toast('Successfully Updated')
            dispatch(PutSuccess4(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(PutFailure4(error))
            dispatch(setLoading(false))
        })
    }
}


export const UpdateTemplateSwitch=(Id,data)=>{
  
    return(dispatch)=>{
        dispatch(PutRequest5())
        dispatch(setLoading(true))
        axios.put(baseUrl+`templateModels/${Id}`,data)
        .then((response)=>{
           
            toast('Successfully Updated')
            dispatch(PutSuccess5(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(PutFailure5(error))
            dispatch(setLoading(false))
        })
    }
}

export const UpdatePackageStatus=(Id)=>{
    return(dispatch)=>{
        dispatch(PutRequest6())
        dispatch(setLoading(true))
        axios.put(baseUrl+`Packages/ChangePackageStatus?Id=${Id}`)
        .then((response)=>{
            
            dispatch(PutSuccess6(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(PutFailure6(error))
            dispatch(setLoading(false))
        })
    }
}



//DELETE OPERATIONS

export const DeleteDepartment=(id)=>{
    return(dispatch)=>{
        dispatch(DeleteRequest())
        dispatch(setLoading(true))

        axios.delete(depturl+`Departments/DeleteDepartment?id=${id}`)
        .then((response)=>{
           
            toast('SuccessFully Deleted')
            dispatch(DeleteSuccess(response.data))
            dispatch(setLoading(false))

        })
        .catch((error)=>{
            dispatch(DeleteFailure(error))
            dispatch(setLoading(false))

        })
    }
}

export const DeleteService=(id)=>{
    return(dispatch)=>{
        dispatch(DeleteRequest2())
        axios.delete(baseUrl+`Services/${id}`)
        .then((response)=>{
           
            toast('SuccessFully Deleted')
            dispatch(DeleteSuccess2(response.data))
        })
        .catch((error)=>{
            dispatch(DeleteFailure2(error))
        })
    }
}

export const DeleteTemplate=(id)=>{
    return(dispatch)=>{
        dispatch(DeleteRequest3())
        dispatch(setLoading(true))
        axios.delete(baseUrl+`templateModels/${id}`)
        .then((response)=>{
           
            toast('SuccessFully Deleted')
            dispatch(DeleteSuccess3(response.data))
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            dispatch(DeleteFailure3(error))
            dispatch(setLoading(false))
        })
    }
}



 
  