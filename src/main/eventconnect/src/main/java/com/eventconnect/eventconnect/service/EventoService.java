package com.eventconnect.eventconnect.service;

import com.eventconnect.eventconnect.model.Evento;
import java.util.List;
import java.util.Optional;

public interface EventoService {
    List<Evento> obtenerEventos();
    Optional<Evento> obtenerEventoPorId(int id);
    Evento crearEvento(Evento evento);
    Evento actualizarEvento(Evento evento);
    void eliminarEvento(int id);
}
