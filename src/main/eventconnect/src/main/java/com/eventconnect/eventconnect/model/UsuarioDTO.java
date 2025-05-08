package com.eventconnect.eventconnect.model;

public class UsuarioDTO {
    private int id;
    private String nombreUsuario;
    private String correo;
    private String nombre;
    private String primerApellido;
    private String segundoApellido;
    private String tipo;
    private String password;
    private byte[] fotoPerfil;

    public UsuarioDTO() {
    }

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

    // Constructor que toma directamente un objeto Usuario
    public UsuarioDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.nombreUsuario = usuario.getNombreUsuario();
        this.correo = usuario.getCorreo();
        this.nombre = usuario.getNombre();
        this.primerApellido = usuario.getPrimer_Apellido();     // <- adaptado
        this.segundoApellido = usuario.getSegundo_Apellido();   // <- adaptado
        this.tipo = usuario.getTipo();
        this.fotoPerfil = usuario.getFotoPerfil();
    }

    // Getters y setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getPrimerApellido() {
        return primerApellido;
    }

    public void setPrimerApellido(String primerApellido) {
        this.primerApellido = primerApellido;
    }

    public String getSegundoApellido() {
        return segundoApellido;
    }

    public void setSegundoApellido(String segundoApellido) {
        this.segundoApellido = segundoApellido;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public byte[] getFotoPerfil() {
        return fotoPerfil;
    }

    public void setFotoPerfil(byte[] fotoPerfil) {
        this.fotoPerfil = fotoPerfil;
    }
}
