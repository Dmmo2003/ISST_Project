package com.eventconnect.eventconnect.model;

public class EnvioMensajeDTO {
    private String mensaje;
    private int usuarioId;

    public EnvioMensajeDTO() {
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public int getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(int usuarioId) {
        this.usuarioId = usuarioId;
    }
}