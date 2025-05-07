package com.eventconnect.eventconnect.controller;

import com.eventconnect.eventconnect.model.Evento;
import com.eventconnect.eventconnect.model.EventoConOrganizadorDTO;
import com.eventconnect.eventconnect.model.EventoDTO;
import com.eventconnect.eventconnect.service.EventoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;


import com.eventconnect.eventconnect.model.Usuario;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/eventos")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    @GetMapping
    public List<EventoDTO> obtenerEventos() {
        return eventoService.obtenerEventos();
    }

    @GetMapping("/{id}")
    public Optional<Evento> obtenerEventoPorId(@PathVariable int id) {
        return eventoService.obtenerEventoPorId(id);
    }

    @GetMapping("/organizadores")
    public ResponseEntity<List<EventoConOrganizadorDTO>> obtenerTodosLosEventosConOrganizadores() {
        List<EventoConOrganizadorDTO> eventosConOrganizadores = eventoService.obtenerTodosLosEventosConOrganizadores();
        return ResponseEntity.ok(eventosConOrganizadores);
    }

    @GetMapping("/organizadores/{id}")
    public ResponseEntity<EventoConOrganizadorDTO> obtenerEventoConOrganizador(@PathVariable int id) {
        EventoConOrganizadorDTO eventoConOrganizador = eventoService.obtenerEventoConOrganizador(id);
        return ResponseEntity.ok(eventoConOrganizador);
    }

    @PostMapping(value = "/nuevo", consumes = "multipart/form-data")
    @ResponseStatus(HttpStatus.CREATED)
    public Evento crearEvento(
            @RequestPart("evento") Evento evento,
            @RequestPart("imagen") MultipartFile imagenFile) throws IOException {
        if (imagenFile != null && !imagenFile.isEmpty()) {
            evento.setImagen(imagenFile.getBytes());
        }
        return eventoService.crearEvento(evento);
    }

    @GetMapping("/{id}/imagen")
    public ResponseEntity<byte[]> obtenerImagenEvento(@PathVariable int id) {
        Optional<Evento> evento = eventoService.obtenerEventoPorId(id);

        if (evento.isPresent() && evento.get().getImagen() != null) {
            return ResponseEntity
                    .ok()
                    .header("Content-Type", "image/jpeg") // o image/png si es el caso
                    .body(evento.get().getImagen());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public Evento actualizarEvento(@PathVariable int id, @RequestBody Evento evento) {
        evento.setId(id);
        return eventoService.actualizarEvento(evento);
    }

    @DeleteMapping("/{id}")
    public void eliminarEvento(@PathVariable int id) {
        eventoService.eliminarEvento(id);
    }

    @GetMapping("/{idEvento}/seguido/{idUsuario}")
    public boolean verificarSiUsuarioSigueEvento(@PathVariable int idEvento, @PathVariable int idUsuario) {
        return eventoService.verificarSiUsuarioSigueEvento(idUsuario, idEvento);
    }

}
