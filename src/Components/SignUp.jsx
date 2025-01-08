import React from 'react'
import AppContext from '../Context/AppContext'
import { useContext } from 'react'

// SignUp Page 

function SignUp() {

  /// Importing GoogleLogin from AppContext
  const { GoogleLogin } = useContext(AppContext)

  return (
    <div className='container login-form'>
      <h1>SignUp To Project Manager</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">Username</label>
          <input type="text" className="form-control" required={true} id="exampleInputName" placeholder="Name" aria-describedby="nameHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" required={true} id="exampleInputEmail1" placeholder="Email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
          <input type="password" className="form-control" minLength={8} required={true} id="exampleInputPassword1" />
        </div>
        <button type="submit" className="btn btn-primary w100">SignUp</button>
      </form>
      <hr />
      <button className='w100 btn btn-primary' onClick={GoogleLogin}><img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" style={{ height: "30px" }} className='mx-1' alt="" /> Login With Google</button>


    </div>
  )
}

export default SignUp