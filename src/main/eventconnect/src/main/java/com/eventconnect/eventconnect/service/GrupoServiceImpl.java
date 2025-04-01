package com.eventconnect.eventconnect.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.eventconnect.eventconnect.model.Grupo;
import com.eventconnect.eventconnect.model.GrupoProjectionDTO;
import com.eventconnect.eventconnect.repository.GrupoRepository;

@Service
public class GrupoServiceImpl implements GrupoService {

    private final GrupoRepository grupoRepository;

    public GrupoServiceImpl(GrupoRepository grupoRepository) {
        this.grupoRepository = grupoRepository;
    }

    @Override
    public List<Grupo> obtenerTodosGrupos() {
        // return null;
        return grupoRepository.findAll();
    }

    @Override
    public Grupo obtenerGrupoId(int id) {
        // return null;
        return grupoRepository.findById(id).orElse(null);
    }

    @Override
    public Grupo crearGrupo(Grupo grupo) {
        // return null;
        return grupoRepository.save(grupo);
    }

    @Override
    public Grupo actualizarGrupo(int id, Grupo grupo) {
        return grupoRepository.findById(id).map(grupoExistente -> {
            grupoExistente.setNombre(grupo.getNombre());
            grupoExistente.setDescripcion(grupo.getDescripcion());
            grupoExistente.setAdmin(grupo.getAdmin());
            grupoExistente.setEvento(grupo.getEvento());
            return grupoRepository.save(grupoExistente);
        }).orElseThrow(() -> new RuntimeException("Grupo no encontrado con ID: " + id));
    }

    @Override
    public void borrarGrupo(int id) {
        grupoRepository.deleteById(id);
    }

    @Override
    public List<Grupo> encontrarGruposPorAdminId(int adminId) {
        return grupoRepository.findByAdminId(adminId);
    }

    @Override
    public List<GrupoProjectionDTO> encontrarGruposPorEventoId(int eventoId) {
        // Usamos el método en el repositorio que devuelve los DTOs
        return grupoRepository.encontrarGruposPorEventoId(eventoId);
    }

}
