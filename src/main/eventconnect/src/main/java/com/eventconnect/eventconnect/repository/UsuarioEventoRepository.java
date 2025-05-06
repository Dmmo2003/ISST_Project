package com.eventconnect.eventconnect.repository;

import com.eventconnect.eventconnect.model.Evento;
import com.eventconnect.eventconnect.model.UsuarioEvento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import jakarta.transaction.Transactional;

import java.util.List;

@Repository
public interface UsuarioEventoRepository extends JpaRepository<UsuarioEvento, Long> {

    @Query("SELECT ue.evento FROM UsuarioEvento ue WHERE ue.usuario.id = :usuarioId")
    List<Evento> findEventosSeguidosPorUsuario(@Param("usuarioId") int usuarioId);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO usuario_evento (usuario_id, evento_id) VALUES (:usuarioId, :eventoId)", nativeQuery = true)
    void agregarSeguimiento(@Param("usuarioId") int usuarioId, @Param("eventoId") int eventoId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM usuario_evento WHERE usuario_id = :usuarioId AND evento_id = :eventoId", nativeQuery = true)
    void eliminarSeguimiento(@Param("usuarioId") int usuarioId, @Param("eventoId") int eventoId);
}
