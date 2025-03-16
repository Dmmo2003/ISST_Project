package com.eventconnect.grupo_service.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Grupo {

    private int id;
    private String nombre;
    private String descripcion;
    private int adminId;
    private int eventoId;
}
