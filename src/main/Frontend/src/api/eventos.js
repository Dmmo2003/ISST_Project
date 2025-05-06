import api from "./api";
import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/api/eventos';

// Crear un nuevo evento
export const crearEvento = async (evento) => {
    console.log(evento);
    try {
        const response = await axios.post(`${API_BASE_URL}/nuevo`, evento);
        return response.data;
    } catch (error) {
        console.error("Error creando evento:", error);
        console.error("Error creando evento:", error.response?.data || error.message);
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

export const obtenerTodosEventosConOrganizador = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/organizadores`);
        return response.data; // Devuelve los eventos
    } catch (error) {
        console.error("Error al obtener los eventos:", error);
        throw error;
    }
}

export const obtenerEventoConOrganizador = async (id) => {

    try {
        const response = await axios.get(`${API_BASE_URL}/organizadores/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el evento:", error);
        throw error;
    }
}

export const obtenerEvento = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data; // Devuelve el evento con el ID proporcionado
    } catch (error) {
        console.error("Error al obtener el evento:", error);
        throw error;
    }
};

export const obtenerRelacionUsuarioEvento = async (idEvento, idUsuario) => {
    // console.log(idEvento, idUsuario);
    try {
        const response = await axios.get(`${API_BASE_URL}/${idEvento}/seguido/${idUsuario}`);
        return response.data; // Devuelve el evento con el ID proporcionado
    } catch (error) {
        console.error("Error al obtener el evento:", error);
        throw error;
    }
}

