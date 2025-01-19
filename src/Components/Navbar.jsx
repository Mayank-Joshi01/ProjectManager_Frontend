import React ,{useState}from 'react'
import { NavLink } from 'react-router-dom'
import { useLocation} from 'react-router-dom'
import { useContext } from 'react';
import { useEffect } from 'react';
import AppContext from '../Context/AppContext';

/// Navbar

function Navbar() {
  const {Authenticated,theme,setTheme} = useContext(AppContext)

  let location = useLocation();

  const [img, setImg] = useState(null)


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
    e.children[0].classList.toggle("none"), e.children[1].classList.toggle("none"),document.body.classList.toggle("bg-d");
  if(theme === "light"){
    setTheme("dark")}
    else if(theme==="dark"){
      setTheme("light");
    }
  }


//// To Stop Multiple Rendering of Image
  useEffect(()=>{
    setTimeout(()=>{
    if(localStorage.getItem("img")){
      console.log("hoo")
      setImg(localStorage.getItem("img"))
    }},100)
  },[localStorage.getItem("img")])

  
  return (
    <div className="navbar-container">

{/* // Navbar with Home and About and App Name   */}

      <nav className={`navbar navbar-expand-lg ${theme==="light"?"bg-body-tertiary":"bg-dark"}`}>
        <div className="container-fluid">
          <NavLink className={`navbar-brand ${theme==="light"?"":"c-w"}`} to="/" >Task Manager</NavLink>
          <button className={`navbar-toggler ${theme==="light"?"":"bg-w"}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                       <NavLink className={`nav-link ${theme==="light"?"":"c-w"} ${location.pathname === "/" ? "active-link" : ""}`} to="/" ><span  data-bs-toggle={condition ? "collapse" : undefined}
                        data-bs-target={condition ? "#navbarSupportedContent" : undefined}
                        aria-controls={condition ? "navbarSupportedContent" : undefined}
                        aria-expanded="false">Home</span></NavLink>
                            </li>
              <li className="nav-item">
                        <NavLink className={`nav-link ${theme==="light"?"":"c-w"} ${location.pathname === "/about" ? "active-link" : ""}`} to="/about/" ><span  data-bs-toggle={condition ? "collapse" : undefined}
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
        <div className={`mode ${theme==="light"?"":"c-w"}`} id="mode-container" onClick={handelMode}>
          <i className="fa-solid fa-sun mode-icon" id='light-mode' data-visible="true"></i>
          <i className={`fa-solid fa-moon mode-icon none`} id='dark-mode' data-visible="false"></i>
        </div>
      </label>

{Authenticated?<div className="user-nav">
  <NavLink to="/user/">{img?<img className='user-img' src={img} loading="lazy" alt="user"  />:<i className="fa-solid fa-circle-user user-nav-icon"></i>}</NavLink>
      <NavLink className="btn btn-outline-primary" to="/logout/">Logout</NavLink>
      </div>:<div className="aut-btn">
        <NavLink className="btn btn-outline-primary" to="/login/">Login</NavLink>
        <NavLink className="btn btn-outline-primary" to="/Signup/">SignUp</NavLink>
      </div>
}
      </div>
    </div>
  )
}

export default Navbar