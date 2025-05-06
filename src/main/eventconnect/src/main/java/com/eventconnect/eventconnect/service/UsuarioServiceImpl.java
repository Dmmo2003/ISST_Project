package com.eventconnect.eventconnect.service;

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

    @Autowired
    private UsuarioRepository usuarioRepository;

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
    public boolean existsByUsername(String username) {
        return usuarioRepository.existsByNombreUsuario(username);
    }

    @Override
    public Usuario registrarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

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

}
