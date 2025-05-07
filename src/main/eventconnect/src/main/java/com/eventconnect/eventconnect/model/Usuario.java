package com.eventconnect.eventconnect.model;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "Usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "nombreUsuario", unique = true, nullable = false)
    private String nombreUsuario;

    @Column(name = "correo", unique = true, nullable = false)
    private String correo;

    // @JsonIgnore
    @Column(name = "contraseña", nullable = false)
    private String contraseña;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "primer_Apellido")
    private String primer_Apellido;

    @Column(name = "segundo_Apellido")
    private String segundo_Apellido;

    @Temporal(TemporalType.DATE)
    @Column(name = "fecha_nacimiento", nullable = false)
    private Date fechaNacimiento;

    @Column(name = "tipo", nullable = false)
    private String tipo; // "persona" o "empresa"

    @Column(name = "CIF")
    private String CIF; // Solo si es tipo 'empresa'

    // @OneToMany(mappedBy = "organizador", cascade = CascadeType.ALL)
    // private List<Evento> eventosOrganizados;
    @JsonIgnore
    @OneToMany(mappedBy = "organizador", cascade = CascadeType.ALL)
    private List<Evento> eventosOrganizados;

    @ManyToMany(mappedBy = "seguidores")
    private List<Evento> eventosSeguidos;

    @ManyToMany(mappedBy = "miembros")
    private List<Grupo> grupos;

    @JsonIgnore
    @OneToMany(mappedBy = "remitente", cascade = CascadeType.ALL)
    private List<Mensaje> mensajesEnviados;

    // Constructor vacío (JPA lo necesita)
    public Usuario() {
    }

    @JsonCreator
    public Usuario(@JsonProperty("id") int id) {
        this.id = id;
    }

    // Constructor con parámetros
    public Usuario(String nombre, String primer_Apellido, String segundo_Apellido, String nombreUsuario,
            Date fechaNacimiento,
            String correo, String contraseña) {
        this.nombre = nombre;
        this.primer_Apellido = primer_Apellido;
        this.segundo_Apellido = segundo_Apellido;
        this.nombreUsuario = nombreUsuario;
        this.fechaNacimiento = fechaNacimiento;
        this.correo = correo;
        this.contraseña = contraseña;
    }

    // Getters y setters
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

    public String getPrimer_Apellido() {
        return primer_Apellido;
    }

    public void setPrimer_Apellido(String primer_Apellido) {
        this.primer_Apellido = primer_Apellido;
    }

    public String getSegundo_Apellido() {
        return segundo_Apellido;
    }

    public void setSegundo_Apellido(String segundo_Apellido) {
        this.segundo_Apellido = segundo_Apellido;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public Date getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(Date fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContraseña() {
        return contraseña;
    }

    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getCif() {
        return CIF;
    }

    public void setCif(String CIF) {
        this.CIF = CIF;
    }

    public List<Evento> getEventosSeguidos () {
        return eventosSeguidos;
    }

    public void setEventosSeguidos (List<Evento> eventosSeguidos) {
        this.eventosSeguidos = eventosSeguidos;
    }

    public List<Grupo> getGrupos () {
        return grupos;
    }

    public void setGrupos (List<Grupo> grupos) {
        this.grupos = grupos;
    }
    
}