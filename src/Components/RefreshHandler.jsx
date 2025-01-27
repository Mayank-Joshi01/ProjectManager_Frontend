import React, { useEffect ,useContext} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AppContext from '../Context/AppContext'


function RefreshHandler() {

    const {Authenticated,Loggedin,Logined} = useContext(AppContext)
let navigate = useNavigate()
let location = useLocation()

useEffect(() => {
  const checkAuthStatus = async () => {

    await Loggedin();
    if (Authenticated || Logined.current){
      if(location.pathname === "/login" || location.pathname === "/login/" || location.pathname === "/Signup/"){
        navigate("/")
      }
    }
  };

  checkAuthStatus();
}, [Authenticated]);
  return (
    <>
    </>
  )
}

export default RefreshHandler