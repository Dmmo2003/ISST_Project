package com.eventconnect.eventconnect.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eventconnect.eventconnect.model.Evento;
import com.eventconnect.eventconnect.model.EventoDTO;
import com.eventconnect.eventconnect.model.Grupo;
import com.eventconnect.eventconnect.model.GrupoConUsuariosDTO;
import com.eventconnect.eventconnect.model.GrupoDTO;
import com.eventconnect.eventconnect.model.Usuario;
import com.eventconnect.eventconnect.repository.EventoRepository;
import com.eventconnect.eventconnect.repository.GrupoRepository;
import com.eventconnect.eventconnect.repository.UsuarioRepository;
import com.eventconnect.eventconnect.model.Evento;
import com.eventconnect.eventconnect.model.EventoDTO;
import com.eventconnect.eventconnect.model.Usuario;
import com.eventconnect.eventconnect.repository.EventoRepository;
import com.eventconnect.eventconnect.repository.UsuarioEventoRepository;
import com.eventconnect.eventconnect.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final GrupoRepository grupoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository, EventoRepository eventoRepository,
            GrupoRepository grupoRepository) {
        this.usuarioRepository = usuarioRepository;
        this.eventoRepository = eventoRepository;
        this.grupoRepository = grupoRepository;
    }

    // MIRAR EOOOOOOOOOOOOOOOO
    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private UsuarioEventoRepository usuarioEventoRepository;

  
  
    @Override
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    @Override
    public Optional<Usuario> getUsuarioByMailPassword(String correo, String contrasena) {
        return usuarioRepository.findByCorreoAndContraseña(correo, contrasena);
    }

    @Override
    public Optional<Usuario> getUsuarioById(int id) {
        return usuarioRepository.findById(id);
    }

    @Override
    public Usuario saveUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @Override
    public void deleteUsuario(int id) {
        usuarioRepository.deleteById(id);
    }

    @Override
    public Optional<Usuario> obtenerUsuarioPorUsername(String username) {
        return usuarioRepository.findByNombreUsuario(username);
    }

    @Override
    public boolean existeByCorreo(String correo) {
        return usuarioRepository.existsByCorreo(correo);
    }

    @Override
  
  
  
  //EOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
    public void seguirEvento(int usuarioId, int eventoId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Evento evento = eventoRepository.findById(eventoId)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado"));

        // Añadir el evento a la lista de eventos seguidos
        usuario.getEventosSeguidos().add(evento);
        evento.getSeguidores().add(usuario);

        // Guardar los cambios
        usuarioRepository.save(usuario);
        eventoRepository.save(evento);
    }

    @Override
    public void dejarDeSeguirEvento(int usuarioId, int eventoId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Evento evento = eventoRepository.findById(eventoId)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado"));
    public boolean existsByUsername(String username) {
        return usuarioRepository.existsByNombreUsuario(username);
    }

    @Override
    public Usuario registrarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    //OOOOOOOOOOOOOEEEEEEEEEEE  
      
    @Override
    public List<EventoDTO> getEventosCreadosPorUsuario(int usuarioId) {
        return eventoRepository.findByOrganizadorId(usuarioId)
                .stream().map(EventoDTO::new).toList();
    }

    @Override
    public List<EventoDTO> getEventosSeguidosPorUsuario(int usuarioId) {
        return usuarioEventoRepository.findEventosSeguidosPorUsuario(usuarioId)
                .stream().map(EventoDTO::new).toList();
    }

    @Override
    @Transactional
    public void seguirEvento(int usuarioId, int eventoId) {
        usuarioEventoRepository.agregarSeguimiento(usuarioId, eventoId);
    }

    @Override
    @Transactional
    public void dejarDeSeguirEvento(int usuarioId, int eventoId) {
        usuarioEventoRepository.eliminarSeguimiento(usuarioId, eventoId);
    }

    @Override
    @Transactional
    public void eliminarEventoCreadoPorUsuario(int usuarioId, int eventoId) {
        Optional<Evento> eventoOpt = eventoRepository.findById(eventoId);
        if (eventoOpt.isPresent() && eventoOpt.get().getOrganizador().getId() == usuarioId) {
            eventoRepository.deleteById(eventoId);
        }
    }
  
public Usuario findByCorreo(String correo) {
    return usuarioRepository.findByCorreo(correo);
}

    @Override
    public List<EventoDTO> obtenerEventosSeguidos(int idUsuario) {
        return eventoRepository.obtenerEventosSeguidos(idUsuario);
    }

    // @Override
    // public List<GrupoDTO> obtenerGruposSeguidos(int idUsuario) {
    // // return grupoRepository.obtenerGruposSeguidos(idUsuario);
    // return grupoRepository.obtenerGruposSeguidosPorUsuario(idUsuario);
    // }

    // GrupoService.java

    @Override
    public List<GrupoDTO> obtenerGruposPorUsuario(int usuarioId) {
        List<Grupo> grupos = grupoRepository.findByMiembrosId(usuarioId); // este método se define en el repositorio

        return grupos.stream().map(grupo -> {
            List<String> miembrosNombres = grupo.getMiembros()
                    .stream()
                    .map(Usuario::getNombreUsuario)
                    .collect(Collectors.toList());

            return new GrupoDTO(
                    grupo.getId(),
                    grupo.getNombre(),
                    grupo.getDescripcion(),
                    grupo.getAdmin().getId(),
                    grupo.getEvento().getId(),
                    miembrosNombres);
        }).collect(Collectors.toList());
    }

}
