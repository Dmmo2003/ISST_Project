import api from "./api";
import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/api/eventos';

// Crear un nuevo evento
export const crearEvento = async (evento, imagenFile) => {
    const formData = new FormData();
    formData.append("evento", new Blob([JSON.stringify(evento)], { type: "application/json" }));
    if (imagenFile) {
        formData.append("imagen", imagenFile);
    }

    const response = await fetch("http://localhost:8080/api/eventos/nuevo", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Error al crear el evento");
    }

    return await response.json();
};


export const obtenerImagenEvento = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/eventos/${id}/imagen`);
        if (!response.ok) throw new Error("Imagen no encontrada");

        const blob = await response.blob();
        return URL.createObjectURL(blob); // genera una URL temporal para usar en un <img>
    } catch (error) {
        console.error("Error al obtener imagen del evento:", error);
        return null;
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

