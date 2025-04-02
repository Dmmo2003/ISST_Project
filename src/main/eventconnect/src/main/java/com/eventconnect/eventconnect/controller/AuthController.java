package com.eventconnect.eventconnect.controller;

import com.eventconnect.eventconnect.model.Usuario;
import com.eventconnect.eventconnect.model.UsuarioDTO;
import com.eventconnect.eventconnect.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<UsuarioDTO> loginUsuario(@RequestBody Usuario usuario) {
        String correo = usuario.getCorreo();
        String contraseña = usuario.getContraseña();

        Optional<Usuario> usuarioOptional = usuarioService.getUsuarioByMailPassword(correo, contraseña);

        if (usuarioOptional.isPresent()) {
            Usuario u = usuarioOptional.get();

            UsuarioDTO usuarioDTO = new UsuarioDTO(
                    u.getId(),
                    u.getNombreUsuario(),
                    u.getCorreo(),
                    u.getNombre(),
                    u.getPrimer_Apellido(),
                    u.getSegundo_Apellido(),
                    u.getTipo());

            return ResponseEntity.ok(usuarioDTO);
        } else {
            return ResponseEntity.status(401).build(); // Código 401 si no se encuentra el usuario
        }
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

    // @PostMapping("/registro")
    // public ResponseEntity<Usuario> registrarUsuario(@RequestBody Usuario usuario)
    // {
    // try {
    // Usuario nuevoUsuario = usuarioService.registrarUsuario(usuario);
    // return new ResponseEntity<>(nuevoUsuario, HttpStatus.CREATED);
    // } catch (Exception e) {
    // return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    // }
    // }

    @PostMapping("/registro")
    public ResponseEntity<?> registrarUsuario(@RequestBody Usuario usuario) {
        // Verificar si el correo ya está registrado
        if (usuarioService.existeByCorreo(usuario.getCorreo())) {
            return ResponseEntity.badRequest().body("El correo ya está registrado.");
        }

        // Verificar si el nombre de usuario ya está registrado
        if (usuarioService.existsByUsername(usuario.getNombreUsuario())) {
            return ResponseEntity.badRequest().body("El nombre de usuario ya está registrado.");
        }

        // Guardar el usuario en la base de datos
        Usuario nuevoUsuario = usuarioService.registrarUsuario(usuario);

        // Retornar una respuesta exitosa
        return ResponseEntity.ok(nuevoUsuario);
    }

}
