package com.eventconnect.eventconnect.repository;

import com.eventconnect.eventconnect.model.Evento;
import com.eventconnect.eventconnect.model.Grupo;

import org.springframework.data.repository.query.Param;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.eventconnect.eventconnect.model.Usuario;

public interface EventoRepository extends JpaRepository<Evento, Integer> {

    // @Query("SELECT e FROM Usuario e WHERE e.organizador.id = :id")
    // List<Usuario> findByOrganizadorId(@Param("findByOrganizadorId") int organizadorId);


}