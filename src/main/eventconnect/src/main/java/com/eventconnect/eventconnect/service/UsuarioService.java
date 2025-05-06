package com.eventconnect.eventconnect.service;

import java.util.List;
import java.util.Optional;

import com.eventconnect.eventconnect.model.EventoDTO;
import com.eventconnect.eventconnect.model.GrupoDTO;
import com.eventconnect.eventconnect.model.Usuario;

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

    Usuario findByCorreo(String correo);

    List<EventoDTO> obtenerEventosSeguidos(int idUsuario);

    // List<GrupoDTO> obtenerGruposSeguidos(int idUsuario);
    // List<GrupoConUsuariosDTO> obtenerGruposPorUsuario(int usuarioId);

    List<GrupoDTO> obtenerGruposPorUsuario(int usuarioId);

}
