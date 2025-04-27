import api from "./api";
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/mensajes';

export const obtenerMensajesGrupo = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/grupo/${id}`);
        console.log(`${API_BASE_URL}/grupo/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los mensajes:', error);
        throw error;
    }
};