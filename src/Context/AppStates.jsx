import { useGoogleLogin } from '@react-oauth/google'
import AppContext from './AppContext'
import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'

const AppStates = (props) => {

  const [Data, setData] = useState(null);

  /// Alert State
  const [alert, setAlert] = useState(null)

  // Theme of Website
  const [theme,setTheme] = useState("light")

  /// Authenticated State
  const [Authenticated, setAuthenticated] = useState(false)

  //// Projects State
  const [Projects, setProjects] = useState([])


  useEffect(()=>{Loggedin();
  },[Authenticated,localStorage.getItem('token')])

useEffect(()=>{fetch_Projects();
},[])

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
        console.log(Data)
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
      console.log("user trying to login no token available ")
      console.log(localStorage.getItem("token"))
      if(localStorage.getItem('token')){
        console.log("user trying to login token available ")
        const resp = await axios.post(url,data,config);
 
        if(resp.data.status){
          console.log("User Loggined sucessfully")
          setAuthenticated(true)
          setData(resp.data.data)
          return 
        }
      }
      
    }catch(error){
      console.log(error)
      Showalert(error.message,"danger")
      setAuthenticated(false)
      setData(null)
    }
  }

  //////////// Getting Projects ////////////
  const fetch_Projects = async()=>{
    try{
      console.log(localStorage.getItem('token'))
      const url = `${import.meta.env.VITE_HOST_BASE_URLL}project/fetchProjects`;
      const data = {};
      const config = {
        headers: { 'Content-Type': 'application/json' ,
          "token":localStorage.getItem('token')
        }
      }
      if(localStorage.getItem('token')){
        console.log(config.headers)
        const resp = await axios.get(url,config);/////// dont use data in get request in axios
        if(resp.data.status){
          setProjects(resp.data.projects)
          console.log(resp.data.projects)
          return 
        }
      }
      setProjects([])
      
    }
    catch(error){
      console.log(error)
      Showalert(error.message,"danger")
      setProjects([])
    }
  }

  //////////// Adding A Project ////////////

  const AddProject = async (Title,link, Pending_Task) => {
    try{
      console.log(localStorage.getItem('token'))
      const url = `${import.meta.env.VITE_HOST_BASE_URLL}project/addProject`;
      const data = { link: link, Pending_Task: Pending_Task ,Title:Title};
      const config = {
        headers: { 'Content-Type': 'application/json' ,
          "token":localStorage.getItem('token')
        }
      }
      if(localStorage.getItem('token')){
        const resp = await axios.post(url,data,config);
        if(resp.data.status){
          setProjects([...Projects,resp.data.project])
          Showalert("Project Added Successfully","success")
          return 
        }
      }
      setProjects([])
    }
    catch(error){
      console.log(error)
      Showalert(error.message,"danger")
      setProjects([])
    }
  }

  //////////// Deleting A Project ////////////
 const DeleteProject = async (id) => {
  try{
    const url = `${import.meta.env.VITE_HOST_BASE_URLL}project/deleteProject/${id}`;
    const config = {
      headers: { 'Content-Type': 'application/json',
        "token":localStorage.getItem('token')
       }
    }
    if(localStorage.getItem('token')){
      const resp = await axios.delete(url,config);
      if(resp.data.status){
        setProjects(Projects.filter((project)=>project._id!==id))
        Showalert("Project Deleted Successfully","success")
        return 
      }
    }
    setProjects([])
  }
  catch(error){
    console.log(error)
    Showalert(error.message,"danger")
    setProjects([])
  }
}

  //////////// Updating A Project ////////////
  const UpdateProject = async (id,Title,link, Pending_Task,Completed_Task) => {
    try {
      const url = `${import.meta.env.VITE_HOST_BASE_URLL}project/updateProject`;
      const data = { link: link, Pending_Task: Pending_Task ,Title:Title,project_id:id,Completed_Task:Completed_Task};
      const config = {
        headers: { 'Content-Type': 'application/json',
          "token":localStorage.getItem('token')
         }
      }
      if(localStorage.getItem('token')){
        const resp = await axios.put(url,data,config);
        if(resp.data.status){
          setProjects(Projects.map((project)=>project._id===id?resp.data.project:project))
          Showalert("Project Updated Successfully","success")
          return true
        }
      }

    } catch (error) {
      console.log(error)
      Showalert(error.message, "danger")
      return false
    }

  }

  return (
    <AppContext.Provider value={{ GoogleLogin, Login, SignUp, alert, Showalert, Data,setData,Loggedin ,Authenticated,ResendOTP,VerifyOTP,theme,setTheme,Projects,setProjects,DeleteProject,AddProject,UpdateProject}}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppStates;