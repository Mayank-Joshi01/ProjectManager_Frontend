import { useGoogleLogin } from '@react-oauth/google'
import AppContext from './AppContext'
import axios from 'axios'
import React, { useRef, useState, useEffect, useCallback } from 'react'


const AppStates = (props) => {


  // Theme of Website
  const [theme, setTheme] = useState("light")

  /// Alert State
  const [alert, setAlert] = useState(null)

  ///// To handel Progress Bar
  const [progress, setProgress] = useState(0)

  //// Projects State
  const [Projects, setProjects] = useState([])

  const [Data, setData] = useState(null);

  //// To set token as variable and since it will update during the run time and want to update and re render the component
  const [token, setToken] = useState(localStorage.getItem('token'))

  const [userImage, setUserImage] = useState(localStorage.getItem('img'))

  /// Authenticated State
  const [Authenticated, setAuthenticated] = useState(false)

  //// for continous progress bar
  const intervalRef = useRef(null);

  //// to disable all buttons and input once login is clicked
  const Disable = useRef(false)

  //// To check if user is logined or not
  const Logined = useRef(false)

  useEffect(() => {
    fetch_Projects();
  }, [token])

// ----------------- Alert Handling -----------------
const showAlert = (msg, type = 'info', duration = 2000) => {
setAlert({ msg, type });
  setTimeout(() => setAlert(null), duration);
};

  ////// Loading bar function to increase it's length linearly 
  const LodingBar = () => {
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(intervalRef.current); // Stop incrementing close to 100%
          return prev;
        }
        return prev + 1; // Increment progress linearly
      });
    }, 50);
  } // Increase progress every 50ms


//// Unified API request handler
  const makeRequest = async (method, endpoint, data = {}) => {
    try {
      const response = await axios[method](
        `${import.meta.env.VITE_HOST_BASE_URLL}${endpoint}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            token: token,
          },
        }
      )
      return response
    } catch (error) {
      showAlert(error.message, "danger")
    } finally {}
  }

///// Creating instance of GoogleLogin Popup
  const GoogleLogin = useGoogleLogin({

    onSuccess: async (res) => {
      LodingBar()
      if (res.access_token) {
        const resp  = await makeRequest('post', 'auth/googlelogin', res)

        if (resp.data.status) {
          clearInterval(intervalRef.current)
          setProgress(100)
          setData(resp.data);
          localStorage.setItem('token', resp.data.token)
          localStorage.setItem('img', resp.data.img)
          setAuthenticated(true)
          setToken(localStorage.getItem('token'))
          setUserImage(localStorage.getItem('img'))
          showAlert(`Welcome ${resp.data.data.name} to Task Manager, Logined Sucessfully`, "success")
        }

      }
      else { showAlert("Invalid Credentials", "danger") }

    },
    onError: (error) => {
      clearInterval(intervalRef.current)
      Disable.current = false
      setProgress(100)
    }
  })


////// SignUp Functionality
  const SignUp = async (user) => {
    try {
      LodingBar();
      const data = { name: user.name, email: user.email, password: user.password };

      /// making post request to server
      const resp = await makeRequest('post', 'auth/signup', data)

      if (resp.data.status) {
        clearInterval(intervalRef.current)
        setProgress(100)
        showAlert(`OTP Sent Sucessfully to ${user.email}`, "success")
        /// Updating data state
        setData(resp.data);
        return true
      }
    }
    catch (error) {
      clearInterval(intervalRef.current)
      setProgress(100)
      Disable.current = false
      return false
    }
  }


/////////// Login functionality
  const Login = async (user) => {
    try {
      LodingBar();
      const data = { name: user.name, email: user.email, password: user.password };

      const resp = await makeRequest('post', 'auth/login', data)

      if (resp.data.status) {
        clearInterval(intervalRef.current)
        setProgress(100)
        localStorage.setItem('token', resp.data.token)
        showAlert(`Welcome ${resp.data.data.name} to Task Manager, Logined Sucessfully`, "success")
        setToken(localStorage.getItem('token'))
        setUserImage(localStorage.getItem('img'))
        setData(resp.data);
        setAuthenticated(true)
        
      }

    } catch (error) {
      clearInterval(intervalRef.current)
      setProgress(100)
      Disable.current = false
    }
  }

  /// Resend OTP Functionality

  const ResendOTP = async (email) => {
    try {
      const data = { email: email };

      const resp = await makeRequest('post', 'auth/resendotp', data)

      if (resp.data.status) {
        showAlert("OTP Sent Successfully", "success")
      }
      else {
        showAlert("Invalid Credentials", "danger")
      }

    } catch (error) {
      console.log(error);
      showAlert("Invalid Credentials", "danger")
    }
  }


  /// Verify OTP Functionality
  const VerifyOTP = async (id, OTP) => {
    try {
      const data = { id: id, otp: OTP };

      const resp = await makeRequest('post', 'auth/verifyotp', data)

      if (resp.data.status) {
        showAlert("OTP Verified Successfully", "success");
        localStorage.setItem('token', resp.data.token);
        setAuthenticated(true)
        setToken(localStorage.getItem('token'))
        return true

      }
      else {
        showAlert("Invalid Credentials", "danger")
        return false
      }
    } catch (error) {
      return false
    }
  }


  /// Checking the user is authenticated logied in
  const Loggedin = async () => {
    try {
      if (token) {
        const resp = await makeRequest('post', 'auth/auth',{})   
        if (resp.data.status) {
          Logined.current = true
          setAuthenticated(true)
          setData(resp.data.data)
          return true
        }
      }
    } catch (error) {
      setAuthenticated(false)
      setData(null)
      return false
    }
  }


  //////////// Getting Projects ////////////
  const fetch_Projects = async () => {
    try {
      const url = `${import.meta.env.VITE_HOST_BASE_URLL}project/fetchProjects`;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "token": token
        }
      }
      if (token) {
        const resp = await axios.get(url, config);/////// Note: dont use data in get request in axios
        if (resp.data.status) {
          setProjects(resp.data.projects)
          return
        }
      }
      setProjects([])
    }
    catch (error) {
      console.log(error)
      showAlert(error.message, "danger")
      setProjects([])
    }
  }


  //////////// Adding A Project ////////////
  const AddProject = async (Title, link, Pending_Task) => {
    try {
      const data = { link: link, Pending_Task: Pending_Task, Title: Title };

      if (token) {
        const resp = await makeRequest('post', 'project/addProject', data)
        console.log(resp)
        if (resp.data.status) {
          setProjects([...Projects, resp.data.project])
          showAlert("Project Added Successfully", "success")
          return
        }
      }
      setProjects([])
    }
    catch (error) {
      setProjects([])
    }
  }


  //////////// Deleting A Project ////////////
  const DeleteProject = async (id) => {
    try {
      const url = `${import.meta.env.VITE_HOST_BASE_URLL}project/deleteProject/${id}`;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "token": token
        }
      }
      if (token) {
        const resp = await axios.delete(url, config);
        if (resp.data.status) {
          setProjects(Projects.filter((project) => project._id !== id))
          showAlert("Project Deleted Successfully", "success")
          return
        }
      }
      setProjects([])
    }
    catch (error) {
      console.log(error)
      showAlert(error.message, "danger")
      setProjects([])
    }
  }


  //////////// Updating A Project ////////////
  const UpdateProject = async (id, Title, link, Pending_Task, Completed_Task) => {
    try {
      const data = { link: link, Pending_Task: Pending_Task, Title: Title, project_id: id, Completed_Task: Completed_Task };

      if (localStorage.getItem('token')) {
        const resp = await makeRequest('put', 'project/updateProject', data)
        if (resp.data.status) {
          setProjects(Projects.map((project) => project._id === id ? resp.data.project : project))
          showAlert("Project Updated Successfully", "success")
          return true
        }
      }
    } catch (error) {
      return false
    }
  }

  return (
    <AppContext.Provider value={{ GoogleLogin, userImage,setUserImage,Disable, setToken,Logined, progress, setProgress, Login, SignUp, alert, showAlert, Data, setData, Loggedin, Authenticated, setAuthenticated, ResendOTP, VerifyOTP, theme, setTheme, Projects, setProjects, DeleteProject, AddProject, UpdateProject }}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppStates;