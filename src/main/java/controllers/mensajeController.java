package controllers;

import models.MensajeModel;
import services.MensajeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mensajes")
public class MensajeController {

    @Autowired
    private MensajeService mensajeService;

    @GetMapping
    public List<MensajeModel> obtenerTodos() {
        return mensajeService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public MensajeModel obtenerPorId(@PathVariable Long id) {
        return mensajeService.obtenerPorId(id);
    }

    @PostMapping
    public MensajeModel crearMensaje(@RequestBody MensajeModel mensaje) {
        return mensajeService.crearMensaje(mensaje);
    }

    @PutMapping("/{id}")
    public MensajeModel actualizarMensaje(@PathVariable Long id, @RequestBody MensajeModel mensaje) {
        return mensajeService.actualizarMensaje(id, mensaje);
    }

    @DeleteMapping("/{id}")
    public void eliminarMensaje(@PathVariable Long id) {
        mensajeService.eliminarMensaje(id);
    }
}
