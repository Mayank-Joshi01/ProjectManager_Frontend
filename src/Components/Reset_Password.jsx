import React from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import AppContext from '../Context/AppContext'
import { useContext } from 'react'
import axios from 'axios'

function Reset_Password() {
    let location = useLocation()
    let navigate = useNavigate()
    
    const {showAlert} = useContext(AppContext)
    const queryParams = new URLSearchParams(location.search);

    const token = queryParams.get("token");
    const id = queryParams.get("id");
  
    if (!token || !id) {
      return <p>Error: Missing token or user ID</p>;
    }

    const reseting_password = async ()=>{
    const url = `${import.meta.env.VITE_HOST_BASE_URLL}user/reset_password?token=${token}&id=${id}`;
    const data = {};
    const config = {
      headers: { 'Content-Type': 'application/json' },
    }

    /// making post request to server
    const resp = await axios.post(url, data, config);

    if (resp.data.status) {
      showAlert("Password Updated Successfully", "success")
      navigate("/user/")
      
    }
    else {
      showAlert("Something Went Wrong", "danger")
      navigate("/user/")
    }
    return resp
}
    useEffect(()=>{
        reseting_password()
    },[])


  return (
    <div>Reset_Password</div>
  )
}

export default Reset_Password