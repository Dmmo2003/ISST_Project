package com.eventconnect.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "usuarios") // Nombre de la tabla en la BD
@Getter
@Setter
public class UsuarioModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID autoincremental
    private Long id;

    @Column(nullable = false, unique = true, length = 255)
    private String username;

    @Column(nullable = false, unique = true, length = 255)
    private String correo;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(nullable = false, length = 255)
    private String nombre;

    @Column(nullable = false, length = 255)
    private String primerApellido;

    @Column(length = 255)
    private String segundoApellido;

    @Column(nullable = false)
    private LocalDate fechaNacimiento;

    @ManyToMany
    @JoinTable(
        name = "Usuario_Evento", // Coincide con el nombre exacto de la tabla en la BD
        joinColumns = @JoinColumn(name = "Usuario_Id"), // Coincide con la columna en BD
        inverseJoinColumns = @JoinColumn(name = "Evento_Id") // Coincide con la columna en BD
    )
    private List<EventoModel> eventosSeguidos = new ArrayList<>();
}
