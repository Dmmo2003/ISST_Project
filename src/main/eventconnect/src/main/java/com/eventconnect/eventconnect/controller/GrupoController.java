package com.eventconnect.eventconnect.controller;

import com.eventconnect.eventconnect.model.Grupo;
import com.eventconnect.eventconnect.service.GrupoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<Grupo> obtenerPorId(@PathVariable int id) {
        Grupo grupo = grupoService.obtenerGrupoId(id);
        return grupo != null ? ResponseEntity.ok(grupo) : ResponseEntity.notFound().build();
    }

    // Crear un nuevo grupo
    @PostMapping
    public ResponseEntity<Grupo> crearGrupo(@RequestBody Grupo grupo) {
        return ResponseEntity.ok(grupoService.crearGrupo(grupo));
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
    public ResponseEntity<List<Grupo>> obtenerPorEventoId(@PathVariable int eventoId) {
        return ResponseEntity.ok(grupoService.encontrarGruposPorEventoId(eventoId));
    }
}
