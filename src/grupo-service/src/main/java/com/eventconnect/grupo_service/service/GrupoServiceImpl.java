package com.eventconnect.grupo_service.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.eventconnect.grupo_service.models.Grupo;

@Service
public class GrupoServiceImpl implements GrupoService {

    @Override
    public List<Grupo> getAllGrupos() {
        return null;
        // return grupoRepository.findAll();
    }

    @Override
    public Grupo getGrupoById(String id) {
        return null;
        // return grupoRepository.findById(id).orElse(null);
    }

    @Override
    public Grupo createGrupo(Grupo grupo) {
        return null;
        // return grupoRepository.save(grupo);
    }

    @Override
    public Grupo updateGrupo(String id, Grupo grupo) {
        return null;
        // return grupoRepository.save(grupo);
    }

    @Override
    public void deleteGrupo(String id) {
        // grupoRepository.deleteById(id);
    }

    @Override
    public List<Grupo> findGruposByAdminId(String adminId) {
        // return grupoRepository.findByAdminId(adminId);
        return null;
    }

    @Override
    public List<Grupo> findGruposByEventoId(String eventoId) {
        // return grupoRepository.findByEventoId(eventoId);
        return null;        
    }

    
}
