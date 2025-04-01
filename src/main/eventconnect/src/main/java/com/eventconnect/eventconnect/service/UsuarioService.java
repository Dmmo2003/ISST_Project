package com.eventconnect.eventconnect.service;

import com.eventconnect.eventconnect.model.Usuario;

import java.util.List;
import java.util.Optional;

public interface UsuarioService {

    List<Usuario> getAllUsuarios();

    Usuario saveUsuario(Usuario usuario);

    Optional<Usuario> getUsuarioById(int id);

    void deleteUsuario(int id);

    Optional<Usuario> obtenerUsuarioPorUsername(String nombreUsuario);

    Optional<Usuario> getUsuarioByMailPassword(String correo, String contraseña);
}
