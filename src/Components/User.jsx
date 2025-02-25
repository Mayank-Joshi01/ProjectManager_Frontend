import React, { useEffect, memo } from 'react'
import { useState, useRef } from 'react';
import { useContext } from 'react';
import AppContext from '../Context/AppContext';
import axios from 'axios';
import { Buffer } from 'buffer';
import { NavLink } from 'react-router-dom';

function User() {

  /////// Getting Data from Context //////////
  const { Data, theme, showAlert, setData, Projects, setUserImage } = useContext(AppContext)

  /////// Setting User Data //////////
  ////// Name and About
  const [Name, setName] = useState(Data.name)
  const [about, setabout] = useState(Data.about)


  const password_visiblity = useRef(false)


  const [password, setpassword] = useState(false)
  /////////Image Update /////////

  /// Handeling buttons under Image
  const editingImage = useRef(false);

  /// Setting user Image 
  const [imgUrl, setimgUrl] = useState("https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png")

  //// Storing image 
  const [file, setFile] = useState(null)

  /// To Stop Multiple Rendering of Image
  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem("img") && !Data.image) {
        setimgUrl(localStorage.getItem("img"))
      }
    }, 100)
    if (Data.image) {
      setimgUrl("data:image/png;base64," + bufferToBase64(Buffer.from(Data.image.data)))
      localStorage.setItem("img", "data:image/png;base64," + bufferToBase64(Buffer.from(Data.image.data)))
    }
  }, [localStorage.getItem("img"), Data])



  /// Function to convert image file to base64
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
        setimgUrl(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }



  /// handeling Change in Image
  const handelChange = (e) => {
    const files = e.target.files[0];
    editingImage.current = true;
    // setValue(values.current)
    setFile(files)
    convertToBase64(files)
  }


  /////// to convert buffer to base64
  const bufferToBase64 = (buffer) => {
    return buffer.toString('base64')
  };


  ///// Making API call to update Info
  const Update_User_info = async (formData) => {
    try {
      const url = `${import.meta.env.VITE_HOST_BASE_URLL}user/update_user_info`
      const config = {
        ////// Note : Make Sure Headers Should not Contain Content-Type : Application/Json 
        //////        since we are sending multipart/form-data
        headers: {
          "token": localStorage.getItem('token')
        },
      }
      const resp = await axios.post(url, formData, config)
      if (resp.status) {
        showAlert(`${resp.data.message}`, "success")
        setData(resp.data.user)
        resp.data.user.image ? setUserImage("data:image/png;base64," + bufferToBase64(Buffer.from(resp.data.user.image.data))) : ""
      }
    }
    catch (error) {
      console.log(error)
      showAlert("Internal Server Error", "danger")
    }
  }

  /// Updating Image
  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('name', Name);
    formData.append('about', about);
    Update_User_info(formData)
    editingImage.current = false;

  }

  ///// Update User Info /////////

  const [isEditing, setisEditing] = useState(false)


  ////////Password Update ///////////

  const handelPasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      const password = document.getElementById('password').value
      const url = `${import.meta.env.VITE_HOST_BASE_URLL}user/updatepassword`
      const data = { password: password, email: Data.email }
      const config = {
        headers: { 'Content-Type': 'application/json' },
      }
      const resp = await axios.post(url, data, config)
      if (resp.data.status) {
        showAlert(`Update Link Send to your email ${Data.email} Successfully`, "success")
      }
      else {
        showAlert("Invalid Credentials", "danger")
      }
    }
    catch (error) {
      console.log(error)
      showAlert(error.response.data.message, "danger")
    }
  }

  /// function to toggle password visibility

  const togglePassword = () => {
    password_visiblity.current = !password_visiblity.current;
    const password_icon = document.querySelectorAll('.password-icon');
    const password_input = document.getElementById('password')
    password_icon.forEach(icon => icon.classList.toggle('none'));
    password_input.type = password_visiblity.current ? "text" : "password";
  }


  const updatePassword_visiblity = (e) => {
    if (!password) { e.target.parentElement.parentElement.style.height = "100px"; setpassword(!password) }
    else { e.target.parentElement.parentElement.style.height = "50px"; setTimeout(() => { setpassword(!password) }, 1000) }
  }

  ///////// Info about User Projects /////////

  ////// Creating a componenet since it is used multiple times
  const Info_User_Projects = () => {
    return <div className={`d-flex justify-content-start rounded-3 p-2 mb-2 bg-body-tertiary m-b-4}`}>
      <div>
        <p className="small text-muted mb-1">Working on Projects</p>
        <p className="mb-0">{Projects.length} </p>
      </div>
    </div>
  }

  const Buttons_to_Edit_info = () => {
    return <div className="d-flex pt-1">
      <button onClick={() => { setisEditing(!isEditing) }} type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-primary me-1 flex-grow-1">{isEditing ? "Cancle" : "Edit"}</button>
      {isEditing && <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-success me-1 flex-grow-1">Save</button>}
    </div>
  }

  return (

    <div className="m-t30">
      {localStorage.getItem('token') && <section className="w-100 px-4 py-5" style={{ borderRadius: ".5rem .5rem 0 0" }}>
        <div className="row d-flex justify-content-center">
          <div className="col col-md-9 col-lg-7 col-xl-6">
            <div className={`card ${theme === "light" ? "" : "bg-b"}`} style={{ borderRadius: " 15px" }}>
              <div className="card-body p-4">
                <div className="d-flex">
                  <div>
                    <div className="flex-shrink-0" style={{ width: "130px", height: "130px", marginBottom: "10px" }}>
                      <img src={imgUrl} align="middle" alt="Generic placeholder image" className="img-fluid img-form" style={{ width: "130px", height: "130px", bordeRadius: "10px" }} />
                    </div>
                    <form action={`${import.meta.env.VITE_HOST_BASE_URLL}user/update_user_info`} method="post" encType="multipart/form-data" className='img-form styl-flx' >
                      <label htmlFor="image" className="img-label btn btn-outline-primary me-1 flex-grow-1 w100">{editingImage.current ? "Change" : "Change Image"}</label>
                      <input type="file" id='image' className='none' name="profileImage" onChange={handelChange} />
                      <button type="submit" onClick={handelSubmit} className={`btn img-label btn-outline-success me-1 flex-grow-1 ${editingImage.current ? "" : "none"}`}>Save</button>
                    </form>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    {isEditing ? <div>
                      <form onSubmit={handelSubmit}>
                        <div className="">
                          <input type="text" className={`${theme === "light" ? "" : "c-w"} ${theme === "light" ? "" : "bg-b"} form-control name-input-user`} data-theme={`${theme}`} required={true} maxLength={20} id="name" onChange={(e) => { setName(e.target.value) }} value={Name} name='name' placeholder="Name" aria-describedby="nameHelp" />
                          <input type="text" className={`${theme === "light" ? "" : "c-w"} ${theme === "light" ? "" : "bg-b"} form-control about-input-user`} data-theme={`${theme}`} required={true} id="about" maxLength={20} onChange={(e) => { setabout(e.target.value) }} value={about} name='about' placeholder="About" aria-describedby="nameHelp" />
                        </div>
                        <Info_User_Projects />
                        <Buttons_to_Edit_info />
                      </form>
                    </div> : <div><h5 className={`mb-1 ${theme === "light" ? "" : "c-w"}`}>{Data ? Data.name : ""}</h5>
                      <p className={`mb-2 pb-1 ${theme === "light" ? "" : "c-w"}`}>{Data ? Data.about : ""}</p>
                      <Info_User_Projects />
                      <Buttons_to_Edit_info />
                    </div>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* password update */}

          <div className={`password-container col-md-9 col-lg-7 col-xl-6 ${theme === "light" ? "bg-dw" : "bg-b"}`} style={{ display: "flex" }}>
            <div className={`password-update w100`}>
              <p onClick={updatePassword_visiblity} style={{ display: "block" }} className={`${theme === "light" ? "" : "c-w"}`}>Update Password</p>
              {password && <form onSubmit={handelPasswordUpdate}>
                <div className="password-box styl-flx">
                  <input type="password" id="password" style={{ lineHeight: "20px" }} required minLength={8} placeholder='Enter new password' />
                  <span onClick={togglePassword}>
                    <i className="fa-solid fa-eye c-b password-icon"></i>
                    <i className="fa-solid fa-eye-slash none password-icon"></i>
                  </span>
                </div>
                <button type="submit" className="btn btn-primary" style={{ lineHeight: "20px", marginLeft: "10px" }}>Update</button>
              </form>}
            </div>
          </div>

          {/* //////// Log Out Button ///////// */}
          <div>
            <NavLink className="btn btn-outline-primary w100" style={{ marginTop: "10px" }} to="/logout/">Logout</NavLink>
          </div>
        </div>
      </section>}

    </div>
  )
}

export default User