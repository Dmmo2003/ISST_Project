package com.eventconnect.eventconnect.model;

public class EventoConOrganizadorDTO {

    private EventoDTO evento;
    private UsuarioDTO organizador;

    // Constructor
    public EventoConOrganizadorDTO(EventoDTO evento, UsuarioDTO organizador) {
        this.evento = evento;
        this.organizador = organizador;
    }

    // Getters y Setters
    public EventoDTO getEvento() {
        return evento;
    }

    public void setEvento(EventoDTO evento) {
        this.evento = evento;
    }

    public UsuarioDTO getOrganizador() {
        return organizador;
    }

    public void setOrganizador(UsuarioDTO organizador) {
        this.organizador = organizador;
    }
}


