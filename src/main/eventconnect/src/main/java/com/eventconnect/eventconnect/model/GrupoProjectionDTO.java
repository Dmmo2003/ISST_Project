package com.eventconnect.eventconnect.model;

public class GrupoProjectionDTO {

    private int id;
    private String nombre;
    private int eventoId; // Usamos eventoId, no la entidad completa
    private int adminId;  // Usamos adminId, no la entidad completa
    private String descripcion;
    private byte[] imagen;

    // Constructor
    public GrupoProjectionDTO(int id, String nombre, int eventoId, int adminId, String descripcion, byte[] imagen) {
        this.id = id;
        this.nombre = nombre;
        this.eventoId = eventoId;
        this.adminId = adminId;
        this.descripcion = descripcion;
        this.imagen = imagen;
    }

    // Getters and setters
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

    public int getEventoId() {
        return eventoId;
    }

    public void setEventoId(int eventoId) {
        this.eventoId = eventoId;
    }

    public int getAdminId() {
        return adminId;
    }

    public void setAdminId(int adminId) {
        this.adminId = adminId;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public byte[] getImagen() {
        return imagen;
    }
    
    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }
}
