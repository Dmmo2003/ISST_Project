package com.eventconnect.eventconnect.service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;

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
    public boolean EstaUsuarioEnGrupo(int grupoId, int usuarioId) {
        return grupoRepository.EstaUsuarioEnGrupo(grupoId, usuarioId);
    }

    @Override
    @Transactional
    public void unirseAGrupo(int usuarioId, int grupoId) {
        Grupo grupo = grupoRepository.findById(grupoId)
            .orElseThrow(() -> new RuntimeException("Grupo no encontrado"));

        Usuario usuario = usuarioRepository.findById(usuarioId)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Verificar si el usuario ya es miembro del grupo
        if (!grupo.getMiembros().contains(usuario)) {
            grupo.getMiembros().add(usuario);
            grupoRepository.save(grupo);
        }
    }

    @Override
    @Transactional
    public boolean salirDeGrupo(int grupoId, int usuarioId) {
        // Obtener el grupo y el usuario
        Optional<Grupo> grupoOpt = grupoRepository.findById(grupoId);
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);

        if (grupoOpt.isPresent() && usuarioOpt.isPresent()) {
            Grupo grupo = grupoOpt.get();
            Usuario usuario = usuarioOpt.get();

            // Eliminar la relación en la tabla Usuario_Grupo
            grupo.getMiembros().remove(usuario);
            usuario.getGrupos().remove(grupo);

            grupoRepository.save(grupo);
            usuarioRepository.save(usuario);

            return true;
        }

        return false;
    }

}
