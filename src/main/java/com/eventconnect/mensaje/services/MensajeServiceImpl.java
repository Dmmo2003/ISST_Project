package com.eventconnect.mensaje.services;



import com.eventconnect.mensaje.models.Mensaje;

import com.eventconnect.mensaje.repositories.MensajeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MensajeServiceImpl implements MensajeService {

    @Autowired
    private MensajeRepository mensajeRepository;

    @Override
    public List<Mensaje> obtenerTodos() {
        return mensajeRepository.findAll();
    }

    @Override
    public Mensaje obtenerPorId(int id) {
        return mensajeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mensaje no encontrado con id: " + id));
    }

    @Override
    public Mensaje crearMensaje(Mensaje mensaje) {
        return mensajeRepository.save(mensaje);
    }

    @Override
    public Mensaje actualizarMensaje(int id, Mensaje mensaje) {
        Mensaje existente = obtenerPorId(id);
        existente.setContenido(mensaje.getContenido());
        existente.setFecha(mensaje.getFecha());
        existente.setRemitente(mensaje.getRemitente());
        existente.setGrupo(mensaje.getGrupo());
        return mensajeRepository.save(existente);
    }

    @Override
    public void eliminarMensaje(int id) {
        Mensaje mensaje = obtenerPorId(id);
        mensajeRepository.delete(mensaje);
    }

}
