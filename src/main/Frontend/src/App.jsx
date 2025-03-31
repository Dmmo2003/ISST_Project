import { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import EventDetails from "./EventDetails"; 
import datos_probar from "./constants/datos_probar.json";


import Header from './Header';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import NoMatch from './NoMatch';
import './App.css';
import ListaEventos from './ListaEventos';
import { ThemeProvider } from "@/components/ui/theme-provider"
import PerfilPage from './PerfilPage'


function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    console.log('userEmail from localStorage:', userEmail); // Verificar que el valor se obtiene correctamente
    if (userEmail) {
      setUser({ email: userEmail });
    }
  }, []);


  // Si no hay usuario autenticado, mostrar MainPage en la ruta raíz
  // Si hay un usuario autenticado, redirigir a ListaEventos en la ruta raíz
  return (
    <>

      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Header navigate={navigate} user={user} />
        <Routes>
          {/* Ruta principal dinámica según el estado de autenticación */}
          {/* <Route path="/" element={user ? <ListaEventos /> : <MainPage />} /> */}
          <Route path="/" element={<MainPage />} />

          {/* Otras rutas */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/perfil" element={<PerfilPage navigate={navigate}/>} />
          <Route path="/eventos/:id" element={<EventDetails />} />
          <Route path="/eventos" element={<ListaEventos  navigate={navigate}/>} />
          <Route path="*" element={<NoMatch />} />
            
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
