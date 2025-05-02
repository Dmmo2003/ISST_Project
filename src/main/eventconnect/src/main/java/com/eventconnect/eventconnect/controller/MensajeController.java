package com.eventconnect.eventconnect.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.eventconnect.eventconnect.model.EnvioMensajeDTO;
import com.eventconnect.eventconnect.model.Mensaje;
import com.eventconnect.eventconnect.model.MensajeDTO;
import com.eventconnect.eventconnect.service.MensajeService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/mensajes")
public class MensajeController {

    @Autowired
    private MensajeService mensajeService;

    @GetMapping
    public List<Mensaje> obtenerTodos() {
        return mensajeService.obtenerTodos();
    }

    @GetMapping("/{mensajeId}")
    public Mensaje obtenerPorId(@PathVariable int mensajeId) {
        return mensajeService.obtenerPorId(mensajeId);
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

    @GetMapping("/grupo/{grupoId}")
    @ResponseBody
    public List<MensajeDTO> obtenerMensajesGrupo(@PathVariable int grupoId) {
        return mensajeService.obtenerMensajesGrupo(grupoId);
    }

    @PostMapping("/enviar/grupo/{grupoId}")
    public MensajeDTO enviarMensajeGrupo( @PathVariable int grupoId, @RequestBody EnvioMensajeDTO body) {
        String mensaje = body.getMensaje();
        int usuarioId = body.getUsuarioId();
        return mensajeService.enviarMensajeGrupo(grupoId, mensaje, usuarioId);
    }
    

}
