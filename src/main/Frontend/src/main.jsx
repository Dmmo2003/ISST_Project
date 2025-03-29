import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from "@/components/ui/theme-provider";
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StrictMode>
  </BrowserRouter>
)
