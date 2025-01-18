import React, { useEffect } from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import AppContext from '../Context/AppContext';
import axios from 'axios';

function User() {

  const {Data,theme,Showalert} = useContext(AppContext)

  const [values,setValues] = useState({text:"",btn:""})

  /// Setting users IMage
  const [imgUrl, setimgUrl] = useState("https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png")
  
  /// handeling Change in Image
  const handelChange = ()=>{}

  /// Updating Image
  const handelSubmit = ()=>{}

  // password update
  const handelPasswordUpdate = async (e)=>{
    e.preventDefault();
try{
    const password = document.getElementById('password').value
    const url = `${import.meta.env.VITE_HOST_BASE_URLL}user/updatepassword`
    const data = {password:password,email:Data.email}
    const config = {
      headers: { 'Content-Type': 'application/json' },
    }
    const resp = await axios.post(url, data, config)
    console.log(resp)
      if(resp.data.status){
        Showalert(`Update Link Send to your email ${Data.email} Successfully`, "success")
      }
      else{
        Showalert("Invalid Credentials", "danger")
      }
}
catch(error){
  console.log(error)
  Showalert(error.response.data.message, "danger")
}
  }


  //// handeling password visibility
  const [password_visiblity, setpassword_visiblity] = useState(false)

 
  const password_icon = document.getElementsByClassName('icon');

  /// functsion to toggle password visibility
    const togglePassword = ()=>{
      const password_input = document.getElementById('password')
      password_icon[0].classList.toggle('none')
      password_icon[1].classList.toggle('none')
      console.log(password_visiblity)
      if(password_visiblity){
        password_input.type = "text"
      }
      else{
        password_input.type = "password"
      }
  
    }



  const [password, setpassword] = useState(false)
  

  
  return (

    <div className="m-t30">
    {localStorage.getItem('token') && <section className="w-100 px-4 py-5" style={{ borderRadius: ".5rem .5rem 0 0" }}>
      <div className="row d-flex justify-content-center">
        <div className="col col-md-9 col-lg-7 col-xl-6">
          <div className={`card ${theme==="light"?"":"bg-b"}`} style={{ borderRadius: " 15px" }}>
            <div className="card-body p-4">
              <div className="d-flex">
                <div>
                  <div className="flex-shrink-0" style={{ width: "140px", height: "140px" }}>
                    <img src={imgUrl} align="middle" alt="Generic placeholder image" className="img-fluid img-form" style={{ width: "130px", height: "130px", bordeRadius: "10px" }} />
                  </div>
                  <form action="http://localhost:8001/api/user/updateimg" method="post" encType="multipart/form-data" className='img-form' >
                    <label htmlFor="image" className="img-label btn btn-outline-primary me-1 flex-grow-1">{values.text ? "Change" : "Change Image"}</label>
                    <input type="file" id='image' className='none' name="profileImage" onChange={handelChange} />
                    <button type="submit" onClick={handelSubmit} className={`btn img-label btn-outline-success me-1 flex-grow-1 ${values.btn ? "" : "d-none"}`}>Save</button>
                  </form>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5 className={`mb-1 ${theme==="light"?"":"c-w"}`}>{Data?Data.name:""}</h5>
                  <p className={`mb-2 pb-1 ${theme==="light"?"":"c-w"}`}>{Data?Data.about:""}</p>
                  <div className="d-flex justify-content-start rounded-3 p-2 mb-2 bg-body-tertiary">
                    <div>
                      <p className="small text-muted mb-1">Notes</p>
                      <p className="mb-0">hi </p>
                    </div>
                  </div>
                  <div className="d-flex pt-1">
                    <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-primary me-1 flex-grow-1">Edit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* password update */}

        <div className={`password-container styl-flx col-md-9 col-lg-7 col-xl-6 ${theme==="light"?"bg-dw":"bg-b"}`} >

        <div className={`password-update styl-flx ${password?"w100":""}`}>

          <p onClick={()=>{setpassword(!password)}} className={`${theme==="light"?"":"c-w"} h100`}>Update Password</p>

       {password&&<form onSubmit={handelPasswordUpdate}>
        <div className="password-box styl-flx">
          <input type="password" id="password" style={{lineHeight:"20px"}} required minLength={8} placeholder='Enter new password'/>
          <span onClick={()=>{setpassword_visiblity(!password_visiblity) ;togglePassword()}}>
          <i className="fa-solid fa-eye c-b icon "></i>
          <i className="fa-solid fa-eye-slash none icon"></i>
          </span>
          </div>
          <button type="submit" className="btn btn-primary" style={{lineHeight:"20px", marginLeft:"10px"}}>Update</button>
        </form>}

        </div>
      </div>

      </div>
    </section>}

  </div>
  )
}

export default User