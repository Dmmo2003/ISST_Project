package com.eventconnect.eventconnect.model;

import java.math.BigDecimal;
import java.sql.Timestamp;
import com.eventconnect.eventconnect.model.Evento;

public class EventoDTO {
    private int id;
    private String nombre;
    private Timestamp fecha;
    private String ubicacion;
    private String descripcion;
    private String categoria;
    private BigDecimal precio; 
    private int organizadorId; // Solo el ID del organizador

    public EventoDTO(Evento evento) {
        this.id = evento.getId();
        this.nombre = evento.getNombre();
        this.fecha = evento.getFecha();
        this.ubicacion = evento.getUbicacion();
        this.descripcion = evento.getDescripcion();
        this.categoria = evento.getCategoria();
        this.precio = evento.getPrecio();
        this.organizadorId = evento.getOrganizador().getId(); // Solo devolvemos el ID
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

    public Timestamp getFecha() {
        return fecha;
    }

    public void setFecha(Timestamp fecha) {
        this.fecha = fecha;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public BigDecimal getPrecio() { 
        return precio; 
    }

    public void setPrecio(BigDecimal precio) { 
        this.precio = precio; 
    }

    public int getOrganizadorId() {
        return organizadorId;
    }

    public void setOrganizadorId(int organizadorId) {
        this.organizadorId = organizadorId;
    }
}
