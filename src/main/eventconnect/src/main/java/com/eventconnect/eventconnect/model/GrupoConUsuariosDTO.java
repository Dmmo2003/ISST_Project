package com.eventconnect.eventconnect.model;

import java.util.List;

public class GrupoConUsuariosDTO {

    private int id;
    private String nombre;
    private String descripcion;
    private String adminNombre;
    private List<String> miembrosNombres;

    // Constructor
    public GrupoConUsuariosDTO(int id, String nombre, String descripcion, String adminNombre, List<String> miembrosNombres) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.adminNombre = adminNombre;
        this.miembrosNombres = miembrosNombres;
    }

    // Getters y Setters
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

    public String getAdminNombre() {
        return adminNombre;
    }

    public void setAdminNombre(String adminNombre) {
        this.adminNombre = adminNombre;
    }

    public List<String> getMiembrosNombres() {
        return miembrosNombres;
    }

    public void setMiembrosNombres(List<String> miembrosNombres) {
        this.miembrosNombres = miembrosNombres;
    }
}
