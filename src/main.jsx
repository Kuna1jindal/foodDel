import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {CartLength} from './utils/cartLength.jsx';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <CartLength>
    <App />
   </CartLength>
  </StrictMode>
)
