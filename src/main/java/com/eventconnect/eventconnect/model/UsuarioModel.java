package com.eventconnect.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "usuarios") // Nombre de la tabla en la BD
@Getter
@Setter
public class UsuarioModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID autoincremental
    private Long id;

    @Column(nullable = false, unique = true, length = 255) // Debe ser único
    private String username;

    @Column(nullable = false, unique = true, length = 255) // Debe ser único
    private String correo;

    @Column(nullable = false, length = 255) // La contraseña no debe ser única
    private String password;

    @Column(nullable = false, length = 255)
    private String nombre;

    @Column(nullable = false, length = 255)
    private String primerApellido;

    @Column(length = 255) // Segundo apellido es opcional
    private String segundoApellido;
}
