package com.eventconnect.eventconnect.service;

import com.eventconnect.eventconnect.model.Usuario;
import com.eventconnect.eventconnect.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

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

    // Obtener un usuario por su correo y contraseña
    // @Override
    // public Optional<Usuario> getUsuarioByMailPassword(String correo, String
    // contraseña) {
    // System.out.println(correo);
    // System.out.println(contraseña);
    // Optional<Usuario> usuario =
    // usuarioRepository.findByCorreoAndContrasena(correo, contraseña);
    // usuario.ifPresentOrElse(
    // u -> System.out.println("Usuario encontrado: " + u),
    // () -> System.out.println("Usuario no encontrado")
    // );
    // return usuario;
    // }
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

}
