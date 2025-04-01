package com.eventconnect.eventconnect.service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.eventconnect.eventconnect.model.Grupo;
import com.eventconnect.eventconnect.model.GrupoProjectionDTO;
import com.eventconnect.eventconnect.model.Usuario;
import com.eventconnect.eventconnect.repository.GrupoRepository;
import com.eventconnect.eventconnect.repository.UsuarioRepository;

@Service
public class GrupoServiceImpl implements GrupoService {

    private final GrupoRepository grupoRepository;
    private final UsuarioRepository usuarioRepository;

    public GrupoServiceImpl(GrupoRepository grupoRepository, UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
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

    @Override
    public boolean isUserInGroup(int grupoId, int usuarioId) {
        Optional<Grupo> grupoOpt = grupoRepository.findById(grupoId);
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);

        // Verificar si el grupo y el usuario existen
        if (grupoOpt.isPresent() && usuarioOpt.isPresent()) {
            Grupo grupo = grupoOpt.get();
            Usuario usuario = usuarioOpt.get();

            // Verificar si el usuario es miembro del grupo
            return grupo.getMiembros().stream().anyMatch(u -> u.getId() == usuario.getId());
        }

        return false;
    }

}
