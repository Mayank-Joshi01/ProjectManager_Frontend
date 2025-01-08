import { useGoogleLogin } from '@react-oauth/google'
import AppContext from './AppContext'
import axios from 'axios'
import React from 'react'

const AppStates = (props) => {


  /// creating instance of GoogleLogin Popup
  const GoogleLogin = useGoogleLogin({

    onSuccess: async (res) => {

      if (res.access_token) {

        /// defining arguments for axios post request
        const url = `${import.meta.env.VITE_HOST_BASE_URLL}auth/googlelogin`;
        const data = { res }
        const config = {
          headers: { 'Content-Type': 'application/json' },
        }

        /// making post request to server
        const res = await axios.post(url, data, config);

        console.log('Response:', res);

        /// returning response data
        return res.data;
      }
      else {
        console.log('Error')
      }
    },
    onError: (error) => {
      console.log(error)
    }
  })


  

  return (
    <AppContext.Provider value={{ GoogleLogin }}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppStates;