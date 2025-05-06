package com.eventconnect.eventconnect.repository;

import com.eventconnect.eventconnect.model.Evento;
import com.eventconnect.eventconnect.model.Grupo;

import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.eventconnect.eventconnect.model.Usuario;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Integer> {

    // @Query("SELECT e FROM Usuario e WHERE e.organizador.id = :id")
    // List<Usuario> findByOrganizadorId(@Param("findByOrganizadorId") int organizadorId);

    @Query("SELECT COUNT(e) > 0 FROM Evento e JOIN e.seguidores u WHERE e.id = :eventoId AND u.id = :usuarioId")
    boolean verificarSiUsuarioSigueEvento(@Param("eventoId") int eventoId, @Param("usuarioId") int usuarioId);

    @Query("SELECT e FROM Evento e WHERE e.organizador.id = :organizadorId")
    List<Evento> findByOrganizadorId(@Param("organizadorId") int organizadorId);
}
