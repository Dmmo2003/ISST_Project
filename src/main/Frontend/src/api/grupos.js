import api from "./api";
import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/api/grupos';

// Crear un nuevo evento
export const crearGrupo = async (grupo, imagenFile) => {
    const formData = new FormData();
    formData.append("grupo", new Blob([JSON.stringify(grupo)], { type: "application/json" }));

    if (imagenFile) {
        formData.append("imagen", imagenFile);
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/nuevo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creando grupo:", error);
        throw error;
    }
};
;

// Eliminar un evento por ID
export const eliminarGrupo = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
        console.error("Error eliminando grupo:", error);
        throw error;
    }
};

export const obtenerGruposEvento = async (id) => {


    try {
        const response = await axios.get(`${API_BASE_URL}/evento/${id}`);

        return response.data; // Devuelve los grupos del evento id
    } catch (error) {
        console.error("Error al obtener los grupos:", error);
        throw error;
    }
};

export const obtenerTodosGruposConCreador = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/creador`);
        return response.data; // Devuelve los eventos
    } catch (error) {
        console.error("Error al obtener los grupos:", error);
        throw error;
    }
}

export const usuarioEstaEnGrupo = async (grupoId, usuarioId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${grupoId}/usuario/${usuarioId}`);
        const isInGroup = await response.json();
        //   console.log(isInGroup ? "El usuario está en el grupo" : "El usuario no está en el grupo");
        return isInGroup;
    } catch (error) {
        console.error("Error al comprobar si el usuario está en el grupo", error);
        return false;
    }
};


export const entrarAGrupo = async (grupoId, usuarioId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/${grupoId}/entrar/${usuarioId}`);
        return response
    } catch (error) {
        console.error("Error al comprobar si el usuario está en el grupo", error);
        return false;
    }
};

export const salirDeGrupo = async (grupoId, usuarioId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${grupoId}/salir/${usuarioId}`);
        return response
    } catch (error) {
        console.error("Error al comprobar si el usuario está en el grupo", error);
        return false;
    }
};
