package com.eventconnect.eventconnect.controller;

import com.eventconnect.eventconnect.model.EventoDTO;
import com.eventconnect.eventconnect.model.UsuarioDTO;
import com.eventconnect.eventconnect.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/{id}/eventos-creados")
    public ResponseEntity<List<EventoDTO>> getEventosCreados(@PathVariable int id) {
        return ResponseEntity.ok(usuarioService.getEventosCreadosPorUsuario(id));
    }

    @GetMapping("/{id}/eventos-seguidos")
    public ResponseEntity<List<EventoDTO>> getEventosSeguidos(@PathVariable int id) {
        return ResponseEntity.ok(usuarioService.getEventosSeguidosPorUsuario(id));
    }

    @PostMapping("/{usuarioId}/seguir/{eventoId}")
    public ResponseEntity<Void> seguirEvento(@PathVariable int usuarioId, @PathVariable int eventoId) {
        usuarioService.seguirEvento(usuarioId, eventoId);
        return ResponseEntity.ok().build();
    }

    // RUTA CORREGIDA: ahora coincide con lo que espera el frontend
    @DeleteMapping("/{usuarioId}/seguir/{eventoId}")
    public ResponseEntity<Void> dejarDeSeguirEvento(@PathVariable int usuarioId, @PathVariable int eventoId) {
        usuarioService.dejarDeSeguirEvento(usuarioId, eventoId);
        return ResponseEntity.ok().build();
    }

    // Este es opcional si estás eliminando eventos desde el frontend
    @DeleteMapping("/{usuarioId}/eliminar-evento/{eventoId}")
    public ResponseEntity<Void> eliminarEvento(@PathVariable int usuarioId, @PathVariable int eventoId) {
        usuarioService.eliminarEventoCreadoPorUsuario(usuarioId, eventoId);
        return ResponseEntity.ok().build();
    }
}
