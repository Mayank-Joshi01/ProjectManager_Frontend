import React,{ useState } from 'react'
import { BrowserRouter,Route,Routes,Navigate } from 'react-router-dom'
import Home from './Components/Home'
import About from './Components/About'
import Login from './Components/Login'
import Register from './Components/Register'
import User from './Components/User'
import Error from './Components/Error'


import './App.css'

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/contact" element={<Register />} />
        <Route exact path="/user" element={<User/>} />
        <Route path="*" element={<Error/>} />
      </Routes>

     </BrowserRouter>
    </>
  )
}

export default App
