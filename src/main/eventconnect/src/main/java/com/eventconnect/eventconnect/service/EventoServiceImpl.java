package com.eventconnect.eventconnect.service;

import com.eventconnect.eventconnect.model.Evento;
import com.eventconnect.eventconnect.model.EventoConOrganizadorDTO;
import com.eventconnect.eventconnect.model.EventoDTO;
import com.eventconnect.eventconnect.model.Grupo;
import com.eventconnect.eventconnect.repository.EventoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.Base64;


import com.eventconnect.eventconnect.model.Usuario;
import com.eventconnect.eventconnect.repository.UsuarioRepository;

@Service
public class EventoServiceImpl implements EventoService {

    private final EventoRepository eventoRepository;
    private final UsuarioRepository usuarioRepository;

    public EventoServiceImpl(EventoRepository eventoRepository, UsuarioRepository usuarioRepository) {
        this.eventoRepository = eventoRepository;
        this.usuarioRepository = usuarioRepository;
    }
    @Autowired
    private GrupoService grupoService;

    @Override
    public List<EventoDTO> obtenerEventos() {
        return eventoRepository.findAll()
                .stream()
                .map(EventoDTO::new) // Convertimos cada Evento en un EventoDTO
                .collect(Collectors.toList());
    }

    @Override
    public Usuario obtenerOrganizadorPorId(int eventoId) {
        return eventoRepository.findById(eventoId)
                .map(Evento::getOrganizador)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado"));
    }

    @Override
    public EventoConOrganizadorDTO obtenerEventoConOrganizador(int id) {
        Evento evento = eventoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado"));
        Usuario organizador = evento.getOrganizador();
        EventoConOrganizadorDTO dto = new EventoConOrganizadorDTO(evento, organizador);

        return dto;
    }

    @Override
    public List<EventoConOrganizadorDTO> obtenerTodosLosEventosConOrganizadores() {
        List<Evento> eventos = eventoRepository.findAll(); // Obtener todos los eventos
        List<EventoConOrganizadorDTO> eventosConOrganizadores = new ArrayList<>();

        for (Evento evento : eventos) {
            Usuario organizador = evento.getOrganizador(); // Obtener el organizador del evento
            EventoConOrganizadorDTO dto = new EventoConOrganizadorDTO(evento, organizador);
            eventosConOrganizadores.add(dto);
        }

        return eventosConOrganizadores; // Retornar la lista con eventos y organizadores
    }

    @Override
    public Optional<Evento> obtenerEventoPorId(int id) {
        return eventoRepository.findById(id);
    }


    @Override
    public Evento crearEvento(Evento evento) {
        // Añadir al organizador como seguidor del evento
        List<Usuario> seguidores = evento.getSeguidores();
        if (seguidores == null) {
            seguidores = new ArrayList<>();
            evento.setSeguidores(seguidores);
        }
    
        if (!seguidores.contains(evento.getOrganizador())) {
            seguidores.add(evento.getOrganizador());
        }
    
        // 1. Guardar el evento con el organizador ya añadido como seguidor
        Evento eventoCreado = eventoRepository.save(evento);
    
        // 2. Crear un grupo automáticamente para este evento
        Grupo nuevoGrupo = new Grupo();
        nuevoGrupo.setNombre("Grupo de " + evento.getNombre());
        nuevoGrupo.setAdmin(evento.getOrganizador()); // Establecemos el organizador como admin del grupo
        nuevoGrupo.setEvento(eventoCreado); // Asociación entre grupo y evento
        nuevoGrupo.setDescripcion("Grupo creado automáticamente para el evento " + evento.getNombre()); // Descripción por defecto
    
        Grupo grupoCreado = grupoService.crearGrupo(nuevoGrupo);
    
        // 3. Hacer que el organizador se una al grupo
        grupoService.unirseAGrupo(evento.getOrganizador().getId(), grupoCreado.getId());
    
        return eventoCreado;
    }

    @Override
    public Evento actualizarEvento(Evento evento) {
        return eventoRepository.findById(evento.getId()).map(eventoExistente -> {
            eventoExistente.setNombre(evento.getNombre());
            eventoExistente.setFecha(evento.getFecha());
            eventoExistente.setUbicacion(evento.getUbicacion());
            eventoExistente.setOrganizadorId(evento.getOrganizadorId());
            eventoExistente.setDescripcion(evento.getDescripcion());
            eventoExistente.setCategoria(evento.getCategoria());
            eventoExistente.setPrecio(evento.getPrecio());
            return eventoRepository.save(eventoExistente);
        }).orElseThrow(() -> new RuntimeException("Evento no encontrado con ID: " + evento.getId()));
    }

    @Override
    public void eliminarEvento(int id) {
        eventoRepository.deleteById(id);
    }

    // @Override
    // public boolean verificarSiUsuarioSigueEvento(int idUsuario, int idEvento) {
    // // Obtener el usuario por su id
    // Usuario usuario = usuarioRepository.findById(idUsuario).orElse(null);
    // if (usuario == null) {
    // return false; // Usuario no encontrado
    // }

    // // Obtener el evento por su id
    // Evento evento = eventoRepository.findById(idEvento).orElse(null);
    // if (evento == null) {
    // return false; // Evento no encontrado
    // }

    // // Verificar si el usuario está en la lista de seguidores del evento
    // return evento.getSeguidores().contains(usuario);
    // }
    @Override
    public boolean verificarSiUsuarioSigueEvento(int usuarioId, int eventoId) {
        return eventoRepository.verificarSiUsuarioSigueEvento(eventoId, usuarioId);
    }
}
