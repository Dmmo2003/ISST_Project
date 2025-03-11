package com.eventconnect.grupo_service.service;
import java.util.List;

import com.eventconnect.grupo_service.models.Grupo;

public interface GrupoService {
    List<Grupo> getAllGrupos();
    Grupo getGrupoById(String id);
    Grupo createGrupo(Grupo grupo);
    Grupo updateGrupo(String id, Grupo grupo);
    void deleteGrupo(String id);
    List<Grupo>findGruposByAdminId(String adminId);
    List<Grupo>findGruposByEventoId(String eventoId);
}
