package services;


import models.MensajeModel;

import java.util.List;

public interface MensajeService {
    List<MensajeModel> obtenerTodos();
    MensajeModel obtenerPorId(int id);
    MensajeModel crearMensaje(MensajeModel mensaje);
    MensajeModel actualizarMensaje(int id, MensajeModel mensaje);
    void eliminarMensaje(int id);
}
