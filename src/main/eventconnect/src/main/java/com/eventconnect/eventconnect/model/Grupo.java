package com.eventconnect.eventconnect.model;

import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "Grupo")
public class Grupo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String nombre;

    @Lob
    @Column(nullable = false)
    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "admin_id", nullable = false)
    // @JsonProperty("adminId")
    private Usuario admin;

    // @ManyToOne
    // @JoinColumn(name = "evento_id", nullable = false)
    // // @JsonProperty("eventoId")
    // private Evento evento;
    @ManyToOne
    @JoinColumn(name = "evento_id", nullable = false)
    private Evento evento;

    @ManyToMany
    @JoinTable(
        name = "usuario_grupo",
        joinColumns = @JoinColumn(name = "grupo_id"),
        inverseJoinColumns = @JoinColumn(name = "usuario_id")
    )
    private List<Usuario> miembros;

    @OneToMany(mappedBy = "grupo", cascade = CascadeType.ALL)
    private List<Mensaje> mensajes;

    // Constructores
    public Grupo() {}

    public Grupo(int id, String nombre, String descripcion, Usuario admin, Evento evento) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.admin = admin;  // Ahora pasamos el objeto Usuario en vez de un id
        this.evento = evento;  // Ahora pasamos el objeto Evento
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

    public Usuario getAdmin() {
        return admin;
    }

    public void setAdmin(Usuario admin) {
        this.admin = admin;
    }

    public Evento getEvento() {
        return evento;
    }

    public void setEvento(Evento evento) {
        this.evento = evento;
    }

    public List<Usuario> getMiembros() {
        return miembros;
    }

    public void setMiembros(List<Usuario> miembros) {
        this.miembros = miembros;
    }

    public List<Mensaje> getMensajes() {
        return mensajes;
    }

    public void setMensajes(List<Mensaje> mensajes) {
        this.mensajes = mensajes;
    }
}
