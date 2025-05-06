

import api from "./api";
import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/api/usuarios';

export const seguirEvento = async (userId, eventoId) => {
    const res = await fetch(`/api/usuarios/${userId}/seguir/${eventoId}`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Error al seguir evento');
  };
  
  export const dejarSeguirEvento = async (userId, eventoId) => {
    const res = await fetch(`/api/usuarios/${userId}/seguir/${eventoId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Error al dejar de seguir evento');
  };
  