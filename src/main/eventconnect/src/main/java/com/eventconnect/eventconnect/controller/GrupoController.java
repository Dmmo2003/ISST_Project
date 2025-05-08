package com.eventconnect.eventconnect.controller;

import com.eventconnect.eventconnect.model.Evento;
import com.eventconnect.eventconnect.model.Grupo;
import com.eventconnect.eventconnect.model.GrupoProjectionDTO;
import com.eventconnect.eventconnect.service.GrupoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/grupos")
public class GrupoController {

    private final GrupoService grupoService;

    @Autowired
    public GrupoController(GrupoService grupoService) {
        this.grupoService = grupoService;
    }

    // Obtener todos los grupos
    @GetMapping
    public ResponseEntity<List<Grupo>> obtenerGrupos() {
        return ResponseEntity.ok(grupoService.obtenerTodosGrupos());
    }

    // Obtener un grupo por ID
    @GetMapping("/{id}")
    public ResponseEntity<Grupo> obtenerGrupoPorId(@PathVariable int id) {
        return grupoService.obtenerGrupoPorId(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/imagen")
    public ResponseEntity<byte[]> obtenerImagenGrupo(@PathVariable int id) {
        Optional<Grupo> grupo = grupoService.obtenerGrupoPorId(id);

        if (grupo.isPresent() && grupo.get().getImagen() != null) {
            return ResponseEntity
                    .ok()
                    .header("Content-Type", "image/jpeg") // o image/png si es el caso
                    .body(grupo.get().getImagen());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "/nuevo", consumes = "multipart/form-data")
    public ResponseEntity<Grupo> crearGrupo(
            @RequestPart("grupo") Grupo grupo,
            @RequestPart(value = "imagen", required = false) MultipartFile imagenFile) {
        try {
            if (imagenFile != null && !imagenFile.isEmpty()) {
                grupo.setImagen(imagenFile.getBytes());
            }
            Grupo grupoCreado = grupoService.crearGrupo(grupo);
            return ResponseEntity.ok(grupoCreado);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Actualizar un grupo existente
    @PutMapping("/{id}")
    public ResponseEntity<Grupo> actualizarGrupo(@PathVariable int id, @RequestBody Grupo grupo) {
        try {
            return ResponseEntity.ok(grupoService.actualizarGrupo(id, grupo));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminar un grupo por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> borrarGrupo(@PathVariable int id) {
        grupoService.borrarGrupo(id);
        return ResponseEntity.noContent().build();
    }

    // Obtener grupos por adminId
    @GetMapping("/admin/{adminId}")
    public ResponseEntity<List<Grupo>> obtenerPorAdminId(@PathVariable int adminId) {
        return ResponseEntity.ok(grupoService.encontrarGruposPorAdminId(adminId));
    }

    // Obtener grupos por eventoId
    @GetMapping("/evento/{eventoId}")
    public List<GrupoProjectionDTO> obtenerGruposPorEvento(@PathVariable int eventoId) {
        // Llamamos al servicio para obtener los grupos por eventoId
        return grupoService.encontrarGruposPorEventoId(eventoId);
    }

    @GetMapping("/{grupoId}/usuario/{usuarioId}")
    public boolean EstaUsuarioEnGrupo(@PathVariable int grupoId, @PathVariable int usuarioId) {
        return grupoService.EstaUsuarioEnGrupo(grupoId, usuarioId);
    }

    // Unirse a un grupo
    @PostMapping("/{grupoId}/entrar/{usuarioId}")
    public ResponseEntity<String> unirseAGrupo(@PathVariable int grupoId, @PathVariable int usuarioId) {
        grupoService.unirseAGrupo(usuarioId, grupoId);
        return ResponseEntity.ok("Usuario " + usuarioId + " se unió al grupo " + grupoId);
    }

    // Salir de un grupo
    @DeleteMapping("/{grupoId}/salir/{usuarioId}")
    public ResponseEntity<String> salirDeGrupo(@PathVariable int grupoId, @PathVariable int usuarioId) {
        boolean eliminado = grupoService.salirDeGrupo(grupoId, usuarioId);
        if (eliminado) {
            return ResponseEntity.ok("Usuario " + usuarioId + " ha salido del grupo " + grupoId);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No se pudo salir del grupo.");
        }
    }

}
