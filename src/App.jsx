import React,{ useState } from 'react'
import './App.css'
import { BrowserRouter,Route,Routes,Navigate } from 'react-router-dom'
import Home from './Components/Home';
import About from './Components/About';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import User from './Components/User';
import Error from './Components/Error';;
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

function App() {

  const isLogined = (element)=>{
    if(localStorage.getItem('token')){
      return element
    }else{
      return <Navigate to="/login/"/>
    }

  }

  return (
    <>
     <BrowserRouter>
     <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about/" element={<About />} />
        <Route exact path="/login/" element={<Login/>} />
        <Route exact path="/Signup/" element={<SignUp />} />
        <Route exact path="/user/" element={<User/>} />
        <Route path="*" element={<Error/>} />
      </Routes>
    <Footer/>
     </BrowserRouter>
    </>
  )
}

export default App
