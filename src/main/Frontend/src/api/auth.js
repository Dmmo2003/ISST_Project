import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const iniciarSesion = async (usuario) => {
  try {
    const response = await axios.post(API_URL + "/login", usuario);
    console.log("Inicio de sesión API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error en el inicio de sesión:", error.response?.data || error.message);
    throw error;
  }
};

export const registrarUsuario = async (usuario) => {
  console.log("Registrando usuario:", usuario);
  console.log("JSON enviado al backend:", JSON.stringify(usuario));

  try {
    const response = await axios.post(API_URL + "/registro", usuario);
    return response.data;
  } catch (error) {
    console.error("Error en el registro:", error.response?.data || error.message);
    throw error;
  }
};