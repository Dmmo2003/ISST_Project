package com.eventconnect.eventconnect.controller;

import com.eventconnect.eventconnect.model.Usuario;
import com.eventconnect.eventconnect.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return usuarioService.getAllUsuarios();
    }


    // login usuario
    @PostMapping("/login")
    public Usuario loginUsuario(@RequestBody Usuario usuario) {
        String correo = usuario.getCorreo();
        String contraseña = usuario.getContraseña();
        return usuarioService.getUsuarioByMailPassword(correo, contraseña).orElse(null);
    }

    // Actualizar un usuario existente
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> updateUsuario(@PathVariable int id, @RequestBody Usuario usuarioDetails) {
        Optional<Usuario> usuario = usuarioService.getUsuarioById(id);

        if (usuario.isPresent()) {
            Usuario existingUsuario = usuario.get();
            existingUsuario.setNombre(usuarioDetails.getNombre());
            existingUsuario.setPrimer_Apellido(usuarioDetails.getPrimer_Apellido());
            existingUsuario.setSegundo_Apellido(usuarioDetails.getSegundo_Apellido());
            existingUsuario.setNombreUsuario(usuarioDetails.getNombreUsuario());
            existingUsuario.setFechaNacimiento(usuarioDetails.getFechaNacimiento());
            existingUsuario.setCorreo(usuarioDetails.getCorreo());
            existingUsuario.setContraseña(usuarioDetails.getContraseña());

            return ResponseEntity.ok(usuarioService.saveUsuario(existingUsuario));
        }

        return ResponseEntity.notFound().build();
    }

    // Eliminar un usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable int id) {
        Optional<Usuario> usuario = usuarioService.getUsuarioById(id);

        if (usuario.isPresent()) {
            usuarioService.deleteUsuario(id);
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }

    // Obtener un usuario por su nombre de usuario
    @GetMapping("/nombreUsuario/{nombreUsuario}")
    public ResponseEntity<Usuario> getUsuarioByUsername(@PathVariable String nombreUsuario) {
        Optional<Usuario> usuario = usuarioService.obtenerUsuarioPorUsername(nombreUsuario);
        return usuario.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

}
