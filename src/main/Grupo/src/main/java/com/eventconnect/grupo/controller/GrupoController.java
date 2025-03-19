package com.eventconnect.grupo.controllers;

import com.eventconnect.grupo.models.Grupo;
import com.eventconnect.grupo.services.GrupoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/grupos")
public class GrupoController {

    @Autowired
    private GrupoService grupoService;

    @GetMapping
    public List<Grupo> obtenerTodos() {
        return grupoService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public Grupo obtenerPorId(@PathVariable int id) {
        return grupoService.obtenerPorId(id);
    }

    @PostMapping
    public Grupo crearGrupo(@RequestBody Grupo grupo) {
        return grupoService.crearGrupo(grupo);
    }

    @PutMapping("/{id}")
    public Grupo actualizarGrupo(@PathVariable int id, @RequestBody Grupo grupo) {
        return grupoService.actualizarGrupo(id, grupo);
    }

    @DeleteMapping("/{id}")
    public void eliminarGrupo(@PathVariable int id) {
        grupoService.eliminarGrupo(id);
    }
}
