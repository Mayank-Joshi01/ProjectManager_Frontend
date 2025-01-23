import React from 'react'
import AppContext from '../Context/AppContext'

export default function Alert(props) {
const {alert} = React.useContext(AppContext);

    const Capetalize = (text)=>{
const Text = text.toLowerCase();
return Text.charAt(0).toUpperCase()+Text.slice(1);
    }
  return (
    <div style={{height:'55px',zIndex:"9999",height: "60px",width: "100%",top: "56px",position: "fixed", display:`${alert?"block":"none"}`}}>{
   alert && <div className={`alert alert-${alert.type} d-flex align-items-center mx-1`} role="alert">
  <div>
    <strong>{Capetalize(alert.type)}</strong> : {alert.msg}
  </div>
</div>}
</div>
  )
}