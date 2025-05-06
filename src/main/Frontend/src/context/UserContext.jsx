import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      setUser(JSON.parse(usuario));  // Parseamos el JSON para convertirlo en un objeto
    } else {
      setUser(null);
    }
  }, [isAuthenticated]); // Solo se ejecuta cuando el componente se monta

  const login = (userData) => {
    localStorage.setItem('usuario', JSON.stringify(userData));
    setUser(userData);  // Actualizamos el estado de usuario
    setIsAuthenticated(true);
    console.log('Usuario autenticado:', userData);
  };

  const logout = () => {
    localStorage.removeItem('usuario');
    setUser(null);  // Limpiamos el estado de usuario
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
