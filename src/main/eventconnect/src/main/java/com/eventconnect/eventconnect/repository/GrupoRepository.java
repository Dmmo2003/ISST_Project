package com.eventconnect.eventconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.eventconnect.eventconnect.model.Grupo;
import com.eventconnect.eventconnect.model.GrupoProjectionDTO;

@Repository
public interface GrupoRepository extends JpaRepository<Grupo, Integer> {

    // Buscar grupos por eventoId
    @Query("SELECT new com.eventconnect.eventconnect.model.GrupoProjectionDTO(g.id, g.nombre, g.evento.id, g.admin.id, g.descripcion) FROM Grupo g WHERE g.evento.id = :eventoId")
    List<GrupoProjectionDTO> encontrarGruposPorEventoId(@Param("eventoId") int eventoId);

    // Verificar si un usuario está en un grupo
    @Query("SELECT COUNT(g) > 0 FROM Grupo g JOIN g.miembros m WHERE g.id = :grupoId AND m.id = :usuarioId")
    boolean EstaUsuarioEnGrupo(@Param("grupoId") int grupoId, @Param("usuarioId") int usuarioId);

    // Buscar grupos por adminId
    List<Grupo> findByAdminId(int adminId);
}
