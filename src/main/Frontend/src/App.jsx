import { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import EventDetails from "./EventDetails";
import datos_probar from "./constants/datos_probar.json";
import ChatButton from './ChatButton';


import Header from './Header';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import NoMatch from './NoMatch';
import './App.css';
import ListaEventos from './ListaEventos';
import { ThemeProvider } from "@/components/ui/theme-provider"
import PerfilPage from './PerfilPage'
import TerminosYCondicionesPage from './TerminosYCondicionesPage';
import PoliticaPrivacidad from './PoliticaPrivacidad';
import { UserProvider } from './context/UserContext';

function App() {
  const navigate = useNavigate();

  return (
    <>

      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <UserProvider>
          <Header navigate={navigate} />
          <Routes>
            {/* Ruta principal dinámica según el estado de autenticación */}
            {/* <Route path="/" element={user ? <ListaEventos /> : <MainPage />} /> */}
            <Route path="/" element={<MainPage />} />

            {/* Otras rutas */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/perfil" element={<PerfilPage navigate={navigate} />} />
            <Route path="/eventos/:id" element={<EventDetails />} />
            <Route path="/eventos" element={<ListaEventos navigate={navigate} />} />
            <Route path="/terms" element={<TerminosYCondicionesPage navigate={navigate} />} />
            <Route path="/privacy" element={<PoliticaPrivacidad navigate={navigate} />} />
            <Route path="*" element={<NoMatch />} />

          </Routes>

          <ChatButton />
        </UserProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
