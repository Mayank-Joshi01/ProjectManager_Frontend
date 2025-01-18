import { useGoogleLogin } from '@react-oauth/google'
import AppContext from './AppContext'
import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'

const AppStates = (props) => {

  const [Data, setData] = useState(null)


  /// Alert State
  const [alert, setAlert] = useState(null)

  // Theme of Website
  const [theme,setTheme] = useState("light")

  /// Authenticated State
  const [Authenticated, setAuthenticated] = useState(false)

  useEffect(()=>{Loggedin()},[Authenticated])

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

        if(resp.data.status){

        /// Updating data state
        setData(resp.data);
        localStorage.setItem('token', resp.data.token)
        localStorage.setItem('img', resp.data.img)
        setAuthenticated(true)
        Showalert(`Welcome ${resp.data.data.name} to Task Manager, Logined Sucessfully`, "success")
        }

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
        Showalert(`OTP Sent Sucessfully to ${user.email}`, "success")

        /// Updating data state
        setData(resp.data);
        console.log(resp.data)
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
        setAuthenticated(true)
      }

    } catch (error) {
      console.log(error);
      Showalert("Invalid Credentials", "danger")
    }
  }

  /// Resend OTP Functionality

  const ResendOTP = async (email) => {
    try {
      const url = `${import.meta.env.VITE_HOST_BASE_URLL}auth/resendotp`;
      const data = { email: email };
      const config = {
        headers: { 'Content-Type': 'application/json' },
      }

      /// making post request to server
      const resp = await axios.post(url, data, config);

      if (resp.data.status) {
        Showalert("OTP Sent Successfully", "success")
      }
      else {
        Showalert("Invalid Credentials", "danger")
      }

    } catch (error) {
      console.log(error);
      Showalert("Invalid Credentials", "danger")
    }
  }


  /// Verify OTP Functionality

  const VerifyOTP = async (id, OTP) => {
    try {
      const url = `${import.meta.env.VITE_HOST_BASE_URLL}auth/verifyotp`;
      const data = { id: id, otp: OTP };
      const config = {
        headers: { 'Content-Type': 'application/json' },
      }

      /// making post request to server
      const resp = await axios.post(url, data, config);

      if (resp.data.status) {
        Showalert("OTP Verified Successfully", "success");
        localStorage.setItem('token', resp.data.token);
        setAuthenticated(true)

      }
      else {
        Showalert("Invalid Credentials", "danger")
      }

    } catch (error) {
      console.log(error);
      Showalert("Invalid Credentials", "danger")
    }
  } 


  /// Checking the user is authenticated logied in
  const Loggedin = async()=>{
    try{
      const url = `${import.meta.env.VITE_HOST_BASE_URLL}auth/auth`;
      const data = { token: localStorage.getItem('token') };
      const config = {
        headers: { 'Content-Type': 'application/json' },
      }
      if(localStorage.getItem('token')){
        const resp = await axios.post(url,data,config);
        if(resp.data.status){
          setAuthenticated(true)
          setData(resp.data.data)
          return 
        }
      }
      setAuthenticated(false)
      setData(null)
    }catch(error){
      console.log(error)
      setAuthenticated(false)
    }
  }



  return (
    <AppContext.Provider value={{ GoogleLogin, Login, SignUp, alert, Showalert, Data,setData,Loggedin ,Authenticated,ResendOTP,VerifyOTP,theme,setTheme}}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppStates;