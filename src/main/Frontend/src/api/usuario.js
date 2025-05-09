

import api from "./api";
import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/api/usuarios';

// Crear un nuevo evento
export const seguirEvento = async (usuarioId, eventoId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/${usuarioId}/eventos/${eventoId}/seguir`);
        console.log("Respuesta de seguir evento:",response);
        return response.data;
    } catch (error) {
        console.error("Error siguiendo evento:", error);
        throw error;
    }
};
export const dejarSeguirEvento = async (usuarioId, eventoId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/${usuarioId}/eventos/${eventoId}/dejar`);
        return response.data;
    } catch (error) {
        console.error("Error siguiendo evento:", error);
        throw error;
    }
};

export const obtenerEventosSeguidos = async (idUsuario) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${idUsuario}/eventos/seguidos`);
        return response.data;
        
    } catch (error) {
        console.error("Error al obtener los eventos:", error);
        throw error;
    }
}

export const obtenerGruposSeguidos = async (idUsuario) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${idUsuario}/grupos/seguidos`);
        return response.data;
        
    } catch (error) {
        console.error("Error al obtener los eventos:", error);
        throw error;
    }
}

export const eliminarEvento = async (eventoId, userId) => {
    try {
        await axios.delete(`${API_BASE_URL}/${userId}/evento/${eventoId}`);
    } catch (error) {
        console.error("Error eliminando evento:", error);
        throw error;
    }
};

export async function dejarGrupoPorEvento(usuarioId, eventoId) {
    try {
      const response = await fetch(`/api/usuarios/${usuarioId}/salir-grupo/${eventoId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Error al salir del grupo del evento');
      }
  
      return; // sin intentar leer JSON
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  