package com.eventconnect.eventconnect.service;

import java.util.List;

import com.eventconnect.eventconnect.model.Mensaje;
import com.eventconnect.eventconnect.model.MensajeDTO;

public interface MensajeService {
    List<Mensaje> obtenerTodos();

    Mensaje obtenerPorId(int id);

    Mensaje crearMensaje(Mensaje mensaje);

    Mensaje actualizarMensaje(int id, Mensaje mensaje);

    void eliminarMensaje(int id);

    List<MensajeDTO> obtenerMensajesGrupo(int grupoId);
}
