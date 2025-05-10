package com.eventconnect.mensaje.controllers;

import com.eventconnect.mensaje.models.Mensaje;
import com.eventconnect.mensaje.services.MensajeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mensajes")
public class MensajeController {

    @Autowired
    private MensajeService mensajeService;

    @GetMapping
    public List<Mensaje> obtenerTodos() {
        return mensajeService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public Mensaje obtenerPorId(@PathVariable int id) {
        return mensajeService.obtenerPorId(id);
    }

    @PostMapping
    public Mensaje crearMensaje(@RequestBody Mensaje mensaje) {
        return mensajeService.crearMensaje(mensaje);
    }

    @PutMapping("/{id}")
    public Mensaje actualizarMensaje(@PathVariable int id, @RequestBody Mensaje mensaje) {
        return mensajeService.actualizarMensaje(id, mensaje);
    }

    @DeleteMapping("/{id}")
    public void eliminarMensaje(@PathVariable int id) {
        mensajeService.eliminarMensaje(id);
    }
}
