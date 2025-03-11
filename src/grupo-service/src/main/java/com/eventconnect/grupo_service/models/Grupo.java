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

    private String id;
    private String nombre;
    private String descripcion;
    private String adminId;
    private String eventoId;
}
