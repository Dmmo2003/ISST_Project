package com.eventconnect.eventconnect.service;

import com.eventconnect.eventconnect.model.Evento;
import com.eventconnect.eventconnect.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventoService {
    
    @Autowired
    private EventoRepository eventoRepository;

    // Obtener todos los eventos
    public List<Evento> obtenerEventos() {
        return eventoRepository.findAll();
    }

    // Obtener evento por id
    public Optional<Evento> obtenerEventoPorId(int id) {
        return eventoRepository.findById(id);
    }

    // Crear nuevo evento
    public Evento crearEvento(Evento evento) {
        return eventoRepository.save(evento);
    }

    // Actualizar evento existente
    public Evento actualizarEvento(Evento evento) {
        return eventoRepository.save(evento);
    }

    // Eliminar evento
    public void eliminarEvento(int id) {
        eventoRepository.deleteById(id);
    }
}
