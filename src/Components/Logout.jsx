import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import AppContext from '../Context/AppContext';

function Logout() {
    const {setData,Disable,setAuthenticated,setToken,setUserImage} = useContext(AppContext)
    let navigate = useNavigate();
    useEffect(() => {
        Disable.current=false
        localStorage.removeItem("token")
        setToken(null)
        if(localStorage.getItem("img")){
            localStorage.removeItem("img")
            setUserImage(null)
        }
        setData(null)
        setAuthenticated(false)
        navigate("/login")
    }, [])
  return <></>
}

export default Logout