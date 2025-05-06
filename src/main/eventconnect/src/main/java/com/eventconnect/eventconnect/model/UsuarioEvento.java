package com.eventconnect.eventconnect.model;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "Usuario_Evento") // Coincide con tu schema.sql
public class UsuarioEvento implements Serializable {

    @EmbeddedId
    private UsuarioEventoId id;

    @ManyToOne
    @MapsId("usuarioId")
    @JoinColumn(name = "usuario_Id")
    private Usuario usuario;

    @ManyToOne
    @MapsId("eventoId")
    @JoinColumn(name = "evento_Id")
    private Evento evento;

    public UsuarioEvento() {}

    public UsuarioEvento(Usuario usuario, Evento evento) {
        this.usuario = usuario;
        this.evento = evento;
        this.id = new UsuarioEventoId(usuario.getId(), evento.getId());
    }

    public UsuarioEventoId getId() {
        return id;
    }

    public void setId(UsuarioEventoId id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Evento getEvento() {
        return evento;
    }

    public void setEvento(Evento evento) {
        this.evento = evento;
    }
}
