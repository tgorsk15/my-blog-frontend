import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthContextProvider } from './utils/authContext.jsx'

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </StrictMode>,
)
