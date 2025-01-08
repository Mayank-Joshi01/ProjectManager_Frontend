import React from 'react'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

function Error() {
  let navigate = useNavigate() 
  return (
    <div className='container mt80 wvw'>
      <h1>404 Not Found</h1>
      <p>Back to home page</p>
      <NavLink to='/' className="btn btn-primary">Home</NavLink>
    </div>
  )
}

export default Error