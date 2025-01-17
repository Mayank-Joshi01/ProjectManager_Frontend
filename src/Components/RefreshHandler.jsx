import React, { useEffect ,useContext} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AppContext from '../Context/AppContext'


function RefreshHandler() {

    const {Authenticated,Loggedin} = useContext(AppContext)
let navigate = useNavigate()
let location = useLocation()

useEffect(() => {
    Loggedin();
    if(!Authenticated && location.pathname !== "/login" && location.pathname !== "/Signup"){
        navigate("/login")
    }
    else if(Authenticated){ {if(location.pathname === "/login" || location.pathname === "/Signup"){
        navigate("/")
    }}}},[location.pathname,Authenticated])
  return (
    <>
    </>
  )
}

export default RefreshHandler