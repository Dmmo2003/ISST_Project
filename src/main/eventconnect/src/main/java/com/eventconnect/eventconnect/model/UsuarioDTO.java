package com.eventconnect.eventconnect.model;

public class UsuarioDTO {
    private int id;
    private String nombreUsuario;
    private String correo;
    private String nombre;
    private String primerApellido;
    private String segundoApellido;
    private String tipo;

    public UsuarioDTO(int id, String nombreUsuario, String correo, String nombre, String primerApellido,
            String segundoApellido, String tipo) {
        this.id = id;
        this.nombreUsuario = nombreUsuario;
        this.correo = correo;
        this.nombre = nombre;
        this.primerApellido = primerApellido;
        this.segundoApellido = segundoApellido;
        this.tipo = tipo;
    }

    // Getters y setters
    public int getId() {
        return id;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public String getCorreo() {
        return correo;
    }

    public String getNombre() {
        return nombre;
    }

    public String getPrimerApellido() {
        return primerApellido;
    }

    public String getSegundoApellido() {
        return segundoApellido;
    }

    public String getTipo() {
        return tipo;
    }
}
