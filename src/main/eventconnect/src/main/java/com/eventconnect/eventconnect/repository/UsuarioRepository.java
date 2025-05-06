package com.eventconnect.eventconnect.repository;

import com.eventconnect.eventconnect.model.Usuario;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findByNombreUsuario(String nombreUsuario);

    Usuario findByCorreo(String correo);

    @Query("SELECT u FROM Usuario u WHERE u.correo = :correo AND u.contraseña = :contraseña")
    Optional<Usuario> findByCorreoAndContraseña(@Param("correo") String correo, @Param("contraseña") String contraseña);

    boolean existsByCorreo(String correo);

    boolean existsByNombreUsuario(String nombreUsuario);
}
