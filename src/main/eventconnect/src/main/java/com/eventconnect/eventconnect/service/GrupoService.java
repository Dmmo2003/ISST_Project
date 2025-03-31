package com.eventconnect.eventconnect.service;
import java.util.List;

import com.eventconnect.eventconnect.model.Grupo;

public interface GrupoService {
    List<Grupo> obtenerTodosGrupos();
    Grupo obtenerGrupoId(int id);
    Grupo crearGrupo(Grupo grupo);
    Grupo actualizarGrupo(int id, Grupo grupo);
    void borrarGrupo(int id);
    List<Grupo>encontrarGruposPorAdminId(int adminId);
    List<Grupo>encontrarGruposPorEventoId(int eventoId);
}
