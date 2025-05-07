package com.eventconnect.eventconnect.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eventconnect.eventconnect.model.Evento;
import com.eventconnect.eventconnect.model.EventoConOrganizadorDTO;
import com.eventconnect.eventconnect.model.EventoDTO;
import com.eventconnect.eventconnect.model.Grupo;
import com.eventconnect.eventconnect.model.Usuario;
import com.eventconnect.eventconnect.model.UsuarioDTO;
import com.eventconnect.eventconnect.repository.EventoRepository;
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

        EventoDTO eventoDTO = new EventoDTO(evento);

        Usuario organizador = evento.getOrganizador();
        UsuarioDTO organizadorDTO = new UsuarioDTO(
                organizador.getId(),
                organizador.getNombreUsuario(),
                organizador.getCorreo(),
                organizador.getNombre(),
                organizador.getPrimer_Apellido(),
                organizador.getSegundo_Apellido(),
                organizador.getTipo()
        );
        EventoConOrganizadorDTO dto = new EventoConOrganizadorDTO(eventoDTO, organizadorDTO);

        return dto;
    }

    @Override
    public List<EventoConOrganizadorDTO> obtenerTodosLosEventosConOrganizadores() {
        // List<Evento> eventos = eventoRepository.findAll(); // Obtener todos los eventos

        // List<EventoDTO> eventosDTO = eventos.stream().map(EventoDTO::new).collect(Collectors.toList());

        // List<EventoConOrganizadorDTO> eventosConOrganizadores = new ArrayList<>();

        // for (EventoDTO evento : eventosDTO) {
        //     Usuario organizador = evento.getOrganizadorId();
        //     UsuarioDTO organizadorDTO = new UsuarioDTO(organizador);
        //     EventoConOrganizadorDTO dto = new EventoConOrganizadorDTO(evento, organizadorDTO);
        //     eventosConOrganizadores.add(dto);
        // }

        // return eventosConOrganizadores; // Retornar la lista con eventos y organizadores
        return null;
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
        nuevoGrupo.setDescripcion("Grupo creado automáticamente para el evento " + evento.getNombre()); // Descripción
                                                                                                        // por defecto

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
