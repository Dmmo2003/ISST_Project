package com.eventconnect.eventconnect.model;

public class EventoConOrganizadorDTO {

    private Evento evento;
    private Usuario organizador;

    // Constructor
    public EventoConOrganizadorDTO(Evento evento, Usuario organizador) {
        this.evento = evento;
        this.organizador = organizador;
    }

    // Getters y Setters
    public Evento getEvento() {
        return evento;
    }

    public void setEvento(Evento evento) {
        this.evento = evento;
    }

    public Usuario getOrganizador() {
        return organizador;
    }

    public void setOrganizador(Usuario organizador) {
        this.organizador = organizador;
    }
}


