import React from 'react'
import LoginPage from '../LoginPage'
import Signup from '../Signup'
import {BrowserRouter,Route,Routes} from 'react-router-dom'

const Unauthorized = () => {
 return localStorage.getItem('accessToken') !==null
}
const Actionsauthorized=()=>{
  const token = localStorage.getItem('accessToken');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return headers
}


export default {Unauthorized,Actionsauthorized}