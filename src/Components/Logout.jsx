import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import AppContext from '../Context/AppContext';

function Logout() {
    const {setData,Data,Disable} = useContext(AppContext)
    let navigate = useNavigate();
    useEffect(() => {
        Disable.current=false
        localStorage.removeItem("token")
        setData(null)
        if(localStorage.getItem("img")){
            localStorage.removeItem("img")
        }
        console.log(Data)
        navigate("/login")
    }, [])
  return <></>
}

export default Logout