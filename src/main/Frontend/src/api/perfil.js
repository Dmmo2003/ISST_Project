// perfil.js
import api from "./api";
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/usuarios';

// export async function getUsuario(userId) {
//   const response = await fetch(`/api/usuarios/${userId}`);
//   if (!response.ok) {
//     throw new Error('Error al obtener los datos del usuario');
//   }
//   return response.json();
// }

export const getUsuario = async (usuarioId) => {
  try {
      const response = await axios.get(`${API_BASE_URL}/${usuarioId}`);
      console.log("Nuestro usuario",response);
      return response.data;
  } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      throw error;
  }
};


// export async function getEventosSeguidos(userId) {
//   const response = await fetch(`/api/usuarios/${userId}/eventos-seguidos`);
//   if (!response.ok) {
//     throw new Error('Error al obtener los eventos seguidos');
//   }
//   return response.json();
// }

// export async function getEventosCreados(userId) {
//   const response = await fetch(`/api/usuarios/${userId}/eventos/creados`);
//   if (!response.ok) {
//     throw new Error('Error al obtener los eventos creados');
//   }
//   return response.json();
// }

export const obtenerEventosCreados = async (idUsuario) => {
  try {
      const response = await axios.get(`${API_BASE_URL}/${idUsuario}/eventos/creados`);
      return response.data;
      
  } catch (error) {
      console.error("Error al obtener los eventos creados:", error);
      throw error;
  }
}

export async function updateUsuario(userId, data) {
  const response = await fetch(`/api/usuarios/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar el usuario');
  }

  return response.json();
};


