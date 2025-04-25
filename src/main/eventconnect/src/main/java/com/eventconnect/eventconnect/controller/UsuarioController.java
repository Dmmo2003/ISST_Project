package com.eventconnect.eventconnect.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventconnect.eventconnect.model.EventoDTO;
import com.eventconnect.eventconnect.model.GrupoDTO;
import com.eventconnect.eventconnect.model.Usuario;
import com.eventconnect.eventconnect.service.UsuarioService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // Obtener todos los usuarios
    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return usuarioService.getAllUsuarios();
    }

    // Obtener un usuario por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable int id) {
        Optional<Usuario> usuario = usuarioService.getUsuarioById(id);
        return usuario.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear un nuevo usuario
    @PostMapping
    public Usuario createUsuario(@RequestBody Usuario usuario) {
        return usuarioService.saveUsuario(usuario);
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

    // Seguir un evento
    @PostMapping("/{usuarioId}/eventos/{eventoId}/seguir")
    public ResponseEntity<String> seguirEvento(@PathVariable int usuarioId, @PathVariable int eventoId) {
        usuarioService.seguirEvento(usuarioId, eventoId);
        return ResponseEntity.ok("Usuario " + usuarioId + " ahora sigue el evento " + eventoId);
    }

    // Dejar de seguir un evento
    @PostMapping("/{usuarioId}/eventos/{eventoId}/dejar")
    public void dejarDeSeguirEvento(@PathVariable int usuarioId, @PathVariable int eventoId) {
        usuarioService.dejarDeSeguirEvento(usuarioId, eventoId);
    }

    // Obtener un eventos seguidos por el usuario
    @GetMapping("/{idUsuario}/eventos/seguidos")
    public List<EventoDTO> obtenerEventosSeguidos(@PathVariable int idUsuario) {
        return usuarioService.obtenerEventosSeguidos(idUsuario);
    }

    // @GetMapping("/{idUsuario}/grupos/seguidos")
    // public List<GrupoDTO> obtenerGruposSeguidos(@PathVariable int idUsuario) {
    // // return usuarioService.obtenerGruposSeguidos(idUsuario);
    // return usuarioService.obtenerGruposSeguidos(idUsuario);
    // }
    @GetMapping("/{usuarioId}/grupos/seguidos")
    public ResponseEntity<List<GrupoDTO>> obtenerGruposPorUsuario(@PathVariable int usuarioId) {
        List<GrupoDTO> grupos = usuarioService.obtenerGruposPorUsuario(usuarioId);
        return ResponseEntity.ok(grupos);
    }
}
