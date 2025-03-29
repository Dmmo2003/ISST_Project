import { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Header from './Header';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import NoMatch from './NoMatch';
import './App.css';
import ListaEventos from './ListaEventos';

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
      <Header  navigate={navigate} user={user}/>
      <Routes>
        {/* Ruta principal dinámica según el estado de autenticación */}
        <Route path="/" element={user ? <ListaEventos /> : <MainPage />} />

        {/* Otras rutas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/eventos" element={<ListaEventos />} /> */}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
