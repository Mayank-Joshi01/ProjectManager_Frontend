import React, { useEffect } from 'react'
import AppContext from '../Context/AppContext'
import { useContext, useState } from 'react'
import { use } from 'react';

// SignUp Page 

function SignUp() {

  /// Creating User State 
  const [user, setuser] = useState({ name: "", email: "", password: "" });

  /// Time Left for Resend OTP
  const [time_left, settime_left] = useState(30);

  // To handel change in input tag
  const handelChange = (e) => {
    setuser({ ...user, ...{ [e.target.name]: e.target.value } })
    console.log(user);
  }

  /// Importing GoogleLogin from AppContext
  const { GoogleLogin, SignUp, Showalert,ResendOTP,VerifyOTP,Data,theme } = useContext(AppContext)


  ///////////////// OTP  /////////////////////////

  var otp = {d1: 0,d2: 0,d3: 0,d4: 0,d5: 0, d6: 0}
  var OTP = "";

  // To set time to resend otp
  const setTimer = () => {
    let time = 30;
    let timer = setInterval(() => {
      time--;
      settime_left(time.toString().padStart(2, '0'));
      if (time === 0) {
        clearInterval(timer);
      }
    }, 1000);
  }

  // To handel OTP Resend
  const handelOTP_Resend = () => {
    if (time_left === "00") {
      console.log("OTP Resend Successfully");
      setTimer();
      ResendOTP(user.email);
    }
  }

  /// handeling Values in OTP Page
  const inputs = document.querySelectorAll('.input-fields input')
  const verify_otp_button = document.querySelector('.otp-modal button')

  /// handeling OTP Inputs
  inputs.forEach((input, index1) => {
    input.addEventListener('keyup', (e) => {
      const currentInput = input, nextInput = input.nextElementSibling, prevInput = input.previousElementSibling;

      /// checking if input is longer than 1
      if (currentInput.value.length > 1) {
        currentInput.value = ""
        return;
      }

      /// Remonving Invalid OTP Class
      if(input.classList.contains("invalid-otp")){

        /// editing input tags individually
      for (let i = 0; i < 6; i++) {
        inputs[i].classList.remove("invalid-otp")
      }
      }


      //// arrow key to move to next input
      if (nextInput && nextInput.hasAttribute('disabled') && currentInput !== "" && e.key !== "Backspace") {
        nextInput.removeAttribute('disabled')
        nextInput.focus();
      }

      /// arrow key to move to prev input if backspace is pressed
      if (e.key === "Backspace") {

        inputs.forEach((input, index2) => {

          if (index1 <= index2 && prevInput) {

            currentInput.value = ""
            console.log(currentInput.name)
            currentInput.setAttribute('disabled', true)
            prevInput.focus();
          }
        })
      }

      /// enabling verify otp button
      if (inputs[5].value !== "") {
        verify_otp_button.removeAttribute('disabled')
      }
      else {
        verify_otp_button.setAttribute('disabled', true)
      }

    })
  })

  // To open OTP Page
  const openOtpPage = () => {
    const interval = setInterval(() => {
      if (Data) { // Check if Data is ready
        console.log("Data is ready:", Data);
  
        // Execute your code
        document.getElementById("otp-page").style.display = "block";
        window.addEventListener("load", () => {
          inputs[0]?.focus();
        });
        setTimer();
  
        // Stop the interval
        clearInterval(interval);
      } 
      else if(Data === null){
        clearInterval(interval);
      }
      else {
        console.log("Waiting for Data...");
      }
    }, 100); // Check every 100ms
  }

  // To handel OTP Value
  const handelOTP_value = (e) => {
    otp.d1 = e.target.d1.value;
    otp.d2 = e.target.d2.value;
    otp.d3 = e.target.d3.value;
    otp.d4 = e.target.d4.value;
    otp.d5 = e.target.d5.value;
    otp.d6 = e.target.d6.value;
    e.preventDefault();

    /// Checking if OTP is empty
    if(otp.d1 === "" || otp.d2 === "" || otp.d3 === "" || otp.d4 === "" || otp.d5 === "" || otp.d6 === ""){
      Showalert("Please Enter Valid OTP", "danger");

      //// Adding Invalid OTP Class
      for (let i = 0; i < 6; i++) {
        inputs[i].classList.add("invalid-otp")
      }

      return;
    }

    OTP = `${otp.d1}${otp.d2}${otp.d3}${otp.d4}${otp.d5}${otp.d6}`;
    VerifyOTP(Data.data._id,OTP);
  }

  // To handel form submission
  const handelSubmit = (e) => {
    console.log(user);
    e.preventDefault();
    SignUp(user);
    openOtpPage();
    
  }

  return (
    <>

      {/* ////// OTP Page ////// */}
      <div className="otp-page none" id="otp-page">

        <div className="otp-container">

          <div className="otp-modal">
            <ion-icon name="shield-checkmark-outline"></ion-icon>
            <h4>Enter OTP Code </h4>
            <form action="" onSubmit={handelOTP_value}>
              <div className="input-fields">
                <input type="number" required name='d1' />
                <input type="number" required name='d2' disabled />
                <input type="number" required name='d3' disabled />
                <input type="number" required name='d4' disabled />
                <input type="number" required name='d5' disabled />
                <input type="number" required name='d6' disabled />
              </div>
              <div className="otp-time">
                <p className={`inline-block resend-otp  ${time_left > 0 ? "disabled" : "enabled"}`} onClick={handelOTP_Resend} >RESEND OTP</p>
                <p className='inline-block'> in <b>00:{time_left}</b></p>
              </div>
              <button className="btn btn-primary w100" type='submit' disabled>Verify OTP</button>

            </form>
          </div>
        </div>
      </div>


      {/* ////// SignUp Page ////// */}
      <div className='container form'>

        <h1 className={`${theme==="light"?"":"c-w"}`}>SignUp To Project Manager</h1>
        <form onSubmit={handelSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className={`form-label ${theme==="light"?"":"c-w"}`}>Username</label>
            <input type="text" className="form-control" required={true} id="name" onChange={handelChange} name='name' placeholder="Name" aria-describedby="nameHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className={`form-label ${theme==="light"?"":"c-w"}`}>Email address</label>
            <input type="email" className="form-control" required={true} id="exampleInputEmail1" onChange={handelChange} name="email" placeholder="Email" aria-describedby="emailHelp" />
            <div id="emailHelp" className={`form-text ${theme==="light"?"":"c-w"}`}>We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className={`form-label ${theme==="light"?"":"c-w"}`} >Password</label>
            <input type="password" className="form-control" minLength={8} required={true} onChange={handelChange} name="password" id="exampleInputPassword1" />
          </div>
          <button type="submit" className="btn btn-primary w100">SignUp</button>
        </form>
        <hr />
        <button className='w100 btn btn-primary' onClick={GoogleLogin}><img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" style={{ height: "30px" }} className='mx-1' alt="" /> SignUp With Google</button>


      </div>
    </>
  )
}

export default SignUp