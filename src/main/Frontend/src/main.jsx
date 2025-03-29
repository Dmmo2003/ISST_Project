import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import {LoadScript} from '@react-google-maps/api';
import config from './config/config.js';

const googleMapsApiKey = config.googleMapsApiKey

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <App />
      </LoadScript>
    </StrictMode>
  </BrowserRouter>
)


