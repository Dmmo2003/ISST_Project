import { useState } from 'react'

import { Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import Header from './Header'
import MainPage from './MainPage'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import PerfilPage from './PerfilPage'
import EditarPerfilPage from './EditarPerfilPage';
import NoMatch from './NoMatch'
import './App.css'


function App() {
  const navigate = useNavigate();


  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/perfil" element={<PerfilPage />} />
        <Route path="/editar-perfil" element={<EditarPerfilPage />} />
        <Route path='*' element={<NoMatch />} />
        
      </Routes>
    </>
  )
}

export default App
