package com.eventconnect.eventconnect.model;

import jakarta.persistence.*;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "grupos")
public class Grupo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Lob
    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @Column(name = "admin_id", nullable = false)
    private int adminId;

    @Column(name = "evento_id", nullable = false)
    private int eventoId;

    // Relación ManyToMany con Usuario (opcional, si los grupos tienen miembros)
    @ManyToMany
    @JoinTable(
        name = "grupo_usuarios",
        joinColumns = @JoinColumn(name = "grupo_id"),
        inverseJoinColumns = @JoinColumn(name = "usuario_id")
    )
    private List<Usuario> miembros = new ArrayList<>();

    // Constructores
    public Grupo() {}

    public Grupo(int id, String nombre, String descripcion, int adminId, int eventoId) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.adminId = adminId;
        this.eventoId = eventoId;
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

    public int getAdminId() {
        return adminId;
    }

    public void setAdminId(int adminId) {
        this.adminId = adminId;
    }

    public int getEventoId() {
        return eventoId;
    }

    public void setEventoId(int eventoId) {
        this.eventoId = eventoId;
    }

    public List<Usuario> getMiembros() {
        return miembros;
    }

    public void setMiembros(List<Usuario> miembros) {
        this.miembros = miembros;
    }
}
