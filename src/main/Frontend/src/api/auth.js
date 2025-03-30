import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/login"; // Ajusta según tu backend

export const iniciarSesion = async (email, password) => {
  try {
    const response = await axios.post(API_URL, { email, password });
    return response.data;
  } catch (error) {
    console.error("Error en el inicio de sesión:", error.response?.data || error.message);
    throw error;
  }
};

export const registrarUsuario = async (usuario) => {
    try {
      const response = await axios.post(API_URL, usuario);
      return response.data;
    } catch (error) {
      console.error("Error en el registro:", error.response?.data || error.message);
      throw error;
    }
  };
