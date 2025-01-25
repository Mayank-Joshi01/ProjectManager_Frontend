import React from 'react'
import { useContext ,useState} from 'react';
import AppContext from '../Context/AppContext';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

/// Login Page

function Login() {

    /// Creating User State 
    const [user, setuser] = useState({email:"",password:""});
  
    // To handel change in input tag
    const handelChange = (e)=>{
      setuser({...user,...{[e.target.name]:e.target.value}})
      console.log(user);
    }

  /// Importing GoogleLogin from AppContext
  const { GoogleLogin ,Login,Loggedin,theme} = useContext(AppContext)

  useEffect(() => {Loggedin()}, [])

  // To handel form submission
  const handelSubmit = (e)=>{
    console.log(user);
    e.preventDefault();
    Login(user);
  }


  return (
    <div className='container form'>
      <h1 className={`t-a-c ${theme==="light"?"":"c-w"}`}>Login</h1>
      <form onSubmit={handelSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className={`form-label ${theme==="light"?"":"c-w"}`}>Email address</label>
          <input type="email" className="form-control" required={true} id="exampleInputEmail1" onChange={handelChange} name="email" aria-describedby="emailHelp" />
          <div id="emailHelp"  className={`form-text ${theme==="light"?"":"c-w"}`}>We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className={`form-label ${theme==="light"?"":"c-w"}`} >Password</label>
          <input type="password" className="form-control" minLength={8}onChange={handelChange} name='password' required={true} id="exampleInputPassword1" />
        </div>
        <button type="submit" className="btn btn-primary w100">Login</button>
      </form>
      <button className='w100 btn btn-primary' style={{marginTop:"10px",height:"38px"}} onClick={GoogleLogin}><img src="/images/google-symbol.png" style={{ height: "25px" }} className='mx-1' alt="" /> Login With Google</button>
      <hr style={{border:`${theme==="light"?"":"1px solid white"}`}}/>
      <p className={`form-text ${theme==="light"?"":"c-w"}`} >Dont have an Account?</p>
      <NavLink className="btn btn-outline-primary w100" to="/Signup/">SignUp</NavLink>

    </div>
  )
}

export default Login