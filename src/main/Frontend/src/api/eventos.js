import api from "./api";

// Obtener todos los eventos
export const fetchEventos = async () => {
    try {
        const response = await api.get("/eventos"); // GET /api/eventos
        return response.data;
    } catch (error) {
        console.error("Error obteniendo eventos:", error);
        throw error;
    }
};

// Crear un nuevo evento
export const crearEvento = async (evento) => {
    try {
        const response = await api.post("/eventos", evento);
        return response.data;
    } catch (error) {
        console.error("Error creando evento:", error);
        throw error;
    }
};

// Eliminar un evento por ID
export const eliminarEvento = async (id) => {
    try {
        await api.delete(`/eventos/${id}`);
    } catch (error) {
        console.error("Error eliminando evento:", error);
        throw error;
    }
};

export const obtenerEventos = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Devuelve los eventos
    } catch (error) {
        console.error("Error al obtener los eventos:", error);
        throw error;
    }
};
