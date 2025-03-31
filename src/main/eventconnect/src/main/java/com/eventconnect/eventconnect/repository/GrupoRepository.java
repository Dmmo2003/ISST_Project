package com.eventconnect.grupo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eventconnect.grupo.models.Grupo;

@Repository
public interface GrupoRepository extends JpaRepository<Grupo, Integer> {
    
    // Buscar grupos por eventoId
    List<Grupo> findByEventoId(int eventoId);

    // Buscar grupos por adminId
    List<Grupo> findByAdminId(int adminId);
}
