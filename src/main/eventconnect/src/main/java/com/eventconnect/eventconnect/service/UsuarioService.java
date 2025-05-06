package com.eventconnect.eventconnect.service;

import com.eventconnect.eventconnect.model.Usuario;
import com.eventconnect.eventconnect.model.UsuarioDTO;
import com.eventconnect.eventconnect.model.EventoDTO;

import java.util.List;
import java.util.Optional;

public interface UsuarioService {
    List<Usuario> getAllUsuarios();
    Optional<Usuario> getUsuarioByMailPassword(String correo, String contrasena);
    Optional<Usuario> getUsuarioById(int id);
    Usuario saveUsuario(Usuario usuario);
    void deleteUsuario(int id);
    Optional<Usuario> obtenerUsuarioPorUsername(String username);
    boolean existeByCorreo(String correo);
    boolean existsByUsername(String username);
    Usuario registrarUsuario(Usuario usuario);

    List<EventoDTO> getEventosCreadosPorUsuario(int usuarioId);
    List<EventoDTO> getEventosSeguidosPorUsuario(int usuarioId);

    void seguirEvento(int usuarioId, int eventoId);
    void dejarDeSeguirEvento(int usuarioId, int eventoId);
    void eliminarEventoCreadoPorUsuario(int usuarioId, int eventoId);
}
