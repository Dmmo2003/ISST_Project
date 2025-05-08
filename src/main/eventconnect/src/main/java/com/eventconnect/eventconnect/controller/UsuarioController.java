package com.eventconnect.eventconnect.controller;

import java.util.List;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.eventconnect.eventconnect.model.EventoDTO;
import com.eventconnect.eventconnect.model.GrupoDTO;
import com.eventconnect.eventconnect.model.Usuario;
import com.eventconnect.eventconnect.model.UsuarioDTO;
import com.eventconnect.eventconnect.service.UsuarioService;

import org.springframework.web.multipart.MultipartFile;


@CrossOrigin(origins = "http://localhost:5173")

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> getUsuarioById(@PathVariable int id) {
        return usuarioService.getUsuarioById(id)
                .map(usuario -> ResponseEntity.ok(new UsuarioDTO(usuario)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/eventos/creados")
    public ResponseEntity<List<EventoDTO>> getEventosCreados(@PathVariable int id) {
        return ResponseEntity.ok(usuarioService.getEventosCreadosPorUsuario(id));
    }

    // @GetMapping("/{id}/eventos-seguidos")
    // public ResponseEntity<List<EventoDTO>> getEventosSeguidos(@PathVariable int id) {
    //     return ResponseEntity.ok(usuarioService.getEventosSeguidosPorUsuario(id));
    // }

    // @PostMapping("/{usuarioId}/seguir/{eventoId}")
    // public ResponseEntity<Void> seguirEvento(@PathVariable int usuarioId,
    // @PathVariable int eventoId) {
    // usuarioService.seguirEvento(usuarioId, eventoId);
    // return ResponseEntity.ok().build();
    // }

    // // RUTA CORREGIDA: ahora coincide con lo que espera el frontend
    // @DeleteMapping("/{usuarioId}/seguir/{eventoId}")
    // public ResponseEntity<Void> dejarDeSeguirEvento(@PathVariable int usuarioId,
    // @PathVariable int eventoId) {
    // usuarioService.dejarDeSeguirEvento(usuarioId, eventoId);
    // return ResponseEntity.ok().build();
    // }
    
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

    // Este es opcional si estás eliminando eventos desde el frontend
    @DeleteMapping("/{usuarioId}/evento/{eventoId}")
    public ResponseEntity<Void> eliminarEvento(@PathVariable int usuarioId, @PathVariable int eventoId) {
        usuarioService.eliminarEventoCreadoPorUsuario(usuarioId, eventoId);
        return ResponseEntity.ok().build();
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

    @DeleteMapping("/{usuarioId}/salir-grupo/{eventoId}")
    public ResponseEntity<Void> salirDeGrupoPorEvento(@PathVariable int usuarioId, @PathVariable int eventoId) {
        usuarioService.salirDeGrupoPorEvento(usuarioId, eventoId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDTO> actualizarUsuario(@PathVariable int id, @RequestBody UsuarioDTO datosActualizados) {
        Usuario usuarioActualizado = usuarioService.actualizarUsuario(id, datosActualizados);
        return ResponseEntity.ok(new UsuarioDTO(usuarioActualizado));
    }

    @PostMapping("/{id}/foto-perfil")
    public ResponseEntity<UsuarioDTO> subirFotoPerfil(@PathVariable int id, @RequestParam("file") MultipartFile file) {
        try {
            Usuario usuarioActualizado = usuarioService.subirFotoPerfil(id, file);
            return ResponseEntity.ok(new UsuarioDTO(usuarioActualizado));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}


