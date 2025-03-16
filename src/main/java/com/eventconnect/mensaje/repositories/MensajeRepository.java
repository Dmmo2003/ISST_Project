package com.eventconnect.mensaje.repositories;

import com.eventconnect.mensaje.models.Mensaje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MensajeRepository extends JpaRepository<Mensaje, Integer> {
    List<Mensaje> findByGrupoId(int grupoId);
    List<Mensaje> findByRemitenteId(int remitenteId);
}
