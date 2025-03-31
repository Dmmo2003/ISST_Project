package com.eventconnect.eventconnect.repository;

import com.eventconnect.eventconnect.model.Usuario;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByNombreUsuario(String username);
    Optional<Usuario> findByCorreo(String correo);
}
