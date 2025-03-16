package com.eventconnect.grupo_service.service;
import java.util.List;

import com.eventconnect.grupo_service.models.Grupo;

public interface GrupoService {
    List<Grupo> obtenerTodosGrupos();
    Grupo obtenerGrupoId(int id);
    Grupo crearGrupo(Grupo grupo);
    Grupo actualizarGrupo(int id, Grupo grupo);
    void borrarGrupo(int id);
    List<Grupo>encontrarGruposPorAdminId(int adminId);
    List<Grupo>encontrarGruposPorEventoId(int eventoId);
}
