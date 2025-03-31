import api from "./api";
import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/api/eventos';

// Crear un nuevo evento
export const crearEvento = async (evento) => {
    try {
        const response = await axios.post(`${API_BASE_URL}`, evento);
        return response.data;
    } catch (error) {
        console.error("Error creando evento:", error);
        throw error;
    }
};

// Eliminar un evento por ID
export const eliminarEvento = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
        console.error("Error eliminando evento:", error);
        throw error;
    }
};

export const obtenerEventos = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data; // Devuelve los eventos
    } catch (error) {
        console.error("Error al obtener los eventos:", error);
        throw error;
    }
};
