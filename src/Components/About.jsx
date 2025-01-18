import React from 'react'
import { useContext } from 'react';
import AppContext from '../Context/AppContext';

function About() {

  const {theme} = useContext(AppContext)
  return (
    <div className='about-card-container'><div className="card" >
    <div  className="card-img-top" ></div>
    <div className={`card-body ${theme==="light"?"":"c-w bg-d"}`}>
      <h5 className="card-title">About Me</h5>
      <p className="card-text">Hey Everyone I am <b>Mayank Joshi</b> A Tech Lover &#129302; ,I love to learn new thechnologines and build things which are practically usefull, I build this Simple Project just as a Hobby and to enhancse my skills , I am currentyl upSkilling my Self in Fullstack Web Dev , <br /> I knew Several Technologies 
      </p><ul>
        <li> <b>Express</b>
          </li>
          <li>
  <b>React</b>
          </li>
          <li>
  <b>Mongodb</b>
          </li>
          <li>
            <b>Node Js</b>
          </li>
          <li>
          <b>Bootstrap</b>
          </li>
          <li>
            <b>Tailwind</b>
          </li>
          <li>
            <b>
              Python
            </b>
          </li>
          <li><b>
            Git & Github</b>
          </li>
          </ul> 
      
      <p>I am open to provide Service related to Web Development</p>
      <div className="social-icon-container">
        <h3>Feel Free To Contact</h3>
  <div className="social-icon">
    <a href="https://www.linkedin.com/in/mayank-joshi-027b00325/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
      <i className="fab fa-linkedin fa-2x"></i>
    </a>
    <a href="https://www.instagram.com/mayankjoshi.in.01/ ">
      <i className="fab fa-instagram fa-2x"></i>
    </a>
    {/* Email  */}
    <a href="mailto:mayankjoshi.in.123@gmail.com">
      <i className="fas fa-envelope fa-2x"></i>
    </a>
    {/* git hub */}
    <a href="https://github.com/Mayank-Joshi01">
      <i className="fab fa-github fa-2x"></i>
    </a>
  
  </div>
      </div>
    </div>
  </div>
    </div>
  )
}

export default About