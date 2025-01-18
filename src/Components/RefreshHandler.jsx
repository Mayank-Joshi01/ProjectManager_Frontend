import React, { useEffect ,useContext} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AppContext from '../Context/AppContext'


function RefreshHandler() {

    const {Authenticated,Loggedin} = useContext(AppContext)
let navigate = useNavigate()
let location = useLocation()

useEffect(() => {

  console.log(Authenticated)
    Loggedin();
    if(!Authenticated && location.pathname !== "/login/" && location.pathname !== "/Signup/" && location.pathname !== "/about/"){
      console.log("whats wrong")
        navigate("/login")
    }
    else if(Authenticated){ {if(location.pathname === "/login" || location.pathname === "/login/" || location.pathname === "/Signup/"){
      console.log("whats not wrong")
        navigate("/")
    }}}},[Authenticated])
  return (
    <>
    </>
  )
}

export default RefreshHandler