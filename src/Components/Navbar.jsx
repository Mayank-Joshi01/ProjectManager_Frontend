import React ,{useState}from 'react'
import { NavLink } from 'react-router-dom'
import { useLocation} from 'react-router-dom'
import { useContext } from 'react';
import AppContext from '../Context/AppContext';

/// Navbar

function Navbar() {
  const {Authenticated} = useContext(AppContext)

console.log(Authenticated)
  let location = useLocation();


  /// Monitoring the width of the window
  const [width, setWidth] = useState(window.innerWidth);

  // Handling the resize of the window
  const handleResize = () => {
      setWidth(window.innerWidth);
  };
  window.addEventListener("resize", handleResize);

  let condition = width <= 990 ? true : false;


  // Handling the mode of the website
  const handelMode = () => {
    var e = document.getElementById("mode-container");
    e.children[0].classList.toggle("none"), e.children[1].classList.toggle("none")
    //  ,document.body.classList.toggle("dark-mode");
  }

  return (
    <div className="navbar-container">

{/* // Navbar with Home and About and App Name   */}

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <NavLink className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/" ><span  data-bs-toggle={condition ? "collapse" : undefined}
                        data-bs-target={condition ? "#navbarSupportedContent" : undefined}
                        aria-controls={condition ? "navbarSupportedContent" : undefined}
                        aria-expanded="false">Home</span></NavLink>
                            </li>
              <li className="nav-item">
                        <NavLink className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about/" ><span  data-bs-toggle={condition ? "collapse" : undefined}
                        data-bs-target={condition ? "#navbarSupportedContent" : undefined}
                        aria-controls={condition ? "navbarSupportedContent" : undefined}
                        aria-expanded="false">About</span></NavLink>
                            </li>
            </ul>
          </div>
        </div>
      </nav>

{/* // User Login and Register Button and Mode Button and user button */}

<div className="nav-user">
      <input type="checkbox" name="mode-checkbox" id="mode-checkbox" className='none' onChange={(e)=>{console.log("changed to : ",e.target.value)}} />
      <label htmlFor="mode-checkbox">
        <div className="mode" id="mode-container" onClick={handelMode}>
          <i className="fa-solid fa-sun mode-icon" id='light-mode' data-visible="true"></i>
          <i className="fa-solid fa-moon mode-icon none" id='dark-mode' data-visible="false"></i>
        </div>
      </label>

{Authenticated?<div className="user-nav">
  <NavLink className="" to="/user/"><i class="fa-solid fa-circle-user user-nav-icon"></i></NavLink>
      <NavLink className="btn btn-outline-success" to="/logout/">Logout</NavLink>
      </div>:<div className="aut-btn">
        <NavLink className="btn btn-outline-success" to="/login/">Login</NavLink>
        <NavLink className="btn btn-outline-success" to="/Signup/">SignUp</NavLink>
      </div>
}
      </div>
    </div>
  )
}

export default Navbar