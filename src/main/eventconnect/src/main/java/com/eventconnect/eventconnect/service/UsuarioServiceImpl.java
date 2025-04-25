package com.eventconnect.eventconnect.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eventconnect.eventconnect.model.Evento;
import com.eventconnect.eventconnect.model.EventoDTO;
import com.eventconnect.eventconnect.model.Grupo;
import com.eventconnect.eventconnect.model.GrupoConUsuariosDTO;
import com.eventconnect.eventconnect.model.GrupoDTO;
import com.eventconnect.eventconnect.model.Usuario;
import com.eventconnect.eventconnect.repository.EventoRepository;
import com.eventconnect.eventconnect.repository.GrupoRepository;
import com.eventconnect.eventconnect.repository.UsuarioRepository;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final GrupoRepository grupoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;
    private EventoRepository eventoRepository;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository, EventoRepository eventoRepository,
            GrupoRepository grupoRepository) {
        this.usuarioRepository = usuarioRepository;
        this.eventoRepository = eventoRepository;
        this.grupoRepository = grupoRepository;
    }

    // Obtener todos los usuarios
    @Override
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    // Guardar o actualizar un usuario
    @Override
    public Usuario saveUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // Obtener un usuario por su ID
    @Override
    public Optional<Usuario> getUsuarioById(int id) {
        return usuarioRepository.findById(id);
    }

    // Eliminar un usuario
    @Override
    public void deleteUsuario(int id) {
        usuarioRepository.deleteById(id);
    }

    // Obtener un usuario por su nombre de usuario
    @Override
    public Optional<Usuario> obtenerUsuarioPorUsername(String nombreUsuario) {
        return usuarioRepository.findByNombreUsuario(nombreUsuario);
    }

    @Override
    public Optional<Usuario> getUsuarioByMailPassword(String correo, String contraseña) {
        System.out.println(correo);
        System.out.println(contraseña);
        Optional<Usuario> usuario = usuarioRepository.findByCorreoAndContrasena(correo, contraseña);
        usuario.ifPresentOrElse(
                u -> {
                    System.out.println("Usuario encontrado: " + u);
                    u.setContraseña(null); // Eliminar la contraseña antes de devolver el objeto
                },
                () -> System.out.println("Usuario no encontrado"));
        return usuario;
    }

    @Override
    public void seguirEvento(int usuarioId, int eventoId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Evento evento = eventoRepository.findById(eventoId)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado"));

        // Añadir el evento a la lista de eventos seguidos
        usuario.getEventosSeguidos().add(evento);
        evento.getSeguidores().add(usuario);

        // Guardar los cambios
        usuarioRepository.save(usuario);
        eventoRepository.save(evento);
    }

    @Override
    public void dejarDeSeguirEvento(int usuarioId, int eventoId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Evento evento = eventoRepository.findById(eventoId)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado"));

        // Eliminar el evento de la lista de eventos seguidos
        usuario.getEventosSeguidos().remove(evento);
        evento.getSeguidores().remove(usuario);

        // Guardar los cambios
        usuarioRepository.save(usuario);
        eventoRepository.save(evento);
    }

    // Método para crear un nuevo usuario
    @Override
    public Usuario registrarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // Método para verificar si el correo ya está registrado
    @Override
    public boolean existeByCorreo(String correo) {
        return usuarioRepository.existsByCorreo(correo);
    }

    // Método para verificar si el nombre de usuario ya está registrado
    @Override
    public boolean existsByUsername(String nombreUsuario) {
        return usuarioRepository.existsByNombreUsuario(nombreUsuario);
    }

    @Override
    public List<EventoDTO> obtenerEventosSeguidos(int idUsuario) {
        return eventoRepository.obtenerEventosSeguidos(idUsuario);
    }

    // @Override
    // public List<GrupoDTO> obtenerGruposSeguidos(int idUsuario) {
    // // return grupoRepository.obtenerGruposSeguidos(idUsuario);
    // return grupoRepository.obtenerGruposSeguidosPorUsuario(idUsuario);
    // }

    // GrupoService.java

    @Override
    public List<GrupoDTO> obtenerGruposPorUsuario(int usuarioId) {
        List<Grupo> grupos = grupoRepository.findByMiembrosId(usuarioId); // este método se define en el repositorio

        return grupos.stream().map(grupo -> {
            List<String> miembrosNombres = grupo.getMiembros()
                    .stream()
                    .map(Usuario::getNombreUsuario)
                    .collect(Collectors.toList());

            return new GrupoDTO(
                    grupo.getId(),
                    grupo.getNombre(),
                    grupo.getDescripcion(),
                    grupo.getAdmin().getId(),
                    grupo.getEvento().getId(),
                    miembrosNombres);
        }).collect(Collectors.toList());
    }

}
