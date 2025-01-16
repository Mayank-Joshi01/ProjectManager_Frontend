import { useGoogleLogin } from '@react-oauth/google'
import AppContext from './AppContext'
import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'

const AppStates = (props) => {

  const [Data, setData] = useState({})

  /// Alert State
  const [alert, setAlert] = useState(null)

  /// Alert Function
  const Showalert = (msg, type) => {
    setAlert({
      msg: msg,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }

  /// creating instance of GoogleLogin Popup
  const GoogleLogin = useGoogleLogin({

    onSuccess: async (res) => {

      if (res.access_token) {

        /// defining arguments for axios post request
        const url = `${import.meta.env.VITE_HOST_BASE_URLL}auth/googlelogin`;
        const data = res;
        const config = {
          headers: { 'Content-Type': 'application/json' },
        }

        /// making post request to server
        const resp = await axios.post(url, data, config);

        console.log('Response:', resp);

        /// Updating data state
        setData(resp.data);

      }
      else {     Showalert("Invalid Credentials", "danger")}
     
    },
    onError: (error) => {
      console.log(error)
      Showalert("Invalid Credentials", "danger")
    }
  })


  /// SignUp Functionality

  const SignUp = async (user) => {

    try {

      const url = `${import.meta.env.VITE_HOST_BASE_URLL}auth/signup`;
      const data = { name: user.name, email: user.email, password: user.password };
      const config = {
        headers: { 'Content-Type': 'application/json' },
      }

      /// making post request to server
      const resp = await axios.post(url, data, config);

      if (resp.data.status) {
        console.log('Response:', resp);
        localStorage.setItem('token', resp.data.token)
        Showalert("Accont Created Success fullay", "success")

        /// Updating data state
        setData(resp.data);
      }
    }
    catch (error) {
      console.log(error)
      Showalert("Invalid Credentials", "danger")
    }
  }

  // Login functionality

  const Login = async (user) => {
    try {
      const url = `${import.meta.env.VITE_HOST_BASE_URLL}auth/login`;
      const data = { name: user.name, email: user.email, password: user.password };
      const config = {
        headers: { 'Content-Type': 'application/json' },
      }

      /// making post request to server
      const resp = await axios.post(url, data, config);

      if (resp.data.status) {
        localStorage.setItem('token', resp.data.token)
        Showalert(`Welcome ${resp.data.data.name} to Task Manager, Logined Sucessfully`, "success")

        /// Updating data state
        setData(resp.data);
      }

    } catch (error) {
      console.log(error);
      Showalert("Invalid Credentials", "danger")
    }
  }

  /// Checking the user is authenticated logied in
  const Logedin = ()=>{
    if(data.token)
    if(localStorage.getItem('token')===Data.token){
      return true
    }else{
      return false
    }
  }


  return (
    <AppContext.Provider value={{ GoogleLogin, Login, SignUp, alert, Showalert, Data,Logedin }}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppStates;