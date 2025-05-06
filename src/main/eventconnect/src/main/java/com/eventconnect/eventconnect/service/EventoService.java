package com.eventconnect.eventconnect.service;

import com.eventconnect.eventconnect.model.Evento;
import com.eventconnect.eventconnect.model.EventoConOrganizadorDTO;
import com.eventconnect.eventconnect.model.EventoDTO;
import com.eventconnect.eventconnect.service.GrupoService;

import java.util.List;
import java.util.Optional;

import com.eventconnect.eventconnect.model.Usuario;

import io.micrometer.observation.Observation;

public interface EventoService {
    List<EventoDTO> obtenerEventos();
    Optional<Evento> obtenerEventoPorId(int id);
    Evento crearEvento(Evento evento);
    Evento actualizarEvento(Evento evento);
    void eliminarEvento(int id);
    Usuario obtenerOrganizadorPorId(int id);
    List<EventoConOrganizadorDTO> obtenerTodosLosEventosConOrganizadores();
    EventoConOrganizadorDTO obtenerEventoConOrganizador(int id);
    boolean verificarSiUsuarioSigueEvento(int idUsuario, int idEvento);
}
