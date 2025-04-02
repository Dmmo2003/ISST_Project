

import api from "./api";
import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/api/usuarios';

// Crear un nuevo evento
export const seguirEvento = async (usuarioId, eventoId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/${usuarioId}/eventos/${eventoId}/seguir`);
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