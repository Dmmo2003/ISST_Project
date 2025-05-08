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
import RegisterEmpresaPage from './RegisterEmpresaPage';
import NoMatch from './NoMatch';
import './App.css';
import ListaEventos from './ListaEventos';
import { ThemeProvider } from "@/components/ui/theme-provider"
import PerfilPage from './PerfilPage'
import TerminosYCondicionesPage from './TerminosYCondicionesPage';
import AuthCallbackGoogle from './AuthCallbackGoogle';
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

            <Route path="/registro-empresa" element={<RegisterEmpresaPage />} />

            <Route path="/perfil" element={<PerfilPage navigate={navigate} />} />

            <Route path="/eventos/:id" element={<EventDetails />} />

            <Route path="/eventos" element={<ListaEventos navigate={navigate} />} />

            <Route path="/terms" element={<TerminosYCondicionesPage navigate={navigate} />} />

            <Route path="/privacy" element={<PoliticaPrivacidad navigate={navigate} />} />

            <Route path="/auth/callback/google" element={<AuthCallbackGoogle />} />

            <Route path="*" element={<NoMatch />} />

          </Routes>

          <ChatButton />
        </UserProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

// App.js
// import { Routes, Route } from 'react-router-dom';
// import { UserProvider } from './context/UserContext';
// import ProtectedRoute from './components/ProtectedRoute'; // Importa el componente
// import Header from './Header';
// import MainPage from './MainPage';
// import LoginPage from './LoginPage';
// import PerfilPage from './PerfilPage';
// import EventDetails from './EventDetails';
// import ListaEventos from './ListaEventos';
// import ChatButton from './ChatButton';
// import './App.css';
// import { useNavigate } from 'react-router-dom';



// import { useState, useEffect } from 'react';
// import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import EventDetails from "./EventDetails";
// import datos_probar from "./constants/datos_probar.json";
// import ChatButton from './ChatButton';


// import Header from './Header';
// import MainPage from './MainPage';
// import LoginPage from './LoginPage';
// import RegisterPage from './RegisterPage';
// import NoMatch from './NoMatch';
// import './App.css';
// import ListaEventos from './ListaEventos';
// import { ThemeProvider } from "@/components/ui/theme-provider"
// import PerfilPage from './PerfilPage'
// import TerminosYCondicionesPage from './TerminosYCondicionesPage';
// import AuthCallbackGoogle from './AuthCallbackGoogle';
// import PoliticaPrivacidad from './PoliticaPrivacidad';
// import { UserProvider } from './context/UserContext';

// function App() {
//   const navigate = useNavigate();

//   return (
//     <UserProvider>
//       <Header navigate={navigate}/>
//       <Routes>
//         {/* Ruta principal, no protegida */}
//         <Route path="/" element={<MainPage />} />

//         {/* Rutas protegidas */}
//         <Route
//           path="/perfil"
//           element={
//             <ProtectedRoute>
//               <PerfilPage navigate={navigate}/>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/eventos/:id"
//           element={
//             <ProtectedRoute>
//               <EventDetails />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/eventos"
//           element={
//             <ProtectedRoute>
//               <ListaEventos navigate={navigate}/>
//             </ProtectedRoute>
//           }
//         />

//         {/* Otras rutas */}
//         <Route path="/login" element={<LoginPage />} />

//         <Route path="/terms" element={<TerminosYCondicionesPage navigate={navigate} />} />

//         <Route path="/privacy" element={<PoliticaPrivacidad navigate={navigate} />} />

//         <Route path="/auth/callback/google" element={<AuthCallbackGoogle />} />

//         <Route path="/register" element={<RegisterPage />} />


//         {/* Agrega más rutas según sea necesario */}

//         {/* Ruta comodín */}
//         <Route path="*" element={<NoMatch />} />
//       </Routes>

//       <ChatButton />
//     </UserProvider>
//   );
// }

// export default App;
