package services;


import models.MensajeModel;

import java.util.List;

public interface MensajeService {
    List<MensajeModel> obtenerTodos();
    MensajeModel obtenerPorId(Long id);
    MensajeModel crearMensaje(MensajeModel mensaje);
    MensajeModel actualizarMensaje(Long id, MensajeModel mensaje);
    void eliminarMensaje(Long id);

    // Métodos adicionales si los necesitas
    List<MensajeModel> obtenerMensajesPorGrupo(Long grupoId);
    List<MensajeModel> obtenerMensajesPorRemitente(Long remitenteId);
}
