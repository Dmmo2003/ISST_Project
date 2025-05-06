package com.eventconnect.eventconnect.model;

import java.util.List;

public class GrupoDTO {
    private int id;
    private String nombre;
    private String descripcion;
    private int adminId;
    private int eventoId;
    private List<String> miembrosNombres;

    public GrupoDTO(int id, String nombre, String descripcion, int adminId, int eventoId,
            List<String> miembrosNombres) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.adminId = adminId;
        this.eventoId = eventoId;
        this.miembrosNombres = miembrosNombres;
    }

    // Getters y setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public int getAdminId() {
        return adminId;
    }

    public void setAdminId(int adminId) {
        this.adminId = adminId;
    }

    public int getEventoId() {
        return eventoId;
    }

    public void setEventoId(int eventoId) {
        this.eventoId = eventoId;
    }

    public List<String> getMiembrosNombres() {
        return miembrosNombres;
    }

    public void setMiembrosNombres(List<String> miembrosNombres) {
        this.miembrosNombres = miembrosNombres;
    }
}
