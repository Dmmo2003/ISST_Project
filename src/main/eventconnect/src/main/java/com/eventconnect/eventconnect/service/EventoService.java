package com.eventconnect.eventconnect.service;

import com.eventconnect.eventconnect.model.Evento;
import com.eventconnect.eventconnect.model.EventoConOrganizadorDTO;

import java.util.List;
import java.util.Optional;

import com.eventconnect.eventconnect.model.Usuario;

public interface EventoService {
    List<Evento> obtenerEventos();
    Optional<Evento> obtenerEventoPorId(int id);
    Evento crearEvento(Evento evento);
    Evento actualizarEvento(Evento evento);
    void eliminarEvento(int id);
    Usuario obtenerOrganizadorPorId(int id);
    List<EventoConOrganizadorDTO> obtenerTodosLosEventosConOrganizadores();
}
