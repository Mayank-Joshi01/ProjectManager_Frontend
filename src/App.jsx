import React from 'react'
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
import Alert from './Components/Alert';
import { useContext } from 'react';
import AppContext from './Context/AppContext';
import Logout from './Components/Logout';
import RefreshHandler from './Components/RefreshHandler';
import Reset_Password from './Components/Reset_Password';
import LoadingBar from 'react-top-loading-bar';
import NotLoginedPage from './Components/NotLoginedPage';

function App() {

  const {Authenticated,progress,setProgress,Logined} = useContext(AppContext)

  const IsLogined = ({element})=>{
    if(Authenticated || Logined.current){
      return element
    }else{
      return <NotLoginedPage/>
    }

  }

  return (
    <div style={{position:'relative' , minHeight:"90.9vh"}}>
     <BrowserRouter>
     <Navbar/>
     <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        style={{"marginTop":"52px"}}
      />
     <RefreshHandler/>
     <Alert/>
     <div>
      <Routes>
        <Route exact path="/" element={<IsLogined element={<Home/>} />} />
        <Route exact path="/about/" element={<About />} />
        <Route exact path="/login/" element={<Login/>} />
        <Route exact path="/Signup/" element={<SignUp />} />
        <Route exact path="/user/" element={<IsLogined element={<User/>} />} />
        <Route exact path="/logout/" element={<Logout/>}/>
        <Route exact path="/reset_password" element={<Reset_Password/>} />
        <Route path="*" element={<Error/>} />
      </Routes>
      </div>
    <Footer/>
     </BrowserRouter>
    </div>
  )
}

export default App
