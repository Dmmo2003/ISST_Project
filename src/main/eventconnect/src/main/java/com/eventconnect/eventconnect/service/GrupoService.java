package com.eventconnect.eventconnect.service;
import java.util.List;

import com.eventconnect.eventconnect.model.Grupo;
import com.eventconnect.eventconnect.model.GrupoProjectionDTO;

public interface GrupoService {
    List<Grupo> obtenerTodosGrupos();
    Grupo obtenerGrupoId(int id);
    Grupo crearGrupo(Grupo grupo);
    Grupo actualizarGrupo(int id, Grupo grupo);
    void borrarGrupo(int id);
    List<Grupo>encontrarGruposPorAdminId(int adminId);
    List<GrupoProjectionDTO>encontrarGruposPorEventoId(int eventoId);
    boolean isUserInGroup(int grupoId, int usuarioId);
}
