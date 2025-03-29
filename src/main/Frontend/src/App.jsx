import { useState } from 'react'

import { Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import Header from './Header'
import MainPage from './MainPage'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import NoMatch from './NoMatch'
import EventDetails from "./EventDetails"; 
import './App.css'
import datos_probar from "./constants/datos_probar.json";



function App() {
  const navigate = useNavigate();


  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/event-details" element={<EventDetails />} />
        <Route path='*' element={<NoMatch />} />
        
      </Routes>
    </>
  )
}

export default App
