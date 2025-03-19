package com.eventconnect.evento.controllers;

import com.eventconnect.eventconnect.model.Evento;
import com.eventconnect.eventconnect.service.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/eventos")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    @GetMapping
    public List<Evento> obtenerEventos() {
        return eventoService.obtenerEventos();
    }

    @GetMapping("/{id}")
    public Optional<Evento> obtenerEventoPorId(@PathVariable int id) {
        return eventoService.obtenerEventoPorId(id);
    }

    @PostMapping
    public Evento crearEvento(@RequestBody Evento evento) {
        return eventoService.crearEvento(evento);
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
}
