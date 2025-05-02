// src/api/perfil.js
import axios from 'axios';

const API_BASE_URL = '/api/usuarios';

// Obtener datos del usuario
export const getUsuario = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    throw error;
  }
};

// Obtener eventos seguidos por el usuario
export const getEventosSeguidos = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${userId}/eventos`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error al obtener eventos seguidos:', error);
    return [];
  }
};

// Editar perfil del usuario
export const updateUsuario = async (userId, datos) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${userId}`, datos);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    throw error;
  }
};

