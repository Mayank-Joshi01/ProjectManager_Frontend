import { useGoogleLogin } from '@react-oauth/google'
import AppContext from './AppContext'
import axios from 'axios'
import React, { useRef } from 'react'
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

///// To handel Progress Bar
  const [progress, setProgress] = useState(0)

  //// for continous progress bar
  const intervalRef = useRef(null);

  //// to disable all buttons and input once login is clicked
  const Disable = useRef(false)

  //// To set token as variable and since it will update during the run time and want to update and re render the component
  const [token,setToken] = useState(localStorage.getItem('token'))

  //// To check if user is logined or not
  const Logined = useRef(false)

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

  ////// Loading bar function to increase it's length linearly 
  const LodingBar = ()=>{intervalRef.current = setInterval(() => {
    setProgress((prev) => {
      if (prev >= 95) {
        clearInterval(intervalRef.current); // Stop incrementing close to 100%
        return prev;
      }
      return prev + 1; // Increment progress linearly
    });
  }, 50);} // Increase progress every 50ms


  /// creating instance of GoogleLogin Popup
  const GoogleLogin = useGoogleLogin({

    onSuccess: async (res) => {
      LodingBar()

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
          clearInterval(intervalRef.current)
      setProgress(100)
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
      clearInterval(intervalRef.current)
      Disable.current=false
      setProgress(100)
      console.log(error)
      Showalert("Invalid Credentials", "danger")
    }
  })


  /// SignUp Functionality

  const SignUp = async (user) => {

    try {
      LodingBar();
      const url = `${import.meta.env.VITE_HOST_BASE_URLL}auth/signup`;
      const data = { name: user.name, email: user.email, password: user.password };
      const config = {
        headers: { 'Content-Type': 'application/json' },
      }

      /// making post request to server
      const resp = await axios.post(url, data, config);

      if (resp.data.status) {
        clearInterval(intervalRef.current)
      setProgress(100)
        Showalert(`OTP Sent Sucessfully to ${user.email}`, "success")
        /// Updating data state
        setData(resp.data);
        return true
      }
    }
    catch (error) {
      clearInterval(intervalRef.current)
      setProgress(100)
      Disable.current=false
      console.log(error)
      Showalert("Invalid Credentials", "danger")
      return false
    }
  }

  // Login functionality

  const Login = async (user) => {
    try {
      LodingBar();
      const url = `${import.meta.env.VITE_HOST_BASE_URLL}auth/login`;
      const data = { name: user.name, email: user.email, password: user.password };
      const config = {
        headers: { 'Content-Type': 'application/json' },
      }

      /// making post request to server
      const resp = await axios.post(url, data, config);

      if (resp.data.status) {
        clearInterval(intervalRef.current)
        setProgress(100)
        localStorage.setItem('token', resp.data.token)
        Showalert(`Welcome ${resp.data.data.name} to Task Manager, Logined Sucessfully`, "success")

        /// Updating data state
        setData(resp.data);
        setAuthenticated(true)
      }

    } catch (error) {
      clearInterval(intervalRef.current)
      setProgress(100)
      Disable.current=false
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
        return true

      }
      else {
        Showalert("Invalid Credentials", "danger")
        return false
      }

    } catch (error) {
      console.log(error);
      Showalert("Invalid Credentials", "danger")
      return false
    }
  } 


  /// Checking the user is authenticated logied in
  const Loggedin = async()=>{
    try{
      // LodingBar()
      if(token){
      const url = `${import.meta.env.VITE_HOST_BASE_URLL}auth/auth`;
      const data = {};
      const config = {
        headers: { 'Content-Type': 'application/json',
          "token":token
         },
      }
      
        const resp = await axios.post(url,data,config);
        if(resp.data.status){
          Logined.current=true
          setAuthenticated(true)
          setData(resp.data.data)
      //     clearInterval(intervalRef.current)
      // setProgress(100)
          return true
        }
      }
      
    }catch(error){
      console.log(error)
      Showalert(error.message,"danger")
      setAuthenticated(false)
      setData(null)
      // clearInterval(intervalRef.current)
      // setProgress(100)
      return false
    }
  }

  //////////// Getting Projects ////////////
  const fetch_Projects = async()=>{
    try{
      const url = `${import.meta.env.VITE_HOST_BASE_URLL}project/fetchProjects`;
      const data = {};
      const config = {
        headers: { 'Content-Type': 'application/json' ,
          "token":token
        }
      }
      if(token){
        const resp = await axios.get(url,config);/////// Note: dont use data in get request in axios
        if(resp.data.status){
          setProjects(resp.data.projects)
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
      const url = `${import.meta.env.VITE_HOST_BASE_URLL}project/addProject`;
      const data = { link: link, Pending_Task: Pending_Task ,Title:Title};
      const config = {
        headers: { 'Content-Type': 'application/json' ,
          "token":token
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
    <AppContext.Provider value={{ GoogleLogin,Disable,Logined,progress,setProgress,Login, SignUp, alert, Showalert, Data,setData,Loggedin ,Authenticated,setAuthenticated,ResendOTP,VerifyOTP,theme,setTheme,Projects,setProjects,DeleteProject,AddProject,UpdateProject}}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppStates;