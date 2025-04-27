import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthCallbackGoogle = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const id_token = params.get("id_token");

    if (id_token) {
      axios.post('http://localhost:8080/api/auth/google', { id_token })
        .then(response => {
          console.log('Usuario autenticado:', response.data);

          // Guardar el usuario en el localStorage
          localStorage.setItem('user', JSON.stringify(response.data));

          // Redirigir a la página principal
          navigate('/');
        })
        .catch(error => {
          console.error('Error al autenticar con el backend:', error);
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return <div>Procesando autenticación con Google...</div>;
};

export default AuthCallbackGoogle;
