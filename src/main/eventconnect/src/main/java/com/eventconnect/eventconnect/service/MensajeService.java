package com.eventconnect.eventconnect.service;


import com.eventconnect.eventconnect.model.Mensaje;

import java.util.List;

public interface MensajeService {
    List<Mensaje> obtenerTodos();
    Mensaje obtenerPorId(int id);
    Mensaje crearMensaje(Mensaje mensaje);
    Mensaje actualizarMensaje(int id, Mensaje mensaje);
    void eliminarMensaje(int id);
}
