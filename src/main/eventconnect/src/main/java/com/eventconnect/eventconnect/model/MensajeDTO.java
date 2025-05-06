package com.eventconnect.eventconnect.model;

import java.util.Date;

public class MensajeDTO {
    private int id;
    private String contenido;
    private Date fecha;
    private int remitenteId;
    private String remitenteNombreUsuario;

    public MensajeDTO(Mensaje mensaje) {
        this.id = mensaje.getId();
        this.contenido = mensaje.getContenido();
        this.fecha = mensaje.getFecha();
        this.remitenteId = mensaje.getRemitente().getId();
        this.remitenteNombreUsuario = mensaje.getRemitente().getNombreUsuario();
    }

    // Getters
    public int getId() {
        return id;
    }

    public String getContenido() {
        return contenido;
    }

    public Date getFecha() {
        return fecha;
    }

    public int getRemitenteId() {
        return remitenteId;
    }

    public String getRemitenteNombreUsuario() {
        return remitenteNombreUsuario;
    }
}
