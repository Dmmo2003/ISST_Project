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

export const enviarMensajeGrupo = async (grupoId, mensaje, usuarioId) => {
    console.log(mensaje, grupoId, usuarioId);
    const body = {mensaje, usuarioId};
    try {
        const response = await axios.post(`${API_BASE_URL}/enviar/grupo/${grupoId}`, body);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
        throw error;
    }
};

