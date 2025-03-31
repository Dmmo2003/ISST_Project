package com.eventconnect.eventconnect.service;

import com.eventconnect.eventconnect.model.Evento;
import com.eventconnect.eventconnect.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventoServiceImpl implements EventoService {

    private final EventoRepository eventoRepository;

    @Autowired
    public EventoServiceImpl(EventoRepository eventoRepository) {
        this.eventoRepository = eventoRepository;
    }

    @Override
    public List<Evento> obtenerEventos() {
        return eventoRepository.findAll();
    }

    @Override
    public Optional<Evento> obtenerEventoPorId(int id) {
        return eventoRepository.findById(id);
    }

    @Override
    public Evento crearEvento(Evento evento) {
        return eventoRepository.save(evento);
    }

    @Override
    public Evento actualizarEvento(Evento evento) {
        return eventoRepository.findById(evento.getId()).map(eventoExistente -> {
            eventoExistente.setNombre(evento.getNombre());
            eventoExistente.setFecha(evento.getFecha());
            eventoExistente.setUbicacion(evento.getUbicacion());
            eventoExistente.setOrganizadorId(evento.getOrganizadorId());
            eventoExistente.setDescripcion(evento.getDescripcion());
            eventoExistente.setCategoria(evento.getCategoria());
            return eventoRepository.save(eventoExistente);
        }).orElseThrow(() -> new RuntimeException("Evento no encontrado con ID: " + evento.getId()));
    }

    @Override
    public void eliminarEvento(int id) {
        eventoRepository.deleteById(id);
    }
}
