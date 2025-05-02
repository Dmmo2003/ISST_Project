package com.eventconnect.eventconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eventconnect.eventconnect.model.Mensaje;

@Repository
public interface MensajeRepository extends JpaRepository<Mensaje, Integer> {
    List<Mensaje> findByGrupoId(int grupoId);
    List<Mensaje> findByRemitenteId(int remitenteId);
    List<Mensaje> findByGrupoIdOrderByFechaAsc(int grupoId);

}
