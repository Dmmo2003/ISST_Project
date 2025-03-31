package com.eventconnect.eventconnect.repository;

import com.eventconnect.eventconnect.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventoRepository extends JpaRepository<Evento, Integer> {
    // Aquí puedes agregar consultas personalizadas si es necesario
}