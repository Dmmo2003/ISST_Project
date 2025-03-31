package com.eventconnect.eventconnect.repository;

import com.eventconnect.eventconnect.model.Evento;
import com.eventconnect.eventconnect.model.Grupo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EventoRepository extends JpaRepository<Evento, Integer> {
    


}