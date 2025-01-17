import React from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
    let navigate = useNavigate()
    localStorage.removeItem("token")
    if(localStorage.getItem("img")){
        localStorage.removeItem("img")
    }
    navigate("/login")
  return <></>
}

export default Logout