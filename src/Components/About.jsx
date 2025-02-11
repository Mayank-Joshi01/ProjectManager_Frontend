import React from 'react'
import { useContext } from 'react';
import AppContext from '../Context/AppContext';

function About() {

  //// Getting theme from Context
  const { theme } = useContext(AppContext)

  return (

    ///// About Card //////////

    // <!-- Container for the About Me card -->
<div className='about-card-container'>
  
  {/* <!-- Card Component --> */}
  <div className="card">
    
    {/* <!-- Placeholder for a top image (if needed) --> */}
    <div className="card-img-top"></div>
    
    {/* <!-- Card Body with Dynamic Theme Support --> */}
    <div className={`card-body ${theme === "light" ? "" : "c-w bg-d"}`}>
      
      {/* <!-- Card Title --> */}
      <h5 className="card-title">About Me</h5>
      
      {/* <!-- Brief Introduction --> */}
      <p className="card-text">
        Hey Everyone, I am <b>Mayank Joshi</b>, a Tech Lover &#129302;. 
        I love learning new technologies and building practical applications. 
        This simple project was created as a hobby to enhance my skills.
        <br />
        I am currently upskilling myself in Full Stack Web Development.
        <br />
        Here are some of the technologies I am familiar with:
      </p>
      
      {/* <!-- List of Known Technologies --> */}
      <ul>
        <li><b>Express</b></li>
        <li><b>React</b></li>
        <li><b>MongoDB</b></li>
        <li><b>Node.js</b></li>
        <li><b>Bootstrap</b></li>
        <li><b>Tailwind</b></li>
        <li><b>Python</b></li>
        <li><b>Git & GitHub</b></li>
      </ul>
      
      {/* <!-- Offering Services --> */}
      <p>I am open to providing services related to Web Development.</p>
      
      {/* <!-- Social Media Links --> */}
      <div className="social-icon-container">
        <h3>Feel Free To Contact</h3>
        <div className="social-icon">
          
          {/* <!-- LinkedIn Profile --> */}
          <a href="https://www.linkedin.com/in/mayank-joshi-027b00325/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
          
          {/* <!-- Instagram Profile --> */}
          <a href="https://www.instagram.com/mayankjoshi.in.01/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram fa-2x"></i>
          </a>
          
          {/* <!-- Email Contact --> */}
          <a href="mailto:mayankjoshi.in.123@gmail.com">
            <i className="fas fa-envelope fa-2x"></i>
          </a>
          
          {/* <!-- GitHub Profile --> */}
          <a href="https://github.com/Mayank-Joshi01" target="_blank" rel="noopener noreferrer">
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