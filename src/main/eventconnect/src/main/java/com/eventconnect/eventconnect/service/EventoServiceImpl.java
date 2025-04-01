package com.eventconnect.eventconnect.service;

import com.eventconnect.eventconnect.model.Evento;
import com.eventconnect.eventconnect.model.EventoConOrganizadorDTO;
import com.eventconnect.eventconnect.repository.EventoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.eventconnect.eventconnect.model.Usuario;
import com.eventconnect.eventconnect.repository.UsuarioRepository;

@Service
public class EventoServiceImpl implements EventoService {

    private final EventoRepository eventoRepository;
    private final UsuarioRepository usuarioRepository;

    @Autowired
    public EventoServiceImpl(EventoRepository eventoRepository, UsuarioRepository usuarioRepository) {
        this.eventoRepository = eventoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public List<Evento> obtenerEventos() {
        List<Evento> eventos = eventoRepository.findAll();
        System.out.println("Eventos encontrados: " + eventos.size());
        eventos.forEach(evento -> System.out.println(evento.getNombre()));
        return eventos;
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
        // Aquí puedes agregar lógica adicional si es necesario (validación, etc.)
        return eventoRepository.save(evento); // Guardar el evento en la base de datos
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
            return eventoRepository.save(eventoExistente);
        }).orElseThrow(() -> new RuntimeException("Evento no encontrado con ID: " + evento.getId()));
    }

    @Override
    public void eliminarEvento(int id) {
        eventoRepository.deleteById(id);
    }

    // @Override
    // public boolean verificarSiUsuarioSigueEvento(int idUsuario, int idEvento) {
    //     // Obtener el usuario por su id
    //     Usuario usuario = usuarioRepository.findById(idUsuario).orElse(null);
    //     if (usuario == null) {
    //         return false; // Usuario no encontrado
    //     }

    //     // Obtener el evento por su id
    //     Evento evento = eventoRepository.findById(idEvento).orElse(null);
    //     if (evento == null) {
    //         return false; // Evento no encontrado
    //     }

    //     // Verificar si el usuario está en la lista de seguidores del evento
    //     return evento.getSeguidores().contains(usuario);
    // }
    @Override
    public boolean verificarSiUsuarioSigueEvento(int usuarioId, int eventoId) {
        return eventoRepository.verificarSiUsuarioSigueEvento(eventoId, usuarioId);
    }
}
