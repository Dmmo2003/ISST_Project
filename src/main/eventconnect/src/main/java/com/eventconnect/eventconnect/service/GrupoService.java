package com.eventconnect.eventconnect.service;

import java.util.List;
import java.util.Optional;


import com.eventconnect.eventconnect.model.Grupo;
import com.eventconnect.eventconnect.model.GrupoProjectionDTO;

public interface GrupoService {
    List<Grupo> obtenerTodosGrupos();

    Optional<Grupo> obtenerGrupoPorId(int id);

    Grupo crearGrupo(Grupo grupo);

    Grupo actualizarGrupo(int id, Grupo grupo);

    void borrarGrupo(int id);

    List<Grupo> encontrarGruposPorAdminId(int adminId);

    List<GrupoProjectionDTO> encontrarGruposPorEventoId(int eventoId);

    boolean EstaUsuarioEnGrupo(int grupoId, int usuarioId);

    void unirseAGrupo(int usuarioId, int grupoId);

    boolean salirDeGrupo(int grupoId, int usuarioId);
}
