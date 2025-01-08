import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppStates from './Context/AppStates.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    {/* /// Wrapping App component and AppStates with GoogleOAuthProvider */}
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>

      {/* /// Wrapping App component with AppStates */}
      <AppStates>

        <App />

      </AppStates>

    </GoogleOAuthProvider>

  </StrictMode>,
)
