package com.eventconnect.eventconnect.service;

import com.eventconnect.eventconnect.model.Evento;
import com.eventconnect.eventconnect.model.Usuario;
import com.eventconnect.eventconnect.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.eventconnect.eventconnect.repository.EventoRepository;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    private EventoRepository eventoRepository;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository,EventoRepository eventoRepository) {
        this.usuarioRepository = usuarioRepository;
        this.eventoRepository = eventoRepository;
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
        Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Evento evento = eventoRepository.findById(eventoId).orElseThrow(() -> new RuntimeException("Evento no encontrado"));

        // Añadir el evento a la lista de eventos seguidos
        usuario.getEventosSeguidos().add(evento);
        evento.getSeguidores().add(usuario);

        // Guardar los cambios
        usuarioRepository.save(usuario);
        eventoRepository.save(evento);
    }

    @Override
    public void dejarDeSeguirEvento(int usuarioId, int eventoId) {
        Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Evento evento = eventoRepository.findById(eventoId).orElseThrow(() -> new RuntimeException("Evento no encontrado"));

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

}
