import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Assets/Style/Global.css'
import App from './App.jsx'

createRoot(document.getElementById('easy-ticket')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
