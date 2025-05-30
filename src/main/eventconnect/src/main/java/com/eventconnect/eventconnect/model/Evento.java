package com.eventconnect.eventconnect.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;
import java.util.Base64;


@Entity
@Table(name = "Evento")
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private Timestamp fecha;

    @Column(nullable = false)
    private String ubicacion;

    @ManyToOne
    // @JsonBackReference
    @JoinColumn(name = "organizador_id", nullable = false)
    private Usuario organizador;

    // @Column(nullable = false)
    private String descripcion;

    // @Column(nullable = false)
    private String categoria;

    private BigDecimal precio;

    @Lob
    @Column(name = "imagen", columnDefinition = "LONGBLOB")
    private byte[] imagen;

    @ManyToMany
    @JoinTable(name = "usuario_evento", joinColumns = @JoinColumn(name = "evento_id"), inverseJoinColumns = @JoinColumn(name = "usuario_id"))
    private List<Usuario> seguidores;

    // @OneToMany(mappedBy = "evento_id", cascade = CascadeType.ALL)
    // private List<Grupo> grupos;
    @OneToMany(mappedBy = "evento")
    private List<Grupo> grupos;

    // Getters and Setters
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

    public int getOrganizadorId() {
        return organizador.getId();
    }

    public void setOrganizadorId(int organizadorId) {
        if (this.organizador == null) {
            this.organizador = new Usuario(); // Aseguramos que no sea null
        }
        this.organizador.setId(organizadorId);
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

    public byte[] getImagen() {
        return imagen;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }
        public String getImagenBase64() {
        if (imagen != null) {
            return "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(imagen);
        }
        return null;
    }


    public Usuario getOrganizador() {
        return organizador;
    }

    public void setOrganizador(Usuario organizador) {
        this.organizador = organizador;
    }

    public List<Usuario> getSeguidores() {
        return seguidores;
    }

    public void setSeguidores(List<Usuario> seguidores) {
        this.seguidores = seguidores;
    }

    public List<Grupo> getGrupos() {
        return grupos;
    }

    public void setGrupos(List<Grupo> grupos) {
        this.grupos = grupos;
    }

}
