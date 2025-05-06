package com.eventconnect.eventconnect.model;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;

@Embeddable
public class UsuarioEventoId implements Serializable {

    private int usuarioId;
    private int eventoId;

    public UsuarioEventoId() {}

    public UsuarioEventoId(int usuarioId, int eventoId) {
        this.usuarioId = usuarioId;
        this.eventoId = eventoId;
    }

    public int getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(int usuarioId) {
        this.usuarioId = usuarioId;
    }

    public int getEventoId() {
        return eventoId;
    }

    public void setEventoId(int eventoId) {
        this.eventoId = eventoId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UsuarioEventoId)) return false;
        UsuarioEventoId that = (UsuarioEventoId) o;
        return usuarioId == that.usuarioId &&
               eventoId == that.eventoId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(usuarioId, eventoId);
    }
}
