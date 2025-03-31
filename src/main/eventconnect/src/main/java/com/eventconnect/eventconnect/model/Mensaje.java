package com.eventconnect.eventconnect.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Mensaje")  // Vincula con la tabla en la base de datos
public class Mensaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String contenido;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date fecha;

    @ManyToOne
    @JoinColumn(name = "remitente_id", nullable = false)
    private Usuario remitente;

    @ManyToOne
    @JoinColumn(name = "grupo_id", nullable = false)
    private Grupo grupo;

    // Constructor vacío (JPA lo necesita)
    public Mensaje() {}

    // Constructor con parámetros
    public Mensaje(String contenido, Date fecha, Usuario remitente, Grupo grupo) {
        this.contenido = contenido;
        this.fecha = fecha;
        this.remitente = remitente;
        this.grupo = grupo;
    }

    // Getters y Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getContenido() { return contenido; }
    public void setContenido(String contenido) { this.contenido = contenido; }

    public Date getFecha() { return fecha; }
    public void setFecha(Date fecha) { this.fecha = fecha; }

    public Usuario getRemitente() { return remitente; }
    public void setRemitente(Usuario remitente) { this.remitente = remitente; }

    public Grupo getGrupo() { return grupo; }
    public void setGrupo(Grupo grupo) { this.grupo = grupo; }
}
