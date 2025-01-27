import React from 'react';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '../Context/AppContext';


function NotLoginedPage() {
    const { theme } = useContext(AppContext)
    return (
        <div className='container'>
            <div className='LoginFirst'>
                <h1 className='t-a-c'>Login First </h1>
                <p className='t-a-c'>You Need to Login first to access this page</p>
                <div className="home-pge-buttons">
                    <NavLink className="btn btn-outline-primary w100" to="/login/">Login</NavLink>

                    <hr style={{border:`${theme==="light"?"":"1px solid white"}`}}/>
                          <p className={`form-text ${theme==="light"?"":"c-w"}`} >Dont have an Account?</p>
                          <NavLink className="btn btn-outline-primary w100" to="/Signup/">SignUp</NavLink>

                </div>
            </div>
        </div>
    )
}

export default NotLoginedPage